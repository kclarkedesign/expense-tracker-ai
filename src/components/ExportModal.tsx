'use client';

import React, { useState, useMemo } from 'react';
import { X, Download, FileText, Database, Filter, Calendar, Eye, Loader2 } from 'lucide-react';
import { Expense, ExpenseCategory } from '@/types/expense';
import { formatCurrency, cn } from '@/lib/utils';

export type ExportFormat = 'csv' | 'json' | 'pdf';

interface ExportFilters {
  startDate?: string;
  endDate?: string;
  categories: ExpenseCategory[];
}

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  expenses: Expense[];
  onExport: (data: Expense[], format: ExportFormat, filename: string) => Promise<void>;
}

const CATEGORIES: ExpenseCategory[] = ['Food', 'Transportation', 'Entertainment', 'Shopping', 'Bills', 'Other'];

export function ExportModal({ isOpen, onClose, expenses, onExport }: ExportModalProps) {
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('csv');
  const [filename, setFilename] = useState('expenses-export');
  const [filters, setFilters] = useState<ExportFilters>({
    categories: [...CATEGORIES],
  });
  const [showPreview, setShowPreview] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const filteredExpenses = useMemo(() => {
    return expenses.filter(expense => {
      // Date filtering
      if (filters.startDate && expense.date < filters.startDate) return false;
      if (filters.endDate && expense.date > filters.endDate) return false;
      
      // Category filtering
      if (!filters.categories.includes(expense.category)) return false;
      
      return true;
    });
  }, [expenses, filters]);

  const handleExport = async () => {
    if (filteredExpenses.length === 0) return;
    
    setIsExporting(true);
    try {
      await onExport(filteredExpenses, selectedFormat, filename);
      onClose();
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const formatOptions = [
    {
      value: 'csv' as const,
      label: 'CSV',
      description: 'Spreadsheet format',
      icon: FileText,
    },
    {
      value: 'json' as const,
      label: 'JSON',
      description: 'Data format',
      icon: Database,
    },
    {
      value: 'pdf' as const,
      label: 'PDF',
      description: 'Document format',
      icon: FileText,
    },
  ];

  const toggleCategory = (category: ExpenseCategory) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category],
    }));
  };

  const selectAllCategories = () => {
    setFilters(prev => ({ ...prev, categories: [...CATEGORIES] }));
  };

  const clearAllCategories = () => {
    setFilters(prev => ({ ...prev, categories: [] }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Download className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Export Expenses</h2>
              <p className="text-sm text-gray-500">Export your expense data in various formats</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="space-y-6">
            {/* Export Format Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Export Format
              </label>
              <div className="grid grid-cols-3 gap-3">
                {formatOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSelectedFormat(option.value)}
                    className={cn(
                      'p-4 border-2 rounded-lg transition-all text-left',
                      selectedFormat === option.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    )}
                  >
                    <div className="flex items-center space-x-3">
                      <option.icon className={cn(
                        'h-5 w-5',
                        selectedFormat === option.value ? 'text-blue-600' : 'text-gray-400'
                      )} />
                      <div>
                        <div className="font-medium text-gray-900">{option.label}</div>
                        <div className="text-sm text-gray-500">{option.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Filename Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filename
              </label>
              <div className="flex">
                <input
                  type="text"
                  value={filename}
                  onChange={(e) => setFilename(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter filename"
                />
                <div className="px-3 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg text-sm text-gray-600">
                  .{selectedFormat}
                </div>
              </div>
            </div>

            {/* Date Range Filters */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                <Calendar className="inline h-4 w-4 mr-1" />
                Date Range
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={filters.startDate || ''}
                    onChange={(e) => setFilters(prev => ({ ...prev, startDate: e.target.value || undefined }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">End Date</label>
                  <input
                    type="date"
                    value={filters.endDate || ''}
                    onChange={(e) => setFilters(prev => ({ ...prev, endDate: e.target.value || undefined }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Category Filters */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  <Filter className="inline h-4 w-4 mr-1" />
                  Categories
                </label>
                <div className="space-x-2">
                  <button
                    onClick={selectAllCategories}
                    className="text-xs text-blue-600 hover:text-blue-800"
                  >
                    Select All
                  </button>
                  <button
                    onClick={clearAllCategories}
                    className="text-xs text-gray-600 hover:text-gray-800"
                  >
                    Clear All
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES.map((category) => (
                  <label key={category} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.categories.includes(category)}
                      onChange={() => toggleCategory(category)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Export Summary */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Export Summary</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Records to export:</span>
                  <span className="ml-2 font-medium text-gray-900">{filteredExpenses.length}</span>
                </div>
                <div>
                  <span className="text-gray-600">Total amount:</span>
                  <span className="ml-2 font-medium text-gray-900">
                    {formatCurrency(filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0))}
                  </span>
                </div>
              </div>
            </div>

            {/* Preview Toggle */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
              >
                <Eye className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {showPreview ? 'Hide Preview' : 'Show Preview'}
                </span>
              </button>
            </div>

            {/* Data Preview */}
            {showPreview && (
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                  <h4 className="text-sm font-medium text-gray-700">Data Preview</h4>
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {filteredExpenses.length > 0 ? (
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 sticky top-0">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {filteredExpenses.slice(0, 10).map((expense) => (
                          <tr key={expense.id}>
                            <td className="px-4 py-2 text-gray-900">{expense.date}</td>
                            <td className="px-4 py-2 text-gray-900">{formatCurrency(expense.amount)}</td>
                            <td className="px-4 py-2 text-gray-900">{expense.category}</td>
                            <td className="px-4 py-2 text-gray-900 truncate max-w-xs">{expense.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="p-8 text-center text-gray-500">
                      No expenses match the selected filters
                    </div>
                  )}
                  {filteredExpenses.length > 10 && (
                    <div className="p-2 bg-gray-50 text-center text-xs text-gray-500">
                      Showing first 10 of {filteredExpenses.length} records
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            disabled={filteredExpenses.length === 0 || isExporting || !filename.trim()}
            className={cn(
              'flex items-center space-x-2 px-6 py-2 rounded-lg font-medium transition-colors',
              filteredExpenses.length === 0 || !filename.trim()
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            )}
          >
            {isExporting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Exporting...</span>
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                <span>Export {filteredExpenses.length} Records</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}