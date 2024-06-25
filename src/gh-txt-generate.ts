import * as GH from './inc/gh';
import * as TXT from './inc/txt';
import fs from 'fs';

export type IGHTxtOptions = {
    owner: string, 
    repo: string, 
    ref?: string
}

export async function generateTXTFromGH(filePath:string, repoPath: string = '/', options: IGHTxtOptions = { owner: 'papablack', repo: 'rws-client' }){

    console.log({options})
    const ref = options.ref || 'master';
    const ghReposData: any = await GH.downloadTSFiles(options.owner, options.repo, ref, repoPath);    
    
    const txtFile: string = TXT.createSingleTxt(ghReposData);    

    fs.writeFileSync(filePath, txtFile);  

    console.log(`TypeScript code saved to ${filePath}`);
}