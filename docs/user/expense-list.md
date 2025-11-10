# Managing Your Expenses - User Guide

[← Back to User Guide](user-guide.md)

---

## Overview

The Expenses page is where you view, search, filter, edit, and delete all your expenses. Think of it as your expense management center.

![Expense List Page](../images/expense-list-page.png)

**Where to find it**: Click "Expenses" in the navigation or go to /expenses

---

## The Expense Table

### What You'll See

A table with all your expenses showing:

| Column | What It Shows |
|--------|---------------|
| **Date** | When the expense happened |
| **Description** | What you bought |
| **Category** | Colored badge with category name |
| **Amount** | How much you spent |
| **Actions** | Edit and Delete buttons |

![Expense Table](../images/expense-table.png)

### Understanding the Table

**Date Format**: Jan 15, 2025 (Month Day, Year)
**Category Badges**: Color-coded for easy recognition
- 🟢 Green = Food
- 🔵 Blue = Transportation
- 🟣 Purple = Entertainment
- 🎀 Pink = Shopping
- 🟡 Yellow = Bills
- ⚫ Gray = Other

**Amount Format**: $123.45 (always shows cents)

---

## Searching and Filtering

### Search Box 🔍

**Location**: Top left of the page

**What it does**:
- Searches expense descriptions
- Also searches category names
- Updates instantly as you type

**Examples**:
- Type "coffee" → Shows all expenses with "coffee" in description
- Type "food" → Shows all Food category expenses
- Type "uber" → Shows any Uber rides

**Tips**:
- Search is case-insensitive
- Partial matches work ("starbuck" finds "Starbucks")
- Clear search box to see all expenses again

### Category Filter 📂

**Location**: Second dropdown from left

**What it does**:
- Shows only expenses from selected category
- Default: "All" (shows everything)

**How to use**:
1. Click the dropdown
2. Select a category
3. Table updates to show only that category
4. Select "All" to see everything again

**Use cases**:
- "How much did I spend on Food this month?"
- "Show me all my Transportation expenses"
- "What are my Entertainment purchases?"

### Date Range Filter 📅

**Location**: Two date fields on the right

**What it does**:
- Filter expenses between two dates
- Start Date = beginning of range
- End Date = end of range

**How to use**:

**Filter by month**:
- Start Date: 2025-01-01
- End Date: 2025-01-31
- Result: All January expenses

**Filter by week**:
- Start Date: 2025-01-01
- End Date: 2025-01-07
- Result: First week of January

**All expenses since a date**:
- Start Date: 2025-01-01
- End Date: (leave empty)
- Result: Everything from Jan 1st onward

**All expenses before a date**:
- Start Date: (leave empty)
- End Date: 2025-01-31
- Result: Everything up to Jan 31st

### Combining Filters

**All filters work together!**

**Example 1**: Food expenses in January
- Search: (empty)
- Category: Food
- Start Date: 2025-01-01
- End Date: 2025-01-31

**Example 2**: Coffee purchases in the last week
- Search: coffee
- Category: All (or Food)
- Start Date: (7 days ago)
- End Date: (today)

**Clear all filters**: Reset each field to blank/"All"

---

## Editing an Expense

### Step-by-Step

1. **Find the expense** in the table
2. **Click the pencil icon** (✏️) in the Actions column
3. **Edit form appears** above the table
4. **Make your changes** in the form
5. **Click "Update Expense"** button
6. **Form stays open** (click away or edit another)

![Edit Expense](../images/expense-list-page.png)

**Tip**: The edit form is the same as the Add Expense form, just pre-filled with current values.

### What You Can Edit

- Amount
- Category
- Description
- Date

**What you can't change**: The expense ID (internal)

### After Editing

- Expense updates immediately in the table
- Dashboard charts update automatically
- Edit form remains visible (in case you need to edit more)
- Navigate away when done

---

## Deleting an Expense

### When to Delete

Delete an expense when:
- You entered it by mistake
- It was a duplicate
- It needs to be removed permanently

**Warning**: Deleted expenses cannot be recovered!

### Step-by-Step

![Delete Expense](../images/expense-table.png)

1. **Find the expense** in the table
2. **Click the trash icon** (🗑️) in the Actions column
3. **Confirmation popup** appears: "Are you sure you want to delete this expense?"
4. **Click OK** to delete, or **Cancel** to keep it
5. **Expense disappears** from table
6. **Dashboard updates** automatically

### Safety Tips

- Double-check before deleting
- Use Edit instead if you just need to fix something
- Export data regularly as backup
- Remember: No undo!

---

## Exporting Your Data

### CSV Export Button

**Location**: Top right, blue button that says "Export CSV"

![Export Button](../images/expense-list-filters.png)

### What It Does

- Downloads a CSV file of your expenses
- File name: `expenses-YYYY-MM-DD.csv` (includes download date)
- Can be opened in Excel, Google Sheets, Numbers, etc.

