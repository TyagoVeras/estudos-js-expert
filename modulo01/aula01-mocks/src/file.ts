
import fs from 'node:fs';
import { CONSTANTS } from './constants';
class File {
  private static ensuredFileIsNotEmpty(filePath){
    const file = fs.readFileSync(filePath).toString();
    if(file === '') throw new Error(CONSTANTS.error.FILE_LENGTH_ERROR_MESSAGE)
  }

  static async csvToJson(filePath: string){
    File.ensuredFileIsNotEmpty(filePath)
  }

}

export { File };
