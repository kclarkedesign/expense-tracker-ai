# Dashboard Component - Developer Documentation

**Component**: `Dashboard`
**Location**: [src/components/Dashboard.tsx](../../src/components/Dashboard.tsx)
**Type**: Client Component (`'use client'`)

[← Back to App Overview](app-overview.md)

---

## Overview

The Dashboard component is the primary analytics interface that displays expense statistics, trends, and visualizations. It uses Recharts for data visualization and computes analytics in real-time using React's `useMemo` hook for performance optimization.

## Component Signature

```typescript
export function Dashboard(): JSX.Element
```

**Props**: None (uses context for data)

## Dependencies

```typescript
import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Calendar, Target } from 'lucide-react';
import { useExpenses } from '@/context/ExpenseContext';
import { formatCurrency, cn } from '@/lib/utils';
import { ExpenseCategory } from '@/types/expense';
import { SampleDataButton } from './SampleDataButton';
```

---

## Features

### 1. Summary Cards

Four key metrics displayed at the top:

| Card | Metric | Calculation |
|------|--------|-------------|
| Total Spending | All-time total | Sum of all expense amounts |
| This Month | Current month | Sum of current month expenses |
| Average Expense | Per-transaction average | Total / count |
| Total Expenses | Count | Number of expenses |

