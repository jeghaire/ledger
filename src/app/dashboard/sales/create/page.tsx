import { Metadata } from "next";
import { DashboardHeader } from "~/components/dashboard-header";
import { SalesForm } from "../components/sales-form";
import { fetchItems } from "../../inventory/data/utils";

export const metadata: Metadata = {
  title: "New Sales",
};

export default async function Page() {
  const data = (await fetchItems()) ?? [];

  return (
    <main>
      <DashboardHeader
        breadcrumbs={[
          { title: "Dashboard", href: "/dashboard" },
          { title: "Sales", href: "/dashboard/sales" },
          { title: "New Sales" },
        ]}
      />
      <div className="flex flex-1 flex-col gap-3 p-4 pt-0 md:max-w-xl">
        <h1 className="text-heading">New Sales</h1>
        <SalesForm data={data} />
      </div>
    </main>
  );
}
