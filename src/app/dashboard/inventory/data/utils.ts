import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import { ItemType, ItemFormType } from "./schema";

export async function getItems() {
  noStore();

  try {
    const { rows } = await sql<ItemType>`SELECT * FROM inventory ORDER BY updated_at DESC;`;
    return rows;
  } catch (error) {
    console.error("Database Error:", error);
  }
}

export async function addToInventory({
  name,
  cost_price,
  sales_price,
  in_stock,
  category,
}: {
  name: string;
  cost_price: string;
  sales_price: string;
  in_stock: string;
  category: string;
}) {
  try {
    await sql`
      INSERT INTO inventory (name, cost_price, sales_price, in_stock, category, created_by, updated_by)
      VALUES (${name}, ${cost_price}, ${sales_price}, ${in_stock}, ${category}, 'jomavi@ledger.io', 'jomavi@ledger.io')
    `;
  } catch (error) {
    console.error(error);
    return { message: "Database Error: Failed to Create Invoice." };
  }
}

export async function fetchItemById(id: string) {
  noStore();
  try {
    const { rows } = await sql<ItemFormType>`
      SELECT
        inventory.name,
        inventory.cost_price,
        inventory.sales_price,
        inventory.cost_price,
        inventory.in_stock,
        inventory.category
      FROM inventory
      WHERE inventory.id = ${id};
    `;

    // Transform `in_stock` to string
    if (rows[0]) {
      return {
        ...rows[0],
        in_stock: rows[0].in_stock.toString(),
      };
    }
    return null; // Handle case where no rows are returned
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch item by ID");
  }
}


export const formatCurrency = (amount: number) => {
  return Number(amount).toLocaleString("en-NG", {
    style: "currency",
    currency: "NGN",
  });
};
