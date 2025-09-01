'use client';

import React, { useState } from 'react';
import { ArrowRight, Users, Calendar, Filter } from 'lucide-react';
import { Expense, ExpenseCategory } from '@/types/expense';
import { ExportTemplate, CloudExportFilters } from '@/types/cloud-export';
import { CloudExportService } from '@/lib/cloud-export';
import { formatCurrency, cn } from '@/lib/utils';

const CATEGORIES: ExpenseCategory[] = ['Food', 'Transportation', 'Entertainment', 'Shopping', 'Bills', 'Other'];

interface ExportTemplateSelectorProps {
  expenses: Expense[];
  onTemplateSelect: (template: ExportTemplate) => void;
}

export function ExportTemplateSelector({ expenses, onTemplateSelect }: ExportTemplateSelectorProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<ExportTemplate | null>(null);
  const [filters, setFilters] = useState<CloudExportFilters>({
    categories: [...CATEGORIES],
    template: ''
  });

  const templates = CloudExportService.getExportTemplates();

  const filteredExpenses = expenses.filter(expense => {
    if (filters.dateRange) {
      if (expense.date < filters.dateRange.start || expense.date > filters.dateRange.end) {
        return false;
      }
    }
    if (!filters.categories.includes(expense.category)) {
      return false;
    }
    if (filters.minAmount && expense.amount < filters.minAmount) {
      return false;
    }
    if (filters.maxAmount && expense.amount > filters.maxAmount) {
      return false;
    }
    return true;
  });

  const previewData = selectedTemplate 
    ? CloudExportService.generateTemplateData(filteredExpenses, selectedTemplate)
    : null;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Choose Export Template</h2>
        <p className="text-gray-600 mt-2">Select a template optimized for your specific use case</p>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <div
            key={template.id}
            onClick={() => setSelectedTemplate(template)}
            className={cn(
              'p-6 border-2 rounded-xl cursor-pointer transition-all hover:shadow-lg',
              selectedTemplate?.id === template.id
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-gray-200 hover:border-gray-300'
            )}
          >
            <div className="text-4xl mb-3">{template.icon}</div>
            <h3 className="font-semibold text-gray-900 mb-2">{template.name}</h3>
            <p className="text-sm text-gray-600 mb-3">{template.description}</p>
            
            {template.targetAudience && (
              <div className="flex items-center text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full w-fit">
                <Users className="h-3 w-3 mr-1" />
                {template.targetAudience}
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedTemplate && (
        <div className="border border-gray-200 rounded-xl bg-gray-50 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Configure {selectedTemplate.name}
            </h3>
            <div className="text-sm text-gray-600">
              {filteredExpenses.length} records • {formatCurrency(filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0))}
            </div>
          </div>

          {/* Quick Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="inline h-4 w-4 mr-1" />
                Date Range
              </label>
              <div className="space-y-2">
                <input
                  type="date"
                  value={filters.dateRange?.start || ''}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    dateRange: { 
                      start: e.target.value, 
                      end: prev.dateRange?.end || '' 
                    }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
                <input
                  type="date"
                  value={filters.dateRange?.end || ''}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    dateRange: { 
                      start: prev.dateRange?.start || '', 
                      end: e.target.value 
                    }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Filter className="inline h-4 w-4 mr-1" />
                Amount Range
              </label>
              <div className="space-y-2">
                <input
                  type="number"
                  placeholder="Min amount"
                  value={filters.minAmount || ''}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    minAmount: e.target.value ? parseFloat(e.target.value) : undefined
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
                <input
                  type="number"
                  placeholder="Max amount"
                  value={filters.maxAmount || ''}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    maxAmount: e.target.value ? parseFloat(e.target.value) : undefined
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categories
              </label>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {CATEGORIES.map((category) => (
                  <label key={category} className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      checked={filters.categories.includes(category)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFilters(prev => ({
                            ...prev,
                            categories: [...prev.categories, category]
                          }));
                        } else {
                          setFilters(prev => ({
                            ...prev,
                            categories: prev.categories.filter(c => c !== category)
                          }));
                        }
                      }}
                      className="mr-2 rounded text-blue-600"
                    />
                    {category}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Template Preview */}
          {previewData && (
            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
              <h4 className="font-medium text-gray-900 mb-3">Template Preview</h4>
              <div className="text-sm space-y-2">
                {selectedTemplate.id === 'tax-report' && previewData.summary && (
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <span className="text-gray-600">Total Deductions:</span>
                      <div className="font-medium">{formatCurrency(previewData.summary.totalDeductions)}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Tax Year:</span>
                      <div className="font-medium">{previewData.summary.taxYear}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Records:</span>
                      <div className="font-medium">{previewData.summary.recordCount}</div>
                    </div>
                  </div>
                )}

                {selectedTemplate.id === 'monthly-summary' && previewData.metrics && (
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <span className="text-gray-600">Total Spent:</span>
                      <div className="font-medium">{formatCurrency(previewData.metrics.totalSpent)}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Avg Transaction:</span>
                      <div className="font-medium">{formatCurrency(previewData.metrics.averageTransaction)}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Transactions:</span>
                      <div className="font-medium">{previewData.metrics.transactionCount}</div>
                    </div>
                  </div>
                )}

                {selectedTemplate.id === 'category-analysis' && previewData.insights && (
                  <div className="space-y-2">
                    <span className="text-gray-600">Top Categories:</span>
                    {previewData.insights.slice(0, 3).map((insight: any, index: number) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{insight.category}</span>
                        <span className="font-medium">{formatCurrency(insight.amount)} ({insight.percentage.toFixed(1)}%)</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className="flex justify-end">
            <button
              onClick={() => onTemplateSelect(selectedTemplate)}
              disabled={filteredExpenses.length === 0}
              className={cn(
                'flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors',
                filteredExpenses.length === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
              )}
            >
              <span>Continue with {selectedTemplate.name}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}