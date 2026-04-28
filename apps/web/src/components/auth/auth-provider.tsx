"use client";

import { type ReactNode, useEffect, useState } from "react";
import { api } from "@/lib/api.ts";
import { getKeycloak } from "@/lib/keycloak.ts";
import { type Me, useAuthStore } from "@/stores/auth.ts";

let initStarted = false;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (initStarted) {
      setReady(true);
      return;
    }
    initStarted = true;

    const kc = getKeycloak();

    kc.onTokenExpired = () => {
      void kc.updateToken(60);
    };
    kc.onAuthRefreshSuccess = () => {
      useAuthStore.getState().setAuth(true, kc.tokenParsed ?? null);
    };
    kc.onAuthLogout = () => {
      useAuthStore.getState().reset();
    };

    kc.init({
      onLoad: "check-sso",
      silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
      pkceMethod: "S256",
    })
      .then(async (authenticated) => {
        useAuthStore.getState().setAuth(authenticated, kc.tokenParsed ?? null);
        if (authenticated) {
          const me = await api.get<Me>("/api/users/me");
          useAuthStore.getState().setMe(me);
        }
      })
      .catch(() => {
        useAuthStore.getState().reset();
      })
      .finally(() => {
        setReady(true);
      });
  }, []);

  if (!ready) return <BootSplash />;
  return <>{children}</>;
}

function BootSplash() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-16">
      <svg
        aria-hidden="true"
        className="h-8 w-8 animate-spin text-zinc-400 dark:text-zinc-500"
        viewBox="0 0 24 24"
        fill="none"
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
    </main>
  );
}
