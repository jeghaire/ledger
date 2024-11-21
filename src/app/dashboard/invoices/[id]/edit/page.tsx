import Form from "~/components/invoices/edit-form";
import { fetchCustomers, fetchInvoiceById } from "~/lib/data";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { DashboardHeader } from "~/components/dashboard-header";

export const metadata: Metadata = {
  title: "Edit Invoice",
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);

  if (!invoice) {
    notFound();
  }

  return (
    <>
      <DashboardHeader
        breadcrumbs={[
          { title: "Dashboard", href: "/dashboard" },
          { title: "Invoices", href: "/dashboard/invoices" },
          { title: "Edit Invoice" },
        ]}
      />
      <div className="flex flex-1 flex-col gap-3 p-4 pt-0">
        <h1 className="font-lusitana text-2xl">Edit Invoice</h1>
        <Form invoice={invoice} customers={customers} />
      </div>
    </>
  );
}
