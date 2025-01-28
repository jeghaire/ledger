import { z, ZodTypeAny } from "zod";

export const zodInputStringPipe = (zodPipe: ZodTypeAny) =>
  z.string().transform((value) => (value === '' ? null : value)).nullable().refine((value) => value === null || !isNaN(Number(value)), { message: 'Invalid Number', }).transform((value) => (value === null ? 0 : Number(value))).pipe(zodPipe);

export const salesFormSchema = z.object({
  payment_method: z.string(),
  items: z.array(
    z.object({
      item: z.string().min(1, "Item name is required"),
      quantity: zodInputStringPipe(z.number().int().positive()),
      price: z.number(),
    }),
  ),
}).required();

export type SalesFormValues = z.infer<typeof salesFormSchema>;

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

export const summarySchema = z.object({
  total_sales: z.number(),
  total_revenue: z.string(),
  average_sale_value: z.string(),
});
export type Summary = z.infer<typeof summarySchema>;
