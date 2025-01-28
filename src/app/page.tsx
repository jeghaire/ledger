import Link from "next/link";
import { APP_NAME } from "~/core/constants";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-3">
      <div className="flex h-20 shrink-0 items-end justify-between rounded-lg border p-4 md:h-52">
        <div className="flex flex-row items-end gap-1">
          <p className="font-heading text-3xl leading-none tracking-tighter">
            {APP_NAME}
          </p>
        </div>
        <Link
          href="/dashboard/inventory"
          className="underline hover:underline-offset-2"
        >
          Login
        </Link>
      </div>
    </main>
  );
}
