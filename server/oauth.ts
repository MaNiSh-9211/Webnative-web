import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import { Express } from "express";
import { storage } from "./storage";

// Utility function to ask for API keys
const getOAuthCredentials = () => {
  const googleCredentials = {
    clientID: process.env.GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "YOUR_GOOGLE_CLIENT_SECRET",
    callbackURL: process.env.GOOGLE_CALLBACK_URL || "/api/auth/google/callback",
  };

  const githubCredentials = {
    clientID: process.env.GITHUB_CLIENT_ID || "YOUR_GITHUB_CLIENT_ID",
    clientSecret: process.env.GITHUB_CLIENT_SECRET || "YOUR_GITHUB_CLIENT_SECRET",
    callbackURL: process.env.GITHUB_CALLBACK_URL || "/api/auth/github/callback",
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
  app.get("/api/auth/google", 
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  app.get(
    "/api/auth/google/callback",
    passport.authenticate("google", { 
      failureRedirect: "/auth",
      session: true 
    }),
    (req, res) => {
      res.redirect("/");
    }
  );

  // GitHub OAuth routes
  app.get("/api/auth/github", 
    passport.authenticate("github", { scope: ["user:email"] })
  );

  app.get(
    "/api/auth/github/callback",
    passport.authenticate("github", { 
      failureRedirect: "/auth",
      session: true 
    }),
    (req, res) => {
      res.redirect("/");
    }
  );
}