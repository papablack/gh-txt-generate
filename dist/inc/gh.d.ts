export type GitFileContent = {
    filePath: string;
    fileName: string;
    content?: string;
    ext: string;
};
export declare function downloadTSFiles(owner: string, repo: string, ref?: string, repoPath?: string): Promise<GitFileContent[]>;
