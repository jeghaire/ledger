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
import { createInventory } from "../data/actions";
import React from "react";
import Link from "next/link";
import { SubmitButton } from "~/components/submit-button";

export function AddItemForm() {
  const initialState = { message: null, errors: {} };
  const [state, formAction] = useFormState(createInventory, initialState);
  const formRef = React.useRef<HTMLFormElement>(null);

  const form = useForm<ItemFormType>({
    resolver: zodResolver(ItemFormSchema),
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
        {state.message && <FormMessage>{state.message}</FormMessage>}
        <div className="flex justify-end gap-2">
          <Button asChild variant="secondary">
            <Link href={`/dashboard/inventory`}>Cancel</Link>
          </Button>
          <SubmitButton>Add Item</SubmitButton>
        </div>
      </form>
    </Form>
  );
}
