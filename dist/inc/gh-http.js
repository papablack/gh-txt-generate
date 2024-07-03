"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadTSFiles = downloadTSFiles;
const node_fetch_1 = __importDefault(require("node-fetch"));
const unzipper_1 = __importDefault(require("unzipper"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const gh_fs_1 = require("./gh-fs");
async function downloadRepoAsZip(owner, repo, ref = 'master') {
    const url = `https://github.com/${owner}/${repo}/archive/${ref}.zip`;
    console.log(`Downloading: ${url}`);
    const response = await (0, node_fetch_1.default)(url);
    if (!response.ok) {
        throw new Error(`Error fetching repository: ${response.statusText}`);
    }
    return await response.buffer();
}
async function unpackZip(buffer, dest) {
    const zipName = (0, uuid_1.v4)();
    const zipDir = path_1.default.join(dest, zipName);
    const zipPath = path_1.default.join(dest, zipName + '.zip');
    console.log({ zipPath });
    await fs_extra_1.default.writeFile(zipPath, buffer);
    await fs_extra_1.default.createReadStream(zipPath)
        .pipe(unzipper_1.default.Extract({ path: zipDir }))
        .promise();
    await fs_extra_1.default.remove(zipPath);
    const moveSourcePath = await (0, gh_fs_1.getFirstChildDirPath)(zipDir);
    const moveTargetPath = path_1.default.resolve(moveSourcePath, '..');
    await (0, gh_fs_1.moveAllFiles)(moveSourcePath, moveTargetPath);
    await fs_extra_1.default.remove(moveSourcePath);
    return zipDir;
}
async function downloadTSFiles(owner, repo, ref = 'master', ext = 'ts', repoPath = '/', removeTMP = false) {
    try {
        const buffer = await downloadRepoAsZip(owner, repo, ref);
        const tempDir = path_1.default.join(__dirname + '/../../', 'tmp');
        console.log(`Downloaded repo from GH`);
        // Ensure the temp directory is clean
        await fs_extra_1.default.remove(tempDir);
        await fs_extra_1.default.ensureDir(tempDir);
        const unpackedZipPath = await unpackZip(buffer, tempDir);
        console.log(`Unpacked to ${unpackedZipPath}`);
        const tsFiles = await (0, gh_fs_1.getAllFiles)(ext, unpackedZipPath, repoPath);
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
//# sourceMappingURL=gh-http.js.map