import { spawnSync } from "node:child_process";
const branches = new Set(["main", "development", "staging"]);
const prefixes = ["feat", "feature", "fix", "bugfix", "chore", "hotfix", "release", "revert", "refactor", "docs", "test", "ci", "dependabot"];
/** Check the project's naming convention and Git's own ref syntax. */
export function isAllowedBranch(branch) {
    if (branches.has(branch))
        return true;
    const slash = branch.indexOf("/");
    if (slash < 1 || !prefixes.includes(branch.slice(0, slash)) || branch.includes("\0"))
        return false;
    const result = spawnSync("git", ["check-ref-format", `refs/heads/${branch}`], { stdio: "ignore" });
    if (result.error)
        throw result.error;
    return result.status === 0;
}
if (import.meta.main && !isAllowedBranch(process.env.INPUT_BRANCH ?? "")) {
    process.stderr.write(`Invalid branch name. Use ${[...branches].join(", ")}, or a valid Git branch starting with one of: ${prefixes.map(p => `${p}/`).join(", ")}.\n`);
    process.exitCode = 1;
}
