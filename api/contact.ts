import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import { insertContactSchema } from "../shared/schema";
import { ZodError } from "zod";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const body =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    const data = insertContactSchema.parse(body);

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

    if (err instanceof ZodError) {
      return res.status(400).json({
        message: err.errors[0]?.message || "Invalid input",
      });
    }

    return res.status(500).json({ message: "Server error" });
  }
}
