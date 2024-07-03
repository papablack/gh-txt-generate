"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkoutTSFiles = checkoutTSFiles;
const simple_git_1 = require("simple-git");
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const gh_fs_1 = require("./gh-fs");
async function loadRepo(target_path, owner, repo) {
    const git = (0, simple_git_1.simpleGit)();
    const target_repo_dir = path_1.default.join(target_path, repo);
    if (!fs_extra_1.default.existsSync(target_repo_dir)) {
        const repo_address = `git@github.com:${owner}/${repo}.git`;
        await git.clone(repo_address, target_repo_dir);
    }
    await git.cwd(target_repo_dir);
    return git;
}
async function getRepo(clonePath, owner, repo, ref = 'master') {
    try {
        (await loadRepo(clonePath, owner, repo)).checkoutBranch(ref, `origin/${ref}`);
    }
    catch (e) {
        console.error(e.stack);
    }
}
async function checkoutTSFiles(owner, repo, ref = 'master', ext = 'ts', repoPath = '/', removeTMP = false) {
    try {
        const tempDir = path_1.default.join(__dirname + '/../../', 'tmp');
        // Ensure the temp directory is clean
        await fs_extra_1.default.remove(tempDir);
        await fs_extra_1.default.ensureDir(tempDir);
        console.log('Loading repo:');
        await getRepo(tempDir, owner, repo, ref);
        console.log(`Checked out branch ${ref} on repository from GH`);
        const tsFiles = await (0, gh_fs_1.getAllFiles)(ext, tempDir, repoPath);
        console.log('OUTPUT LENGTH', tsFiles.length);
        if (removeTMP) {
            // Clean up
            await fs_extra_1.default.remove(tempDir);
        }
        return tsFiles;
    }
    catch (error) {
        console.error('Error:', error);
    }
}
//# sourceMappingURL=gh-git.js.map