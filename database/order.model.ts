import { model, models, Schema, Types } from "mongoose";

export interface IOrder {
  user: Types.ObjectId;
  orderItems: {
    productId: Types.ObjectId;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  totalPrice: number;
  isPaid: boolean;
  status: string;
  createdAt: Date;
}

const OrderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: { type: String, required: true }, // Snapshot of product name
        price: { type: Number, required: true }, // Snapshot of product price
        quantity: { type: Number, required: true, default: 1 },
        image: { type: String, required: true }, // Snapshot of product image
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    isPaid: {
      type: Boolean,
      required: true,
    },
    status: {
      type: String,
      enum: ["Placed", "Accepted", "Shipped", "Delivered", "Cancelled"],
      required: true,
      default: "Placed",
    },
  },
  { timestamps: true }
);

const Order = models?.Order || model<IOrder>("Order", OrderSchema);

export default Order;
