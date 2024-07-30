import mongoose, { Document, Schema } from "mongoose";

interface ISocialMediaCredentials {
  platform: string;
  userId: string;
  accessToken: string;
  refreshToken?: string;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  linkedEmail: string;
  emailVerified: boolean;
}

const PlatformSchema: Schema = new Schema({
  platform: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  linkedEmail: { type: String, required: true },
  emailVerified: { type: String },
  accessToken: { type: String, required: true },
  refreshToken: { type: String },
  expiresAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Platform = mongoose.model<ISocialMediaCredentials>(
  "Platform",
  PlatformSchema
);

export default Platform;
