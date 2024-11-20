import { Check, Clock } from "lucide-react";
import { cn } from "~/lib/utils";

export default function InvoiceStatus({ status }: { status: string }) {
  return (
    <span
      className={cn("inline-flex items-center rounded-full px-2 text-xs", {
        "bg-gray-100 text-gray-500": status === "pending",
        "bg-green-500 text-white": status === "paid",
      })}
    >
      {status === "pending" ? (
        <>
          Pending
          <Clock className="ml-1 w-4" />
        </>
      ) : null}
      {status === "paid" ? (
        <>
          Paid
          <Check className="ml-1 w-4" />
        </>
      ) : null}
    </span>
  );
}
