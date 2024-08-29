import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { CONSTANTS } from '../constants';
import { File } from '../file';

describe('#Tests file', ()=>{
  it('should not be able uploaded an file empty', async ()=>{
    const filePath = path.resolve('mocks', 'emptyFile-invalid.csv');
    const expected = new Error(CONSTANTS.error.FILE_LENGTH_ERROR_MESSAGE);
    await expect(File.csvToJson(filePath)).rejects.toThrowError(expected)
  })
})