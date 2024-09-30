import { readFile } from 'fs/promises';

class BaseRepository {
  private file: string;
  constructor({ file }: { file: string }) {
    this.file = file;
  }

  async find(itemId?: string) {
    const content = JSON.parse(await readFile(this.file, { encoding: 'utf-8' })) as { id: string }[];
    if (!itemId) {
      return content;
    }

    return content.find(({ id }) => id === itemId);
  }
}

export { BaseRepository };
