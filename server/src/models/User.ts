import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  phone: string;
  email: string;
  passwordHash: string;
  status: "ACTIVE" | "SUSPENDED";
  createdAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    passwordHash: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["ACTIVE", "SUSPENDED"],
      default: "ACTIVE",
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<IUser>("User", userSchema);