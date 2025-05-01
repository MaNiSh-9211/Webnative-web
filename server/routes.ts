import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";

// Middleware to check if user is authenticated
const isAuthenticated = (req: any, res: any, next: any) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication middleware (both traditional and OAuth)
  setupAuth(app);
  
  // Auth routes
  app.get('/api/auth/user', isAuthenticated, (req, res) => {
    res.json(req.user);
  });
  
  // Get current user endpoint
  app.get('/api/user', (req, res) => {
    if (req.isAuthenticated()) {
      res.json(req.user);
    } else {
      res.status(200).json(null);
    }
  });

  // API routes
  app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from WebNative API!' });
  });

  // WebNative service stats
  app.get('/api/service/status', (req, res) => {
    res.json({
      status: 'running',
      version: '1.0.2',
      connectedUsers: 145,
      requestsHandled: 287432,
      uptime: '24 days'
    });
  });

  // Thanks endpoint (from server-2.js)
  app.post('/api/thanks', (req, res) => {
    console.log('User has viewed drive list and sent thanks.');
    res.status(200).send('Thanks received.');
  });

  // Download statistics
  app.get('/api/download/stats', (req, res) => {
    res.json({
      totalDownloads: 14782,
      windowsDownloads: 8923,
      macDownloads: 3841,
      linuxDownloads: 2018,
      latestVersion: '1.0.2',
      lastUpdated: '2023-06-15'
    });
  });

  const httpServer = createServer(app);

  return httpServer;
}
