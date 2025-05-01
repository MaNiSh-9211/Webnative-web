import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express, Request, Response, NextFunction } from "express";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import cookieParser from "cookie-parser";
import { storage } from "./storage";
import { User } from "@shared/schema";
import { setupOAuth } from "./oauth";
import { generateToken, isAuthenticated } from "./jwt";

declare global {
  namespace Express {
    interface User extends User {}
  }
}

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function comparePasswords(supplied: string, stored: string) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

export function setupAuth(app: Express) {
  // Initialize passport without sessions
  app.use(cookieParser());
  app.use(passport.initialize());
  
  // Set up OAuth strategies
  setupOAuth(app);

  // Local strategy for username/password login
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await storage.getUserByUsername(username);
        
        if (!user) {
          return done(null, false, { message: "User not found" });
        }
        
        if (!user.password) {
          return done(null, false, { message: "Please login using OAuth provider" });
        }
        
        if (!(await comparePasswords(password, user.password))) {
          return done(null, false, { message: "Incorrect password" });
        }
        
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }),
  );

  // Registration endpoint
  app.post("/api/register", async (req, res) => {
    try {
      const existingUser = await storage.getUserByUsername(req.body.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }

      const user = await storage.createUser({
        ...req.body,
        password: await hashPassword(req.body.password),
      });

      // Generate JWT token
      const token = generateToken(user);
      
      // Set token in cookie and response
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 1 week
      });
      
      // Return user data without password
      const { password, ...userData } = user;
      res.status(201).json({
        ...userData,
        token
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ message: "Error creating user account" });
    }
  });

  // Login endpoint
  app.post("/api/login", (req, res, next) => {
    passport.authenticate("local", (err: Error | null, user: User | false, info: { message: string } | undefined) => {
      if (err) {
        return res.status(500).json({ message: "Authentication error" });
      }
      
      if (!user) {
        return res.status(401).json({ message: info?.message || "Invalid username or password" });
      }
      
      // Generate JWT token
      const token = generateToken(user);
      
      // Set token in cookie and response
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 1 week
      });
      
      // Return user data without password
      const { password, ...userData } = user;
      res.status(200).json({
        ...userData,
        token
      });
    })(req, res, next);
  });

  // Logout endpoint
  app.post("/api/logout", (_req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  });

  // Get current user endpoint
  app.get("/api/user", isAuthenticated, (req, res) => {
    res.json(req.user);
  });
}