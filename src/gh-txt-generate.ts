import * as GIT from './inc/gh-git';
import * as HTTP from './inc/gh-http';
import * as TXT from './inc/txt';
import fs from 'fs-extra';
import path from 'path';
type MethodType = 'gh' | 'http';

export type IGHTxtOptions = {
    method?: MethodType,
    owner: string, 
    repo: string, 
    ext?: string
    ref?: string
}

export async function generateTXTFromGH(filePath:string, repoPath: string = '/', options: IGHTxtOptions = { method: 'gh', owner: 'papablack', repo: 'rws-client', ext: 'ts' }, removeTMP: boolean = false){

    const method: MethodType = options.method || 'gh';
    const ref = options.ref || 'master';
    const ext: string = options.ext || 'ts';

    let ghReposData: any = null;

    switch(method){
        case 'gh':    
            ghReposData = await GIT.checkoutTSFiles(options.owner, options.repo, ref, ext, repoPath, removeTMP); 
            break;
        default: 
            ghReposData = await HTTP.downloadTSFiles(options.owner, options.repo, ref, ext, repoPath, removeTMP); 
            break;
    }
    
    const txtFile: string = TXT.createSingleTxt(ghReposData);    

    await fs.ensureDir(path.dirname(filePath)); 
    fs.writeFileSync(filePath, txtFile);  

    console.log(`TypeScript code saved to ${filePath}`);
}