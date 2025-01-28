import { Metadata } from "next";
import { DashboardHeader } from "~/components/dashboard-header";
import ReportsDashboard from "../components/records-dashboard";

export const metadata: Metadata = {
  title: "Report",
};

export default async function Page() {
  return (
    <main>
      <DashboardHeader
        breadcrumbs={[
          { title: "Dashboard", href: "/dashboard" },
          { title: "Sales", href: "/dashboard/sales" },
          { title: "Report" },
        ]}
      />
      <div className="flex flex-1 flex-col gap-3 p-4 pt-0">
        <h1 className="text-heading">Reports</h1>
        <ReportsDashboard />
      </div>
    </main>
  );
}
