import mongoose, { Document, Schema } from "mongoose";

export type ConversionStatus =
  | "DRAFT"
  | "REQUESTED"
  | "VERIFYING"
  | "VERIFIED"
  | "SUBMITTED"
  | "CARRIER_PROCESSING"
  | "ESIM_READY"
  | "INSTALLING"
  | "ACTIVATED"
  | "COMPLETED"
  | "VERIFICATION_FAILED"
  | "DEVICE_NOT_SUPPORTED"
  | "CARRIER_REJECTED"
  | "EXPIRED"
  | "ACTIVATION_FAILED"
  | "MANUAL_REVIEW"
  | "CANCELLED";

export interface IConversion extends Document {
  userId: mongoose.Types.ObjectId;
  carrier: string;
  phoneNumber: string;
  eid: string;
  fullName: string;
  verificationId: string;
  status: ConversionStatus;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

const conversionSchema = new Schema<IConversion>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    carrier: {
      type: String,
      required: true,
      enum: ["MTN", "Airtel", "Glo", "T2"],
    },

    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },

    eid: {
      type: String,
      required: true,
      trim: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    verificationId: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: [
        "DRAFT",
        "REQUESTED",
        "VERIFYING",
        "VERIFIED",
        "SUBMITTED",
        "CARRIER_PROCESSING",
        "ESIM_READY",
        "INSTALLING",
        "ACTIVATED",
        "COMPLETED",
        "VERIFICATION_FAILED",
        "DEVICE_NOT_SUPPORTED",
        "CARRIER_REJECTED",
        "EXPIRED",
        "ACTIVATION_FAILED",
        "MANUAL_REVIEW",
        "CANCELLED",
      ],
      default: "SUBMITTED",
    },

    completedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export const Conversion = mongoose.model<IConversion>(
  "Conversion",
  conversionSchema
);