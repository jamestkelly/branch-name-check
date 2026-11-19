# Working on Branch Name Check

- Change the policy in `src/check.ts`. For each behavior change, add an accepted and rejected example in `test/check.test.ts`; update the README when consumer behavior changes.
- Treat branch names as untrusted data. Pass them as arguments or action inputs. Both entry points must work with `permissions: {}` and without checking out caller code.
- Preserve `.github/workflows/branch-name-check.yml`, the `Check Branch Name` job name, and `action.yml` inputs. Consumers can pin the reusable workflow or require its check by name.
- Rebuild and commit the runtime artifact with its source. Before handing off, run the commands in [CONTRIBUTING.md](CONTRIBUTING.md) and confirm the built entry point works without `node_modules`.
- For release changes, follow [the release contract](CONTRIBUTING.md#releases): immutable exact versions, a movable major alias, and write permissions confined to the release job.
- Add required PR jobs to `review-gate.needs` in `checks.yml`. Keep `Review Gate` as the single stable required status on `main`.
