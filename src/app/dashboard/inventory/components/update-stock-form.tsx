import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useFormState } from "react-dom";
import { updateStockLevel } from "../data/actions";
import { DialogClose, DialogFooter } from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";

// Schema Definition
export const UpdateStockSchema = z.object({
  item_id: z.number(),
  quantity_change: z.number().int(),
  change_type: z.enum(["addition", "deduction"]),
});

type UpdateStockFormType = z.infer<typeof UpdateStockSchema>;

interface UpdateStockFormProps {
  itemId: number; // Prop for the item's ID
}

// Form Component
export function UpdateStockForm({ itemId }: UpdateStockFormProps) {
  const initialState = { message: null, errors: {} };
  const updateStockLevelWithId = updateStockLevel.bind(null, itemId);
  const [state, formAction] = useFormState(
    updateStockLevelWithId,
    initialState,
  );

  const form = useForm<UpdateStockFormType>({
    resolver: zodResolver(UpdateStockSchema),
    defaultValues: {
      item_id: itemId, // Set the default value of `id` to the passed `itemID` prop
    },
    mode: "onChange",
  });

  return (
    <Form {...form}>
      <form action={formAction} className="space-y-4">
        {/* ID Field */}
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

        {/* Quantity Change Field */}
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
                  onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Change Type Field */}
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

        {/* Action Buttons */}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="submit">Submit</Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </Form>
  );
}
