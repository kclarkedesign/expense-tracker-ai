# Expense Tracker - Developer Documentation

## Overview

The Expense Tracker is a full-stack Next.js application that allows users to track personal expenses with real-time analytics, filtering, and data export capabilities. Built with TypeScript, React, and Tailwind CSS, it uses browser localStorage for data persistence.

## Architecture

### Technology Stack

- **Framework**: Next.js 14.2.31 (App Router)
- **Language**: TypeScript 5
- **UI Library**: React 18
- **Styling**: Tailwind CSS 3.4.1
- **Form Management**: React Hook Form 7.62.0
- **Validation**: Zod 4.0.17
- **Charts**: Recharts 3.1.2
- **Icons**: Lucide React 0.539.0
- **Date Handling**: date-fns 4.1.0

### Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with ExpenseProvider
│   ├── page.tsx           # Dashboard home page
│   ├── add/page.tsx       # Add expense page
│   └── expenses/page.tsx  # Expense list page
├── components/            # React components
│   ├── Dashboard.tsx      # Analytics dashboard with charts
│   ├── ExpenseForm.tsx    # Form for adding/editing expenses
│   ├── ExpenseList.tsx    # Filterable expense table
│   ├── Navigation.tsx     # Top navigation bar
│   └── SampleDataButton.tsx  # Sample data generator
├── context/
│   └── ExpenseContext.tsx # Global state management
├── lib/
│   ├── storage.ts         # localStorage utilities
│   └── utils.ts           # Helper functions
└── types/
    └── expense.ts         # TypeScript type definitions
```

## Core Features

### 1. State Management

**Location**: [src/context/ExpenseContext.tsx](../src/context/ExpenseContext.tsx)

The application uses React Context API for global state management:

```typescript
interface ExpenseContextType {
  expenses: Expense[];
  filteredExpenses: Expense[];
  filters: ExpenseFilters;
  addExpense: (expense: Expense) => void;
  updateExpense: (expense: Expense) => void;
  deleteExpense: (id: string) => void;
  setFilters: (filters: ExpenseFilters) => void;
  exportExpenses: () => void;
  isLoading: boolean;
}
```

**Key Functions**:
- `addExpense()` - Adds new expense and persists to localStorage
- `updateExpense()` - Updates existing expense
- `deleteExpense()` - Removes expense
- `setFilters()` - Updates filter criteria
- `exportExpenses()` - Exports filtered expenses to CSV

**Filtering Logic** ([src/context/ExpenseContext.tsx:65-81](../src/context/ExpenseContext.tsx#L65-L81)):
- Category filtering
- Date range filtering (startDate/endDate)
- Text search across description and category

### 2. Data Persistence

**Location**: [src/lib/storage.ts](../src/lib/storage.ts)

Uses browser localStorage with the key `expense-tracker-data`:

```typescript
export const storageUtils = {
  getExpenses: (): Expense[] => {...}
  saveExpenses: (expenses: Expense[]): void => {...}
  addExpense: (expense: Expense): void => {...}
  updateExpense: (updatedExpense: Expense): void => {...}
  deleteExpense: (id: string): void => {...}
  exportToCSV: (expenses: Expense[]): string => {...}
}
```

**CSV Export Format**:
```csv
Date,Amount,Category,Description
2024-11-09,45.50,Food,"Lunch at restaurant"
```

### 3. Form Validation

**Location**: [src/components/ExpenseForm.tsx:13-21](../src/components/ExpenseForm.tsx#L13-L21)

Zod schema validation:

```typescript
const expenseSchema = z.object({
  amount: z.string().min(1, 'Amount is required').refine(
    (val) => !isNaN(Number(val)) && Number(val) > 0,
    'Amount must be a positive number'
  ),
  category: z.enum(['Food', 'Transportation', 'Entertainment', 'Shopping', 'Bills', 'Other']),
  description: z.string().min(1, 'Description is required').max(200, 'Description must be less than 200 characters'),
  date: z.string().min(1, 'Date is required'),
});
```

### 4. Analytics Dashboard

**Location**: [src/components/Dashboard.tsx](../src/components/Dashboard.tsx)

The dashboard calculates and displays:

1. **Summary Cards** ([Dashboard.tsx:96-169](../src/components/Dashboard.tsx#L96-L169)):
   - Total Spending (all-time)
   - This Month spending with trend indicator
   - Average Expense
   - Total Expenses count

2. **Monthly Spending Trend** ([Dashboard.tsx:58-69](../src/components/Dashboard.tsx#L58-L69)):
   - Bar chart showing last 6 months
   - Uses Recharts library

3. **Category Distribution** ([Dashboard.tsx:71-75](../src/components/Dashboard.tsx#L71-L75)):
   - Pie chart with percentages
   - Color-coded categories

4. **Top Categories** ([Dashboard.tsx:49-56](../src/components/Dashboard.tsx#L49-L56)):
   - Ranked list with percentages
   - Category badges

**Analytics Calculation** ([Dashboard.tsx:23-87](../src/components/Dashboard.tsx#L23-L87)):
```typescript
const analytics = useMemo(() => {
  // Filters expenses by current/last month
  // Calculates totals, averages, trends
  // Groups by category
  // Generates time-series data
}, [expenses]);
```

## Data Models

**Location**: [src/types/expense.ts](../src/types/expense.ts)

### Core Types

```typescript
export type ExpenseCategory =
  'Food' | 'Transportation' | 'Entertainment' | 'Shopping' | 'Bills' | 'Other';

