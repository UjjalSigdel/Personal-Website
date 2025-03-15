import { Request, Response } from "express";
import nodemailer from "nodemailer";
import { z } from "zod";

// Define the schema for the contact form data
const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(5),
  message: z.string().min(10),
});

// Handler for the contact form submission
export const contactHandler = async (req: Request, res: Response) => {
  try {
    // Validate the request body
    const { name, email, subject, message } = contactSchema.parse(req.body);

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // Use your email service (e.g., Gmail, Outlook)
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or app password
      },
    });

    // Define the email options
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender address
      to: "contact@ujjalsigdel.com.np", // Recipient address
      subject: `New Contact Form Submission: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Send a success response
    res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send message. Please try again later." });
  }
};