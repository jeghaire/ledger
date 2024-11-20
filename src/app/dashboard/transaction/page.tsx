import { Metadata } from "next";
import { DashboardHeader } from "~/components/dashboard-header";
import { TransactionForm } from "~/components/transaction-form";

export const metadata: Metadata = {
  title: "Transaction",
};

export default function TransactionPage() {
  return (
    <>
      <DashboardHeader
        breadcrumbs={[
          { title: "Dashboard", href: "/dashboard" },
          { title: "Transaction" },
        ]}
      />
      <div className="flex flex-1 flex-col gap-2 p-4 pt-0 md:max-w-lg">
        <h1 className="font-lusitana text-2xl">Add Transaction</h1>
        <TransactionForm />
      </div>
    </>
  );
}
