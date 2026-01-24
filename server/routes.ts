import type { Express } from "express";
import { type Server } from "http";
import { api } from "@shared/routes";
import { SnapshotService } from "./application/services/SnapshotService";
import { StorageService } from "./application/services/StorageService";

export async function registerRoutes(
  httpServer: Server,
  app: Express,
  snapshotService: SnapshotService,
  storageService: StorageService
): Promise<Server> {

  app.get(api.snapshots.getLatest.path, async (req, res) => {
    try {
      const offset = parseInt(req.query.offset as string) || 0;
      const limit = parseInt(req.query.limit as string) || 25;
      
      const pools = await storageService.getPools();
      const paginatedPools = Object.values(pools).slice(offset, offset + limit);

      res.json({ pools: paginatedPools });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  return httpServer;
}
