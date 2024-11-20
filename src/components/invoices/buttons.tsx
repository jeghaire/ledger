import { deleteInvoice } from "~/lib/actions";
import Link from "next/link";
import { Pen, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";

export function CreateInvoice() {
  return (
    <Button asChild>
      <Link href="/dashboard/invoices/create">
        <span className="hidden md:block">Create Invoice</span>
        <Plus className="" />
      </Link>
    </Button>
  );
}

export function UpdateInvoice({ id }: { id: string }) {
  return (
    <Button variant="outline" size="icon" asChild>
      <Link href={`/dashboard/invoices/${id}/edit`}>
        <Pen />
      </Link>
    </Button>
  );
}

export function DeleteInvoice({ id }: { id: string }) {
  // const deleteInvoiceWithId = deleteInvoice.bind(null, id);
  const handleDeleteInvoice = async (formData: FormData): Promise<void> => {
    const invoiceId = formData.get("id") as string;

    if (!invoiceId) {
      console.error("No invoice ID provided.");
      return;
    }

    const response = await deleteInvoice(invoiceId);
    console.log(response.message); // Log success or error message
  };

  return (
    // <form action={deleteInvoiceWithId}>
    <form action={handleDeleteInvoice}>
      <Button variant="outline" size="icon">
        <span className="sr-only">Delete</span>
        <Trash />
      </Button>
    </form>
  );
}
