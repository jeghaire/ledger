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

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "~/components/ui/form";
// import { Input } from "~/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "~/components/ui/select";
import { useFormState } from "react-dom";
import { updateStockLevel } from "../data/actions";
// import { EditItemForm } from "./edit-form";
import { UpdateStockForm } from "./update-stock-form";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

// Schema Definition
export const UpdateStockSchema = z.object({
  item_id: z.number(),
  quantity_change: z.number().int(),
  change_type: z.enum(["addition", "deduction"]),
});

type UpdateStockFormType = z.infer<typeof UpdateStockSchema>;

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const item = ItemSchema.parse(row.original);
  const [targetAction, setTargetAction] = useState<
    "delete" | "view" | "update" | "edit" | null
  >(null);
  const deleteItemById = deleteItem.bind(null, item.id);

  const initialState = { message: null, errors: {} };
  const updateStockLevelWithId = updateStockLevel.bind(null, item.id);
  const [state, formAction] = useFormState(
    updateStockLevelWithId,
    initialState,
  );

  const form = useForm<UpdateStockFormType>({
    resolver: zodResolver(UpdateStockSchema),
    defaultValues: {
      item_id: item.id, // Set the default value of `id` to the passed `itemID` prop
    },
    mode: "onChange",
  });

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
            {targetAction === "edit" && "Are you absolutely sure?"}
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
        {targetAction === "view" && (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 items-center gap-4">
              <span className="font-semibold">Price:</span>
              <span>{item.sales_price}</span>
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <span className="font-semibold">Cost:</span>
              <span>{item.cost_price}</span>
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <span className="font-semibold">Quantity:</span>
              <span>{item.in_stock}</span>
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <span className="font-semibold">Category:</span>
              <span>{item.category}</span>
            </div>
          </div>
        )}
        {/* {targetAction === "update" && (
          <EditItemForm item={item} itemId={item.id.toString()} />
        )} */}
        {targetAction === "update" && <UpdateStockForm itemId={item.id} />}

        {/* <Form {...form}>
          <form
            action={formAction}
            className={
              targetAction === "update" ? "flex flex-col space-y-4" : "hidden"
            }
          >
            <FormField
              control={form.control}
              name="item_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ID</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      readOnly
                      className="cursor-not-allowed bg-border focus-visible:ring-0"
                      aria-readonly
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity_change"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity Change</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="Enter quantity"
                      value={field.value || ""}
                      onChange={(e) =>
                        field.onChange(Number(e.target.value) || 0)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="change_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Change Type</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      defaultValue={field.value}
                      {...field}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="addition">Addition</SelectItem>
                        <SelectItem value="deduction">Deduction</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit">Submit</Button>
            </DialogClose>
          </form>
        </Form> */}

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
        {/* {targetAction === "update" && (
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit">Submit</Button>
            </DialogClose>
          </DialogFooter>
        )} */}
      </DialogContent>
    </Dialog>
  );
}
