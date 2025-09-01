'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Expense, ExpenseFilters } from '@/types/expense';
import { storageUtils } from '@/lib/storage';

interface ExpenseContextType {
  expenses: Expense[];
  filteredExpenses: Expense[];
  filters: ExpenseFilters;
  addExpense: (expense: Expense) => void;
  updateExpense: (expense: Expense) => void;
  deleteExpense: (id: string) => void;
  setFilters: (filters: ExpenseFilters) => void;
  isLoading: boolean;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export function ExpenseProvider({ children }: { children: React.ReactNode }) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filters, setFilters] = useState<ExpenseFilters>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadedExpenses = storageUtils.getExpenses();
    setExpenses(loadedExpenses);
    setIsLoading(false);
  }, []);

  const addExpense = (expense: Expense) => {
    const updatedExpenses = [...expenses, expense];
    setExpenses(updatedExpenses);
    storageUtils.saveExpenses(updatedExpenses);
  };

  const updateExpense = (updatedExpense: Expense) => {
    const updatedExpenses = expenses.map(exp => 
      exp.id === updatedExpense.id ? updatedExpense : exp
    );
    setExpenses(updatedExpenses);
    storageUtils.saveExpenses(updatedExpenses);
  };

  const deleteExpense = (id: string) => {
    const updatedExpenses = expenses.filter(exp => exp.id !== id);
    setExpenses(updatedExpenses);
    storageUtils.saveExpenses(updatedExpenses);
  };


  const filteredExpenses = expenses.filter(expense => {
    if (filters.category && filters.category !== 'All' && expense.category !== filters.category) {
      return false;
    }
    if (filters.startDate && expense.date < filters.startDate) {
      return false;
    }
    if (filters.endDate && expense.date > filters.endDate) {
      return false;
    }
    if (filters.searchTerm && 
        !expense.description.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
        !expense.category.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        filteredExpenses,
        filters,
        addExpense,
        updateExpense,
        deleteExpense,
        setFilters,
        isLoading,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpenses() {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error('useExpenses must be used within an ExpenseProvider');
  }
  return context;
}