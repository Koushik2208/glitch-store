import { z } from "zod";

export const CategorySchema = z.object({
  name: z
    .string()
    .min(1, { message: "Required." })
    .max(255, { message: "Category name cannot exceed 255 characters." })
    .trim(),
  image: z
    .string()
    .min(1, { message: "Required." })
    .url({ message: "Image must be a valid URL." }),
  slug: z.string().optional(),
  createdAt: z.date().optional(),
});

export const SubcategorySchema = z.object({
  name: z
    .string()
    .min(1, { message: "Required." })
    .max(100, "Subcategory name cannot exceed 100 characters")
    .trim(),
  image: z.string().url({ message: "Image must be a valid URL." }),
  category: z
    .string()
    .min(1, { message: "Category ID is required." })
    .regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid category ID format." }),
  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/, {
      message: "Slug can only contain lowercase letters, numbers, and hyphens.",
    })
    .optional(),
});
export const ProductSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Product name is required." })
    .max(255, { message: "Product name cannot exceed 255 characters." })
    .trim(),
  description: z
    .string()
    .min(1, { message: "Product description is required." }),
  slug: z.string().optional(),
  price: z
    .number({ message: "Required" })
    .positive({ message: "Price must be greater than zero." }),
  category: z.string().min(1, { message: "Category ID is required." }),
  subcategory: z.string().min(1, { message: "Subcategory ID is required." }),
  image: z.string().url({ message: "Image must be a valid URL." }),
  stock: z
    .number({ message: "Stock must be a number." })
    .int({ message: "Stock must be an integer." })
    .nonnegative({ message: "Stock cannot be negative." }),
  // reviews: z.number().int().nonnegative().optional().or(z.undefined()), // Uncomment if needed
  createdAt: z.date({ message: "Invalid date format." }).optional(),
});

export const PaginatedSearchParamsSchema = z.object({
  page: z.number().int().positive().default(1),
  pageSize: z.number().int().positive().default(10),
  query: z.string().optional(),
  filter: z.string().optional(),
  sort: z.string().optional(),
});
