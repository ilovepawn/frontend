"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const REDIRECT_DELAY_MS = 1500;

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/");
    }, REDIRECT_DELAY_MS);
    return () => {
      clearTimeout(timer);
    };
  }, [router]);

  return (
    <main className="flex flex-1 items-center justify-center px-6 py-16">
      <div className="flex w-full max-w-sm flex-col items-center gap-6 rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <Spinner />
        <div className="space-y-1">
          <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Signed in</h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Redirecting you to ilovepawn…</p>
        </div>
      </div>
    </main>
  );
}

function Spinner() {
  return (
    <svg
      aria-hidden="true"
      className="h-8 w-8 animate-spin text-zinc-400 dark:text-zinc-500"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Loading</title>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="4" />
      <path
        d="M22 12a10 10 0 0 1-10 10"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}
