# Branch Name Check

Reject pull requests from branches that don't follow your naming convention. For example, `fix/login` and `dependabot/npm_and_yarn/node-24` pass; `login-fix` does not. The check uses the source branch, including for forks, rather than GitHub's temporary merge ref.

## Use in a GitHub.com repository

```yaml
name: Standard PR Checks
on: pull_request
permissions: {}
jobs:
  branch-name:
    uses: jamestkelly/branch-name-check/.github/workflows/branch-name-check.yml@v1
```

To include the check as a **step** instead, use the following once the first TypeScript release is published:

```yaml
- name: Validate Branch Name
  uses: jamestkelly/branch-name-check@v1
```

No checkout of the consumer repository, secrets, or token permissions are required. The step uses the runner's Node.js 24 action runtime and requires Git on `PATH`. It accepts an optional `branch` input, defaults to `github.head_ref` on PRs, and otherwise uses `github.ref_name`. Use it on branch events; tag names are not the intended input.

## Naming policy

`main`, `development`, and `staging` pass as exact names. Other names must be valid Git refs with a nonempty path after one of these prefixes:

`feat/`, `feature/`, `fix/`, `bugfix/`, `chore/`, `hotfix/`, `release/`, `revert/`, `refactor/`, `docs/`, `test/`, `ci/`, `dependabot/`.

The action returns a nonzero exit status on failure. Make the check required in the consumer repository's branch ruleset if it should block merging.

## Versions and support

`v1` tracks compatible releases. For reproducible builds, pin the packaged commit SHA from a [GitHub Release](https://github.com/jamestkelly/branch-name-check/releases). The step action needs that built revision: `main` and PR commits contain TypeScript source only. Callers already pinned to the original shell workflow keep that implementation until they update.

See [Contributing](CONTRIBUTING.md) for development and release instructions, or [Security](SECURITY.md) to report a vulnerability.

## License

[MIT](LICENSE) © 2026 Jim Kelly.
