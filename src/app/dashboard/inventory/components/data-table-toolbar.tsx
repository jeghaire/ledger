import { Table } from "@tanstack/react-table";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";

import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { Plus, XIcon } from "lucide-react";
import Link from "next/link";
import { inventoryCategories } from "../data/schema";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        <Input
          placeholder="Filter items"
          value={table.getState().globalFilter ?? ""}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("Category") && (
          <DataTableFacetedFilter
            column={table.getColumn("Category")}
            title="Category"
            options={inventoryCategories}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <XIcon className="ml-2 h-4 w-4" />
          </Button>
        )}

        <div className="ml-auto flex gap-2">
          <Button
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
            asChild
          >
            <Link href="/dashboard/inventory/create">
              <span className="hidden md:block">Add Item</span>
              <Plus className="" />
            </Link>
          </Button>
          <div className="inline-block lg:hidden">
            <DataTableViewOptions table={table} />
          </div>
          <div className="hidden lg:flex">
            <DataTableViewOptions table={table} />
          </div>
        </div>
      </div>
    </div>
  );
}
