import { describe, expect, it } from 'vitest';
describe('test', () => {

  it('shloud be able run a test', () => {
    const expected = 2 + 2;
    expect(expected).toBe(4)
  })
})