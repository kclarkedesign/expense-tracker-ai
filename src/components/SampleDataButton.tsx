'use client';

import { Database } from 'lucide-react';
import { useExpenses } from '@/context/ExpenseContext';
import { generateId } from '@/lib/utils';
import { Expense } from '@/types/expense';

export function SampleDataButton() {
  const { addExpense, expenses } = useExpenses();

  const sampleExpenses: Omit<Expense, 'id' | 'createdAt'>[] = [
    { amount: 12.50, category: 'Food', description: 'Coffee and pastry', date: '2025-08-15' },
    { amount: 45.00, category: 'Transportation', description: 'Gas for car', date: '2025-08-14' },
    { amount: 25.99, category: 'Entertainment', description: 'Movie tickets', date: '2025-08-13' },
    { amount: 89.99, category: 'Shopping', description: 'New shoes', date: '2025-08-12' },
    { amount: 120.00, category: 'Bills', description: 'Electric bill', date: '2025-08-10' },
    { amount: 15.75, category: 'Food', description: 'Lunch at restaurant', date: '2025-08-09' },
    { amount: 8.99, category: 'Other', description: 'Phone case', date: '2025-08-08' },
    { amount: 35.50, category: 'Food', description: 'Groceries', date: '2025-08-07' },
    { amount: 75.00, category: 'Transportation', description: 'Public transit monthly pass', date: '2025-08-01' },
    { amount: 22.99, category: 'Entertainment', description: 'Streaming service subscription', date: '2025-07-28' },
  ];

  const addSampleData = () => {
    sampleExpenses.forEach(expense => {
      const newExpense: Expense = {
        ...expense,
        id: generateId(),
        createdAt: new Date().toISOString(),
      };
      addExpense(newExpense);
    });
  };

  if (expenses.length > 0) return null;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
      <Database className="h-12 w-12 text-blue-600 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">No expenses yet</h3>
      <p className="text-gray-600 mb-4">
        Get started by adding some sample expenses to see how the app works.
      </p>
      <button
        onClick={addSampleData}
        className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <Database className="h-4 w-4" />
        <span>Add Sample Data</span>
      </button>
    </div>
  );
}