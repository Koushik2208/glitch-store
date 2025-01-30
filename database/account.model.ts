import { model, models, Schema, Types } from "mongoose";

export interface IAccount {
  user: Types.ObjectId;
  provider: "mobile-otp" | "google";
  mobile?: string;
  otp?: string;
  otpExpiry?: Date;
  googleId?: string;
  createdAt?: Date;
}

const AccountSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true, // Every account must be linked to a user
    },
    provider: {
      type: String,
      enum: ["mobile-otp", "google"], // Only allow these two providers
      required: true, // Provider is mandatory
    },
    mobile: {
      type: String,
      unique: true, // Ensure mobile numbers are unique
      sparse: true, // Only index accounts with a mobile number
      trim: true, // Remove unnecessary whitespace
      match: [/^[0-9]{10}$/, "Please enter a valid 10-digit mobile number"],
    },
    otp: {
      type: String, // Store OTP temporarily
    },
    otpExpiry: {
      type: Date, // Store OTP expiry time
    },
    googleId: {
      type: String,
      unique: true, // Ensure Google IDs are unique
      sparse: true, // Only index accounts with a Google ID
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Account = models?.Account || model<IAccount>("Account", AccountSchema);

export default Account;
