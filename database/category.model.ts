import { model, models, Schema } from "mongoose";

export interface ICategory {
  name: string;
  image: string;
  slug: string;
  createdAt: Date;
}

const CategorySchema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    slug: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Category =
  models?.Category || model<ICategory>("Category", CategorySchema);

export default Category;
