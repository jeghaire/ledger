import { Button } from "~/components/ui/button";
import { deleteItem } from "../data/actions";

export function DeleteItem({ id }: { id: string }) {
  const deleteItemById = deleteItem.bind(null, id);

  return (
    <form action={deleteItemById}>
      <Button variant="ghost" className="w-full justify-start p-2">
        <span>Delete Item</span>
      </Button>
    </form>
  );
}
