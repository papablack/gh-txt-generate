export type GitFileContent = {
    filePath: string;
    fileName: string;
    content?: string;
    ext: string;
};
export declare function getFirstChildDirPath(parentDir: string): Promise<string | null>;
export declare function moveAllFiles(sourceDir: string, targetDir: string): Promise<void>;
export declare function getFileNameAndExt(filePath: string): {
    fileName: string;
    ext: string;
};
export declare function getAllFiles(ext: string, dir: string, repoPath?: string): Promise<GitFileContent[]>;
export declare function isRegex(str: string): boolean;
