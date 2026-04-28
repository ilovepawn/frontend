import type { KeycloakTokenParsed } from "keycloak-js";
import { create } from "zustand";

export interface Me {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  role: string;
}

interface AuthState {
  authenticated: boolean;
  tokenParsed: KeycloakTokenParsed | null;
  me: Me | null;
  setAuth: (authenticated: boolean, tokenParsed: KeycloakTokenParsed | null) => void;
  setMe: (me: Me | null) => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  authenticated: false,
  tokenParsed: null,
  me: null,
  setAuth: (authenticated, tokenParsed) => {
    set({ authenticated, tokenParsed });
  },
  setMe: (me) => {
    set({ me });
  },
  reset: () => {
    set({ authenticated: false, tokenParsed: null, me: null });
  },
}));
