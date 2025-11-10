# Expense Tracker - User Guide

## Welcome to Expense Tracker!

Expense Tracker is a simple, powerful tool to help you manage your personal finances. Track your daily expenses, visualize spending patterns, and export your data - all from your web browser!

## Table of Contents

1. [Getting Started](#getting-started)
2. [Dashboard Overview](#dashboard-overview)
3. [Adding Expenses](#adding-expenses)
4. [Viewing and Managing Expenses](#viewing-and-managing-expenses)
5. [Understanding Your Analytics](#understanding-your-analytics)
6. [Exporting Your Data](#exporting-your-data)
7. [Tips and Best Practices](#tips-and-best-practices)
8. [Troubleshooting](#troubleshooting)

---

## Getting Started

### Accessing the Application

1. Open your web browser (Chrome, Firefox, Safari, or Edge)
2. Navigate to the application URL
3. You'll see the Dashboard - your home for expense tracking!

> **Note**: All your data is stored locally in your browser. No account or login is required!

### First Time Setup

When you first open the application, you'll see an empty dashboard. Don't worry - you can:

1. Click the **"Load Sample Data"** button to see example expenses and explore features
2. Or start fresh by clicking **"Add Expense"** in the navigation menu

---

## Dashboard Overview

![Dashboard Screenshot](../images/dashboard-with-data.png)

The Dashboard is your command center. Here's what you'll see:

### Summary Cards

At the top of the dashboard, four cards display your key metrics:

1. **Total Spending** - All-time total expenses
2. **This Month** - Current month's spending with trend indicator
   - 🔺 Red arrow = spending more than last month
   - 🔻 Green arrow = spending less than last month
3. **Average Expense** - Your typical transaction amount
4. **Total Expenses** - How many expenses you've recorded

### Visual Analytics

#### Monthly Spending Trend (Bar Chart)
- Shows your spending over the last 6 months
- Blue bars represent total spending per month
- Hover over bars to see exact amounts

#### Spending by Category (Pie Chart)
- Visual breakdown of where your money goes
- Each slice shows category name and percentage
- Color-coded for easy recognition:
  - 🟢 Green = Food
  - 🔵 Blue = Transportation
  - 🟣 Purple = Entertainment
  - 🎀 Pink = Shopping
  - 🟡 Yellow = Bills
  - ⚫ Gray = Other

#### Top Categories Table
- Lists your top 5 spending categories
- Shows amount spent and percentage of total
- Ranked from highest to lowest

---

## Adding Expenses

### Step-by-Step Guide

1. **Navigate to Add Expense**
   - Click **"Add Expense"** in the top navigation bar
   - Or visit the dedicated add expense page

2. **Fill Out the Form**

   ![Expense Form](../images/expense-form-add.png)

   - **Amount** (Required)
     - Enter the expense amount
     - Use numbers only (e.g., 45.50)
     - Must be greater than 0

   - **Category** (Required)
     - Select from dropdown:
       - Food - Groceries, restaurants, coffee
       - Transportation - Gas, parking, public transit
       - Entertainment - Movies, concerts, hobbies
       - Shopping - Clothes, electronics, gifts
       - Bills - Utilities, rent, subscriptions
       - Other - Anything else

   - **Description** (Required)
     - Write what the expense was for
     - Be specific (e.g., "Lunch at Mario's Pizza")
     - Maximum 200 characters

   - **Date** (Required)
     - Select when the expense occurred
     - Defaults to today's date
     - Use the date picker or type in format: YYYY-MM-DD

3. **Submit the Expense**
   - Click **"Add Expense"** button
   - You'll see a confirmation
   - The expense appears immediately in your list

4. **Reset the Form** (Optional)
   - Click **"Reset"** to clear all fields
   - Useful when adding multiple similar expenses

### Quick Tips for Adding Expenses

- Add expenses as they happen for accuracy
- Use consistent descriptions for similar items
- Choose the most specific category
- Double-check the amount before submitting

---

## Viewing and Managing Expenses

### Accessing Your Expense List

1. Click **"Expenses"** in the navigation bar
2. You'll see a table with all your expenses

![Expense List](../images/expense-table.png)

### Understanding the Expense Table

The table displays:
- **Date** - When the expense occurred
- **Description** - What you spent money on
- **Category** - Color-coded badge
- **Amount** - How much you spent
- **Actions** - Edit and Delete buttons

### Filtering Your Expenses

Use the filter tools at the top of the expense list:

1. **Search Box** 🔍
   - Type keywords to find expenses
   - Searches both description and category
   - Updates instantly as you type

2. **Category Filter**
   - Select "All" to see everything
   - Choose a specific category to narrow down

3. **Date Range**
   - **Start Date** - Beginning of date range
   - **End Date** - End of date range
   - Leave blank to show all dates
   - Combine with other filters for precise results

### Editing an Expense

1. Find the expense in the table
2. Click the **Edit** button (pencil icon)
3. The expense form appears with current values
4. Make your changes
5. Click **"Update Expense"**
6. Changes save immediately

### Deleting an Expense

1. Find the expense in the table
2. Click the **Delete** button (trash icon)
3. Confirm the deletion in the popup
4. Expense is permanently removed

> **Warning**: Deleted expenses cannot be recovered!

---

## Understanding Your Analytics

### Reading the Trend Indicator

On the "This Month" card, you'll see a percentage change:

- **Red with up arrow** (e.g., +15.3%)
  - You're spending MORE than last month
  - Time to review your budget

- **Green with down arrow** (e.g., -8.2%)
  - You're spending LESS than last month
  - Great job saving!

### Interpreting Charts

#### Bar Chart (Monthly Trend)
- **Higher bars** = more spending that month
- **Lower bars** = less spending
- Look for patterns:
  - Do you spend more in certain months?
  - Are you trending up or down over time?

#### Pie Chart (Category Distribution)
- **Larger slices** = more spending in that category
- Identify your biggest expense areas
- Consider if spending aligns with your priorities

### Using Analytics to Improve

1. **Identify Problem Areas**
   - Which category is your largest?
   - Is it necessary spending?

2. **Set Goals**
   - Try to reduce spending in top categories
   - Watch the percentage decrease next month

3. **Track Progress**
   - Compare month-to-month trends
   - Celebrate when you see improvement!

---

## Exporting Your Data

### Why Export?

- Create backups of your expense data
- Analyze in Excel or Google Sheets
- Share with accountant or financial advisor
- Keep records for tax purposes

### How to Export

1. Go to the **Expenses** page
2. (Optional) Apply filters to export only certain expenses
3. Click **"Export CSV"** button at the top right
4. A file downloads automatically named `expenses-YYYY-MM-DD.csv`

### Understanding the CSV File

The exported file contains:
```csv
Date,Amount,Category,Description
2024-11-09,45.50,Food,"Lunch at restaurant"
2024-11-08,25.00,Transportation,"Gas station"
```

You can open this in:
- Microsoft Excel
- Google Sheets
- Apple Numbers
- Any spreadsheet application

---

## Tips and Best Practices

### Daily Habits

✅ **DO**:
- Add expenses as soon as they happen
- Use specific descriptions
- Review your dashboard weekly
- Set a regular time to update expenses

❌ **DON'T**:
- Wait until the end of the month to add expenses
- Use vague descriptions like "stuff"
- Forget to categorize correctly
- Delete expenses unless necessary

### Categorization Guide

- **Food**: Anything you eat or drink
  - Groceries, restaurants, coffee shops, meal delivery

- **Transportation**: Getting from place to place
  - Gas, parking, tolls, bus/train fares, ride-sharing

- **Entertainment**: Fun and leisure
  - Movies, streaming services, hobbies, games, concerts

- **Shopping**: Retail purchases
  - Clothes, electronics, home goods, gifts

- **Bills**: Regular payments
  - Rent, utilities, phone, internet, subscriptions

- **Other**: Everything else
  - Medical, education, personal care, miscellaneous

### Accuracy Tips

1. **Round or Be Precise?**
   - Keep exact amounts for accountability
   - Easier to reconcile with bank statements

2. **Cash Purchases**
   - Keep receipts until entered
   - Use your phone to take receipt photos

3. **Shared Expenses**
   - Only enter your portion
   - Or note "shared" in description

4. **Recurring Expenses**
   - Add them when they occur
   - Use consistent descriptions for easy tracking

---

## Troubleshooting

### My expenses disappeared!

**Cause**: Browser data was cleared or you're using a different browser/device

**Solution**:
- Data is stored locally in your browser
- Use the same browser and device
- Don't clear browser data/cache
- Regular exports create backups

### I can't see my charts

**Possible Issues**:
1. No expense data yet - add some expenses first
2. Browser compatibility - update your browser
3. JavaScript disabled - enable JavaScript in settings

### The dashboard shows $0.00

**Reason**: No expenses have been added yet

**Solution**: Click "Load Sample Data" to see example data, or add your first expense

### Export button doesn't work

**Troubleshooting**:
1. Make sure you have expenses to export
2. Check if browser blocks downloads
3. Try a different browser
4. Ensure JavaScript is enabled

### I made a mistake on an expense

**Fix It**:
1. Find the expense in the Expenses list
2. Click the Edit button
3. Correct the error
4. Click Update Expense

Or delete and re-add the expense with correct information.

### Can I access my data on my phone?

Yes! The application works on mobile browsers. However, data doesn't sync between devices. Each device stores its own data locally.

**Workaround**: Export CSV from one device and manually re-enter on another device.

---

## Frequently Asked Questions

### Is my data safe?

Your data never leaves your device. It's stored in your browser's local storage. No one else can access it unless they have physical access to your device.

### Do I need to create an account?

No! This application works entirely in your browser without any registration or login.

### Can I use this offline?

Currently, no. You need an internet connection to load the application initially. However, once loaded, basic functionality works without internet.

### How much data can I store?

Browser localStorage typically allows 5-10MB of data. This is enough for thousands of expenses.

### Can multiple people use this?

Each browser/device has separate data. You could share a device, but expenses would all be mixed together. Better to use separate browsers or devices.

### Is there a mobile app?

Not yet, but the web application works great on mobile browsers!

---

## Getting Help

If you encounter issues not covered in this guide:

1. Check browser developer console for error messages
2. Try clearing browser cache and reloading
3. Test in a different browser
4. Export your data as backup before troubleshooting

---

## Privacy & Data

- **No tracking**: We don't track your usage
- **No ads**: No advertising or data selling
- **Local only**: Data never sent to servers
- **Your control**: Delete data anytime by clearing browser storage

---

## Keyboard Shortcuts

While navigating the application:
- **Tab** - Move between form fields
- **Enter** - Submit forms
- **Escape** - Close dialogs (where applicable)

---

Happy expense tracking! 💰📊
