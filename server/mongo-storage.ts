import { InsertUser, User, UpsertUser } from "@shared/schema";
import UserModel, { IUser } from './models/User';

// Interface for MongoDB storage operations
interface IMongoStorage {
  createUser(user: Partial<InsertUser>): Promise<User>;
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByProviderId(providerId: string, provider: string): Promise<User | undefined>;
  findOrCreateOAuthUser(userData: OAuthUserData): Promise<User>;
  upsertUser(user: UpsertUser): Promise<User>;
}

// Define the OAuth user data interface
interface OAuthUserData {
  providerId: string;
  provider: string;
  email?: string;
  username: string;
  displayName?: string;
  profilePicture?: string;
}

class MongoDBStorage implements IMongoStorage {
  // Convert MongoDB user to our User type
  private convertMongoUser(user: IUser): User {
    return {
      id: parseInt(user._id?.toString().substring(0, 8) || '0', 16), // Generate a numeric ID from ObjectId
      username: user.username,
      email: user.email,
      password: user.password,
      displayName: user.displayName,
      profilePicture: user.profilePicture,
      provider: user.provider,
      providerId: user.providerId,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }

  async createUser(userData: InsertUser): Promise<User> {
    try {
      const newUser = new UserModel(userData);
      const savedUser = await newUser.save();
      return this.convertMongoUser(savedUser);
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  async getUser(id: number): Promise<User | undefined> {
    try {
      // Since we're using a numeric ID for the app but MongoDB uses ObjectId,
      // we need to find the user by a different approach
      // This approach isn't ideal for production but works for our demo
      const allUsers = await UserModel.find();
      const user = allUsers.find(user => {
        const userId = user._id?.toString();
        if (!userId) return false;
        
        // Generate a numeric ID from the first 8 chars of the ObjectId
        const numericId = parseInt(userId.substring(0, 8), 16);
        return numericId === id;
      });
      
      if (!user) return undefined;
      return this.convertMongoUser(user);
    } catch (error) {
      console.error("Error getting user:", error);
      return undefined;
    }
  }

  async getUserByProviderId(providerId: string, provider: string): Promise<User | undefined> {
    try {
      const user = await UserModel.findOne({ providerId, provider });
      if (!user) return undefined;
      return this.convertMongoUser(user);
    } catch (error) {
      console.error("Error getting user by provider ID:", error);
      return undefined;
    }
  }

  async findOrCreateOAuthUser(userData: OAuthUserData): Promise<User> {
    try {
      // First try to find user by provider ID
      let user = await this.getUserByProviderId(userData.providerId, userData.provider);
      
      // If not found, try by email if provided
      if (!user && userData.email) {
        user = await this.getUserByEmail(userData.email);
      }
      
      // If user exists, update provider info
      if (user) {
        const updatedUser = await UserModel.findOneAndUpdate(
          { username: user.username },
          {
            provider: userData.provider,
            providerId: userData.providerId,
            displayName: userData.displayName || user.displayName,
            profilePicture: userData.profilePicture || user.profilePicture,
            updatedAt: new Date()
          },
          { new: true }
        );
        
        if (!updatedUser) throw new Error("Failed to update user");
        return this.convertMongoUser(updatedUser);
      }
      
      // Create new user if not found
      const username = await this.generateUniqueUsername(userData.username);
      
      const newUser = new UserModel({
        username,
        email: userData.email,
        displayName: userData.displayName,
        profilePicture: userData.profilePicture,
        provider: userData.provider,
        providerId: userData.providerId,
        createdAt: new Date()
      });
      
      const savedUser = await newUser.save();
      return this.convertMongoUser(savedUser);
    } catch (error) {
      console.error("Error finding or creating OAuth user:", error);
      throw error;
    }
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    try {
      const filter = { username: userData.username };
      const update = {
        ...userData,
        updatedAt: new Date()
      };
      
      const options = { 
        new: true, 
        upsert: true, 
        setDefaultsOnInsert: true 
      };
      
      const updatedUser = await UserModel.findOneAndUpdate(filter, update, options);
      if (!updatedUser) throw new Error("Failed to upsert user");
      
      return this.convertMongoUser(updatedUser);
    } catch (error) {
      console.error("Error upserting user:", error);
      throw error;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const user = await UserModel.findOne({ username });
      if (!user) return undefined;
      return this.convertMongoUser(user);
    } catch (error) {
      console.error("Error getting user by username:", error);
      return undefined;
    }
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    if (!email) return undefined;
    
    try {
      const user = await UserModel.findOne({ email });
      if (!user) return undefined;
      return this.convertMongoUser(user);
    } catch (error) {
      console.error("Error getting user by email:", error);
      return undefined;
    }
  }

  // Helper method to generate a unique username
  private async generateUniqueUsername(baseUsername: string): Promise<string> {
    // Remove spaces and special characters
    let username = baseUsername.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Check if username exists
    let user = await UserModel.findOne({ username });
    let counter = 1;
    
    // If username exists, append a number
    while (user) {
      username = `${baseUsername.toLowerCase().replace(/[^a-z0-9]/g, '')}${counter}`;
      user = await UserModel.findOne({ username });
      counter++;
    }
    
    return username;
  }
}

// Create and export the MongoDB storage instance
export const mongoStorage = new MongoDBStorage();