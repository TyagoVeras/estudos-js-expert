class Transaction {
  private customer = {};
  private car = {};
  private dueDate = {};
  private amount = {};
  constructor({ customer, car, dueDate, amount }) {
    this.customer = customer;
    this.car = car;
    this.dueDate = dueDate;
    this.amount = amount;
  }
}
export { Transaction };
