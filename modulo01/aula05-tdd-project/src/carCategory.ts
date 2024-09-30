import { Base } from './base/base';

class CarCategory extends Base {
  constructor(protected id: string, protected name: string, public carIds: string[], private price: number) {
    super(id, name);
  }
}

export { CarCategory };
