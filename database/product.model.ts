import { model, models, Schema, Types } from "mongoose";

export interface IProduct {
  name: string;
  description: string;
  price: number;
  category: Types.ObjectId;
  subcategory: Types.ObjectId;
  image: string;
  stock: number;
  // reviews: number;
  createdAt: Date;
}

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    subcategory: {
      type: Schema.Types.ObjectId,
      ref: "Subcategory",
      required: true,
    },
    image: { type: String, required: true },
    stock: { type: Number, required: true },
    // reviews: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const Product = models?.Product || model<IProduct>("Product", ProductSchema);

export default Product;
