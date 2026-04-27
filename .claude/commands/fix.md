---
description: Start a fix branch off dev for a specific bug
argument-hint: <kebab-name> [bug description]
---

Start a bug fix. Argument: `$ARGUMENTS` — first token is the branch suffix (kebab-case), the rest is the bug description.

1. **Reproduce or restate.** Don't fix what you can't reproduce or verify. If the bug isn't reproducible from the description and code alone, ask the user for steps or a failing input.
2. **Find root cause.** Read the failing code path. Don't bandaid — if the symptom is "X breaks", understand *why* X broke before patching.
3. **Branch.** Same preconditions as `/feat`: clean tree, branched from latest `dev`. `git checkout -b fix/<kebab-name>`.
4. **Minimal fix.** Change as little as possible. Bug fix commits are not refactor opportunities.
5. **Regression test.** If the fix lends itself to a test (logic bug, data transformation, parser, etc.), add one. Skip tests for purely visual fixes that wouldn't have a sensible assertion.
6. **Verify.** `pnpm typecheck && pnpm check`. Re-run the original repro to confirm the bug is gone.
7. **Commit.** Conventional Commits — `fix:` prefix. Reference the original cause in the body if non-obvious.
8. **`/ship`** when done.

Anti-patterns to avoid:
- "Defensive" changes outside the bug's scope
- Adding `try/catch` that hides the real issue rather than fixing it
- Renaming or reformatting unrelated code in a fix commit
