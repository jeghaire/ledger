import { z } from "zod";

// export const SaleFormSchema1 = z.object({
//   sale_date: z.date().default(new Date()), // Defaults to the current date if not provided
//   total_amount: z
//     .number()
//     .positive("Total amount must be a positive number")
//     .min(0.01, "Total amount must be at least 0.01").optional(),
//   payment_method: z.enum(["cash", "POS", "bank_transfer"]).optional(),
//   items: z
//     .array(
//       z.object({
//         item_id: z.string().uuid(), // ID of the item being sold
//         quantity: z
//           .number()
//           .positive("Quantity must be a positive number")
//           .min(1, "At least one item must be sold"),
//         price: z.number().positive("Price must be a positive number"),
//       })
//     )
//     .min(1, "At least one item must be included in the sale"),
// }).optional();

export const salesFormSchema = z.object({
  payment_method: z.string(),
  items: z.array(
    z.object({
      item: z.string().min(1, "Item name is required"),
      quantity: z
        .number()
        .int()
        .min(1, "Quantity must be at least 1")
        .default(1),
      price: z.number(),
    }),
  ),
}).required();

export type salesFormValues = z.infer<typeof salesFormSchema>;

export const SaleItemSchema = z.object({
  sale_item_id: z.number(),
  sale_id: z.number(),
  payment_method: z.enum(['cash', 'POS', 'bank_transfer']),
  item_id: z.number(),
  item_name: z.string(),
  quantity: z.number(),
  unit_price: z.string(),
  total_price: z.string(),
  created_at: z.date(),
  created_by: z.string(),
});

export type SaleItem = z.infer<typeof SaleItemSchema>;
