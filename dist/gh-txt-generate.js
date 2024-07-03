"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTXTFromGH = generateTXTFromGH;
const GIT = __importStar(require("./inc/gh-git"));
const HTTP = __importStar(require("./inc/gh-http"));
const TXT = __importStar(require("./inc/txt"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
async function generateTXTFromGH(filePath, repoPath = '/', options = { method: 'gh', owner: 'papablack', repo: 'rws-client', ext: 'ts' }, removeTMP = false) {
    const method = options.method || 'gh';
    const ref = options.ref || 'master';
    const ext = options.ext || 'ts';
    let ghReposData = null;
    switch (method) {
        case 'gh':
            ghReposData = await GIT.checkoutTSFiles(options.owner, options.repo, ref, ext, repoPath, removeTMP);
            break;
        default:
            ghReposData = await HTTP.downloadTSFiles(options.owner, options.repo, ref, ext, repoPath, removeTMP);
            break;
    }
    const txtFile = TXT.createSingleTxt(ghReposData);
    await fs_extra_1.default.ensureDir(path_1.default.dirname(filePath));
    fs_extra_1.default.writeFileSync(filePath, txtFile);
    console.log(`TypeScript code saved to ${filePath}`);
}
//# sourceMappingURL=gh-txt-generate.js.map