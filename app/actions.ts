'use server'

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import path from "node:path";
import { SupabaseClient } from "@supabase/supabase-js";
import { readFile } from "node:fs/promises";
import nodemailer from "nodemailer";
import { ContactMeFormSchema, OTPSchema } from "@/lib/models/schemas";

const templatePath = path.join(
  process.cwd(),
  "emails",
  "otp.html"
);


export async function submitForm(_: unknown, formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  const result = ContactMeFormSchema.safeParse({ name, email, message });

  if (!result.success) {
    console.error('Validation errors:', z.flattenError(result.error).fieldErrors);
    return { status: "error", rawData: result.data, submissionId: crypto.randomUUID(), error: z.flattenError(result.error).fieldErrors };
  }

  const supabase = await createClient();
  const count = (await supabase.from('contact-me').select('*', { count: 'exact', head: true }).eq('email', result.data.email)).count || 0;

  if (count >= 3) {
    return { status: "db-count-error", rawData: result.data, submissionId: crypto.randomUUID() };
  } else if (count >= 1 && count < 3) {
    try {
      await SendOTPEmail(supabase, result.data.email);
      return { status: "otp", rawData: result.data, submissionId: crypto.randomUUID() };
    } catch (e) {
      console.error('Error:', e);
      return { status: "db-error", rawData: result.data, submissionId: crypto.randomUUID() };
    }
  } else {
    const dbResult = await supabase.from('contact-me').insert({ name: result.data.name, email: result.data.email, message: result.data.message });
    if (!dbResult.success) {
      console.error('Database error:', dbResult.error);
      return { status: "db-error", rawData: result.data, submissionId: crypto.randomUUID() };
    }
    await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: '1926409323',
        text: `New message from ${name} (${email}):\n\n${message}`,
      }),
    });
    return { status: "success", rawData: result.data, submissionId: crypto.randomUUID() };
  }
}

export async function submitOTP(_: unknown, formData: FormData) {
  const code = formData.get('code') as string;
  const result = OTPSchema.safeParse(code);
  const contactFormData = ContactMeFormSchema.safeParse(JSON.parse(formData.get('rawData') as string));
  
  if (!result.success) {
    return { status: "error", submissionId: crypto.randomUUID(), error: result.error.message };
  }

  if (!contactFormData.success) {
    return { status: "error", submissionId: crypto.randomUUID(), error: "Data is malformed!" };
  }

  const supabase = await createClient();
  const dbOTP = await supabase.from('OTP').select('*').eq('otp', result.data).eq('email', contactFormData.data.email);

  if (dbOTP.success && dbOTP.data.length > 0) {
    const { data, error } = await supabase.rpc("validate_otp", {
      input_otp: result.data,
    });

    if (error) {
      return { status: "error", submissionId: crypto.randomUUID(), error: "Unable to connect to the database. Please try again later." };
    }

    if (data) {
      await supabase.from("OTP").delete().eq('otp', result.data).eq('email', contactFormData.data.email);
      const dbResult = await supabase.from('contact-me').insert({ name: contactFormData.data.name, email: contactFormData.data.email, message: contactFormData.data.message });
      if (!dbResult.success) {
        console.error('Database error:', dbResult.error);
        return { status: "error", submissionId: crypto.randomUUID(), error: "Unable to connect to the database. Please try again later." };
      }
      await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: '1926409323',
          text: `New message from ${contactFormData.data.name} (${contactFormData.data.email}):\n\n${contactFormData.data.message}`,
        }),
      });
      return { status: "success", submissionId: crypto.randomUUID() };
    } else {
      return { status: "error", submissionId: crypto.randomUUID(), error: "OTP is invalid or expired." };
    }
  } else {
    return { status: "error", submissionId: crypto.randomUUID(), error: "The 6-digits code is incorrect." };
  }

}

const SendOTPEmail = (supabaseClient: SupabaseClient, email: string): Promise<null> => {
  return new Promise(async (resolve, reject) => {
    try {
      const otp = String(
        Math.floor(100000 + Math.random() * 900000)
      );
      let html = await readFile(templatePath, "utf-8");
      html = html
        .replaceAll("{{APP_NAME}}", "Sepehr Azizi")
        .replaceAll("{{OTP}}", otp)
        .replaceAll("{{YEAR}}", String(new Date().getFullYear()));

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });
      
      const dbResult = await supabaseClient.from('OTP').insert({ otp, email });
      if (!dbResult.success) {
        reject(dbResult.error);
      }

      await transporter.sendMail({
        from: `"Sepehr Azizi" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: `${otp} is your verification code`,
        html,
        text: `Your verification code is ${otp}. It expires in 5 minutes.`,
      });
      resolve(null);
    } catch (error) {
      reject(error);
    }


  });
}