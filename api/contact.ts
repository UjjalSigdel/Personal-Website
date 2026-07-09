import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";
import { z } from "zod";

const insertContactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long")
    .regex(/^[^\r\n]+$/, "Name cannot contain line breaks"),
  email: z.string().trim().email("Invalid email address").max(254, "Email is too long"),
  subject: z
    .string()
    .trim()
    .min(5, "Subject must be at least 5 characters")
    .max(200, "Subject is too long")
    .regex(/^[^\r\n]+$/, "Subject cannot contain line breaks"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(5000, "Message is too long"),
  // Honeypot: real visitors never see or fill this field. Bots that
  // autofill every input they find will, so a non-empty value here
  // means we can silently drop the submission instead of emailing it.
  company: z.string().max(200).optional(),
});

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const body =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    const data = insertContactSchema.parse(body);

    if (data.company) {
      // Honeypot tripped — pretend success so the bot doesn't learn it was caught.
      return res.status(200).json({ success: true });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: "contact@ujjalsigdel.com.np",
      replyTo: data.email,
      subject: `New Contact: ${data.subject}`,
      text: `Name: ${data.name}
Email: ${data.email}

Message:
${data.message}`,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("CONTACT API ERROR:", err);

    if (err instanceof z.ZodError) {
      return res.status(400).json({
        message: err.errors[0]?.message || "Invalid input",
      });
    }

    return res.status(500).json({ message: "Server error" });
  }
}
