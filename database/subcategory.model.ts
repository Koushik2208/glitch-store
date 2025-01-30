import { model, models, Schema, Types } from "mongoose";

export interface ISubcategory {
  name: string;
  image: string;
  slug: string;
  category: Types.ObjectId;
  createdAt: Date;
}

const SubcategorySchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    image: { type: String, required: true },
    slug: { type: String, required: true },
    category: { type: Types.ObjectId, ref: "Category", required: true }, // Link to Category
  },
  { timestamps: true }
);

const Subcategory =
  models?.Subcategory || model<ISubcategory>("Subcategory", SubcategorySchema);

export default Subcategory;
