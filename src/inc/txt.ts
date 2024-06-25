import fs from 'fs';
import { GitFileContent } from './gh';

export function createSingleTxt(ghFilesData: GitFileContent[]){
    let concatenatedContent = '';
    for (const fileData of ghFilesData) {
        const content = `${fileData.filePath}:\n${fileData.filePath.length}\n` + fileData.content;
        concatenatedContent += content + '\n\n';
    }

    return concatenatedContent;
}