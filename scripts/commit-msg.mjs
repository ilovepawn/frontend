#!/usr/bin/env node
/**
 * commit-msg hook: enforce Claude attribution trailer on commits authored by Claude.
 *
 * Skips:
 *  - merge commits (their message comes from gh / GitHub's PR title)
 *  - revert commits
 *  - commits that already contain the trailer
 *
 * Otherwise requires the message to end with a "Co-Authored-By: Claude" trailer.
 */
import { readFileSync } from "node:fs";

const msgFile = process.argv[2];
if (!msgFile) process.exit(0);

const raw = readFileSync(msgFile, "utf-8");
const stripped = raw
  .split("\n")
  .filter((l) => !l.startsWith("#"))
  .join("\n")
  .trim();

const firstLine = stripped.split("\n", 1)[0] ?? "";
if (firstLine.startsWith("Merge ") || firstLine.startsWith("Revert ")) {
  process.exit(0);
}

if (/Co-Authored-By:\s*Claude\b/i.test(stripped)) {
  process.exit(0);
}

console.error(
  "\n✗ Commit message is missing the Claude attribution trailer.\n" +
    "  Add this as the last line of the message (separated from the body by a blank line):\n\n" +
    "    Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>\n\n" +
    "  Skip this check by starting the message with 'Merge ' or 'Revert '.\n",
);
process.exit(1);
