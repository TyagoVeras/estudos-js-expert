import { BaseRepository } from '../repository/base/BaseRepository';
import { Tax } from '../tax';
import { Transaction } from '../transaction';
class CarUseCase {
  private carRepository: BaseRepository;
  private taxUtil: Tax;
  constructor({ cars }: { cars: string }) {
    this.carRepository = new BaseRepository({ file: cars });
    this.taxUtil = Tax.taxesBasedOnAge;
  }

  currencyFormat(number: number) {
    return Intl.NumberFormat('pt-br', {
      style: 'currency',
      currency: 'BRL'
    }).format(number);
  }

  getRandomPositionFromArray(list: number[]): number {
    const listLength = list.length;
    return Math.floor(Math.random() * listLength);
  }

  choseRandomCar(carCategory: any) {
    const randomIndex = this.getRandomPositionFromArray(carCategory.carIds);
    const carId = carCategory.carIds[randomIndex];
    return carId;
  }

  async getAvailableCar(carCategory: any) {
    const carChosenId = this.choseRandomCar(carCategory);
    const car = this.carRepository.find(carChosenId);
    return car;
  }

  calculateFinalPrice(customer: any, carCategory: any, numberOfDays: any) {
    const { age } = customer;
    const { price } = carCategory;
    const tax = this.taxUtil.find((tax) => age >= tax.from && age <= tax.to);
    const finalPrice = tax * price * numberOfDays;
    const formattedPricer = this.currencyFormat(finalPrice);
    return formattedPricer;
  }

  async rent(customer, carCategory, numberOfDays) {
    const car = await this.getAvailableCar(carCategory);
    const finalPrice = await this.calculateFinalPrice(customer, carCategory, numberOfDays);

    const today = new Date();
    today.setDate(today.getDate() + numberOfDays);
    const dueDate = today.toLocaleDateString('pt-br', { year: 'numeric', month: 'long', day: 'numeric' });

    const transaction = new Transaction({
      customer: customer,
      amount: finalPrice,
      car: car,
      dueDate
    });

    return transaction;
  }
}

export { CarUseCase };
