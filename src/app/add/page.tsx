import { Navigation } from '@/components/Navigation';
import { ExpenseForm } from '@/components/ExpenseForm';

export default function AddExpense() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Add Expense</h1>
          <p className="text-gray-600 mt-2">Record a new expense to track your spending</p>
        </div>
        <div className="max-w-2xl">
          <ExpenseForm />
        </div>
      </main>
    </div>
  );
}