**Implementation**: Lines [96-169](../../src/components/Dashboard.tsx#L96-L169)

### 2. Monthly Spending Trend

Bar chart showing last 6 months of spending.

**Chart Type**: Recharts `<BarChart>`
**Data Structure**:
```typescript
{
  month: string;    // "Jan", "Feb", etc.
  amount: number;   // Total for that month
}[]
```

**Implementation**: Lines [58-69](../../src/components/Dashboard.tsx#L58-L69), [173-183](../../src/components/Dashboard.tsx#L173-L183)

### 3. Category Distribution

Pie chart showing spending breakdown by category.

**Chart Type**: Recharts `<PieChart>`
**Data Structure**:
```typescript
{
  name: ExpenseCategory;
  value: number;        // Amount spent
  percentage: number;   // Percentage of total
}[]
```

**Implementation**: Lines [71-75](../../src/components/Dashboard.tsx#L71-L75), [185-211](../../src/components/Dashboard.tsx#L185-L211)

### 4. Top Categories List

Ranked list of top 5 spending categories.

**Data Structure**:
```typescript
{
  category: ExpenseCategory;
  amount: number;
  percentage: number;
}[]
```

**Implementation**: Lines [49-56](../../src/components/Dashboard.tsx#L49-L56), [214-246](../../src/components/Dashboard.tsx#L214-L246)

---

## Analytics Calculation

### Main Analytics Hook

**Location**: Lines [23-87](../../src/components/Dashboard.tsx#L23-L87)

```typescript
const analytics = useMemo(() => {
  // Calculation logic
}, [expenses]);
```

**Why useMemo?**: Prevents expensive recalculations on every render. Only recomputes when `expenses` array changes.

### Calculation Steps

1. **Date Setup**
   ```typescript
   const currentDate = new Date();
   const currentMonth = currentDate.getMonth();
   const currentYear = currentDate.getFullYear();
   ```

2. **Filter Current Month Expenses**
   ```typescript
   const thisMonthExpenses = expenses.filter(expense => {
     const expenseDate = new Date(expense.date);
     return expenseDate.getMonth() === currentMonth &&
            expenseDate.getFullYear() === currentYear;
   });
   ```

3. **Calculate Totals**
   ```typescript
   const totalSpending = expenses.reduce((sum, expense) => sum + expense.amount, 0);
   const monthlySpending = thisMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
   ```

4. **Group by Category**
   ```typescript
   const categoryTotals = expenses.reduce((acc, expense) => {
     acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
     return acc;
   }, {} as Record<ExpenseCategory, number>);
   ```

5. **Generate Top Categories**
   ```typescript
   const topCategories = Object.entries(categoryTotals)
     .map(([category, amount]) => ({
       category: category as ExpenseCategory,
       amount,
       percentage: totalSpending > 0 ? (amount / totalSpending) * 100 : 0,
     }))
     .sort((a, b) => b.amount - a.amount)
     .slice(0, 5);
   ```

6. **Build Monthly Trend** (Last 6 Months)
   ```typescript
   const monthlyTrend = Array.from({ length: 6 }, (_, i) => {
     const date = new Date(currentYear, currentMonth - i, 1);
     const monthExpenses = expenses.filter(/* filter by month */);
     return {
       month: date.toLocaleDateString('en-US', { month: 'short' }),
       amount: monthExpenses.reduce((sum, expense) => sum + expense.amount, 0),
     };
   }).reverse();
   ```

### Returned Analytics Object

```typescript
{
  totalSpending: number;
  monthlySpending: number;
  lastMonthSpending: number;
  topCategories: Array<{category, amount, percentage}>;
  monthlyTrend: Array<{month, amount}>;
  pieData: Array<{name, value, percentage}>;
  totalExpenses: number;
  averageExpense: number;
}
```

---

## Month-over-Month Trend

**Location**: Lines [89-91](../../src/components/Dashboard.tsx#L89-L91)

```typescript
const monthlyChange = analytics.lastMonthSpending > 0
  ? ((analytics.monthlySpending - analytics.lastMonthSpending) / analytics.lastMonthSpending) * 100
  : 0;
```

**Display Logic**:
- **Positive change**: Red, TrendingUp icon
- **Negative change**: Green, TrendingDown icon
- **UI Location**: "This Month" summary card

---

## Color Scheme

**Location**: Lines [11-18](../../src/components/Dashboard.tsx#L11-L18)

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

Used in:
- Pie chart segments
- Category badges

---

## Chart Configuration

### Bar Chart Setup

```typescript
<ResponsiveContainer width="100%" height={300}>
  <BarChart data={analytics.monthlyTrend}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="month" />
    <YAxis tickFormatter={(value) => `$${value}`} />
    <Tooltip formatter={(value) => [formatCurrency(Number(value)), 'Amount']} />
    <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
  </BarChart>
</ResponsiveContainer>
```

**Key Features**:
- `ResponsiveContainer`: Adapts to parent width
- `tickFormatter`: Formats Y-axis as currency
- `Tooltip formatter`: Custom tooltip display
- `radius`: Rounded top corners on bars

### Pie Chart Setup

```typescript
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
```

**Key Features**:
- `label`: Shows category name and percentage on chart
- `Cell`: Individual colors per category
- Custom tooltip with currency formatting

---

## Performance Considerations

### Optimizations

1. **useMemo** - Analytics computed only when expenses change
2. **Single data fetch** - All data from context in one call
3. **Efficient filtering** - Native array methods

### Potential Issues

- **Large datasets** (1000+ expenses): May slow down
- **Complex calculations**: Run on every expense array change
- **Chart rendering**: Heavy with many data points

### Improvement Opportunities

1. Debounce expensive calculations
2. Paginate or limit displayed data
3. Consider Web Workers for heavy computation
4. Implement virtual scrolling for large lists

---

## Testing Considerations

### Test Cases

1. **Empty State**
   - No expenses: Should show $0.00 everywhere
   - Charts should display "No data" message

2. **Sample Data**
   - Use SampleDataButton to load test data
   - Verify all calculations are correct

3. **Edge Cases**
   - Single expense
   - All expenses in one category
   - Expenses spanning multiple years
   - Future-dated expenses

4. **Month Boundaries**
   - Test on first/last day of month
   - Verify month-over-month calculations

### Manual Testing

```bash
# Run dev server
npm run dev

# Open browser to http://localhost:3000
# Click "Load Sample Data"
# Verify:
# - All 4 summary cards show values
# - Bar chart displays 6 months
# - Pie chart shows categories
# - Top categories list is ranked
```

---

## Integration Points

### Context Dependency

```typescript
const { expenses } = useExpenses();
```

**Required**: ExpenseProvider must wrap this component

**Data Flow**:
1. ExpenseContext provides `expenses` array
2. Dashboard computes analytics via useMemo
3. Charts and cards render computed data

### Child Components

- **SampleDataButton**: Lines [95](../../src/components/Dashboard.tsx#L95)
  - Conditionally shown when no expenses exist
  - Provides test data for new users

---

## Styling

### Tailwind Classes

**Grid Layout**:
```typescript
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
```

**Card Style**:
```typescript
className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
```

**Responsive Design**:
- Mobile: Single column
- Tablet (md): 2 columns
- Desktop (lg): 4 columns for summary cards

### Category Badge Colors

```typescript
{
  'bg-green-100 text-green-800': category === 'Food',
  'bg-blue-100 text-blue-800': category === 'Transportation',
  'bg-purple-100 text-purple-800': category === 'Entertainment',
  'bg-pink-100 text-pink-800': category === 'Shopping',
  'bg-yellow-100 text-yellow-800': category === 'Bills',
  'bg-gray-100 text-gray-800': category === 'Other',
}
```

---

## Future Enhancements

1. **Custom Date Ranges**
   - Allow user to select date range
   - Compare different time periods

2. **Budget Tracking**
   - Set category budgets
   - Show budget vs actual

3. **Export Charts**
   - Download charts as images
   - Include in reports

4. **Predictive Analytics**
   - Forecast future spending
   - Trend analysis

5. **Drill-Down**
   - Click category to see expenses
   - Interactive chart exploration

---

## Related Documentation

- **[App Overview](app-overview.md)** - Application architecture
- **[Expense Context](expense-context.md)** - State management
- **[User Dashboard Guide](../user/dashboard.md)** - User-facing documentation

---

## API Reference

### Exported Component

```typescript
function Dashboard(): JSX.Element
```

### Internal Constants

```typescript
const COLORS: Record<ExpenseCategory, string>
```

### Type Dependencies

```typescript
import { ExpenseCategory } from '@/types/expense';
import { useExpenses } from '@/context/ExpenseContext';
```

---

**Last Updated**: 2025-11-09
