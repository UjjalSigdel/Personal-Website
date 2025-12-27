import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";
import { insertContactSchema } from "../shared/schema";
import { ZodError } from "zod";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const data = insertContactSchema.parse(req.body);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "contact@ujjalsigdel.com.np",
      subject: `New Contact: ${data.subject}`,
      text: `Name: ${data.name}
Email: ${data.email}
Message: ${data.message}`,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json({ message: err.errors[0].message });
    }

    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}
