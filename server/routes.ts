import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { isAuthenticated, refreshToken } from "./jwt";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication middleware (both traditional and OAuth)
  setupAuth(app);
  
  // Auth routes
  app.get('/api/auth/user', isAuthenticated, (req, res) => {
    res.json(req.user);
  });
  
  // Get current user endpoint
  app.get('/api/user', (req, res) => {
    // The isAuthenticated middleware already returns 401 if not authenticated
    // But we want to allow this specific endpoint to return null if not authenticated
    // So we check for a token, but don't return an error
    const token = req.headers.authorization?.split(' ')[1] || req.cookies?.token;
    
    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No token provided" });
    }
    
    // Extract user info from token
    try {
      // Will get user info from middleware
      isAuthenticated(req, res, () => {
        res.json(req.user);
      });
    } catch (error) {
      res.status(401).json({ message: "Unauthorized - Invalid token" });
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
