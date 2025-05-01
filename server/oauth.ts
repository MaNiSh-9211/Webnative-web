import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import { Express } from "express";
import { storage } from "./storage";
import { generateToken } from "./jwt";

export function setupOAuth(app: Express): void {
  // Google OAuth Strategy
  passport.use(
    new GoogleStrategy(
      {
        // clientID: process.env.GOOGLE_CLIENT_ID!,
        // clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        // callbackURL: `${process.env.BASE_URL || "http://localhost:3000"}/api/auth/google/callback`,
        clientID: "862014520901-ev2imnr3qhosb9m3598q6vpvg2mnj6pc.apps.googleusercontent.com",  // Hardcoded Google Client ID
        clientSecret: "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",  // Hardcoded Google Client Secret
        callbackURL: "http://localhost:3000/api/auth/google/callback",  // Hardcoded callback URL
  
      },
      async (accessToken: string, refreshToken: string, profile: any, done: (error: Error | null, user?: any) => void) => {
        try {
          // Find or create user
          const user = await storage.findOrCreateOAuthUser({
            providerId: profile.id,
            provider: "google",
            email: profile.emails?.[0]?.value,
            username: profile.displayName.toLowerCase().replace(/\s+/g, ''),
            displayName: profile.displayName,
            profilePicture: profile.photos?.[0]?.value
          });
          return done(null, user);
        } catch (error) {
          console.error("Google OAuth error:", error);
          return done(error as Error);
        }
      }
    )
  );

  // GitHub OAuth Strategy
  passport.use(
    new GitHubStrategy(
      {
        // clientID: process.env.GITHUB_CLIENT_ID!,
        // clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        // callbackURL: `${process.env.BASE_URL || "http://localhost:3000"}/api/auth/github/callback`,
        clientID: "Ov23liODiGJbbMeXWRaM",  // Hardcoded GitHub Client ID
        clientSecret: "472c30257622734ece7487fad61e78d3b766cbd5",  // Hardcoded GitHub Client Secret
        callbackURL: "http://localhost:3000/api/auth/github/callback",  // Hardcoded callback URL
      },
      async (accessToken: string, refreshToken: string, profile: any, done: (error: Error | null, user?: any) => void) => {
        try {
          // Find or create user
          const user = await storage.findOrCreateOAuthUser({
            providerId: profile.id,
            provider: "github",
            email: profile.emails?.[0]?.value,
            username: profile.username || profile.displayName.toLowerCase().replace(/\s+/g, ''),
            displayName: profile.displayName,
            profilePicture: profile.photos?.[0]?.value
          });
          return done(null, user);
        } catch (error) {
          console.error("GitHub OAuth error:", error);
          return done(error as Error);
        }
      }
    )
  );

  // Google OAuth routes
  app.get(
    "/api/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  app.get(
    "/api/auth/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/auth?error=google-auth-failed",
    }),
    (req, res) => {
      if (req.user) {
        // Create a complete user object for token generation
        const user = req.user as any;
        const tokenData = {
          id: user.id,
          username: user.username,
          email: user.email,
          provider: user.provider,
          displayName: user.displayName,
          profilePicture: user.profilePicture,
          providerId: user.providerId,
          createdAt: user.createdAt || new Date(),
          updatedAt: user.updatedAt || null,
          password: null
        };
        
        // Generate JWT token
        const token = generateToken(tokenData);
        
        // Set the token as a cookie
        res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 7 * 24 * 60 * 60 * 1000 // 1 week
        });
      }
      res.redirect("/");
    }
  );

  // GitHub OAuth routes
  app.get(
    "/api/auth/github",
    passport.authenticate("github", { scope: ["user:email"] })
  );

  app.get(
    "/api/auth/github/callback",
    passport.authenticate("github", {
      failureRedirect: "/auth?error=github-auth-failed",
    }),
    (req, res) => {
      if (req.user) {
        // Create a complete user object for token generation
        const user = req.user as any;
        const tokenData = {
          id: user.id,
          username: user.username,
          email: user.email,
          provider: user.provider,
          displayName: user.displayName,
          profilePicture: user.profilePicture,
          providerId: user.providerId,
          createdAt: user.createdAt || new Date(),
          updatedAt: user.updatedAt || null,
          password: null
        };
        
        // Generate JWT token
        const token = generateToken(tokenData);
        
        // Set the token as a cookie
        res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 7 * 24 * 60 * 60 * 1000 // 1 week
        });
      }
      res.redirect("/");
    }
  );
}