import { z } from "zod";


export const inventoryCategories = [
  { label: "Wine", value: "Wine" },
  { label: "Beer", value: "Beer" },
  { label: "Spirit", value: "Spirit" },
  { label: "Soft Drink", value: "Soft Drink" },
  { label: "Other", value: "Other" },
];

// Extract the `value` fields and assert as a tuple
const categoryValues = inventoryCategories.map((category) => category.value) as [string, ...string[]];

export const ItemSchema = z.object({
  id: z.number().int().optional(),
  name: z.string().min(1),
  cost_price: z
    .coerce.number()
    .nonnegative({ message: "Cost price must be a non-negative number" }),
  selling_price: z
    .coerce.number()
    .positive({ message: "Selling price must be a positive number" }),
  in_stock: z.number().int().nonnegative().default(0),
  category: z
    .enum(categoryValues)
    .default("Other"),
  created_by: z.string().min(1),
  updated_by: z.string().min(1),
  created_at: z.date().default(() => new Date()),
  updated_at: z.date().default(() => new Date()),
});

// Create form schema by omitting `id`, `created_at`, and `updated_at`
export const ItemFormSchema = ItemSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
  created_by: true,
  updated_by: true,
});

// Infer TypeScript types
export type Item = z.infer<typeof ItemSchema>;
export type ItemFormValues = z.infer<typeof ItemFormSchema>;

export const UpdateStockSchema = z.object({
  id: z.number(),
  quantity_change: z.number(),
  change_type: z.enum(["addition", "deduction"]),
});