#!/usr/bin/env node
/**
 * Pre-push guard: full TypeScript typecheck across the workspace.
 * Slower than the pre-commit Biome check, so it runs at push time only.
 */
import { execSync } from "node:child_process";

try {
  execSync("pnpm typecheck", { stdio: "inherit" });
} catch {
  console.error(
    "\n✗ TypeScript typecheck failed.\n" +
      "  Fix the type errors above before pushing. The remote will reject broken types in CI anyway.\n",
  );
  process.exit(1);
}
