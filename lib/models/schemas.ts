import { z } from "zod";

export const ContactMeFormSchema = z.object({
  name: z.string()
        .min(1, { message: "Name is required" })
        .max(50, { message: "Name must be less than 50 characters" }),
  email: z.email({ message: "Invalid email address" }),
  message: z.string()
          .min(1, { message: "Message is required" })
          .max(1500, { message: "Message must be less than 1500 characters" }),
});

export const OTPSchema = z.string().length(6, { message: "OTP must be 6 digits" }).regex(/^[0-9]*$/, { message: "OTP must be all numbers" })

export type ContactMeFormType = z.infer<typeof ContactMeFormSchema>;
export type OTPType = z.infer<typeof OTPSchema>;