import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import { ItemType, ItemFormValues } from "./schema";

export async function getItems() {
  noStore();

  try {
    const data = await sql<ItemType>`SELECT * FROM inventory`;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
  }
}

export async function addToInventory({
  name,
  cost_price,
  selling_price,
  in_stock,
  category,
}: {
  name: string;
  cost_price: string;
  selling_price: string;
  in_stock: string;
  category: string;
}) {
  try {
    const data = await sql`
      INSERT INTO inventory (name, cost_price, selling_price, in_stock, category, created_by, updated_by)
      VALUES (${name}, ${cost_price}, ${selling_price}, ${in_stock}, ${category}, 'jomavi@ledger.io', 'jomavi@ledger.io')
    `;
  } catch (error) {
    console.error(error);
    return { message: "Database Error: Failed to Create Invoice." };
  }
}

export async function fetchItemById(id: string) {
  noStore();
  try {
    const data = await sql<ItemFormValues>`
      SELECT
        inventory.id,
        inventory.name,
        inventory.cost_price,
        inventory.selling_price,
        inventory.cost_price,
        inventory.in_stock,
        inventory.category
      FROM inventory
      WHERE inventory.id = ${id};
    `;
    return data.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
  }
}

export const formatCurrency = (amount: number) => {
  return Number(amount).toLocaleString("en-NG", {
    style: "currency",
    currency: "NGN",
  });
};