### How to Export

1. **(Optional)** Apply filters to export only certain expenses
2. **Click "Export CSV"** button
3. **File downloads** automatically
4. **Open in spreadsheet app** to view

### What's Included

The CSV contains:
```csv
Date,Amount,Category,Description
2025-01-15,45.50,Food,"Lunch at restaurant"
2025-01-14,25.00,Transportation,"Gas station"
```

**Columns**:
- Date
- Amount
- Category
- Description

### Uses for Exported Data

✅ **Backup** your expense data
✅ **Tax preparation** - share with accountant
✅ **Advanced analysis** in Excel with pivot tables
✅ **Record keeping** for personal files
✅ **Transfer data** to other tools
✅ **Print** for offline records

### Export Tips

**Export filtered data**:
1. Apply filters (e.g., just January, just Food)
2. Click Export CSV
3. Only filtered expenses are exported

**Export everything**:
1. Make sure all filters are cleared
2. Category = "All"
3. No search term
4. No date range
5. Click Export CSV

**Regular backups**:
- Export monthly as backup
- Save files with descriptive names
- Keep in safe location

---

## Common Tasks

### "Show me all Food expenses"
1. Category filter: Select "Food"
2. View filtered table

### "Find that coffee shop expense"
1. Search box: Type "coffee"
2. Browse results

### "See what I spent in January"
1. Start Date: 2025-01-01
2. End Date: 2025-01-31
3. Review table

### "Fix a typo in a description"
1. Find expense in table
2. Click Edit (pencil icon)
3. Correct description
4. Click Update Expense

### "Remove a duplicate expense"
1. Find duplicate in table
2. Click Delete (trash icon)
3. Confirm deletion

### "Export my food expenses for tax deduction"
1. Category filter: Food
2. Click Export CSV
3. File downloads

---

## Table Features

### Sorting

Currently, expenses are displayed in the order they were added. (Sorting by column coming in future version!)

### Scrolling

- **Desktop**: Table scrolls vertically if many expenses
- **Mobile**: Table scrolls horizontally and vertically

### Responsive Design

- **Desktop**: Full table view
- **Tablet**: Slightly compressed
- **Mobile**: Horizontal scroll enabled

---

## Empty States

### "No expenses yet"

**When you see it**: You haven't added any expenses

**What to do**: Click "Add Expense" to create your first one

### "No expenses found"

**When you see it**: Your filters don't match any expenses

**What to do**:
- Check your filters
- Try different search terms
- Clear filters to see all expenses

---

## Tips for Better Management

### Organization

✅ Review expenses weekly
✅ Delete duplicates promptly
✅ Fix errors as soon as you notice them
✅ Export monthly for backups

### Filtering Strategies

**Monthly reviews**:
- Set date range to current month
- Review all expenses
- Check for errors

**Category analysis**:
- Filter by category
- See all spending in that area
- Export for detailed analysis

**Search for specific vendors**:
- Search by store name
- Find all purchases from that vendor

### Workflow

1. **Monday morning**: Review last week's expenses
2. **Mid-month**: Check spending vs budget
3. **End of month**: Export data, analyze trends
4. **Quarterly**: Deep dive into categories

---

## Frequently Asked Questions

**Q: Can I sort by clicking column headers?**
A: Not yet. This feature is coming in a future update.

**Q: How many expenses can I have?**
A: Thousands! Limited only by browser storage (5-10MB).

**Q: Can I select multiple expenses at once?**
A: Not currently. Edit/delete one at a time.

**Q: Can I undo a deletion?**
A: No. Always export regularly as backup.

**Q: Why can't I see an expense I just added?**
A: Check your filters - you might be filtering it out.

**Q: Can I print the table?**
A: Use your browser's print function, or export to CSV and print from Excel.

**Q: Does the search work on amounts?**
A: No, only description and category. Use filters for amounts.

---

## Keyboard Shortcuts

- **Tab**: Navigate between filter fields
- **Enter**: Submit when in search box
- **Escape**: Close edit form (if implemented)

---

## Troubleshooting

**Problem**: "I can't find an expense I know I added"
- **Solution**: Clear all filters, check if it appears

**Problem**: "Export button doesn't work"
- **Solution**: Check browser doesn't block downloads, try different browser

**Problem**: "Table is showing old data"
- **Solution**: Refresh the page (F5 or Ctrl+R)

**Problem**: "Edit form won't close"
- **Solution**: Navigate to different page, then back

---

## Next Steps

- **[Add More Expenses](expense-form.md)** - Keep your data current
- **[View Analytics](dashboard.md)** - See your spending insights
- **[Export and Analyze](expense-list.md#exporting-your-data)** - Deep dive into data

---

**Pro Tip**: Set a weekly reminder to review and clean up your expenses. 15 minutes a week keeps your data accurate!

---

[← Back to User Guide](user-guide.md)
