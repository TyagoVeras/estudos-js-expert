
import fs from 'node:fs';
import fsPromise from 'node:fs/promises';
import { CONSTANTS } from './constants';
class File {

  private static PARAMS = {
    HEADER_LAYOUT: ['id', 'name', 'age', 'profission'],
    MAXIMUM_LINES: 5
  }

  private static ensuredFileIsNotEmpty(filePath) {
    const file = fs.readFileSync(filePath, { encoding: 'utf-8' });
    if (file === '') throw new Error(CONSTANTS.error.FILE_LENGTH_ERROR_MESSAGE)
  }

  private static ensuredFileIsHeaders(filePath) {
    const file = fs.readFileSync(filePath).toString();
    const [headerLine] = file.split(/\r?\n/)
    const header = headerLine.split(',').map(item => item.trim())
    File.PARAMS.HEADER_LAYOUT.forEach((item, index) => {
      if (header[index] !== item) {
        throw new Error(CONSTANTS.error.FILE_FIELDS_ERROR_MESSAGE)
      }
    })
  }

  private static ensuredFileIsNotMaximumLines(file: string) {
    const [header, ...lines] = file.split(/\r?\n/)
    if (lines.length > File.PARAMS.MAXIMUM_LINES) {
      throw new Error(CONSTANTS.error.FILE_LENGTH_ERROR_MESSAGE)
    }

    return {
      header,
      lines
    }
  }

  static async csvToJson(filePath: string) {
    const file = await fsPromise.readFile(filePath, { encoding: 'utf-8' });
    File.ensuredFileIsNotEmpty(filePath)
    File.ensuredFileIsHeaders(filePath)
    const { header, lines } = File.ensuredFileIsNotMaximumLines(file);
    const headerSpited = header.split(',');

    const users = lines.map((line) => {

      const columnsOfLine = line.split(',');
      const user = {}
      for (const index in columnsOfLine) {
        user[headerSpited[index].trim()] = isNaN(Number(columnsOfLine[index].trim())) ? columnsOfLine[index].trim() : Number(columnsOfLine[index].trim())
      }
      return user;
    })
    return users;
  }

}

export { File };
