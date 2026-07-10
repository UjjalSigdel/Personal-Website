import { z } from "zod";

// Single source of truth for contact-form validation (FOUNDATION.md §3.4):
// consumed by the form (client/src/components/sections/ContactSection.tsx)
// for its field errors and by the serverless function (api/contact.ts) as
// the real gate. Never define these rules anywhere else — the two sides
// drifting apart is exactly the hazard this module exists to prevent.
// (NB: this file is in Tailwind's content scan; a bare word that collides
// with a utility class name in a comment here becomes a phantom CSS rule.)
//
// The rules are the server's original strict set: `.trim()` throughout,
// upper bounds on every field, and no line breaks in `name`/`subject`
// (defense in depth against email header injection).
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long")
    .regex(/^[^\r\n]+$/, "Name cannot contain line breaks"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(254, "Email is too long"),
  subject: z
    .string()
    .trim()
    .min(5, "Subject must be at least 5 characters")
    .max(200, "Subject is too long")
    .regex(/^[^\r\n]+$/, "Subject cannot contain line breaks"),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message is too long"),
  // Honeypot: real visitors never see or fill this field. Bots that
  // autofill every input they find will, so a non-empty value here
  // means the submission can be silently dropped instead of emailed.
  company: z.string().max(200).optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
