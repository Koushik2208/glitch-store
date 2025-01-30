import { model, models, Schema, Types } from "mongoose";

export interface IWishlist {
  user: Types.ObjectId;
  wishlistItems: Types.ObjectId[];
}

const WishlistSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  wishlistItems: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  ],
});

const Wishlist =
  models?.Wishlist || model<IWishlist>("Wishlist", WishlistSchema);

export default Wishlist;
