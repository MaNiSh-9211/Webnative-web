import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication routes
  setupAuth(app);

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
