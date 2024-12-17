"use server";

import { revalidatePath } from "next/cache";
import { ItemFormSchema, UpdateStockSchema } from "./schema";
import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";

export type FormState = {
  errors?: {
    name?: string[];
    cost_price?: string[];
    sales_price?: string[];
    in_stock?: string[];
    category?: string[];
  };
  message?: string | null;
};

export async function createInventory(
  prevState: FormState,
  data: FormData,
): Promise<FormState> {
  const formData = Object.fromEntries(data);
  const parsedData = ItemFormSchema.safeParse(formData);

  if (!parsedData.success) {
    return {
      errors: parsedData.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to add item to Inventory.",
    };
  }

  const { name, cost_price, sales_price, in_stock, category } =
    parsedData.data;

  // Do vaidation checks here
  if (in_stock < 5) {
    return {
      message: "Stock Quantity cannot be less that five",
    };
  }

  try {
    await sql`
      INSERT INTO inventory (name, cost_price, sales_price, in_stock, category, created_by, updated_by)
      VALUES (${name}, ${cost_price}, ${sales_price}, ${in_stock}, ${category}, 'jomavi@ledger.io', 'jomavi@ledger.io')
    `;
  } catch (error) {
    console.error(error);
    return { message: "Database Error: Failed to add item to Inventory." };
  }

  revalidatePath("/dashboard/inventory");
  redirect("/dashboard/inventory");
}

export async function updateInventory(
  id: string,
  prevState: FormState,
  data: FormData,
): Promise<FormState> {
  const formData = Object.fromEntries(data);
  const parsedData = ItemFormSchema.safeParse(formData);
  if (!parsedData.success) {
    return {
      errors: parsedData.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to update Inventory.",
    };
  }

  const { name, cost_price, sales_price, in_stock, category } =
    parsedData.data;
  // Do vaidation checks here
  if (in_stock < 5) {
    return {
      message: "Stock cannot be less that five",
    };
  }

  try {
    await sql`
      UPDATE inventory
      SET name = ${name}, cost_price = ${cost_price}, sales_price = ${sales_price}, in_stock = ${in_stock}, category = ${category}, updated_by = 'jomavi@ledger.io'
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error(error);
    return { message: "Database Error: Failed to update Inventory." };
  }

  revalidatePath("/dashboard/inventory");
  redirect("/dashboard/inventory");
}

export async function deleteItem(id: number): Promise<void> {
  try {
    console.log('deleting...')
    // await sql`DELETE FROM inventory WHERE id = ${id}`;
    await sql`UPDATE inventory SET status = FALSE WHERE id = ${id}`;
    await sql`
      INSERT INTO inventory_history (item_id, change_type, quantity_change, new_stock_level, changed_by)
      VALUES (${id}, 'deletion', 0, 0, 'jomavi@ledger.io');
    `;
    revalidatePath("/dashboard/inventory");
    // return { message: "Deleted Inventory." };
  } catch (error) {
    console.error(error);
    // return { message: "Database Error: Failed to Delete Inventory." };
  }
}

export type StockFormState = {
  errors?: {
    item_id?: string[];
    quantity_change?: string[];
    change_type?: string[];
  };
  message?: string | null;
};

export async function updateStockLevel(
  itemId: number,
  prevState: StockFormState,
  data: FormData,
): Promise<StockFormState> {
  const formData = Object.fromEntries(data);
  const parsedData = UpdateStockSchema.safeParse(formData);
  const { item_id, quantity_change, change_type } = UpdateStockSchema.parse(formData);

  if (!parsedData.success) {
    return {
      errors: parsedData.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to update Inventory.",
    };
  }

  // Fetch current stock level
  const { rows: itemRows } = await sql`SELECT in_stock FROM inventory WHERE id = ${item_id}`;
  if (itemRows.length === 0) throw new Error("Item not found.");

  const currentStock = itemRows[0].in_stock;
  const newStock = change_type === "addition"
    ? currentStock + quantity_change
    : currentStock - quantity_change;

  if (newStock < 0) throw new Error("Insufficient stock.");

  // Update inventory table
  await sql`UPDATE inventory SET in_stock = ${newStock} WHERE id = ${item_id}`;

  // Log to inventory_history
  await sql`
    INSERT INTO inventory_history (item_id, change_type, quantity_change, new_stock_level, changed_by)
    VALUES (${item_id}, ${change_type}, ${quantity_change}, ${newStock}, 'jomavi@ledger.io')
  `;

  revalidatePath("/dashboard/inventory");
  redirect("/dashboard/inventory");
}

export const formatCurrency = (amount: number) => {
  return Number(amount).toLocaleString("en-NG", {
    style: "currency",
    currency: "NGN",
  });
};
