import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import nodemailer from "nodemailer";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form API endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate request body
      const validatedData = insertContactMessageSchema.parse(req.body);
      
      // Store the message in the database
      const message = await storage.createContactMessage(validatedData);
      
      // Send email notification (in a real app, you would use real SMTP credentials)
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST || "smtp.example.com",
          port: parseInt(process.env.SMTP_PORT || "587"),
          secure: process.env.SMTP_SECURE === "true",
          auth: {
            user: process.env.SMTP_USER || "user@example.com",
            pass: process.env.SMTP_PASSWORD || "password",
          },
        });

        await transporter.sendMail({
          from: `"Portfolio Contact" <${process.env.SMTP_USER || "contact@example.com"}>`,
          to: "taramani@example.com", // Recipient email
          subject: `New Contact Message: ${validatedData.subject}`,
          text: `
            Name: ${validatedData.name}
            Email: ${validatedData.email}
            
            Message:
            ${validatedData.message}
          `,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${validatedData.name}</p>
            <p><strong>Email:</strong> ${validatedData.email}</p>
            <p><strong>Subject:</strong> ${validatedData.subject}</p>
            <h3>Message:</h3>
            <p>${validatedData.message.replace(/\n/g, '<br>')}</p>
          `,
        });
      } catch (emailError) {
        console.error("Failed to send email notification:", emailError);
        // Continue execution - we still want to return success if the message was saved
      }
      
      res.status(201).json({ success: true, message: "Message sent successfully" });
    } catch (error) {
      if (error instanceof Error) {
        const validationError = fromZodError(error);
        res.status(400).json({ 
          success: false, 
          message: validationError.message || "Invalid form data" 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "An error occurred while processing your message" 
        });
      }
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
