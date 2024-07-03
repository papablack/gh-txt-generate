"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFirstChildDirPath = getFirstChildDirPath;
exports.moveAllFiles = moveAllFiles;
exports.getFileNameAndExt = getFileNameAndExt;
exports.getAllFiles = getAllFiles;
exports.isRegex = isRegex;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
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
function getFileNameAndExt(filePath) {
    const ext = path_1.default.extname(filePath);
    const fileName = path_1.default.basename(filePath, ext);
    return { fileName, ext: ext.substring(1) };
}
async function getAllFiles(ext, dir, repoPath = '/') {
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
            else if (file.endsWith('.' + ext)) {
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
//# sourceMappingURL=gh-fs.js.map