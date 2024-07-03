import { simpleGit, CleanOptions, SimpleGit } from 'simple-git';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { v4 as uuid} from 'uuid';
import { getFirstChildDirPath, moveAllFiles, getAllFiles, GitFileContent } from './gh-fs';

async function loadRepo(target_path: string, owner: string, repo: string): Promise<SimpleGit>
{
  const git = simpleGit();

  const target_repo_dir = path.join(target_path, repo);

  if(!fs.existsSync(target_repo_dir)){  
    const repo_address = `git@github.com:${owner}/${repo}.git`;    
    await git.clone(repo_address, target_repo_dir)
  }

  await git.cwd(target_repo_dir);

  return git
}

async function getRepo(clonePath: string, owner: string, repo: string, ref: string = 'master'): Promise<void> {
  try {
    (await loadRepo(clonePath, owner, repo)).checkoutBranch(ref, `origin/${ref}`);
  } catch (e: Error | any) {
    console.error(e.stack)    
  }
}


export async function checkoutTSFiles(owner: string, repo: string, ref: string = 'master', ext: string= 'ts', repoPath: string = '/', removeTMP: boolean = false): Promise<GitFileContent[]> {
  try {        
    const tempDir = path.join(__dirname + '/../../', 'tmp');

    // Ensure the temp directory is clean
    await fs.remove(tempDir);
    await fs.ensureDir(tempDir);        

    console.log('Loading repo:')
    await getRepo(tempDir, owner, repo, ref);

    console.log(`Checked out branch ${ref} on repository from GH`);

    const tsFiles: GitFileContent[] = await getAllFiles(ext, tempDir, repoPath);   
    
    console.log('OUTPUT LENGTH', tsFiles.length)

 
    if(removeTMP){
      // Clean up
      await fs.remove(tempDir);
    }

    return tsFiles;
  } catch (error) {
    console.error('Error:', error);
  }
}

