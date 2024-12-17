import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import { SaleItem } from "./schema";

export async function fetchSales() {
  noStore();

  try {
    const { rows } = await sql<SaleItem>`
    SELECT 
        si.id AS sale_item_id,
        si.sale_id,
        s.payment_method,    -- Fetch payment method from the sales table
        si.item_id,
        iv.name AS item_name, -- Fetch item name from inventory_items table
        si.quantity,
        si.unit_price,
        si.total_price,
        s.created_at,
        s.created_by
    FROM 
        sale_items si
    JOIN 
        inventory iv ON si.item_id = iv.id -- Join condition
    JOIN
        sales s ON si.sale_id = s.id  -- Join to get payment method
    ORDER BY 
        created_at DESC;
    `;
    return rows;
  } catch (error) {
    console.error("Database Error:", error);
  }
}