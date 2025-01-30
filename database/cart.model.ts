import { model, models, Schema, Types } from "mongoose";

export interface ICart {
  user: Types.ObjectId;
  cartItems: Types.ObjectId[];
  totalPrice: number;
  createdAt: Date;
}

const CartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  cartItems: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Cart = models?.Cart || model<ICart>("Cart", CartSchema);

export default Cart;
