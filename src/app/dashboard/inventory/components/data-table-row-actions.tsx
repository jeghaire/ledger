"use client";

import { Row } from "@tanstack/react-table";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { ItemSchema } from "../data/schema";
import Link from "next/link";
import { Ellipsis } from "lucide-react";
import React, { useState } from "react";
import { deleteItem } from "../data/actions";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const item = ItemSchema.parse(row.original);
  const [targetAction, setTargetAction] = useState<
    "delete" | "view" | "update" | null
  >(null);
  const deleteItemById = deleteItem.bind(null, item.id);

  return (
    <Dialog
      onOpenChange={(isOpen) => {
        if (!isOpen) setTargetAction(null); // Reset the action when modal closes
      }}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <Ellipsis className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[180px]">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() =>
              navigator.clipboard.writeText(`${item?.id?.toString()}`)
            }
          >
            Copy Item ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem onClick={() => setTargetAction("view")}>
              View
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogTrigger asChild>
            <DropdownMenuItem onClick={() => setTargetAction("update")}>
              Update Stock
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem asChild>
            <Link href={`/dashboard/inventory/${item.id}/edit`}>Edit</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem onClick={() => setTargetAction("delete")}>
              <span>Delete</span>
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {targetAction === "delete" && "Are you absolutely sure?"}
            {targetAction === "view" && "View Item Details"}
            {targetAction === "update" && "Update Stock"}
          </DialogTitle>
          <DialogDescription>
            {targetAction === "delete" && (
              <>
                This action cannot be undone. Are you sure you want to
                permanently delete this item from the inventory?
              </>
            )}
            {targetAction === "view" && (
              <>
                Viewing details for item ID: <strong>{item.name}</strong>.
              </>
            )}
            {targetAction === "update" && (
              <>
                Please enter the updated stock quantity for item:{" "}
                <strong>{item.name}</strong>.
              </>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className={targetAction === "delete" ? "flex" : "hidden"}>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <form action={deleteItemById}>
            <DialogClose asChild>
              <Button type="submit">Confirm</Button>
            </DialogClose>
          </form>
        </DialogFooter>
        {targetAction === "view" && (
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Close</Button>
            </DialogClose>
          </DialogFooter>
        )}
        {targetAction === "update" && (
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button>Submit</Button>
            </DialogClose>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
