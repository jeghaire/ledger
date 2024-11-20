import { Metadata } from "next";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { getItems } from "./data/utils";
import { DashboardHeader } from "~/components/dashboard-header";

export const metadata: Metadata = {
  title: "Inventory",
  description: "Inventory view page",
};

export default async function PersonnelPage() {
  const items = await getItems();

  return (
    <>
      <DashboardHeader
        breadcrumbs={[
          { title: "Dashboard", href: "/dashboard" },
          { title: "Inventory" },
        ]}
      />
      <div className="flex flex-1 flex-col gap-3 p-4 pt-0">
        <h1 className="font-lusitana text-2xl">Inventory</h1>
        <DataTable data={items} columns={columns} />
      </div>
    </>
  );
}
