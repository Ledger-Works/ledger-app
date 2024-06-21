import type { DateValue } from "@internationalized/date";

export type Currency = {
  name: string;
  code: string;
  symbol: string;
}

export type ExpenseType = {
  value: string;
  label: string;
  icon: string;
}

export type Expense = {
  id: string,
  expenseType: ExpenseType;
  currency: Currency;
  expenseValue: number;
  time: DateValue | string;
}
