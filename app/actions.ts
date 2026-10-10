'use server'
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const schema = z.object({
  name: z.string()
        .min(1, { message: "Name is required" })
        .max(50, { message: "Name must be less than 50 characters" }),
  email: z.email({ message: "Invalid email address" }),
  message: z.string()
          .min(1, { message: "Message is required" })
          .max(1500, { message: "Message must be less than 1500 characters" }),
});


export async function submitForm(_: unknown, formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  const result = schema.safeParse({ name, email, message });

  if (!result.success) {
    console.error('Validation errors:', z.flattenError(result.error).fieldErrors);
    return { status: "error", submissionId: crypto.randomUUID(), error: z.flattenError(result.error).fieldErrors };
  }

  const supabase = await createClient();
  const count = (await supabase.from('contact-me').select('*', { count: 'exact', head: true }).eq('email', result.data.email)).count || 0;

  if (count >= 5) {
    return { status: "db-count-error", submissionId: crypto.randomUUID() };
  } else {
    const dbResult = await supabase.from('contact-me').insert({ name: result.data.name, email: result.data.email, message: result.data.message });
    if (!dbResult.success) {
      console.error('Database error:', dbResult.error);
      return { status: "db-error", submissionId: crypto.randomUUID() };
    }
    await fetch(`https://api.telegram.org/bot${process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: '1926409323',
        text: `New message from ${name} (${email}):\n\n${message}`,
      }),
    });
    return { status: "success", submissionId: crypto.randomUUID() };
  }
}