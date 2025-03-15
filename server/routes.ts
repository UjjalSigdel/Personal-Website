import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import nodemailer from "nodemailer"; // <-- Added this line

export async function registerRoutes(app: Express): Promise<Server> {

  // Create a Nodemailer transporter  <-- Added this block
  const transporter = nodemailer.createTransport({
    service: "gmail", // Use your email service (e.g., Gmail, Outlook)
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASS, // Your email password or app password
    },
  });

  // API route for contact form submissions
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate the request body against the schema
      const validatedData = insertContactSchema.parse(req.body);

      // Store the contact form submission
      const result = await storage.createContactSubmission(validatedData);

      // Send an email notification  <-- Added this block
      const mailOptions = {
        from: process.env.EMAIL_USER, // Sender address
        to: "contact@ujjalsigdel.com.np", // Recipient address
        subject: `New Contact Form Submission: ${validatedData.subject}`,
        text: `Name: ${validatedData.name}\nEmail: ${validatedData.email}\nMessage: ${validatedData.message}`,
      };

      await transporter.sendMail(mailOptions); // <-- Added this line

      // Return success response
      res.status(200).json({
        success: true,
        message: "Contact form submitted successfully",
        data: result
      });
    } catch (error) {
      if (error instanceof ZodError) {
        // Handle validation errors
        const validationError = fromZodError(error);
        res.status(400).json({
          success: false,
          message: validationError.message
        });
      } else {
        // Handle other errors
        console.error("Error processing contact form:", error);
        res.status(500).json({
          success: false,
          message: "An error occurred while processing your request"
        });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
