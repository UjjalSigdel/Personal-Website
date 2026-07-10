import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";
import { z } from "zod";
// Relative imports: the `@/` alias is Vite/tsconfig-path config that Vercel's
// function bundler doesn't resolve for api/ files.
import { SITE } from "../client/src/lib/site.config";
import { contactSchema } from "../client/src/lib/contact.schema";

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

    const data = contactSchema.parse(body);

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
      to: SITE.contact.email,
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
