import { Metadata } from "next";
import { DashboardHeader } from "~/components/dashboard-header";
import { AddItemForm } from "../components/create-form";

export const metadata: Metadata = {
  title: "Add Item",
};

export default async function Page() {
  return (
    <main>
      <DashboardHeader
        breadcrumbs={[
          { title: "Dashboard", href: "/dashboard" },
          { title: "Inventory", href: "/dashboard/inventory" },
          { title: "Add Item" },
        ]}
      />
      <div className="flex flex-1 flex-col gap-3 p-4 pt-0 md:max-w-lg">
        <h1 className="font-heading text-2xl">Add Item</h1>
        <AddItemForm />
      </div>
    </main>
  );
}
