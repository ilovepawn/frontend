---
description: Release dev → main (deploy event); requires explicit user confirmation
---

Cut a release: merge `dev` into `main` and tag.

**Stop and confirm with the user before doing anything.** Releases are user-facing deploy events; do not run this command end-to-end without explicit go-ahead.

After confirmation:

1. **Pre-flight.** From `dev`:
   - `git status` clean
   - `git pull origin dev`
   - `pnpm install`
   - `pnpm typecheck && pnpm check && pnpm build` — all green
   - Open PRs targeting `dev`? If yes, list them and ask whether to wait.
2. **Diff review.** Show `git log main..dev --oneline` and ask the user to confirm the change set is ready to ship.
3. **Decide version.** Inspect commits to suggest a semver bump (major / minor / patch). Get user confirmation on the version.
4. **Switch to main.**
   - `git checkout main`
   - `git pull origin main`
5. **Merge.** `git merge --no-ff dev -m "release: vX.Y.Z"` — keep the merge commit so the release point is greppable.
6. **Tag.** `git tag -a vX.Y.Z -m "vX.Y.Z"`.
7. **Push.** `git push origin main && git push origin vX.Y.Z` — confirm with user once more before the push, since this is the deploy moment.
8. **Switch back.** `git checkout dev`. Report the release URL on GitHub.

Hard rules:
- Never force-push to main
- Never tag without a corresponding `release:` merge commit
- If the merge has conflicts, stop and report — do not auto-resolve
- If the user asks to "release" without specifying a version, propose one based on commits and **wait for confirmation**
