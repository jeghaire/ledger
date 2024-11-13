import Link from "next/link";
import { APP_NAME } from "~/core/constants";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-3">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 p-4 md:h-52">
        <div className="flex flex-row items-end gap-1">
          <p className="font-lusitana text-3xl leading-none tracking-tighter text-white">
            {APP_NAME}
          </p>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-4 md:flex-row">
        <Link
          href="/login"
          className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 md:text-base"
        >
          <span>Log in</span>
        </Link>
      </div>
    </main>
  );
}
