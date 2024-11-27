import { Metadata } from "next";
import { fetchCustomers } from "~/lib/data";
import { DashboardHeader } from "~/components/dashboard-header";
import Form from "~/components/invoices/create-form";

export const metadata: Metadata = {
  title: "Create Invoice",
};

export default async function Page() {
  const customers = await fetchCustomers();

  return (
    <main>
      <DashboardHeader
        breadcrumbs={[
          { title: "Dashboard", href: "/dashboard" },
          { title: "Invoices", href: "/dashboard/invoices" },
          { title: "Create Invoice" },
        ]}
      />
      <div className="flex flex-1 flex-col gap-3 p-4 pt-0">
        <h1 className="font-heading text-2xl">Create Invoice</h1>
        <Form customers={customers} />
      </div>
    </main>
  );
}
