import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { propertyData, contactSchema } from "@shared/schema";
import { ZodError } from "zod";

export function registerRoutes(app: Express): Server {
  app.get("/api/properties", (_req, res) => {
    res.json(propertyData);
  });

  app.get("/api/properties/:id", (req, res) => {
    const property = propertyData.find(p => p.id === parseInt(req.params.id));
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.json(property);
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const contact = contactSchema.parse(req.body);
      const property = propertyData.find(p => p.id === contact.propertyId);
      
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }

      // In a real app, we would save this and send an email
      res.json({ message: "Contact request received" });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Invalid contact data", errors: error.errors });
      }
      res.status(500).json({ message: "Server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
