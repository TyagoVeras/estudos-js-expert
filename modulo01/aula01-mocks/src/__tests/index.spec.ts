import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { CONSTANTS } from '../constants';
import { File } from '../file';

describe('#Tests file', () => {

  it('should not be able uploaded an file empty', async () => {
    const filePath = path.resolve('mocks', 'emptyFile-invalid.csv');
    const expected = new Error(CONSTANTS.error.FILE_LENGTH_ERROR_MESSAGE);
    await expect(File.csvToJson(filePath)).rejects.toThrowError(expected)
  })

  it('should not be able upload file with order the fields not equal on the layout', async () => {
    const filePath = path.resolve('mocks', 'headers-invalid.csv');
    const expected = new Error(CONSTANTS.error.FILE_FIELDS_ERROR_MESSAGE);
    await expect(File.csvToJson(filePath)).rejects.toThrowError(expected)
  })

  it('should not be able upload file with maximum number of lines', async () => {
    const filePath = path.resolve('mocks', 'fiveItems-invalid.csv');
    const expected = new Error(CONSTANTS.error.FILE_LENGTH_ERROR_MESSAGE);
    await expect(File.csvToJson(filePath)).rejects.toThrowError(expected)
  })

  it('should be able convert csv to json', async () => {
    const filePath = path.resolve('mocks', 'threeItems-valid.csv');
    const expected = [
      {
        id: 1,
        name: 'tyago veras',
        age: 33,
        profission: 'analist'
      },
      {
        id: 2,
        name: 'tyago veras',
        age: 33,
        profission: 'analist'
      },
      {
        id: 3,
        name: 'tyago veras',
        age: 33,
        profission: 'analist'
      },
      {
        id: 4,
        name: 'tyago veras',
        age: 33,
        profission: 'analist'
      }
    ]
    await expect(File.csvToJson(filePath)).resolves.toStrictEqual(expected)
  })

})