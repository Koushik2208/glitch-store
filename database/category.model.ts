import { model, models, Schema } from "mongoose";
import slugify from "slugify";

export interface ICategory {
  name: string;
  image: string;
  slug: string;
  createdAt: Date;
}

export interface ICategoryDoc extends ICategory, Document {}

const CategorySchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    image: { type: String, required: true },
    slug: { type: String }, // Removed required: true
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Ensure slugs are unique
CategorySchema.index({ slug: 1 }, { unique: true });

CategorySchema.pre("save", async function (next) {
  if (this.isModified("name") || !this.slug) {
    const baseSlug = slugify(this.name, { lower: true, strict: true });
    let uniqueSlug = baseSlug;
    let counter = 1;

    // Check for existing slugs and modify if needed
    while (await models.Category.exists({ slug: uniqueSlug })) {
      uniqueSlug = `${baseSlug}-${counter}`;
      counter++;
    }

    this.slug = uniqueSlug;
  }

  next();
});

const Category =
  models?.Category || model<ICategory>("Category", CategorySchema);

export default Category;
