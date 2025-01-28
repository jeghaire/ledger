import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import { SaleItem, Summary } from "./schema";

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

// Sales Summary API
export async function getSalesSummary(startDate: string, endDate: string) {
  // const query = `
  // //   SELECT 
  // //       COUNT(*) AS total_sales,
  // //       SUM(total_price::numeric) AS total_revenue,
  // //       AVG(total_price::numeric) AS average_sale_value
  // //   FROM sale_items
  // //   WHERE created_at BETWEEN $1 AND $2;
  // // `;

  // const result = await sql(query, [startDate, endDate]);
  // return result.rows[0];
  try {
    const { rows } = await sql<Summary>`
      SELECT 
        COUNT(*) AS total_sales,
        SUM(sale_items.total_price::numeric) AS total_revenue,
        AVG(sale_items.total_price::numeric) AS average_sale_value
      FROM sale_items
      JOIN sales ON sales.id = sale_items.sale_id
      WHERE sales.created_at BETWEEN '2024-11-30' AND '2024-12-30';
    `;
    // const { rows } = await sql`
    // SELECT 
    //     COUNT(*) AS total_sales,
    //     SUM(total_price::numeric) AS total_revenue,
    //     AVG(total_price::numeric) AS average_sale_value
    // FROM sale_items
    // WHERE created_at BETWEEN $(startDate) AND $(endDate);
    // `;
    return rows[0];
  } catch (error) {
    console.error("Database Error:", error);
  }
}

// Top-Selling Items API
export async function getTopSellingItems(startDate: string, endDate: string) {
  // const query = `
  //   SELECT 
  //       item_name,
  //       SUM(quantity) AS total_quantity_sold,
  //       SUM(total_price::numeric) AS total_revenue_generated
  //   FROM sale_items
  //   WHERE created_at BETWEEN $1 AND $2
  //   GROUP BY item_name
  //   ORDER BY total_quantity_sold DESC
  //   LIMIT 10;
  // `;
  // const result = await sql(query, [startDate, endDate]);
  // return result.rows;
  try {
    const { rows } = await sql`
    SELECT 
      inventory.name,
      SUM(sale_items.quantity) AS total_quantity_sold,
      SUM(sale_items.total_price::numeric) AS total_revenue_generated
    FROM sale_items
    JOIN inventory ON sale_items.item_id = inventory.id
    JOIN sales ON sales.id = sale_items.id
    WHERE sales.created_at BETWEEN '2024-11-30' AND '2024-12-30'
    GROUP BY inventory.name
    ORDER BY total_quantity_sold DESC
    LIMIT 10;
    `;
    // try {
    //   const { rows } = await sql`
    //     SELECT 
    //       item_name,
    //       SUM(quantity) AS total_quantity_sold,
    //       SUM(total_price::numeric) AS total_revenue_generated
    //   FROM sale_items
    //   WHERE created_at BETWEEN  $(startDate) AND $(endDate)
    //   GROUP BY item_name
    //   ORDER BY total_quantity_sold DESC
    //   LIMIT 10;
    //   `;
    return rows;
  } catch (error) {
    console.error("Database Error:", error);
  }
}
