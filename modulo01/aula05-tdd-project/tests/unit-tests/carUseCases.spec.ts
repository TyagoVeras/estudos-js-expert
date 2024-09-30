import { join } from 'path';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { Transaction } from '../../src/transaction';
import { CarUseCase } from '../../src/use-case/CarUseCase';
import { __dirnameCustom } from '../../src/utils/dirname';

const carDatabase = join(__dirnameCustom, '..', '..', 'src', 'database', 'cars.json');
describe('carUseCase suite tests', () => {
  let carUseCase: CarUseCase;
  let mocks: { validCarCategory: {}; validCar: {} };
  beforeAll(async () => {
    carUseCase = new CarUseCase({ cars: carDatabase });
    mocks = {
      validCarCategory: await import(join('..', 'mocks', 'valid-carCategory.json')),
      validCar: await import(join('..', 'mocks', 'valid-car.json'))
    };
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should retrieve random position from an array', () => {
    const data = [0, 1, 2, 3, 4];
    const result = carUseCase.getRandomPositionFromArray(data);
    expect(result).to.be.lte(data.length).and.be.gte(0);
  });

  it('should chose the first id from carIds in an CarCategory', () => {
    const carCategory = mocks.validCarCategory;
    const carIndex = 0;

    vi.spyOn(carUseCase, String(carUseCase.getRandomPositionFromArray.name)).mockReturnValue(0);

    const result = carUseCase.choseRandomCar(carCategory);
    const expected = carCategory.carIds[carIndex];

    expect(result).toEqual(expected);
    expect(carUseCase.getRandomPositionFromArray).toHaveBeenCalledOnce();
  });

  it('given a carCategory it should return an available car', async () => {
    const car = mocks.validCar;
    const carCategory = Object.assign({}, mocks.validCarCategory);
    carCategory.carIds = [car.id];

    vi.spyOn(carUseCase.carRepository, carUseCase.carRepository.find.name).mockReturnValue(car);
    vi.spyOn(carUseCase, carUseCase.choseRandomCar.name);

    const result = await carUseCase.getAvailableCar(carCategory);
    expect(carUseCase.choseRandomCar).toHaveBeenCalledOnce();
    expect(result).toEqual(car);
  });

  it('given a carCategroy, customer and numberOfDays it should final ammount in', async () => {
    const customer = Object.assign({}, mocks.validCustomer);
    customer.age = 50;

    const carCategory = Object.assign({}, mocks.validCarCategory);
    carCategory.price = 37.6;

    const numberOfDays = 5;

    const expected = carUseCase.currencyFormat(244.4);
    const result = carUseCase.calculateFinalPrice(customer, carCategory, numberOfDays);

    expect(expected).toEqual(result);
  });

  it('given a customer and a car category it should return a transaction receipt', async () => {
    const car = mocks.validCar;
    const carCategory = {
      ...mocks.validCarCategory,
      price: 37.6,
      carIds: [car.id]
    };

    const customer = Object.assign({}, mocks.validCustomer);
    customer.age = 20;

    const numberOfDays = 5;

    const today = new Date();
    const dueDate = '10 de novembro de 2020';

    const now = new Date(2020, 10, 5);
    vi.useFakeTimers(now.getTime());

    const expectedAmount = carUseCase.currencyFormat(206.8);
    const result = await carUseCase.rent(customer, carCategory, numberOfDays);

    const expected = new Transaction({ customer, car, dueDate, amount: expectedAmount });
  });
});
