export type Currency = {
  code: string;
  name: string;
  symbol: string;
}

export type ExpenseType = {
  id: string;
  value: string;
  label: string;
  icon: string;
}

export type User = {
  id: string;
  name: string;
  email: string;
}

export type GroupResponse = {
  id: string;
  name: string;
  description: string;
  is_personal_space: boolean;
}

export type Group = {
  id: string;
  name: string;
  description: string;
  isPersonalSpace: boolean;
}

export type UserGroupRole = {
  userId: string;
  groupId: string;
  role: 'admin' | 'member';
  balance: number;
}

export type Expense = {
  id: string;
  groupId: string;
  description: string;
  expenseTypeId: string;
  currencyCode: string;
  amount: number;
  time: Date;
  paidBy: string;
}

export type ExpenseSplit = {
  id: string;
  expenseId: string;
  userId: string;
  amount: number;
  percentage: number;
}

// You might also want to create a more comprehensive type that includes related data
export type ExpenseWithDetails = {
  id: string;
  groupId: string;
  description: string;
  expenseType: ExpenseType;
  currency: Currency;
  amount: number;
  time: Date;
  paidBy: User;
  splits: ExpenseSplit[];
}


export type NewExpense = {
  groupId: string;
  description: string;
  expenseTypeId: string;
  currencyCode: string;
  amount: number;
  time: Date;
  paidBy: string;
  splits: ExpenseSplit[];
};

export type ExpenseResponse = {
  id: string;
  group_id: string;
  description: string;
  expense_types: ExpenseType
  currencies: Currency
  users: User
  expense_type_id: string;
  currency_code: string;
  amount: number;
  time: string; // This will likely be a string representation of a timestamp
  paid_by: string;
  // Supabase might also return these fields:
  created_at?: string;
  updated_at?: string;
};


// A type for updating an expense
export type UpdateExpense = Partial<NewExpense>;