import Keycloak from "keycloak-js";

const url = process.env.NEXT_PUBLIC_KEYCLOAK_URL;
const realm = process.env.NEXT_PUBLIC_KEYCLOAK_REALM;
const clientId = process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID;

if (!url) {
  throw new Error("NEXT_PUBLIC_KEYCLOAK_URL is not configured. See .env.example.");
}
if (!realm) {
  throw new Error("NEXT_PUBLIC_KEYCLOAK_REALM is not configured. See .env.example.");
}
if (!clientId) {
  throw new Error("NEXT_PUBLIC_KEYCLOAK_CLIENT_ID is not configured. See .env.example.");
}

let instance: Keycloak | null = null;

export function getKeycloak(): Keycloak {
  if (typeof window === "undefined") {
    throw new Error("Keycloak is browser-only and cannot be accessed during SSR.");
  }
  if (instance) return instance;
  instance = new Keycloak({ url, realm, clientId });
  return instance;
}

export async function ensureFreshToken(minValiditySec = 30): Promise<string | undefined> {
  if (!instance?.authenticated) return undefined;
  await instance.updateToken(minValiditySec);
  return instance.token ?? undefined;
}
