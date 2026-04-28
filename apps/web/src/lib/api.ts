import { ApiClient } from "@ilovepawn/api";
import { ensureFreshToken } from "./keycloak.ts";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
if (!baseUrl) {
  throw new Error("NEXT_PUBLIC_API_URL is not configured. See .env.example.");
}

export const api = new ApiClient({
  baseUrl,
  getAuthHeader: async () => {
    const token = await ensureFreshToken();
    return token ? `Bearer ${token}` : undefined;
  },
});
