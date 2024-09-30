import { Base } from './base/base';

class Customer extends Base {
  constructor(protected id: string, protected name: string, private age: number) {
    super(id, name);
  }
}

export { Customer };
