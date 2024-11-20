import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import { Item } from "./schema";

export async function getItems() {
  noStore();

  try {
    const data = await sql<Item>`SELECT * FROM inventory`;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    return [];
    // throw new Error("Failed to fetch Items from Inventory");
  }
}

export const formatCurrency = (amount: number) => {
  return Number(amount).toLocaleString("en-NG", {
    style: "currency",
    currency: "NGN",
  });
};