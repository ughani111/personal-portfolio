import { z } from "zod";

export const inquiryTypes = [
  "General inquiry",
  "Professional opportunity",
  "Freelance project",
  "Technical conversation"
] as const;

export const contactFormSchema = z.object({
  company: z.string().max(120).optional(),
  consent: z.boolean().optional(),
  email: z.email("Enter a valid email address."),
  honeypot: z.string().max(0).optional().default(""),
  inquiryType: z.enum(inquiryTypes).optional(),
  message: z
    .string()
    .min(24, "Share a little more context so I can respond helpfully.")
    .max(2000, "Please keep the message under 2000 characters."),
  name: z
    .string()
    .min(2, "Enter your name.")
    .max(120, "Please shorten the name field.")
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

export function getPublicContactConfig() {
  return {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@your-domain.com",
    endpoint: process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT || ""
  };
}

export function buildMailtoHref(input: ContactFormInput, email: string) {
  const subject = `${input.inquiryType || "Portfolio inquiry"} from ${input.name}`;
  const body = [
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    input.company ? `Company: ${input.company}` : "",
    "",
    input.message
  ]
    .filter(Boolean)
    .join("\n");

  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
