import express, { type Request, Response, NextFunction } from "express";
import cors from "cors";  // <-- Import cors
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { db } from "./db"; // Import the database connection
import * as schema from "@shared/schema"; // Import the schema

const app = express();

// CORS configuration
app.use(
  cors({
    origin: [
      "https://ujjalsigdel.com.np",
      "https://www.ujjalsigdel.com.np"
    ],
    credentials: true, // Important for sending cookies/auth headers
    methods: ["GET", "POST", "OPTIONS"], // Allow OPTIONS for preflight
    allowedHeaders: ["Content-Type", "Authorization"], // Allow required headers
  })
);

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Request logging middleware
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

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// Example database route for testing
app.get("/api/test-db", async (req, res) => {
  try {
    // Example query: Replace 'users' with your actual table
    const data = await db.select().from(schema.users);
    res.json(data);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Database connection failed" });
  }
});

// Register API routes
(async () => {
  const server = await registerRoutes(app);

  //  Ensure API routes are registered under "/api"
  app.use("/api", (req, res, next) => {
    next();
  });

  // Global error handler
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = 5000;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
