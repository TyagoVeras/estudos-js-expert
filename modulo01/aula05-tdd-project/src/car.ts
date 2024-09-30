import { Base } from './base/base';

class Car extends Base {
  constructor(
    public id: string,
    protected name: string,
    private releaseYear: number,
    private available: boolean,
    private gasAvailable: boolean
  ) {
    super(id, name);
  }
}

export { Car };
