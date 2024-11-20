import Link from "next/link";
import { Button } from "~/components/ui/button";
import { APP_NAME } from "~/core/constants";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-3">
      <div className="flex h-20 shrink-0 items-end rounded-lg border border-black p-4 md:h-52">
        <div className="flex flex-row items-end gap-1">
          <p className="font-lusitana text-3xl leading-none tracking-tighter">
            {APP_NAME}
          </p>
        </div>
        <Button asChild variant={"link"} className="ml-auto h-6 underline">
          <Link href="/login">Login</Link>
        </Button>
      </div>
    </main>
  );
}
