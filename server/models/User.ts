import mongoose, { Schema, Document } from 'mongoose';

// Interface to define a user document
export interface IUser extends Document {
  username: string;
  email: string | null;
  password: string | null;
  displayName: string | null;
  profilePicture: string | null;
  provider: string | null;
  providerId: string | null;
  createdAt: Date;
  updatedAt: Date | null;
}

// Create the schema
const UserSchema: Schema = new Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true 
  },
  email: { 
    type: String, 
    sparse: true 
  },
  password: { 
    type: String 
  },
  displayName: { 
    type: String 
  },
  profilePicture: { 
    type: String 
  },
  provider: { 
    type: String 
  },
  providerId: { 
    type: String, 
    sparse: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date 
  }
});

// Create and export the model
export default mongoose.model<IUser>('User', UserSchema);