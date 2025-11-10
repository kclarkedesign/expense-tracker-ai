# Expense Tracker Documentation

Welcome to the Expense Tracker documentation! This guide will help you understand and use the application, whether you're a user or a developer.

---

## 📚 Quick Links

### For Users
- **[User Guide](user/user-guide.md)** - Complete guide to using the app
- **[Getting Started](user/user-guide.md#quick-start)** - Your first steps
- **[Dashboard Guide](user/dashboard.md)** - Understanding your analytics
- **[Adding Expenses](user/expense-form.md)** - How to track expenses
- **[Managing Expenses](user/expense-list.md)** - View, filter, and export

### For Developers
- **[App Overview](dev/app-overview.md)** - Architecture and setup
- **[Dashboard Component](dev/dashboard.md)** - Analytics implementation
- **[Expense Form Component](dev/expense-form.md)** - Form validation
- **[Expense List Component](dev/expense-list.md)** - Filtering and table
- **[Expense Context](dev/expense-context.md)** - State management

---

## 🎯 What is Expense Tracker?

Expense Tracker is a web application that helps you track personal expenses with real-time analytics, filtering, and data export. Built with Next.js and TypeScript, it stores data locally in your browser with no backend required.

### Key Features

✅ Add, edit, and delete expenses
✅ Categorize spending (Food, Transportation, Entertainment, Shopping, Bills, Other)
✅ Real-time analytics dashboard with charts
✅ Advanced filtering (category, date range, search)
✅ CSV data export
✅ Responsive design (mobile and desktop)
✅ Sample data for testing

---

## 📖 Documentation Structure

```
docs/
├── README.md                    # This file - documentation hub
├── dev/                         # Developer documentation
│   ├── app-overview.md         # Application architecture and setup
│   ├── dashboard.md            # Dashboard component technical docs
│   ├── expense-form.md         # Expense form component docs
│   ├── expense-list.md         # Expense list component docs
│   └── expense-context.md      # State management docs
└── user/                        # User documentation
    ├── user-guide.md           # Complete user guide
    ├── dashboard.md            # How to use the dashboard
    ├── expense-form.md         # How to add and edit expenses
    └── expense-list.md         # How to manage expenses
```

---

## 👥 For Users

### Getting Started

New to Expense Tracker? Start here:

1. **[Quick Start Guide](user/user-guide.md#quick-start)**
   - First time setup
   - Loading sample data
   - Adding your first expense

2. **[Understanding the Dashboard](user/dashboard.md)**
   - Summary cards explained
   - Reading charts
   - Understanding trends

3. **[Adding Expenses](user/expense-form.md)**
   - Filling out the form
   - Choosing categories
   - Best practices

### Common Tasks

| Task | Documentation |
|------|---------------|
| Add a new expense | [Expense Form Guide](user/expense-form.md#adding-a-new-expense) |
| View spending analytics | [Dashboard Guide](user/dashboard.md) |
| Search for expenses | [Expense List Guide](user/expense-list.md#searching-and-filtering) |
| Edit an expense | [Expense List Guide](user/expense-list.md#editing-an-expense) |
| Export to CSV | [Expense List Guide](user/expense-list.md#exporting-your-data) |
| Filter by category | [Expense List Guide](user/expense-list.md#category-filter) |
| Understand chart colors | [Dashboard Guide](user/dashboard.md#understanding-the-colors) |

### FAQ

**Q: Is my data safe?**
A: Yes! All data is stored locally in your browser. It never leaves your device.

**Q: Do I need an account?**
A: No! The app works entirely in your browser without any login.

**Q: Can I access data on multiple devices?**
A: Data is stored per browser/device. Use CSV export to transfer data.

**More questions?** See [User Guide FAQ](user/user-guide.md#frequently-asked-questions)

---

## 💻 For Developers

### Quick Start for Development

```bash
# Clone and install
git clone <repository-url>
cd expense-tracker-ai
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

**Full setup instructions**: [App Overview - Setup](dev/app-overview.md#setup-and-installation)

### Architecture Overview

**Stack**:
- Next.js 14 (App Router)
- React 18
- TypeScript 5
- Tailwind CSS
- React Hook Form + Zod
- Recharts

**State Management**: React Context API
**Storage**: Browser localStorage
**Styling**: Tailwind CSS + Lucide icons

**Detailed architecture**: [App Overview](dev/app-overview.md#architecture)

### Component Documentation

| Component | Purpose | Documentation |
|-----------|---------|---------------|
| Dashboard | Analytics and charts | [Dev Docs](dev/dashboard.md) |
| ExpenseForm | Add/edit expenses | [Dev Docs](dev/expense-form.md) |
| ExpenseList | View/filter/manage | [Dev Docs](dev/expense-list.md) |
| ExpenseContext | State management | [Dev Docs](dev/expense-context.md) |

### Development Workflow

1. **[Project Structure](dev/app-overview.md#project-structure)**
2. **[Adding Features](dev/app-overview.md#adding-a-new-feature)**
3. **[Best Practices](dev/app-overview.md#development-best-practices)**
4. **[Testing](dev/app-overview.md#testing-locally)**

### API Reference

**Core Types**: [src/types/expense.ts](../src/types/expense.ts)
```typescript
interface Expense {
  id: string;
  amount: number;
  category: ExpenseCategory;
  description: string;
  date: string;
  createdAt: string;
}
```

**Context Hook**:
```typescript
const {
  expenses,
  filteredExpenses,
  addExpense,
  updateExpense,
  deleteExpense
} = useExpenses();
```

**Full API reference**: [Expense Context API](dev/expense-context.md#context-api)

---

## 🗂️ Feature Documentation

### Dashboard

**For Users**: [Dashboard User Guide](user/dashboard.md)
- Understanding summary cards
- Reading charts and trends
- Month-over-month comparison

**For Developers**: [Dashboard Technical Docs](dev/dashboard.md)
- Analytics calculation
- Chart configuration
- Performance optimization

### Expense Form

**For Users**: [Expense Form Guide](user/expense-form.md)
- Adding new expenses
- Editing existing expenses
- Form field requirements

**For Developers**: [Expense Form Technical Docs](dev/expense-form.md)
- Form validation (Zod)
- React Hook Form integration
- Edit vs Add modes

### Expense List

**For Users**: [Expense List Guide](user/expense-list.md)
- Searching and filtering
- Editing and deleting
- Exporting to CSV

**For Developers**: [Expense List Technical Docs](dev/expense-list.md)
- Filtering implementation
- Table rendering
- Inline edit functionality

### State Management

**For Developers**: [Expense Context Docs](dev/expense-context.md)
- Context API structure
- CRUD operations
- Filtering logic
- localStorage sync

---

## 🚀 Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 14.2.31 | React framework |
| React | 18 | UI library |
| TypeScript | 5 | Type safety |
| Tailwind CSS | 3.4.1 | Styling |
| React Hook Form | 7.62.0 | Form management |
| Zod | 4.0.17 | Validation |
| Recharts | 3.1.2 | Charts |
| date-fns | 4.1.0 | Date handling |
| Lucide React | 0.539.0 | Icons |

**Full stack details**: [App Overview - Technology Stack](dev/app-overview.md#technology-stack)

---

## 📝 Contributing

### For Documentation

When updating documentation:
- Keep user docs simple and jargon-free
- Include examples and screenshots (placeholders noted)
- Update both user and developer docs when relevant
- Keep README.md index up to date

### For Code

Before contributing code:
1. Read [App Overview](dev/app-overview.md)
2. Follow [Development Best Practices](dev/app-overview.md#development-best-practices)
3. Update relevant documentation
4. Test thoroughly

---

## 🔗 External Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Recharts Documentation](https://recharts.org/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Documentation](https://zod.dev/)

---

## 📞 Getting Help

### For Users

- Check [User Guide](user/user-guide.md)
- Review [FAQ](user/user-guide.md#frequently-asked-questions)
- See [Troubleshooting](user/user-guide.md#troubleshooting-common-issues)

### For Developers

- Read [App Overview](dev/app-overview.md)
- Check component-specific docs
- Review [Troubleshooting](dev/app-overview.md#troubleshooting)

---

## 📄 License

[Add license information]

---

## 🔄 Documentation Updates

**Last Updated**: 2025-11-09
**Version**: 0.1.0

To update this documentation:
1. Edit relevant markdown files
2. Keep links working
3. Update "Last Updated" dates
4. Regenerate if major changes

---

**Need something specific?**

- **I'm a user** → Start with [User Guide](user/user-guide.md)
- **I'm a developer** → Start with [App Overview](dev/app-overview.md)
- **I want to add expenses** → [Expense Form Guide](user/expense-form.md)
- **I want to understand the code** → [Developer Documentation](dev/app-overview.md)
- **I want to see analytics** → [Dashboard Guide](user/dashboard.md)

Happy expense tracking! 💰📊
