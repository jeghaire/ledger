"use server";

import { revalidatePath } from "next/cache";
import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";

export type FormState = {
  errors?: {
    payment_method?: string[];
    item?: string[];
    sales_price?: string[];
    quantity?: string[];
    price?: string[];
  };
  message?: string | null;
};

export async function createSales(
  prevState: FormState,
  saleData: {
    payment_method: string;
    items: { item: string; quantity: number; price: number }[];
  }
): Promise<FormState> {

  if (saleData.items.length === 0) {
    return ({ message: 'You must add an item' })
  }

  if (saleData.items.some((item) => item.price === undefined)) {
    throw new Error("All items must have a valid price.");
  }

  const totalAmount = saleData.items.reduce((sum, item) => {
    return sum + item.quantity * item.price;
  }, 0);

  // Insert into the sales table
  const saleResult = await sql`
    INSERT INTO sales (total_amount, payment_method,created_by,updated_by)
    VALUES (${totalAmount}, ${saleData.payment_method},'jomavi@ledger.io','jomavi@ledger.io')
    RETURNING id;
  `;

  const saleId = saleResult.rows[0].id;

  // Insert into the sale_items table
  for (const item of saleData.items) {
    await sql`
      INSERT INTO sale_items (sale_id, item_id, quantity, unit_price)
      VALUES (${saleId}, ${item.item}, ${item.quantity}, ${item.price});
    `;

    const { rows: itemRows } = await sql`SELECT in_stock FROM inventory WHERE id = ${item.item}`;
    if (itemRows.length === 0) throw new Error("Item not found.");

    const currentStock = itemRows[0].in_stock;
    const newStock = currentStock - item.quantity;

    if (newStock < 0) throw new Error("Insufficient stock.");

    // Update inventory table
    await sql`UPDATE inventory SET in_stock = ${newStock} WHERE id = ${item.item}`;

    // Log to inventory_history
    await sql`
      INSERT INTO inventory_history (item_id, change_type, quantity_change, new_stock_level, changed_by)
      VALUES (${item.item}, 'deduction', ${item.quantity}, ${newStock}, 'jomavi@ledger.io')
    `;
  }

  revalidatePath("/dashboard/sales/view");
  redirect("/dashboard/sales");
}