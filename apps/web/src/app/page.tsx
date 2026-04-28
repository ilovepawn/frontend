import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <div className="max-w-xl space-y-6">
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
          ilovepawn
        </h1>
        <p className="text-base text-zinc-600 dark:text-zinc-400 sm:text-lg">
          Train tactics, study endgames, and review your games — all in one place.
        </p>
        <div className="flex justify-center pt-2">
          <Link
            href="/login"
            className="inline-flex h-11 items-center justify-center rounded-full bg-zinc-900 px-6 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Sign in to get started
          </Link>
        </div>
      </div>
    </main>
  );
}
