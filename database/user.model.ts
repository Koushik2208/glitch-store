import { model, models, Schema, Types } from "mongoose";

export interface IUser {
  name?: string;
  email?: string;
  mobile?: string;
  otp?: string;
  otpExpiry?: Date;
  googleId?: string;
  isAdmin?: boolean;
  addresses?: Types.ObjectId[];
  wishlist?: Types.ObjectId[];
  createdAt?: Date;
}

const UserSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    mobile: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      match: [/^[0-9]{10}$/, "Please enter a valid 10-digit mobile number"],
    },
    otp: {
      type: String,
    },
    otpExpiry: {
      type: Date,
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    addresses: {
      type: [Schema.Types.ObjectId],
      ref: "Address",
      default: [],
    },
    wishlist: {
      type: [Schema.Types.ObjectId],
      ref: "Wishlist",
      default: [],
    },
  },
  { timestamps: true }
);

// Indexes for performance
UserSchema.index({ email: 1 }, { unique: true, sparse: true });
UserSchema.index({ mobile: 1 }, { unique: true, sparse: true });
UserSchema.index({ googleId: 1 }, { unique: true, sparse: true });

const User = models?.User || model<IUser>("User", UserSchema);

export default User;
