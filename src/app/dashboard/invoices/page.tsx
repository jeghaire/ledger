import InvoicesTable from "~/components/invoices/table";
import { CreateInvoice } from "~/components/invoices/buttons";
import { InvoicesTableSkeleton } from "~/components/skeletons";
import { Suspense } from "react";
import { fetchFilteredInvoices, fetchInvoicesPages } from "~/lib/data";
import { Metadata } from "next";
import { DashboardHeader } from "~/components/dashboard-header";
import Search from "~/components/search";
import Pagination from "~/components/invoices/pagination";

export const metadata: Metadata = {
  title: "Invoices",
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchInvoicesPages(query);
  const invoices = await fetchFilteredInvoices(query, currentPage);

  return (
    <>
      <DashboardHeader
        breadcrumbs={[
          { title: "Dashboard", href: "/dashboard" },
          { title: "Invoices" },
        ]}
      />
      <div className="flex flex-1 flex-col gap-3 p-4 pt-0">
        <h1 className="font-lusitana text-2xl">Invoices</h1>
        <div className="flex max-w-lg items-center justify-between gap-2">
          <Search placeholder="Search invoices" />
          <CreateInvoice />
        </div>
        <Suspense
          key={query + currentPage}
          fallback={<InvoicesTableSkeleton />}
        >
          <InvoicesTable
            query={query}
            currentPage={currentPage}
            invoices={invoices}
          />
        </Suspense>
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </>
  );
}
