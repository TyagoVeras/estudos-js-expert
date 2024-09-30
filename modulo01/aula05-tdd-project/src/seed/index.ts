import { faker } from '@faker-js/faker';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { Car } from '../car';
import { CarCategory } from '../carCategory';
import { __dirnameCustom } from '../utils/dirname';

const seederBaseFolder = join(__dirnameCustom, '..', 'database');

const ITEMS_AMOUNT = 2;

const carCategory = new CarCategory(
  faker.string.uuid(),
  faker.vehicle.type(),
  [],
  Number(faker.finance.amount({ min: 20, max: 200 }))
);

const cars: Car[] = [];

for (let i = 0; i < ITEMS_AMOUNT; i++) {
  const car = new Car(faker.string.uuid(), faker.vehicle.vehicle(), faker.date.past().getFullYear(), true, true);
  carCategory.carIds.push(car.id);
  cars.push(car);
}

const write = (filename: string, data: any) => writeFile(join(seederBaseFolder, filename), JSON.stringify(data));

await write('cars.json', cars);
await write('car-categories.json', [carCategory]);
