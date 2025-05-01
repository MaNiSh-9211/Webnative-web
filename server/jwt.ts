import jwt from 'jsonwebtoken';
import { User } from '@shared/schema';

// JWT Secret - in production, use environment variable
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-webnative';
const JWT_EXPIRES_IN = '7d'; // 1 week

// Generate token for user
export function generateToken(user: User): string {
  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
    provider: user.provider,
    displayName: user.displayName,
  };
  
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

// Verify token and return payload
export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

// Middleware to check if user is authenticated
export function isAuthenticated(req: any, res: any, next: any) {
  // Get token from headers or cookies
  const token = req.headers.authorization?.split(' ')[1] || req.cookies?.token;
  
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - No token provided' });
  }
  
  // Verify token
  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: 'Unauthorized - Invalid token' });
  }
  
  // Attach user data to request
  req.user = decoded;
  next();
}

// Middleware to refresh token if it's about to expire
export function refreshToken(req: any, res: any, next: any) {
  const token = req.headers.authorization?.split(' ')[1] || req.cookies?.token;
  
  if (token) {
    try {
      const decoded: any = jwt.verify(token, JWT_SECRET);
      
      // Check if token is about to expire (less than 1 day remaining)
      const currentTime = Math.floor(Date.now() / 1000);
      const tokenExp = decoded.exp;
      
      if (tokenExp - currentTime < 86400) { // 24 hours in seconds
        // Generate a new token with minimal required fields
        const user = {
          id: decoded.id,
          username: decoded.username,
          email: decoded.email,
          provider: decoded.provider,
          displayName: decoded.displayName,
          createdAt: new Date(),
          // Add other required fields with null values
          password: null,
          profilePicture: null,
          providerId: null,
          updatedAt: null
        };
        
        const newToken = generateToken(user);
        
        // Set new token in response header
        res.setHeader('x-auth-token', newToken);
        
        // Also set as cookie if using cookies
        res.cookie('token', newToken, {
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
          secure: process.env.NODE_ENV === 'production',
        });
      }
    } catch (error) {
      // Token is invalid, but we don't block the request here
      // isAuthenticated middleware will handle that if needed
    }
  }
  
  next();
}