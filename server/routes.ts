import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserInteractionSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get missions with optional category filter
  app.get("/api/missions", async (req, res) => {
    try {
      const category = req.query.category as string;
      const offset = parseInt(req.query.offset as string) || 0;
      const limit = parseInt(req.query.limit as string) || 20;

      const missions = await storage.getMissions({ 
        category, 
        offset, 
        limit 
      });

      // Get client data for each mission
      const missionsWithClients = await Promise.all(
        missions.map(async (mission) => {
          const client = mission.clientId ? await storage.getUser(mission.clientId) : null;
          return {
            ...mission,
            client: client ? {
              id: client.id,
              name: client.name,
              rating: client.rating,
              reviewCount: client.reviewCount,
              isVerified: client.isVerified,
              responseTime: client.responseTime,
              profileImage: client.profileImage,
            } : null
          };
        })
      );

      res.json(missionsWithClients);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch missions" });
    }
  });

  // Get specific mission by ID
  app.get("/api/missions/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const mission = await storage.getMission(id);
      
      if (!mission) {
        return res.status(404).json({ message: "Mission not found" });
      }

      const client = mission.clientId ? await storage.getUser(mission.clientId) : null;
      
      res.json({
        ...mission,
        client: client ? {
          id: client.id,
          name: client.name,
          rating: client.rating,
          reviewCount: client.reviewCount,
          isVerified: client.isVerified,
          responseTime: client.responseTime,
          profileImage: client.profileImage,
        } : null
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch mission" });
    }
  });

  // Get categories
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  // Create user interaction (accept, skip, save)
  app.post("/api/interactions", async (req, res) => {
    try {
      const validatedData = insertUserInteractionSchema.parse(req.body);
      const interaction = await storage.createUserInteraction(validatedData);
      
      // Update mission interest count for accept actions
      if (validatedData.action === "accepted") {
        const mission = await storage.getMission(validatedData.missionId);
        if (mission) {
          await storage.updateMissionInterestCount(
            validatedData.missionId, 
            mission.interestedCount + 1
          );
        }
      }
      
      res.json(interaction);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create interaction" });
    }
  });

  // Simulate real-time interest updates
  app.post("/api/missions/:id/update-interest", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const mission = await storage.getMission(id);
      
      if (!mission) {
        return res.status(404).json({ message: "Mission not found" });
      }
      
      // Simulate small fluctuations in interest count
      const fluctuation = Math.floor(Math.random() * 3) - 1; // -1 to +1
      const newCount = Math.max(0, mission.interestedCount + fluctuation);
      
      await storage.updateMissionInterestCount(id, newCount);
      
      res.json({ interestedCount: newCount });
    } catch (error) {
      res.status(500).json({ message: "Failed to update interest count" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
