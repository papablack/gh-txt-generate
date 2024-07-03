import fetch from 'node-fetch';
import unzipper  from 'unzipper';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { v4 as uuid} from 'uuid';
import { GitFileContent } from './gh-fs';

import { getFirstChildDirPath, moveAllFiles, getAllFiles } from './gh-fs';

async function downloadRepoAsZip(owner: string, repo: string, ref: string = 'master'): Promise<Buffer> {
  const url = `https://github.com/${owner}/${repo}/archive/${ref}.zip`;

  console.log(`Downloading: ${url}`);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error fetching repository: ${response.statusText}`);
  }
  return await response.buffer();
}

async function unpackZip(buffer: Buffer, dest: string): Promise<string> {
  const zipName: string = uuid();
  const zipDir = path.join(dest, zipName);
  const zipPath = path.join(dest, zipName + '.zip');
  console.log({zipPath})
  await fs.writeFile(zipPath, buffer);

  await fs.createReadStream(zipPath)
    .pipe(unzipper.Extract({ path:  zipDir}))
    .promise();

  await fs.remove(zipPath);

  const moveSourcePath = await getFirstChildDirPath(zipDir);
  const moveTargetPath = path.resolve(moveSourcePath, '..');

  await moveAllFiles(moveSourcePath, moveTargetPath);

  await fs.remove(moveSourcePath);

  return zipDir;
}

export async function downloadTSFiles(owner: string, repo: string, ref: string = 'master', ext: string= 'ts', repoPath: string = '/' , removeTMP: boolean = false): Promise<GitFileContent[]> {
  try {
    const buffer = await downloadRepoAsZip(owner, repo, ref);
    const tempDir = path.join(__dirname + '/../../', 'tmp');
 

    console.log(`Downloaded repo from GH`);

    // Ensure the temp directory is clean
    await fs.remove(tempDir);
    await fs.ensureDir(tempDir);    

    const unpackedZipPath = await unpackZip(buffer, tempDir);

    console.log(`Unpacked to ${unpackedZipPath}`);

    const tsFiles: GitFileContent[] = await getAllFiles(ext, unpackedZipPath, repoPath);   
    
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
