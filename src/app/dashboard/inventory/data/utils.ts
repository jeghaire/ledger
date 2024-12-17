import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import { ItemType, ItemFormType, UpdateStockSchema } from "./schema";

export async function fetchItems() {
  noStore();

  try {
    const { rows } = await sql<ItemType>`SELECT * FROM inventory WHERE status = TRUE ORDER BY updated_at DESC;`;
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
    WHERE inventory.id = ${id} AND inventory.status = TRUE;
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
    return null;
    throw new Error("Failed to fetch item by ID");
  }
}

export async function softDeleteItem(id: string) {
  try {
    await sql`UPDATE inventory SET status = FALSE WHERE id = ${id}`;
    await sql`
      INSERT INTO inventory_history (item_id, change_type, quantity_change, new_stock_level, changed_by)
      VALUES (${id}, 'deletion', 0, 0, 'jomavi@ledger.io');
    `;
    return { success: true };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to soft delete item.");
  }
}

export async function updateStockLevel(stockData: unknown) {
  const { item_id, quantity_change, change_type } = UpdateStockSchema.parse(stockData);

  // Fetch current stock level
  const { rows: itemRows } = await sql`SELECT in_stock FROM inventory WHERE id = ${item_id}`;
  if (itemRows.length === 0) throw new Error("Item not found.");
  if (!itemRows[0].status) throw new Error("Cannot update stock for inactive item.");

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

  return { item_id, newStock };
}

export const formatCurrency = (amount: number) => {
  return Number(amount).toLocaleString("en-NG", {
    style: "currency",
    currency: "NGN",
  });
};
