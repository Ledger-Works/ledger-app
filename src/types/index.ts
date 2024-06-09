type Currency = {
  name: string;
  code: string;
  symbol: string;
}

type ExpenseType = {
  type: string;
  label: string;
  icon: string;
}

type Expense = {
  expenseType: ExpenseType;
  currency: Currency;
  expenseValue: number;
  time: Date;
}
