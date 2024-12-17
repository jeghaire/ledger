"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  inventoryCategories,
  ItemFormSchema,
  ItemFormType,
} from "../data/schema";
import { useFormState } from "react-dom";
import { updateInventory } from "../data/actions";
import React from "react";
import Link from "next/link";

export function EditItemForm({
  itemId,
  item,
}: {
  itemId: string;
  item: ItemFormType;
}) {
  const initialState = { message: null, errors: {} };
  const updateInventoryWithId = updateInventory.bind(null, itemId);
  const [state, formAction] = useFormState(updateInventoryWithId, initialState);
  const formRef = React.useRef<HTMLFormElement>(null);
  const form = useForm<ItemFormType>({
    resolver: zodResolver(ItemFormSchema),
    defaultValues: {
      name: item.name,
      cost_price: item.cost_price,
      sales_price: item.sales_price,
      in_stock: item.in_stock,
      category: item.category,
    },
    mode: "onChange",
  });

  return (
    <Form {...form}>
      <form
        ref={formRef}
        action={formAction}
        onSubmit={(evt) => {
          evt.preventDefault();
          form.handleSubmit(() => {
            formAction(new FormData(formRef.current!));
          })(evt);
        }}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select
                  {...field}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {inventoryCategories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sales_price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sales Price</FormLabel>
              <FormControl>
                <Input placeholder="" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cost_price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cost Price</FormLabel>
              <FormControl>
                <Input placeholder="" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="in_stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock Quantity</FormLabel>
              <FormControl>
                <Input placeholder="" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {state?.message && <FormMessage>{state.message}</FormMessage>}
        <div className="flex justify-end gap-2">
          <Button asChild variant="secondary">
            <Link href={`/dashboard/inventory`}>Cancel</Link>
          </Button>
          <Button type="submit">Edit Item</Button>
        </div>
      </form>
    </Form>
  );
}
