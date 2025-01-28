"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

import { cn } from "~/lib/utils";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import { Check, ChevronsUpDown, Trash } from "lucide-react";
import { ItemType } from "../../inventory/data/schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useFormState, useFormStatus } from "react-dom";
import React from "react";
import { createSales } from "../data/actions";
import { salesFormSchema, SalesFormValues } from "../data/schema";

// This can come from your database or API.
const defaultValues: Partial<SalesFormValues> = {};

export function SalesForm({ data }: { data: ItemType[] }) {
  const { pending } = useFormStatus();
  const initialState = { message: null, errors: {} };
  const [state, formAction] = useFormState(createSales, initialState);

  const form = useForm<SalesFormValues>({
    resolver: zodResolver(salesFormSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const { fields, append, remove } = useFieldArray({
    name: "items",
    control: form.control,
  });

  // Watch values for conditional rendering
  const items = form.watch("items") || [];
  const paymentMethod = form.watch("payment_method");

  function hasNonEmptyItems(arr: any[]) {
    return arr?.some(obj => 
      Object.keys(obj).includes('item') && obj.item !== ''
    );
  
  }

  console.log(hasNonEmptyItems(items))
  
  const showSubmitButton = hasNonEmptyItems(items);
  const isSubmitEnabled = hasNonEmptyItems(items) && paymentMethod;

  return (
    <Form {...form}>
      <form
        onSubmit={(evt) => {
          evt.preventDefault();
          form.handleSubmit((data) => {
            const updatedData = {
              ...data,
              items: data.items.map(item => ({
                ...item,
                quantity: item.quantity ?? 1,
              })),
            };
            formAction(updatedData);
          })(evt);
        }}
        className="space-y-8"
      >
        <div>
          {fields.map((field, index) => (
            <div key={field.id} className="mb-4 flex items-end space-x-2">
              <FormField
                control={form.control}
                name={`items.${index}.item`}
                render={({ field }) => (
                  <FormItem className="flex flex-1 flex-col">
                    <FormLabel>Item</FormLabel>
                    <FormMessage />
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-[300px] justify-between",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value
                              ? data.find(
                                  (item) => item.id.toString() === field.value,
                                )?.name
                              : "Select Item"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[300px] p-0">
                        <Command>
                          <CommandInput placeholder="Search item..." />
                          <CommandList>
                            <CommandEmpty>No item found.</CommandEmpty>
                            <CommandGroup>
                              {data.map((item) => (
                                <CommandItem
                                  key={item.id}
                                  onSelect={() => {
                                    form.setValue(
                                      `items.${index}.item`,
                                      item.id.toString(),
                                    );
                                    form.setValue(
                                      `items.${index}.price`,
                                      Number(item.sales_price),
                                    );
                                    form.setValue(`items.${index}.quantity`, "1");
                                  }}
                                >
                                  {item.name}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      item.name === field.value
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`items.${index}.quantity`}
                render={({ field }) => {
                  // Find the selected item's stock value
                  const selectedItem = data.find(
                    (item) =>
                      item.id.toString() ===
                      form.getValues(`items.${index}.item`),
                  );
                  const maxStock = selectedItem?.in_stock
                    ? selectedItem.in_stock
                    : 1; // Default to 1 if no item is selected

                  const isDisabled = !form.getValues(`items.${index}.item`);
                  return (
                    <FormItem className="w-[100px]">
                      <FormLabel>Quantity</FormLabel>
                      {/* <FormMessage /> */}
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Quantity"
                          {...field}
                          min={1}
                          max={maxStock} // Dynamically set max
                          step={1}
                          disabled={isDisabled}
                          onChange={(e) => {
                            if (e.target.value === "") {
                              field.onChange(e.target.value);
                            }else {
                              if(Number(e.target.value) < 1){
                                field.onChange("1");
                              }else{
                              field.onChange(Number(e.target.value) > maxStock ? maxStock.toString() : e.target.value);
                              }}
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name={`items.${index}.price`}
                render={({ field }) => (
                  <FormItem className="w-[100px]">
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input {...field} disabled readOnly />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => remove(index)}
              >
                <span className="sr-only">Delete</span>
                <Trash />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append({ item: "", quantity: 1, price: 0 })}
          >
            Add Item
          </Button>
        </div>
        {showSubmitButton && (
            <FormField
              control={form.control}
              name="payment_method"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="change_type">Category</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="POS">POS</SelectItem>
                        <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
                 )}
              {isSubmitEnabled && (
            <Button type="submit" aria-disabled={pending} disabled={!isSubmitEnabled}>
              {pending ? "Submitting..." : "Submit"}
            </Button>
        )}
      </form>
    </Form>
  );
}
