# ExpenseList Component - Developer Documentation

**Component**: `ExpenseList`
**Location**: [src/components/ExpenseList.tsx](../../src/components/ExpenseList.tsx)
**Type**: Client Component (`'use client'`)

[← Back to App Overview](app-overview.md)

---

## Overview

ExpenseList provides a comprehensive expense management interface with filtering, search, and CRUD operations. It displays expenses in a table format and includes inline editing capabilities.

## Component Signature

```typescript
export function ExpenseList(): JSX.Element
```

**Props**: None (uses context for data)

## Dependencies

```typescript
import { useState } from 'react';
import { Edit2, Trash2, Search, Filter, Download } from 'lucide-react';
import { ExpenseCategory, ExpenseFilters } from '@/types/expense';
import { useExpenses } from '@/context/ExpenseContext';
import { formatCurrency, formatDate, cn } from '@/lib/utils';
import { ExpenseForm } from './ExpenseForm';
```

---

## Features

### 1. Filtering System

**Filter Types**:
- **Search** (text): Searches description and category
- **Category**: Filter by single category or "All"
- **Date Range**: Start date and end date

**Implementation**: Lines [16-21](../../src/components/ExpenseList.tsx#L16-L21)

```typescript
const handleFilterChange = (key: keyof ExpenseFilters, value: string) => {
  setFilters({
    ...filters,
    [key]: value || undefined,
  });
};
```

**Filter UI**: Lines [54-96](../../src/components/ExpenseList.tsx#L54-L96)

### 2. Expense Table

**Columns**:
- Date
- Description
- Category (with colored badge)
- Amount
- Actions (Edit/Delete)

**Implementation**: Lines [107-184](../../src/components/ExpenseList.tsx#L107-L184)

### 3. Inline Editing

Clicking edit button shows ExpenseForm inline above the table.

**State**: Lines [14](../../src/components/ExpenseList.tsx#L14)
```typescript
const [editingExpense, setEditingExpense] = useState<string | null>(null);
```

**Edit Handler**: Lines [164-167](../../src/components/ExpenseList.tsx#L164-L167)

### 4. CSV Export

**Button Location**: Lines [43-49](../../src/components/ExpenseList.tsx#L43-L49)

**Context Method**: `exportExpenses()` from ExpenseContext

**Behavior**:
- Exports currently filtered expenses
- Downloads as `expenses-YYYY-MM-DD.csv`

### 5. Delete Confirmation

**Implementation**: Lines [23-27](../../src/components/ExpenseList.tsx#L23-L27)

```typescript
const handleDeleteExpense = (id: string) => {
  if (window.confirm('Are you sure you want to delete this expense?')) {
    deleteExpense(id);
  }
};
```

---

## Filter Implementation

### Categories Array

**Location**: Line [10](../../src/components/ExpenseList.tsx#L10)

```typescript
const categories: (ExpenseCategory | 'All')[] = [
  'All', 'Food', 'Transportation', 'Entertainment', 'Shopping', 'Bills', 'Other'
];
```

### Search Input

**Location**: Lines [55-64](../../src/components/ExpenseList.tsx#L55-L64)

```typescript
<input
  type="text"
  placeholder="Search expenses..."
  value={filters.searchTerm || ''}
  onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
  className="..."
/>
```

**Searches**: Both description and category fields (handled in ExpenseContext)

### Category Dropdown

**Location**: Lines [66-79](../../src/components/ExpenseList.tsx#L66-L79)

```typescript
<select
  value={filters.category || 'All'}
  onChange={(e) => handleFilterChange('category', e.target.value)}
  className="..."
>
  {categories.map((category) => (
    <option key={category} value={category}>{category}</option>
  ))}
</select>
```

### Date Range Inputs

**Start Date**: Lines [81-87](../../src/components/ExpenseList.tsx#L81-L87)
**End Date**: Lines [89-95](../../src/components/ExpenseList.tsx#L89-L95)

```typescript
<input
  type="date"
  value={filters.startDate || ''}
  onChange={(e) => handleFilterChange('startDate', e.target.value)}
  className="..."
/>
```

---

## Table Rendering

### Loading State

**Location**: Lines [29-35](../../src/components/ExpenseList.tsx#L29-L35)

```typescript
if (isLoading) {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  );
}
```

### Empty State

**Location**: Lines [108-113](../../src/components/ExpenseList.tsx#L108-L113)

```typescript
{filteredExpenses.length === 0 ? (
  <div className="text-center py-12">
    <div className="text-gray-400 text-lg mb-2">No expenses found</div>
    <p className="text-gray-500">Add your first expense to get started!</p>
  </div>
) : (
  // Table content
)}
```

### Table Headers

**Location**: Lines [116-133](../../src/components/ExpenseList.tsx#L116-L133)

```typescript
<thead className="bg-gray-50">
  <tr>
    <th>Date</th>
    <th>Description</th>
    <th>Category</th>
    <th>Amount</th>
    <th>Actions</th>
  </tr>
</thead>
```

### Table Rows

**Location**: Lines [135-179](../../src/components/ExpenseList.tsx#L135-L179)

**Date Column**:
```typescript
<td>{formatDate(expense.date)}</td>
```

**Description Column**:
```typescript
<td>
  <div className="max-w-xs truncate">{expense.description}</div>
</td>
```

**Category Column** (with colored badge):
```typescript
<td>
  <span className={cn(
    'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
    {
      'bg-green-100 text-green-800': expense.category === 'Food',
      'bg-blue-100 text-blue-800': expense.category === 'Transportation',
      'bg-purple-100 text-purple-800': expense.category === 'Entertainment',
      'bg-pink-100 text-pink-800': expense.category === 'Shopping',
      'bg-yellow-100 text-yellow-800': expense.category === 'Bills',
      'bg-gray-100 text-gray-800': expense.category === 'Other',
    }
  )}>
    {expense.category}
  </span>
</td>
```

**Amount Column**:
```typescript
<td>{formatCurrency(expense.amount)}</td>
```

**Actions Column**:
```typescript
<td>
  <button onClick={() => setEditingExpense(expense.id)}>
    <Edit2 className="h-4 w-4" />
  </button>
  <button onClick={() => handleDeleteExpense(expense.id)}>
    <Trash2 className="h-4 w-4" />
  </button>
</td>
```

---

## Inline Edit Form

**Location**: Lines [100-105](../../src/components/ExpenseList.tsx#L100-L105)

```typescript
{editingExpense && (
  <ExpenseForm
    expense={filteredExpenses.find(exp => exp.id === editingExpense)}
    onSuccess={() => setEditingExpense(null)}
  />
)}
```

**Flow**:
1. User clicks Edit button
2. `editingExpense` state set to expense ID
3. ExpenseForm rendered with expense data
4. On successful update, `onSuccess` callback clears `editingExpense`
5. Form disappears

---

## Responsive Design

### Grid Layout for Filters

**Location**: Line [54](../../src/components/ExpenseList.tsx#L54)

```typescript
className="grid grid-cols-1 md:grid-cols-4 gap-4"
```

**Breakpoints**:
- Mobile: Single column
- Desktop (md+): 4 columns

### Table Responsiveness

**Location**: Line [114](../../src/components/ExpenseList.tsx#L114)

```typescript
<div className="overflow-x-auto">
  <table className="min-w-full divide-y divide-gray-200">
```

Horizontal scroll on small screens.

---

## Integration with Context

### Context Values Used

```typescript
const {
  filteredExpenses,  // Already filtered by context
  filters,           // Current filter state
  setFilters,        // Update filters
  deleteExpense,     // Delete function
  exportExpenses,    // Export to CSV
  isLoading         // Loading state
} = useExpenses();
```

**Key Point**: Filtering logic is in ExpenseContext, not this component. Component just sets filter values.

---

## Styling

### Category Badge Colors

Same color scheme as Dashboard:

```typescript
{
  'bg-green-100 text-green-800': expense.category === 'Food',
  'bg-blue-100 text-blue-800': expense.category === 'Transportation',
  'bg-purple-100 text-purple-800': expense.category === 'Entertainment',
  'bg-pink-100 text-pink-800': expense.category === 'Shopping',
  'bg-yellow-100 text-yellow-800': expense.category === 'Bills',
  'bg-gray-100 text-gray-800': expense.category === 'Other',
}
```

### Hover Effects

**Table Rows**: Lines [137](../../src/components/ExpenseList.tsx#L137)
```typescript
className="hover:bg-gray-50"
```

**Action Buttons**:
```typescript
className="hover:text-blue-900 hover:bg-blue-50"  // Edit
className="hover:text-red-900 hover:bg-red-50"    // Delete
```

---

## Performance Considerations

### Optimizations

- Filtering done in context (memoized)
- Simple array mapping for table rows
- Conditional rendering of edit form

### Potential Issues

- Large tables (100+ rows) may scroll slowly
- No virtualization
- All rows rendered at once

### Improvements

1. **Virtual Scrolling**: Render only visible rows
2. **Pagination**: Show 25-50 per page
3. **Lazy Loading**: Load more as you scroll

---

## Testing

### Test Cases

**Filtering**:
1. ✅ Search filters description and category
2. ✅ Category filter works
3. ✅ Date range filters correctly
4. ✅ Filters combine (AND logic)
5. ✅ Clearing filter shows all expenses

**CRUD Operations**:
1. ✅ Edit button shows inline form
2. ✅ Delete prompts confirmation
3. ✅ Delete removes expense
4. ✅ Export downloads CSV

**UI States**:
1. ✅ Loading spinner shows
2. ✅ Empty state displays
3. ✅ Table renders expenses
4. ✅ Responsive on mobile

---

## Future Enhancements

1. **Bulk Operations**
   - Select multiple expenses
   - Bulk delete
   - Bulk category change

2. **Sorting**
   - Click column headers to sort
   - Multi-column sorting

3. **Pagination**
   - Page size selector
   - Page navigation

4. **Advanced Filters**
   - Amount range
   - Multiple categories
   - Custom date ranges

5. **Export Options**
   - Excel format
   - PDF export
   - Custom column selection

---

## Related Documentation

- **[App Overview](app-overview.md)** - Application architecture
- **[Expense Context](expense-context.md)** - Filtering logic
- **[Expense Form](expense-form.md)** - Edit form details
- **[User List Guide](../user/expense-list.md)** - User-facing documentation

---

**Last Updated**: 2025-11-09
