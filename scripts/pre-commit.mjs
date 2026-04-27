#!/usr/bin/env node
/**
 * Pre-commit guard:
 *  1. Block direct commits to `main` (per branching policy: main is deploy-only)
 *  2. Run `pnpm check` (Biome lint + format) and abort if it fails
 *
 * Kept fast: typecheck runs in pre-push, not here.
 */
import { execSync } from "node:child_process";

const branch = execSync("git branch --show-current", { encoding: "utf-8" }).trim();
if (branch === "main") {
  console.error(
    "\n✗ Direct commits to 'main' are forbidden by repo policy.\n" +
      "  main is the deploy branch. Branch off 'dev' (use feat/* or fix/*) and PR back into 'dev'.\n",
  );
  process.exit(1);
}

try {
  execSync("pnpm check", { stdio: "inherit" });
} catch {
  console.error(
    "\n✗ Biome check failed.\n" +
      "  Run 'pnpm format' to auto-fix what's auto-fixable, then re-stage and re-commit.\n",
  );
  process.exit(1);
}
