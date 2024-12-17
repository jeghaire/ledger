import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-2 text-center">
      <h1 className="font-heading text-2xl">
        We must have left that out of our books!
      </h1>
      <p>Not to worry though, that that doesn&apos;t happen often with us</p>
      <Link
        href="/dashboard"
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
      >
        Get Back to the Books
      </Link>
    </main>
  );
}
