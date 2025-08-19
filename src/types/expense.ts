export type ExpenseCategory = 'Food' | 'Transportation' | 'Entertainment' | 'Shopping' | 'Bills' | 'Other';

export interface Expense {
  id: string;
  amount: number;
  category: ExpenseCategory;
  description: string;
  date: string;
  createdAt: string;
}

export interface ExpenseFormData {
  amount: string;
  category: ExpenseCategory;
  description: string;
  date: string;
}

export interface ExpenseFilters {
  category?: ExpenseCategory | 'All';
  startDate?: string;
  endDate?: string;
  searchTerm?: string;
}

export interface ExpenseSummary {
  totalSpending: number;
  monthlySpending: number;
  topCategories: Array<{
    category: ExpenseCategory;
    amount: number;
    percentage: number;
  }>;
  monthlyTrend: Array<{
    month: string;
    amount: number;
  }>;
}