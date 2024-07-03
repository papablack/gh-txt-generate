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

export async function getFirstChildDirPath(parentDir: string): Promise<string | null> {
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

export async function moveAllFiles(sourceDir: string, targetDir: string): Promise<void> {
  const files = await fs.readdir(sourceDir);
  await Promise.all(files.map(async (file) => {
    const sourceFilePath = path.join(sourceDir, file);
    const targetFilePath = path.join(targetDir, file);
    await fs.move(sourceFilePath, targetFilePath, { overwrite: true });
  }));
}

export function getFileNameAndExt(filePath: string): { fileName: string, ext: string } {
  const ext = path.extname(filePath);
  const fileName = path.basename(filePath, ext);
  return { fileName, ext: ext.substring(1) };
}

export async function getAllFiles(ext: string, dir: string, repoPath: string = '/'): Promise<GitFileContent[]> {
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
      } else if (file.endsWith('.' + ext)) {                
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

export function isRegex(str: string): boolean {
  try {
    new RegExp(str);
    return true;
  } catch (e) {
    return false;
  }
}