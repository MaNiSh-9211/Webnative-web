import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import { Express } from "express";
import { storage } from "./storage";

// Utility function to ask for API keys
const getOAuthCredentials = () => {
  // Determine the base URL dynamically
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? process.env.BASE_URL || 'https://webnative.replit.app' 
    : 'https://' + process.env.REPL_SLUG + '.' + process.env.REPL_OWNER + '.repl.co';
  
  console.log('OAuth base URL:', baseUrl);
  
  const googleCredentials = {
    clientID: process.env.GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "YOUR_GOOGLE_CLIENT_SECRET",
    callbackURL: baseUrl + "/api/auth/google/callback",
  };

  const githubCredentials = {
    clientID: process.env.GITHUB_CLIENT_ID || "YOUR_GITHUB_CLIENT_ID",
    clientSecret: process.env.GITHUB_CLIENT_SECRET || "YOUR_GITHUB_CLIENT_SECRET",
    callbackURL: baseUrl + "/api/auth/github/callback",
  };

  return { googleCredentials, githubCredentials };
};

export function setupOAuth(app: Express): void {
  const { googleCredentials, githubCredentials } = getOAuthCredentials();

  // Google Strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: googleCredentials.clientID,
        clientSecret: googleCredentials.clientSecret,
        callbackURL: googleCredentials.callbackURL,
        scope: ["profile", "email"],
      },
      async (accessToken: string, refreshToken: string, profile: any, done: any) => {
        try {
          const user = await storage.findOrCreateOAuthUser(profile, "google");
          return done(null, user);
        } catch (error) {
          return done(error as Error);
        }
      }
    )
  );

  // GitHub Strategy
  passport.use(
    new GitHubStrategy(
      {
        clientID: githubCredentials.clientID,
        clientSecret: githubCredentials.clientSecret,
        callbackURL: githubCredentials.callbackURL,
        scope: ["user:email"],
      },
      async (accessToken: string, refreshToken: string, profile: any, done: any) => {
        try {
          const user = await storage.findOrCreateOAuthUser(profile, "github");
          return done(null, user);
        } catch (error) {
          return done(error as Error);
        }
      }
    )
  );

  // Google OAuth routes
  app.get("/api/auth/google", (req, res, next) => {
    console.log("Starting Google OAuth flow");
    passport.authenticate("google", { 
      scope: ["profile", "email"],
      prompt: 'consent',  // Always ask for consent to help with permission issues
      accessType: 'offline' // Request a refresh token
    })(req, res, next);
  });

  app.get("/api/auth/google/callback", (req, res, next) => {
    console.log("Google OAuth callback received");
    passport.authenticate("google", { 
      failureRedirect: "/auth?error=google-auth-failed",
      session: true 
    })(req, res, next);
  }, (req, res) => {
    console.log("Google OAuth successful, redirecting to home");
    res.redirect("/");
  });

  // GitHub OAuth routes
  app.get("/api/auth/github", (req, res, next) => {
    console.log("Starting GitHub OAuth flow");
    passport.authenticate("github", { 
      scope: ["user:email"]
    })(req, res, next);
  });

  app.get("/api/auth/github/callback", (req, res, next) => {
    console.log("GitHub OAuth callback received");
    passport.authenticate("github", { 
      failureRedirect: "/auth?error=github-auth-failed",
      session: true 
    })(req, res, next);
  }, (req, res) => {
    console.log("GitHub OAuth successful, redirecting to home");
    res.redirect("/");
  });
}