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
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: `${process.env.BASE_URL || "http://localhost:3000"}/api/auth/google/callback`,
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
        clientID: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        callbackURL: `${process.env.BASE_URL || "http://localhost:3000"}/api/auth/github/callback`,
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
        // Generate JWT token
        const token = generateToken(req.user);
        
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
        // Generate JWT token
        const token = generateToken(req.user);
        
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