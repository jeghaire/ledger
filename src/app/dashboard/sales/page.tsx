import { Metadata } from "next";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { fetchSales } from "./data/utils";
import { DashboardHeader } from "~/components/dashboard-header";

export const metadata: Metadata = {
  title: "Sales",
};

export default async function Page() {
  const data = (await fetchSales()) ?? [];

  return (
    <>
      <DashboardHeader
        breadcrumbs={[
          { title: "Dashboard", href: "/dashboard" },
          { title: "Sales" },
        ]}
      />
      <div className="flex flex-1 flex-col gap-3 p-4 pt-0">
        <h1 className="text-heading">Sales</h1>
        <DataTable data={data} columns={columns} />
      </div>
    </>
  );
}
