import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication routes
  setupAuth(app);

  // WebNative API proxy routes
  const WEBNATIVE_BASE = "http://localhost:35555";

  // Proxy file system operations
  app.get("/api/fs/drives", async (req, res) => {
    try {
      const response = await fetch(`${WEBNATIVE_BASE}/fs/drives`);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        error: error instanceof Error ? error.message : "Unknown error" 
      });
    }
  });

  app.get("/api/fs/list", async (req, res) => {
    try {
      const path = req.query.path as string;
      const response = await fetch(`${WEBNATIVE_BASE}/fs/list?path=${encodeURIComponent(path)}`);
      const data = await response.text();
      res.send(data);
    } catch (error) {
      res.status(500).send(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  });

  app.get("/api/fs/read", async (req, res) => {
    try {
      const path = req.query.path as string;
      const response = await fetch(`${WEBNATIVE_BASE}/fs/read?path=${encodeURIComponent(path)}`);
      const data = await response.text();
      res.send(data);
    } catch (error) {
      res.status(500).send(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  });

  app.post("/api/fs/write", async (req, res) => {
    try {
      const path = req.query.path as string;
      const response = await fetch(`${WEBNATIVE_BASE}/fs/write?path=${encodeURIComponent(path)}`, {
        method: "POST",
        body: req.body
      });
      const data = await response.text();
      res.send(data);
    } catch (error) {
      res.status(500).send(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  });

  app.post("/api/fs/append", async (req, res) => {
    try {
      const path = req.query.path as string;
      const response = await fetch(`${WEBNATIVE_BASE}/fs/append?path=${encodeURIComponent(path)}`, {
        method: "POST",
        body: req.body
      });
      const data = await response.text();
      res.send(data);
    } catch (error) {
      res.status(500).send(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  });

  app.get("/api/fs/meta", async (req, res) => {
    try {
      const path = req.query.path as string;
      const response = await fetch(`${WEBNATIVE_BASE}/fs/meta?path=${encodeURIComponent(path)}`);
      const data = await response.text();
      res.send(data);
    } catch (error) {
      res.status(500).send(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  });

  app.get("/api/fs/exists", async (req, res) => {
    try {
      const path = req.query.path as string;
      const response = await fetch(`${WEBNATIVE_BASE}/fs/exists?path=${encodeURIComponent(path)}`);
      const data = await response.text();
      res.send(data);
    } catch (error) {
      res.status(500).send(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  });

  app.post("/api/cmd/run", async (req, res) => {
    try {
      const response = await fetch(`${WEBNATIVE_BASE}/cmd/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body)
      });
      const data = await response.text();
      res.send(data);
    } catch (error) {
      res.status(500).send(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  });

  // Create HTTP server
  const httpServer = createServer(app);

  return httpServer;
}
