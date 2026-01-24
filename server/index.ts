import express, { type Request, Response, NextFunction } from "express";
import { createServer } from "http";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { SnapshotWorker } from "./application/workers/SnapshotWorker";
import { SnapshotService } from "./application/services/SnapshotService";
import { StorageService } from "./application/services/StorageService";
import { EthersAdapter } from "./infrastructure/adapters/EthersAdapter";

const app = express();
const httpServer = createServer(app);

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  }),
);

app.use(express.urlencoded({ extended: false }));

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  // === Clean Architecture Setup ===
  const storageService = new StorageService();

  const ethRpc = process.env.ALCHEMY_API_KEY
    ? `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
    : process.env.INFURA_API_KEY
    ? `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`
    : null;

  const polygonRpc = process.env.POLYGON_RPC_URL;

  if (!ethRpc || !polygonRpc) {
    log("Missing Alchemy/Infura API key or Polygon RPC URL. Please set ALCHEMY_API_KEY/INFURA_API_KEY and POLYGON_RPC_URL environment variables.");
    process.exit(1);
  }

  const ethereumAdapter = new EthersAdapter(ethRpc);
  const polygonAdapter = new EthersAdapter(polygonRpc);

  const snapshotService = new SnapshotService([ethereumAdapter, polygonAdapter]);

  // Initialize and start the background worker
  const snapshotWorker = new SnapshotWorker(snapshotService, storageService);
  snapshotWorker.start(60000); // Refresh every 60 seconds

  await registerRoutes(httpServer, app, snapshotService, storageService);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
  } else {
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  }

  const port = parseInt(process.env.PORT || "5000", 10);
  httpServer.listen(
    {
      port,
      host: "0.0.0.0",
      reusePort: true,
    },
    () => {
      log(`serving on port ${port}`);
    },
  );
})();
