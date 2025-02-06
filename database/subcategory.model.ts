import { model, models, Schema, Types } from "mongoose";
import slugify from "slugify";

export interface ISubcategory {
  name: string;
  image: string;
  slug: string;
  category: Types.ObjectId;
  createdAt: Date;
}

export interface ISubcategoryDoc extends ISubcategory, Document {}

const SubcategorySchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    image: { type: String, required: true },
    slug: { type: String },
    category: { type: Types.ObjectId, ref: "Category", required: true }, // Link to Category
  },
  { timestamps: true }
);

SubcategorySchema.pre("save", async function (next) {
  if (this.isModified("name") || !this.slug) {
    const baseSlug = slugify(this.name, { lower: true, strict: true });
    let uniqueSlug = baseSlug;
    let counter = 1;

    // Check for existing slugs and modify if needed
    while (await models.Subcategory.exists({ slug: uniqueSlug })) {
      uniqueSlug = `${baseSlug}-${counter}`;
      counter++;
    }

    this.slug = uniqueSlug;
  }

  next();
});

const Subcategory =
  models?.Subcategory || model<ISubcategory>("Subcategory", SubcategorySchema);

export default Subcategory;
