import type { Metadata } from "next";
import Link from "next/link";
import { LoginButton } from "@/components/auth/login-button.tsx";

export const metadata: Metadata = {
  title: "Sign in — ilovepawn",
};

export default function LoginPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm space-y-8 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Sign in to ilovepawn
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Continue with your Google account.
          </p>
        </div>

        <LoginButton />

        <p className="text-center text-xs text-zinc-500 dark:text-zinc-500">
          By continuing, you agree to ilovepawn's terms of service.
        </p>

        <div className="text-center">
          <Link
            href="/"
            className="text-xs text-zinc-500 underline-offset-4 hover:underline dark:text-zinc-400"
          >
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
