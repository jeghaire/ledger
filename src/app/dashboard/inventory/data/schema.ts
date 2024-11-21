import { z } from "zod";

export const inventoryCategories = [
  { label: "Wine", value: "Wine" },
  { label: "Beer", value: "Beer" },
  { label: "Spirit", value: "Spirit" },
  { label: "Soft Drink", value: "Soft Drink" },
  { label: "Other", value: "Other" },
];

// Extract the `value` fields and assert as a tuple
const categoryValues = inventoryCategories.map(
  (category) => category.value,
) as [string, ...string[]];

export const ItemSchema = z.object({
  id: z.number().int(),
  name: z.string().min(1, {
    message: "Name is required.",
  }),
  cost_price: z.coerce
    .number()
    .nonnegative({ message: "Cost price must be a non-negative number" }),
  selling_price: z.coerce
    .number()
    .positive({ message: "Selling price must not be less that zero" }),
  in_stock: z.coerce
    .number({ required_error: "Age is required." })
    .refine((value) => !isNaN(value), {
      message: "Age must be a valid number.",
    })
    .default(0),
  category: z.enum(categoryValues).default("Other"),
  created_by: z.string().min(1),
  updated_by: z.string().min(1),
  created_at: z.date().default(() => new Date()),
  updated_at: z.date().default(() => new Date()),
});

// Create form schema by omitting `id`, `created_at`, and `updated_at`
export const itemFormSchema = ItemSchema.omit({
  created_at: true,
  updated_at: true,
  created_by: true,
  updated_by: true,
});

export const newItemSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required.",
  }),
  cost_price: z.coerce
    .number()
    .nonnegative({ message: "Cost price must be a non-negative number" }),
  selling_price: z.coerce
    .number()
    .positive({ message: "Selling price must not be less that zero" }),
  in_stock: z.coerce.number().int().nonnegative(),
  category: z.enum(categoryValues),
});

// Infer TypeScript types
export type ItemType = z.infer<typeof ItemSchema>;
export type ItemFormValues = z.infer<typeof itemFormSchema>;
export type NewItemType = z.infer<typeof newItemSchema>;

export const UpdateStockSchema = z.object({
  id: z.number(),
  quantity_change: z.number(),
  change_type: z.enum(["addition", "deduction"]),
});
