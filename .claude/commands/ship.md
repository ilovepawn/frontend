---
description: Verify, push, and open a PR to dev for the current feature branch
---

Wrap up the current feature branch and open a PR. Execute steps in order; stop and report at the first failure.

1. Confirm current branch is **not** `main` or `dev`. If it is, stop and ask where the work should land.
2. Run `pnpm check` (Biome lint + format). If it fails, run `pnpm format` then `pnpm check` again. If still failing, stop and report what cannot be auto-fixed.
3. Run `pnpm typecheck`. Stop and report on errors.
4. Run `git status` and `git log dev..HEAD --oneline`. Confirm the branch has commits not yet on `dev`. If clean, stop and report nothing to ship.
5. Push the branch: `git push -u origin HEAD`.
6. Check whether a PR for this branch already exists with `gh pr view --head $(git branch --show-current) 2>/dev/null`. If yes, report its URL and exit. If no, continue.
7. Open the PR with `gh pr create --base dev --head $(git branch --show-current)`. Use the established PR body template:
   - **Summary** — bullet points of what changed and why (read commit messages for source material)
   - **Test plan** — checklist of how to verify
   - Mark items completed if you already verified them in steps 2–3
8. Report the PR URL.

Constraints:
- Do not target `main`; PRs always target `dev`
- Do not force-push; if the branch is behind, rebase or merge `dev` first and re-run
- Do not amend already-pushed commits unless the user asks
