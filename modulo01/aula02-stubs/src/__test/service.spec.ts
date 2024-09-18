import fs from 'fs/promises'; // Para carregar o arquivo JSON
import path from 'node:path';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { Service } from '../Service';

describe('#suite test for service file', () => {

  const URL_BASE1 = 'https://swapi.dev/api/planets/2';

  let MOCKS = {
    alderaan: {},
  };

  // Antes de todos os testes, carregamos o mock do arquivo JSON
  beforeAll(async () => {
    const alderaanData = await fs.readFile(path.resolve('src', 'mocks', 'alderaan.json'), 'utf-8');
    MOCKS = {
      alderaan: JSON.parse(alderaanData),
    };
  });

  it('should be able to get data from the planets URL', async () => {
    const service = new Service();

    // Stub para o fetch, retornando o mock carregado
    vi.stubGlobal('fetch', async () => {
      return {
        json: () => Promise.resolve(MOCKS.alderaan),
      };
    });

    const dados = await service.makeRequest(URL_BASE1);
    expect(dados).toEqual(MOCKS.alderaan);

    // Restaurar o fetch global ao comportamento original após o teste
    vi.restoreAllMocks();
  });
});
