import Keycloak from "keycloak-js";

let instance: Keycloak | null = null;

function readEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`${key} is not configured. See .env.example.`);
  }
  return value;
}

export function getKeycloak(): Keycloak {
  if (typeof window === "undefined") {
    throw new Error("Keycloak is browser-only and cannot be accessed during SSR.");
  }
  if (instance) return instance;
  instance = new Keycloak({
    url: readEnv("NEXT_PUBLIC_KEYCLOAK_URL"),
    realm: readEnv("NEXT_PUBLIC_KEYCLOAK_REALM"),
    clientId: readEnv("NEXT_PUBLIC_KEYCLOAK_CLIENT_ID"),
  });
  return instance;
}

export async function ensureFreshToken(minValiditySec = 30): Promise<string | undefined> {
  if (!instance?.authenticated) return undefined;
  await instance.updateToken(minValiditySec);
  return instance.token ?? undefined;
}
