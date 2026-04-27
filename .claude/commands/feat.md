---
description: Start a new feature branch off dev with the standard workflow
argument-hint: <kebab-name> [optional one-line goal]
---

Start a new feature. Argument: `$ARGUMENTS` — first token is the branch suffix (kebab-case), the rest is an optional goal description.

1. **Confirm intent.** Restate the goal in one sentence. If the user didn't provide one and there's no obvious task in conversation, ask before creating a branch.
2. **Check current state.** `git status` must be clean and `git branch --show-current` should be `dev`. If not:
   - Dirty tree → ask the user what to do (stash, commit elsewhere, discard).
   - On a different branch → check out `dev`, pull, then continue.
3. **Branch.** `git checkout -b feat/<kebab-name>` from latest `dev` (`git pull origin dev` first if behind).
4. **Survey.** Before writing code:
   - Skim `CLAUDE.md` for any constraints relevant to this feature (auth, license, branching).
   - Identify which sibling backend repo (`deep-thought`, `tactician`, `zugzwang`) provides the data, if any. If no endpoint exists, surface that to the user before building UI against an imaginary contract.
   - Check `apps/web/node_modules/next/dist/docs/01-app/` for any Next.js 16 idioms relevant to the feature (routing, server components, fetching).
5. **Implement** the smallest end-to-end shape. Prefer existing libs (shadcn, TanStack Query, Zustand) over inventing patterns. Don't add dependencies without a clear need.
6. **Verify** locally: `pnpm typecheck && pnpm check`. For UI features, also run `pnpm --filter @ilovepawn/web dev` and visually confirm — say so explicitly if you can't visually verify.
7. **Commit** in semantic units (Conventional Commits). Don't batch unrelated work into one commit.
8. **When done, run `/ship`** to push and open the PR.

Anti-patterns to avoid:
- Adding error handling for cases that can't happen
- Designing for hypothetical future requirements
- Leaving placeholder TODO comments when the work is incomplete (just say so to the user)
