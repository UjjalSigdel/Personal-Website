import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import nodemailer from "nodemailer"; // 
import rateLimit from "express-rate-limit";
import dotenv from "dotenv"; // <-- Import dotenv

dotenv.config(); // <-- Load environment variables

export async function registerRoutes(app: Express): Promise<Server> {

  // Validate email environment variables
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error("EMAIL_USER or EMAIL_PASS is not defined in the environment variables.");
  }

  // Create a Nodemailer transporter  
  const transporter = nodemailer.createTransport({
    service: "gmail", // Use your email service (e.g., Gmail, Outlook)
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASS, // Your email password or app password
    },
  });

  // Rate limiter for contact form submissions
  const contactRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: "Too many contact form submissions from this IP, please try again later.",
  });

  // API route for contact form submissions
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate the request body against the schema
      const validatedData = insertContactSchema.parse(req.body);

      // Store the contact form submission to database
      const result = await storage.createContactSubmission(validatedData);

      // Send an email notification 
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
