# Gate

The machine checks that must all pass before publication, and before review when the repo enables the pre-review gate (default true). With `pre_review_gate: false`, the autopilot runs only non-`none` lint and typecheck slots before review; two `none` slots pass without commands. Those checks do not establish a gate pass or update its record. Without a full gate after session notice, `implement-gated` and `to-tickets-skeleton` run the full gate until green. When the invocation says `The autopilot runs the full gate after this session.`, they run full lint and typecheck plus related tests, including Acceptance tests; the autopilot owns the full gate before publication and, for `implement-gated`, records the passing HEAD. `code-review-gated` re-runs the full gate before reviewing unless the invocation confirms a gate pass or lint/typecheck pass at HEAD.

The autopilot retries failed gates and pre-review lint/typecheck checks once at the same HEAD with the same commands and selected slots. A passing retry completes that check call and updates its pass records and confirmation under the selected scope; it does not increase `gate_retries`, the count of hand-backs to the implementer for repair. A failing retry supplies its failed slot, command and output tail to the implementer, and the pair counts as one consecutive failure. Failures after a repair are also retried once. Results that end the run, including command timeouts, are not retried. The autopilot retains each first failure's slot, command and output tail, together with its retry outcome, in its local execution records for display even after it removes the ticket worktree.

- **lint:** `npm run lint`
- **typecheck:** `npx tsc --noEmit`
- **test:** `npm run build`

Notes for this repo:

- **lint runs the ESLint CLI.** `npm run lint` is `eslint .` with `eslint.config.mjs` (`next/core-web-vitals` + `next/typescript`, adapted through `FlatCompat`). Errors fail the slot; warnings do not. `next build` lints too, so a lint error also fails the test slot.
- **test is the build.** There is no test suite. `npm run build` is the only check CI runs (`.github/workflows/deploy.yml`): it type-checks and statically exports every page (`output: 'export'`), so it fails on a dynamic route without `generateStaticParams` or on anything the static export cannot serve. It needs no `.env.local`.
- In a fresh worktree, run `npm ci` before the gate.

Rules:

- A slot marked `none` has no tooling configured in this repo — skip it.
- Run by exit code; read output only on failure.
- Green means every non-`none` slot passes in the same run.
