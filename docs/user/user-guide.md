# Expense Tracker - User Guide

Welcome to Expense Tracker! This guide will help you get started with tracking your expenses and understanding your spending patterns.

## Table of Contents

1. [Quick Start](#quick-start)
2. [Navigation](#navigation)
3. [Main Features](#main-features)
4. [Tips for Success](#tips-for-success)
5. [Frequently Asked Questions](#frequently-asked-questions)
6. [Getting Help](#getting-help)

---

## Quick Start

### First Time Using the App

1. **Open the Application**
   - Navigate to the app URL in your web browser
   - You'll see the Dashboard page

2. **Try Sample Data** (Recommended for first-time users)
   - Click the **"Add Sample Data"** button on the empty dashboard
   - This loads 10 example expenses so you can explore features
   - You can delete these later!

3. **Or Add Your First Expense**
   - Click **"Add Expense"** in the navigation
   - Fill out the form with your expense details
   - Click **"Add Expense"** to save

![Quick Start](../images/dashboard-overview.png)

### Understanding the Interface

The app has three main pages accessible from the top navigation:

- **Dashboard** 📊 - See your spending analytics and charts
- **Add Expense** ➕ - Create new expense entries
- **Expenses** 📋 - View, search, and manage all expenses

---

## Navigation

### Top Navigation Bar

![Navigation Bar](../images/navigation-bar.png)

The navigation bar is always visible at the top:

**Desktop View:**
- Logo (click to go home)
- Dashboard | Add Expense | Expenses tabs
- Active page is highlighted with blue underline

**Mobile View:**
- Logo (click to go home)
- Icon-only buttons for each page
- Active page has blue background

### Keyboard Navigation

- Use **Tab** to move between buttons and links
- Press **Enter** to activate buttons
- Navigation links support standard browser shortcuts

---

## Main Features

### 1. Dashboard - Track Your Spending

**Location**: Home page (/) or click "Dashboard"

The Dashboard shows your financial overview at a glance.

**What You'll See:**

📌 **Summary Cards** (Top Row)
- Total Spending - All-time total
- This Month - Current month with trend
- Average Expense - Typical transaction amount
- Total Expenses - Number of transactions

📊 **Monthly Spending Trend** (Bar Chart)
- Last 6 months of spending
- Hover over bars for exact amounts
- Identify spending patterns over time

🥧 **Spending by Category** (Pie Chart)
- Visual breakdown of where money goes
- Each slice shows percentage
- Color-coded by category

📈 **Top Categories** (List)
- Ranked from highest to lowest spending
- Shows amount and percentage
- Quickly identify biggest expenses

**Learn More**: [Dashboard User Guide](dashboard.md)

---

### 2. Add Expense - Record Your Spending

**Location**: /add or click "Add Expense"

![Add Expense Form](../images/expense-form-add.png)

**How to Add an Expense:**

1. **Enter Amount**
   - Type the dollar amount (e.g., 45.50)
   - Must be a positive number
   - Required field

2. **Select Category**
   - Choose from dropdown:
     - 🍔 Food - Groceries, restaurants, coffee
     - 🚗 Transportation - Gas, parking, transit
     - 🎬 Entertainment - Movies, hobbies, fun
     - 🛍️ Shopping - Clothes, electronics, gifts
     - 📄 Bills - Utilities, rent, subscriptions
     - 📦 Other - Everything else
   - Required field

3. **Write Description**
   - What did you buy?
   - Be specific (e.g., "Lunch at Joe's Diner")
   - Maximum 200 characters
   - Required field

4. **Pick Date**
   - When did you spend this money?
   - Defaults to today
   - Use date picker or type YYYY-MM-DD
   - Required field

5. **Save or Reset**
   - Click **"Add Expense"** to save
   - Click **"Reset"** to clear the form

**Learn More**: [Expense Form Guide](expense-form.md)

---

### 3. Expenses - View and Manage

**Location**: /expenses or click "Expenses"

![Expense List](../images/expense-table.png)

**Features:**

🔍 **Search and Filter**
- Search box - Find expenses by keyword
- Category filter - Show only one category
- Date range - Filter by start/end dates
- Filters work together!

📋 **Expense Table**

Shows all expenses with:
- Date - When expense occurred
- Description - What you bought
- Category - Color-coded badge
- Amount - How much you spent
- Actions - Edit and Delete buttons

**Managing Expenses:**

✏️ **Edit an Expense**
1. Find the expense in the table
2. Click the pencil icon (Edit)
3. Form appears with current values
4. Make changes
5. Click "Update Expense"

🗑️ **Delete an Expense**
1. Find the expense in the table
2. Click the trash icon (Delete)
3. Confirm deletion in popup
4. Expense is permanently removed

📥 **Export to CSV**
- Click **"Export CSV"** button at top right
- Downloads file: `expenses-YYYY-MM-DD.csv`
- Open in Excel, Google Sheets, etc.
- Respects current filters!

**Learn More**: [Expense List Guide](expense-list.md)

---

## Tips for Success

### Best Practices for Tracking Expenses

✅ **Do This:**

1. **Add Expenses Immediately**
   - Record expenses as they happen
   - Don't wait until end of week/month
   - Fresh memory = accurate descriptions

2. **Be Specific in Descriptions**
   - ✅ Good: "Lunch at Mario's Pizza"
   - ❌ Bad: "Food"
   - Helps you remember later

3. **Choose Categories Carefully**
   - Use the most specific category
   - Be consistent (always use same category for similar items)

4. **Review Your Dashboard Weekly**
   - Check spending trends
   - Identify areas to cut back
   - Celebrate wins!

5. **Export Regularly**
   - Monthly CSV exports as backup
   - Keep records for tax time

❌ **Avoid This:**

1. Don't batch-enter old expenses (less accurate)
2. Don't use vague descriptions
3. Don't forget to categorize
4. Don't delete expenses unless they're wrong

### Category Guidelines

**🍔 Food**
- Restaurants and takeout
- Groceries and meal prep
- Coffee shops
- Snacks and drinks

**🚗 Transportation**
- Gas and fuel
- Parking fees
- Public transit (bus, train, subway)
- Ride-sharing (Uber, Lyft)
- Car maintenance

**🎬 Entertainment**
- Movies and theaters
- Streaming services
- Hobbies and crafts
- Sports and activities
- Books and music

**🛍️ Shopping**
- Clothing and accessories
- Electronics
- Home goods
- Gifts for others
- Personal items

**📄 Bills**
- Rent or mortgage
- Utilities (electric, water, gas)
- Phone and internet
- Insurance
- Subscriptions

**📦 Other**
- Medical and healthcare
- Education
- Pet expenses
- Miscellaneous

---

## Frequently Asked Questions

### General Questions

**Q: Is my data safe?**
A: Yes! All data is stored locally in your browser. It never leaves your device.

**Q: Do I need to create an account?**
A: No! The app works entirely in your browser without any login.

**Q: Can I access my data on different devices?**
A: No, data is stored locally per browser/device. Use CSV export to transfer data.

**Q: How much data can I store?**
A: Browser localStorage allows 5-10MB, enough for thousands of expenses.

**Q: Can I use this offline?**
A: You need internet to load the app initially, but it works offline after that.

### Using the App

**Q: How do I edit an expense?**
A: Go to Expenses page, find the item, click the pencil icon, make changes, save.

**Q: Can I delete multiple expenses at once?**
A: Not currently. Delete expenses one at a time.

**Q: What happens if I accidentally delete an expense?**
A: Deleted expenses cannot be recovered. Use CSV exports as backups!

**Q: How do I filter by multiple categories?**
A: You can only filter by one category at a time currently.

**Q: Why is my chart empty?**
A: You need to add expenses first. Try clicking "Add Sample Data" to see how it works.

### Data and Export

**Q: What format is the CSV export?**
A: Standard CSV format: Date, Amount, Category, Description

**Q: Can I import expenses from a CSV?**
A: Not currently supported.

**Q: How do I backup my data?**
A: Use the Export CSV feature regularly to create backups.

**Q: Will clearing browser data delete my expenses?**
A: Yes! Browser data clearing removes localStorage. Export first!

---

## Getting Help

### Troubleshooting Common Issues

**Problem: Sample data button doesn't appear**
- Solution: You already have expenses. It only shows when list is empty.

**Problem: Charts aren't showing**
- Solution: Add some expenses first. Charts need data to display.

**Problem: Export button doesn't download file**
- Solution: Check browser popup/download blockers. Try different browser.

**Problem: My expenses disappeared**
- Solution: Check if you're using same browser/device. Data is local to each browser.

**Problem: Form won't submit**
- Solution: Check for error messages. All fields are required and must be valid.

### Browser Requirements

- Modern browser (Chrome, Firefox, Safari, Edge)
- JavaScript enabled
- localStorage enabled (usually on by default)
- Cookies not required

### Getting More Help

**Feature Guides:**
- [Using the Dashboard](dashboard.md)
- [Adding and Editing Expenses](expense-form.md)
- [Managing Your Expense List](expense-list.md)

**For Developers:**
- See [Developer Documentation](../dev/app-overview.md)

---

## Privacy & Data

### What Data We Store

The app stores:
- Expense amounts
- Categories
- Descriptions you enter
- Dates

### Where Data is Stored

- Your browser's localStorage only
- Never sent to any server
- Never shared with anyone
- Stays on your device

### Deleting Your Data

To completely remove all data:
1. Clear your browser's localStorage
2. Or reinstall the app
3. Or delete each expense manually

---

## Tips for Better Expense Tracking

### Week 1: Getting Started
- Add expenses daily
- Use sample data to learn
- Explore all three pages

### Week 2: Building Habits
- Add expenses immediately after purchase
- Review dashboard at week's end
- Identify your top spending category

### Week 3: Analysis
- Look for spending patterns
- Compare weeks
- Set personal goals

### Month 1: Optimization
- Review monthly trend
- Export data for records
- Adjust spending based on insights

---

## Keyboard Shortcuts

- **Tab** - Navigate between fields
- **Enter** - Submit forms
- **Escape** - Close modals (if any)

---

## Accessibility

The app is designed to be accessible:
- Keyboard navigation supported
- Semantic HTML structure
- Color-coded with labels (not color-only)
- Responsive design for all screen sizes

---

**Need More Help?**

Check out the detailed feature guides:
- [Dashboard Guide](dashboard.md)
- [Expense Form Guide](expense-form.md)
- [Expense List Guide](expense-list.md)

Happy expense tracking! 💰
