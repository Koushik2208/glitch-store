import { model, models, Schema, Types } from "mongoose";

export interface IAddress {
  user: Types.ObjectId;
  street: string;
  landmark?: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  createdAt: Date;
}

const AddressSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    street: { type: String, required: true },
    landmark: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    pincode: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Address = models?.Address || model<IAddress>("Address", AddressSchema);

export default Address;
