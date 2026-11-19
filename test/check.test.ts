import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { isAllowedBranch } from "../src/check.ts";

test("accepts permanent branches and supported prefixes with nested names", () => {
  for (const name of ["main", "development", "staging", ...[
    "feat", "feature", "fix", "bugfix", "chore", "hotfix", "release", "revert",
    "refactor", "docs", "test", "ci", "dependabot",
  ].map(prefix => `${prefix}/deps/node-24.1`)]) assert.ok(isAllowedBranch(name), name);
});

test("rejects invalid refs even when their prefix is allowed", () => {
  for (const name of ["", "main/foo", "Fix/test", "feat", "fix/", "patch/one",
    "fix/a..b", "feat/a b", "ci/a//b", "ci/.hidden", "feat/end.lock", "fix/\0", "fix/a\nb"]) {
    assert.equal(isAllowedBranch(name), false, JSON.stringify(name));
  }
});

test("entry point fails closed on missing input and accepts literal shell metacharacters in a valid ref", () => {
  for (const [branch, status] of [["", 1], ["fix/$USER;literal", 0]] as const) {
    const run = spawnSync(process.execPath, ["src/check.ts"], { env: { ...process.env, INPUT_BRANCH: branch } });
    assert.equal(run.status, status, run.stderr.toString());
  }
});
