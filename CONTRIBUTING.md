# Contributing

For a naming-policy change, open an issue with one branch that should pass and one that should fail. For a bug, include the pinned action version, event type, expected outcome, and actual outcome.

Use Node.js 24.10 or later and the pnpm version in `package.json`. Run:

```sh
pnpm install --frozen-lockfile
pnpm validate
actionlint
```

Commit TypeScript source only. Pull requests build `dist/check.js` from a clean checkout, exercise it as a local action, and reject tracked `dist/` files.

## Releases

The workflow builds the validated `main` revision and commits the runtime on `release-dist`. Each package commit preserves its source revision and previous package history, so semantic-release can find earlier versions. Both version tags and major aliases point to packaged commits. Leave `release-dist` under CI control.

Use Conventional Commit PR titles for squash merges to `main`. After checks pass, semantic-release creates a version tag and a GitHub Release with notes. `feat` bumps minor; `fix`, `perf`, and `chore` bump patch. Mark breaking changes with `!` or a `BREAKING CHANGE:` footer. Changes limited to `docs`, `ci`, `test`, or `refactor` do not normally release.

Only the floating major tag (such as `v1`) moves. The job advances it after verifying the exact release exists, including on a rerun. No npm package or registry credentials are needed. Use **Release → Run workflow** on `main` to retry a failed run; inspect the tag and release if publication stopped partway through.

### List a release on GitHub Marketplace

The Release run summary links to the editor for its exact `vX.Y.Z` release. Open that link as the repository owner:

1. Select **Publish this Action to the GitHub Marketplace**. On first publication, review and accept the Marketplace Developer Agreement and resolve any metadata or name conflicts GitHub reports.
2. Choose **Continuous integration** as the primary category. Keep the version tag and generated notes, then click **Update release** and complete any authentication prompt.
3. Open the Marketplace listing and verify the publisher, repository, and displayed version. Repeat this check for each version you intend to list.

Use the existing semantic release, not the floating `v1` tag or a second manually created release. GitHub documents this as a [release-editor operation](https://docs.github.com/en/actions/how-tos/create-and-publish-actions/publish-in-github-marketplace); a successful Actions run confirms the GitHub Release, not Marketplace publication.
