import { z, ZodTypeAny } from "zod";

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

export const zodInputStringPipe = (zodPipe: ZodTypeAny) =>
  z.string().transform((value) => (value === '' ? null : value)).nullable().refine((value) => value === null || !isNaN(Number(value)), { message: 'Invalid Number', }).transform((value) => (value === null ? 0 : Number(value))).pipe(zodPipe);

export const ItemFormSchema = z.object({
  name: z.string().min(1, "Name is required.").trim(),
  category: z.string().min(1, "Category is required.").trim(),
  sales_price: zodInputStringPipe(z.number().positive('Sales Price must be greater than 0')),
  cost_price: zodInputStringPipe(z.number().positive('Cost Price must be greater than 0')),
  in_stock: zodInputStringPipe(z.number().nonnegative('Stock cannot be negative').int("Stock Quantity must be an integer.").min(1, "Stock Quantity must be at least 1.")),
}).required();

export const ItemSchema = z.object({
  id: z.number().int(),
  name: z.string().min(1, "Name is required.").trim(),
  category: z.enum(categoryValues),
  sales_price: zodInputStringPipe(z.number().positive('Sales Price must be greater than 0')),
  cost_price: zodInputStringPipe(z.number().positive('Cost Price must be greater than 0')),
  in_stock: z.number().nonnegative('Stock cannot be negative').int("Stock Quantity must be an integer."),//.min(1, "Stock Quantity must be at least 5."),
  created_by: z.string().optional(),
  updated_by: z.string().optional(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
});

// Infer TypeScript types
export type ItemType = z.infer<typeof ItemSchema>;
export type ItemFormType = z.infer<typeof ItemFormSchema>;

export const UpdateStockSchema = z.object({
  item_id: z.coerce.number(),
  quantity_change: z.coerce.number(),
  change_type: z.enum(["addition", "deduction"]),
});

// category: z.enum(categoryValues).default("Other"),
// z.number().or(z.literal(""))
// category: z.enum(categoryValues),
