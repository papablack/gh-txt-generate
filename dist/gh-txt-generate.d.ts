type MethodType = 'gh' | 'http';
export type IGHTxtOptions = {
    method?: MethodType;
    owner: string;
    repo: string;
    ext?: string;
    ref?: string;
};
export declare function generateTXTFromGH(filePath: string, repoPath?: string, options?: IGHTxtOptions, removeTMP?: boolean): Promise<void>;
export {};
