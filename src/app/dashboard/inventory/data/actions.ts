"use server";

import { revalidatePath } from "next/cache";
import { ItemFormSchema } from "./schema";
import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";


export type FormState = {
  errors?: {
    name?: string[];
    cost_price?: string[];
    selling_price?: string[];
    in_stock?: string[];
    category?: string[];
  };
  message?: string | null;
};

export async function createInventory(
  prevState: FormState,
  data: FormData,
): Promise<FormState> {
  const formData = Object.fromEntries(data);
  const parsedData = ItemFormSchema.safeParse(formData);

  if (!parsedData.success) {
    return {
      errors: parsedData.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }

  const {
    name,
    cost_price,
    selling_price,
    in_stock,
    category,
  } = parsedData.data;
  if (in_stock < 5) {
    return {
      message: "Stock cannot be less that five",
    }
  }

  try {
    await sql`
      INSERT INTO inventory (name, cost_price, selling_price, in_stock, category, created_by, updated_by)
      VALUES (${name}, ${cost_price}, ${selling_price}, ${in_stock}, ${category}, 'jomavi@ledger.io', 'jomavi@ledger.io')
    `;
  } catch (error) {
    console.error(error);
    return { message: "Database Error: Failed to Create Invoice." };
  }

  revalidatePath("/dashboard/inventory");
  redirect("/dashboard/inventory");
}

export async function updateInventory(
  id: string,
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const validatedFields = ItemFormSchema.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Inventory",
    };
  }

  // const { customerId, amount, status } = validatedFields.data;
  // const amountInCents = amount * 100;

  // try {
  //   await sql`
  //     UPDATE items
  //     SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
  //     WHERE id = ${id}
  //   `;
  // } catch (error) {
  // console.error(error);
  //   return { message: "Database Error: Failed to Update Inventory." };
  // }

  revalidatePath("/dashboard/inventory");
  redirect("/dashboard/inventory");
}

export async function deleteInventory(id: string) {
  // throw new Error("Failed to Delete Invoice");

  try {
    await sql`DELETE FROM items WHERE id = ${id}`;
    revalidatePath("/dashboard/inventory");
    return { message: "Deleted Inventory." };
  } catch (error) {
    console.error(error);
    return { message: "Database Error: Failed to Delete Inventory." };
  }
}

// export async function onSubmitAction(
//   prevState: FormState,
//   data: FormData,
// ): Promise<FormState> {
//   "use server";
//   const formData = Object.fromEntries(data);
//   const parsed = NewItemSchema.safeParse(formData);

//   console.log(formData)

//   if (!parsed.success) {
//     console.log({
//       errors: parsed.error.flatten().fieldErrors,
//       message: "Invalid form data. Failed to Create personnel",
//     });
//     return {
//       errors: parsed.error.flatten().fieldErrors,
//       message: "Invalid form data",
//     };
//   }

//   if (parsed.data.stock_quantity < 1) {
//     console.log({ message: "Cannot add item with stock level less than 1" })
//     return {
//       message: "Invalid Stock count"
//     };
//   }

//   return { message: "Item added to inventory" };
// }