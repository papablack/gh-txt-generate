"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSingleTxt = createSingleTxt;
function createSingleTxt(ghFilesData) {
    let concatenatedContent = '';
    for (const fileData of ghFilesData) {
        const content = `${fileData.filePath}:\n${fileData.filePath.length}\n` + fileData.content;
        concatenatedContent += content + '\n\n';
    }
    return concatenatedContent;
}
//# sourceMappingURL=txt.js.map