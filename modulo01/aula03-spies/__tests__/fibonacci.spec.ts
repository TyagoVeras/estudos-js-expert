import { describe, expect, it, vi } from 'vitest';
import { Fibonacci } from '../src/fibonacci';

describe('test', () => {
  it('shloud be able run a test', () => {
    const fibonacci = new Fibonacci();
    const spy = vi.spyOn(fibonacci, fibonacci.execute.name);

    for (const sequencia of fibonacci.execute(5)) {
    }
    const expectedCallCount = 6;
    console.log(spy);
    expect(spy).toHaveBeenCalledTimes(expectedCallCount);
  });

  it('should be able return the same numbers', () => {
    const fibonacci = new Fibonacci();

    const result = [...fibonacci.execute(3)];
    const expected = [0, 1, 1];
    expect(result).toStrictEqual(expected);
    //.toBe - Verifica igualdade profunda de lementemtos, é utuil para verificar dados primitivos, como string, number, booleano;
    //.toStrictEqual - verifica se os valores sao identicos ao objeto verificado, ou seja [0,1,2] === [0,1,2] isso vai da verdadeiro pq todos os valores experados estao contidos no objeto verificado
    //.toEqual - é menos restrito do que o toStrictEqual, pq ele verifica se os objetos experados estao contidos no objeto verificado ex: [0,1,2].toEqual([0,undefined, null,1,2]) isso vai da verdadeiro
  });
});
