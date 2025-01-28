// "use client";
// import { useEffect, useState } from "react";

function TopSellingItems({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) {
//   const [items, setItems] = useState<
//     {
//       item_name: string;
//       total_quantity_sold: number;
//       total_revenue_generated: string;
//     }[]
//   >([]);

//   useEffect(() => {
//     async function fetchItems() {
//       const response = await fetch(
//         `/api/reports/top-selling-items?start=${startDate}&end=${endDate}`,
//       );
//       const data = await response.json();
//       setItems(data);
//     }
//     fetchItems();
//   }, [startDate, endDate]);

//   if (items.length === 0) return <div>Loading...</div>;

  return (
    <div className="rounded bg-white p-4 shadow">
      <h2 className="text-lg font-bold">Top-Selling Items</h2>
      <ul>
        {/* {items.map((item) => (
          <li key={item.item_name}>
            {item.item_name}: {item.total_quantity_sold} units sold, ₦
            {item.total_revenue_generated} revenue
          </li>
        ))} */}
      </ul>
    </div>
  );
}

export default TopSellingItems;