export interface Expense {
  id: string;              // UUID
  amount: number;          // Decimal value
  category: ExpenseCategory;
  description: string;     // Max 200 chars
  date: string;            // ISO date (YYYY-MM-DD)
  createdAt: string;       // ISO timestamp
}

export interface ExpenseFormData {
  amount: string;          // String for form input
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
```

## API Reference

### ExpenseContext Hook

```typescript
import { useExpenses } from '@/context/ExpenseContext';

const {
  expenses,           // All expenses
  filteredExpenses,   // Filtered by current filters
  filters,            // Current filter state
  addExpense,         // (expense: Expense) => void
  updateExpense,      // (expense: Expense) => void
  deleteExpense,      // (id: string) => void
  setFilters,         // (filters: ExpenseFilters) => void
  exportExpenses,     // () => void - Downloads CSV
  isLoading          // boolean
} = useExpenses();
```

### Utility Functions

**Location**: [src/lib/utils.ts](../src/lib/utils.ts)

```typescript
// Format number as currency
formatCurrency(amount: number): string

// Format date string
formatDate(dateString: string): string

// Generate unique ID
generateId(): string

// Conditional class names (tailwind-merge)
cn(...inputs): string
```

## Component Props

### ExpenseForm

```typescript
interface ExpenseFormProps {
  expense?: Expense;      // Optional for edit mode
  onSuccess?: () => void; // Callback after save
}
```

**Usage**:
```tsx
// Add mode
<ExpenseForm />

// Edit mode
<ExpenseForm
  expense={existingExpense}
  onSuccess={() => setEditingExpense(null)}
/>
```

## Styling System

### Category Colors

Consistent color scheme across components:

```typescript
const COLORS = {
  Food: '#10b981',         // Green
  Transportation: '#3b82f6', // Blue
  Entertainment: '#8b5cf6',  // Purple
  Shopping: '#ec4899',      // Pink
  Bills: '#f59e0b',         // Orange
  Other: '#6b7280',         // Gray
};
```

### Tailwind Classes

Common utility patterns:
- Cards: `bg-white rounded-lg shadow-sm border border-gray-200`
- Inputs: `border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500`
- Badges: `inline-flex px-2 py-1 text-xs font-semibold rounded-full`

## Performance Considerations

1. **useMemo for Analytics** - Dashboard calculations are memoized to prevent unnecessary recalculations
2. **Filtered Expenses** - Computed once in context, reused across components
3. **LocalStorage** - Synchronous operations may block on large datasets
4. **Table Rendering** - No virtualization; may slow with 1000+ expenses

## Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Browser Compatibility

- Requires localStorage support
- Modern browsers (ES2020+)
- Tested on Chrome, Firefox, Safari, Edge

## Security Considerations

- **No authentication** - All data is client-side only
- **XSS protection** - React escapes by default
- **CSV injection** - Description field is properly quoted in CSV export
- **Data validation** - Zod schema prevents invalid data

## Future Enhancement Ideas

1. **Backend Integration**
   - User authentication
   - Cloud sync
   - Multi-device support

2. **Features**
   - Budget limits with alerts
   - Recurring expenses
   - Receipt image uploads
   - Multi-currency support
   - Export to PDF

3. **Performance**
   - Virtual scrolling for large lists
   - IndexedDB for better performance
   - Service worker for offline support

4. **Analytics**
   - Predictive spending
   - Spending goals
   - Custom date ranges
   - Comparison periods

## Troubleshooting

### Data Not Persisting
- Check browser localStorage quota
- Verify localStorage is enabled
- Check browser developer console for errors

### Charts Not Rendering
- Ensure expenses have valid dates
- Check Recharts ResponsiveContainer parent has height

### Form Validation Errors
- Amount must be positive number
- Description max 200 characters
- Date must be valid ISO string

## Related Documentation

- [User Guide](../user/expense-tracker.md) - End-user documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Documentation](https://zod.dev/)
- [Recharts Documentation](https://recharts.org/)
