import { GitFileContent } from './gh-fs';
export declare function downloadTSFiles(owner: string, repo: string, ref?: string, ext?: string, repoPath?: string, removeTMP?: boolean): Promise<GitFileContent[]>;
