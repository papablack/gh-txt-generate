export type IGHTxtOptions = {
    owner: string;
    repo: string;
    ref?: string;
};
export declare function generateTXTFromGH(filePath: string, repoPath?: string, options?: IGHTxtOptions): Promise<void>;
