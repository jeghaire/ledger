"use server";

import { revalidatePath } from "next/cache";
import { ItemFormSchema } from "./schema";
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
    await sql`DELETE FROM inventory WHERE id = ${id}`;
    revalidatePath("/dashboard/inventory");
    // return { message: "Deleted Inventory." };
  } catch (error) {
    console.error(error);
    // return { message: "Database Error: Failed to Delete Inventory." };
  }
}
