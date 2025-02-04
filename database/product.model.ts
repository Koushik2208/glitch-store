import { model, models, Schema, Types } from "mongoose";
import slugify from "slugify";

export interface IProduct {
  name: string;
  description: string;
  slug: string;
  price: number;
  category: Types.ObjectId;
  subcategory: Types.ObjectId;
  image: string;
  stock: number;
  // reviews: number;
  createdAt: Date;
}

export interface IProductDoc extends IProduct, Document {}

const ProductSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true },
    slug: { type: String, required: true },
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

ProductSchema.pre("save", async function (next) {
  if (this.isModified("name")) {
    const baseSlug = slugify(this.name, { lower: true, strict: true });
    let uniqueSlug = baseSlug;
    let counter = 1;

    while (await models.Product.exists({ slug: uniqueSlug })) {
      uniqueSlug = `${baseSlug}-${counter}`;
      counter++;
    }

    this.slug = uniqueSlug;
  }

  next();
});

const Product = models?.Product || model<IProduct>("Product", ProductSchema);

export default Product;
