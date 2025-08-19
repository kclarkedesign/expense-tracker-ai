'use client';

import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Calendar, Target } from 'lucide-react';
import { useExpenses } from '@/context/ExpenseContext';
import { formatCurrency, cn } from '@/lib/utils';
import { ExpenseCategory } from '@/types/expense';
import { SampleDataButton } from './SampleDataButton';

const COLORS = {
  Food: '#10b981',
  Transportation: '#3b82f6',
  Entertainment: '#8b5cf6',
  Shopping: '#ec4899',
  Bills: '#f59e0b',
  Other: '#6b7280',
};

export function Dashboard() {
  const { expenses } = useExpenses();

  const analytics = useMemo(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    const thisMonthExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
    });

    const lastMonthExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === lastMonth && expenseDate.getFullYear() === lastMonthYear;
    });

    const totalSpending = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const monthlySpending = thisMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    const lastMonthSpending = lastMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);

    const categoryTotals = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as Record<ExpenseCategory, number>);

    const topCategories = Object.entries(categoryTotals)
      .map(([category, amount]) => ({
        category: category as ExpenseCategory,
        amount,
        percentage: totalSpending > 0 ? (amount / totalSpending) * 100 : 0,
      }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);

    const monthlyTrend = Array.from({ length: 6 }, (_, i) => {
      const date = new Date(currentYear, currentMonth - i, 1);
      const monthExpenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate.getMonth() === date.getMonth() && 
               expenseDate.getFullYear() === date.getFullYear();
      });
      return {
        month: date.toLocaleDateString('en-US', { month: 'short' }),
        amount: monthExpenses.reduce((sum, expense) => sum + expense.amount, 0),
      };
    }).reverse();

    const pieData = topCategories.map(cat => ({
      name: cat.category,
      value: cat.amount,
      percentage: cat.percentage,
    }));

    return {
      totalSpending,
      monthlySpending,
      lastMonthSpending,
      topCategories,
      monthlyTrend,
      pieData,
      totalExpenses: expenses.length,
      averageExpense: expenses.length > 0 ? totalSpending / expenses.length : 0,
    };
  }, [expenses]);

  const monthlyChange = analytics.lastMonthSpending > 0 
    ? ((analytics.monthlySpending - analytics.lastMonthSpending) / analytics.lastMonthSpending) * 100
    : 0;

  return (
    <div className="space-y-6">
      <SampleDataButton />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Spending</p>
              <p className="text-2xl font-semibold text-gray-900">
                {formatCurrency(analytics.totalSpending)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">This Month</p>
              <p className="text-2xl font-semibold text-gray-900">
                {formatCurrency(analytics.monthlySpending)}
              </p>
              {analytics.lastMonthSpending > 0 && (
                <div className="flex items-center mt-1">
                  {monthlyChange >= 0 ? (
                    <TrendingUp className="h-4 w-4 text-red-500 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
                  )}
                  <span className={cn(
                    'text-sm font-medium',
                    monthlyChange >= 0 ? 'text-red-600' : 'text-green-600'
                  )}>
                    {Math.abs(monthlyChange).toFixed(1)}%
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Target className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Average Expense</p>
              <p className="text-2xl font-semibold text-gray-900">
                {formatCurrency(analytics.averageExpense)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-600 font-semibold">#</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Expenses</p>
              <p className="text-2xl font-semibold text-gray-900">
                {analytics.totalExpenses}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Spending Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics.monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `$${value}`} />
              <Tooltip formatter={(value) => [formatCurrency(Number(value)), 'Amount']} />
              <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Spending by Category</h3>
          {analytics.pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analytics.pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percentage }) => `${name}: ${percentage.toFixed(1)}%`}
                >
                  {analytics.pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[entry.name as ExpenseCategory]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [formatCurrency(Number(value)), 'Amount']} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[300px] text-gray-500">
              No expense data available
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Categories</h3>
        <div className="space-y-4">
          {analytics.topCategories.map((category, index) => (
            <div key={category.category} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-600">#{index + 1}</span>
                <span className={cn(
                  'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                  {
                    'bg-green-100 text-green-800': category.category === 'Food',
                    'bg-blue-100 text-blue-800': category.category === 'Transportation',
                    'bg-purple-100 text-purple-800': category.category === 'Entertainment',
                    'bg-pink-100 text-pink-800': category.category === 'Shopping',
                    'bg-yellow-100 text-yellow-800': category.category === 'Bills',
                    'bg-gray-100 text-gray-800': category.category === 'Other',
                  }
                )}>
                  {category.category}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-900">
                  {formatCurrency(category.amount)}
                </span>
                <span className="text-sm text-gray-500">
                  ({category.percentage.toFixed(1)}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}