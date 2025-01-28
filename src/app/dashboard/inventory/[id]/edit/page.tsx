import { Metadata } from "next";
import { DashboardHeader } from "~/components/dashboard-header";
import { EditItemForm } from "../../components/edit-form";
import { notFound } from "next/navigation";
import { fetchItemById } from "../../data/utils";

export const metadata: Metadata = {
  title: "Edit Item",
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const item = await fetchItemById(id);

  if (!item) {
    notFound();
  }

  return (
    <main>
      <DashboardHeader
        breadcrumbs={[
          { title: "Dashboard", href: "/dashboard" },
          { title: "Inventory", href: "/dashboard/inventory" },
          { title: "Edit Item" },
        ]}
      />
      <div className="flex flex-1 flex-col gap-3 p-4 pt-0 md:max-w-lg">
        <h1 className="text-heading">Edit Item</h1>
        <EditItemForm item={item} itemId={id} />
      </div>
    </main>
  );
}
