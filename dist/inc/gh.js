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
async function downloadRepoAsZip(owner, repo, ref = 'master') {
    const url = `https://github.com/${owner}/${repo}/archive/${ref}.zip`;
    console.log(`Downloading: ${url}`);
    const response = await (0, node_fetch_1.default)(url);
    if (!response.ok) {
        throw new Error(`Error fetching repository: ${response.statusText}`);
    }
    return await response.buffer();
}
async function getFirstChildDirPath(parentDir) {
    const files = await fs_extra_1.default.readdir(parentDir);
    for (const file of files) {
        const filePath = path_1.default.join(parentDir, file);
        const stat = await fs_extra_1.default.stat(filePath);
        if (stat.isDirectory()) {
            return filePath;
        }
    }
    return null;
}
async function moveAllFiles(sourceDir, targetDir) {
    const files = await fs_extra_1.default.readdir(sourceDir);
    await Promise.all(files.map(async (file) => {
        const sourceFilePath = path_1.default.join(sourceDir, file);
        const targetFilePath = path_1.default.join(targetDir, file);
        await fs_extra_1.default.move(sourceFilePath, targetFilePath, { overwrite: true });
    }));
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
    const moveSourcePath = await getFirstChildDirPath(zipDir);
    const moveTargetPath = path_1.default.resolve(moveSourcePath, '..');
    await moveAllFiles(moveSourcePath, moveTargetPath);
    await fs_extra_1.default.remove(moveSourcePath);
    return zipDir;
}
function getFileNameAndExt(filePath) {
    const ext = path_1.default.extname(filePath);
    const fileName = path_1.default.basename(filePath, ext);
    return { fileName, ext: ext.substring(1) };
}
async function getAllTSFiles(dir, repoPath = '/') {
    let tsFiles = [];
    async function searchFiles(directory) {
        const files = await fs_extra_1.default.readdir(directory);
        for (const file of files) {
            const filePath = path_1.default.join(directory, file);
            const stat = await fs_extra_1.default.stat(filePath);
            const filePathData = getFileNameAndExt(filePath);
            const fileItem = {
                filePath: filePath,
                fileName: filePathData.fileName,
                ext: filePathData.ext,
            };
            if (stat.isDirectory()) {
                await searchFiles(filePath);
            }
            else if (file.endsWith('.ts')) {
                fileItem.content = fs_extra_1.default.readFileSync(filePath, 'utf-8');
                let elligible = false;
                if (isRegex(repoPath)) {
                    const regex = new RegExp(repoPath);
                    if (regex.test(filePath)) {
                        elligible = true;
                    }
                }
                else {
                    if (repoPath === '/' || (repoPath !== '/' && filePath.indexOf(repoPath) > -1)) {
                        elligible = true;
                    }
                }
                if (elligible) {
                    tsFiles.push(fileItem);
                }
            }
        }
    }
    await searchFiles(dir);
    return tsFiles;
}
function isRegex(str) {
    try {
        new RegExp(str);
        return true;
    }
    catch (e) {
        return false;
    }
}
async function downloadTSFiles(owner, repo, ref = 'master', repoPath = '/') {
    try {
        const buffer = await downloadRepoAsZip(owner, repo, ref);
        const tempDir = path_1.default.join(__dirname + '/../../', 'tmp');
        console.log(`Downloaded repo from GH`);
        // Ensure the temp directory is clean
        await fs_extra_1.default.remove(tempDir);
        await fs_extra_1.default.ensureDir(tempDir);
        const unpackedZipPath = await unpackZip(buffer, tempDir);
        console.log(`Unpacked to ${unpackedZipPath}`);
        const tsFiles = await getAllTSFiles(unpackedZipPath, repoPath);
        console.log('OUTPUT LENGTH', tsFiles.length);
        // Clean up
        await fs_extra_1.default.remove(tempDir);
        return tsFiles;
    }
    catch (error) {
        console.error('Error:', error);
    }
}
//# sourceMappingURL=gh.js.map