import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { beforeAll, describe, it } from 'vitest'
describe('stub', () => {

  let mocks = {
    alderaan: {}
  }
  beforeAll(async () => {
    const alderaan = await readFile(resolve('src', 'mocks', 'alderaan',), 'utf-8');
    mocks.alderaan = JSON.parse(alderaan);
  })

  it('should be able return same object', () => {
    const service = new 
  })
})