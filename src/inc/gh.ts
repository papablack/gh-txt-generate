import fetch from 'node-fetch';
import unzipper  from 'unzipper';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { v4 as uuid} from 'uuid';

export type GitFileContent = {
  filePath: string,
  fileName: string,
  content?: string,
  ext: string
};

async function downloadRepoAsZip(owner: string, repo: string, ref: string = 'master'): Promise<Buffer> {
  const url = `https://github.com/${owner}/${repo}/archive/${ref}.zip`;

  console.log(`Downloading: ${url}`);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error fetching repository: ${response.statusText}`);
  }
  return await response.buffer();
}


async function getFirstChildDirPath(parentDir: string): Promise<string | null> {
  const files = await fs.readdir(parentDir);
  for (const file of files) {
    const filePath = path.join(parentDir, file);
    const stat = await fs.stat(filePath);
    if (stat.isDirectory()) {
      return filePath;
    }
  }
  return null;
}

async function moveAllFiles(sourceDir: string, targetDir: string): Promise<void> {
  const files = await fs.readdir(sourceDir);
  await Promise.all(files.map(async (file) => {
    const sourceFilePath = path.join(sourceDir, file);
    const targetFilePath = path.join(targetDir, file);
    await fs.move(sourceFilePath, targetFilePath, { overwrite: true });
  }));
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

function getFileNameAndExt(filePath: string): { fileName: string, ext: string } {
  const ext = path.extname(filePath);
  const fileName = path.basename(filePath, ext);
  return { fileName, ext: ext.substring(1) };
}

async function getAllTSFiles(dir: string, repoPath: string = '/'): Promise<GitFileContent[]> {
  let tsFiles: GitFileContent[] = [];

  async function searchFiles(directory: string): Promise<void> {
    const files = await fs.readdir(directory);
    for (const file of files) {
      const filePath = path.join(directory, file);
      const stat = await fs.stat(filePath);

      const filePathData = getFileNameAndExt(filePath);

      const fileItem: GitFileContent = {
        filePath: filePath,
        fileName: filePathData.fileName,
        ext: filePathData.ext,        
      }      

      if (stat.isDirectory()) {
        await searchFiles(filePath);
      } else if (file.endsWith('.ts')) {                
        fileItem.content = fs.readFileSync(filePath, 'utf-8');
        let elligible = false;

        if(isRegex(repoPath)){          
          const regex = new RegExp(repoPath);
          if (regex.test(filePath)) {
            elligible = true;
          }
        }else{
          if (repoPath === '/' || (repoPath !== '/' && filePath.indexOf(repoPath) > -1)) {
            elligible = true;
          }
        }     
        
        if(elligible){
          tsFiles.push(fileItem);
        }
      }
    }
  }

  await searchFiles(dir);
  return tsFiles;
}

function isRegex(str: string): boolean {
  try {
    new RegExp(str);
    return true;
  } catch (e) {
    return false;
  }
}

export async function downloadTSFiles(owner: string, repo: string, ref: string = 'master', repoPath: string = '/'): Promise<GitFileContent[]> {
  try {
    const buffer = await downloadRepoAsZip(owner, repo, ref);
    const tempDir = path.join(__dirname + '/../../', 'tmp');

    console.log(`Downloaded repo from GH`);

    // Ensure the temp directory is clean
    await fs.remove(tempDir);
    await fs.ensureDir(tempDir);    

    const unpackedZipPath = await unpackZip(buffer, tempDir);

    console.log(`Unpacked to ${unpackedZipPath}`);
   

    const tsFiles: GitFileContent[] = await getAllTSFiles(unpackedZipPath, repoPath);   
    
    console.log('OUTPUT LENGTH', tsFiles.length)

    // Clean up
    await fs.remove(tempDir);

    return tsFiles;
  } catch (error) {
    console.error('Error:', error);
  }
}
