import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const initialIncome = 0;
    const income = this.transactions.reduce((acumulador, valorAtual) => {
      return valorAtual.type === 'income'
        ? acumulador + valorAtual.value
        : acumulador;
    }, initialIncome);

    const initialOutcome = 0;
    const outcome = this.transactions.reduce((acumulador, valorAtual) => {
      return valorAtual.type === 'outcome'
        ? acumulador + valorAtual.value
        : acumulador;
    }, initialOutcome);

    return {
      income,
      outcome,
      total: income - outcome,
    };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
