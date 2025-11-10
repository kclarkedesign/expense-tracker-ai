# Adding and Editing Expenses - User Guide

[← Back to User Guide](user-guide.md)

---

## Overview

The Expense Form is where you record your spending. You can use it to add new expenses or edit existing ones. This guide will show you how to use it effectively.

![Expense Form](../images/expense-form-add.png)

**Where to find it**:
- **Add New**: Click "Add Expense" in navigation or go to /add
- **Edit Existing**: Click the pencil icon next to any expense in the Expenses list

---

## The Form Fields

### 💵 Amount

**What to enter**: How much money you spent

**Examples**:
- `45.50` - Forty-five dollars and fifty cents
- `12` - Twelve dollars
- `100.99` - One hundred dollars and ninety-nine cents

**Rules**:
- ✅ Must be a number
- ✅ Must be greater than zero
- ✅ Can include cents (up to 2 decimal places)
- ❌ Can't be negative
- ❌ Can't be zero
- ❌ Can't be empty

**Tips**:
- Enter exact amount from your receipt
- Don't include dollar sign ($) - just the number
- Use decimal point for cents: `45.50` not `45,50`

---

### 🏷️ Category

**What to select**: What type of expense this was

**Available Categories**:

#### 🍔 Food
**Use for**:
- Groceries
- Restaurants and takeout
- Coffee shops
- Meal delivery
- Snacks and drinks

**Examples**: "Lunch at Subway", "Weekly groceries", "Morning coffee"

#### 🚗 Transportation
**Use for**:
- Gas/fuel
- Parking fees
- Public transit (bus, train, subway)
- Ride-sharing (Uber, Lyft, taxi)
- Car maintenance and repairs

**Examples**: "Gas fill-up", "Monthly bus pass", "Uber to airport"

#### 🎬 Entertainment
**Use for**:
- Movies and theaters
- Streaming services (Netflix, Spotify)
- Hobbies and crafts
- Sports and activities
- Books and music
- Video games

**Examples**: "Movie tickets", "Netflix subscription", "Concert ticket"

#### 🛍️ Shopping
**Use for**:
- Clothing and accessories
- Electronics
- Home goods
- Gifts for others
- Personal care items

**Examples**: "New shoes", "Birthday gift for Mom", "Phone charger"

#### 📄 Bills
**Use for**:
- Rent or mortgage
- Utilities (electric, water, gas)
- Phone and internet
- Insurance payments
- Subscriptions (non-entertainment)

**Examples**: "Electric bill", "Car insurance", "Internet service"

#### 📦 Other
**Use for**:
- Medical and healthcare
- Education and courses
- Pet expenses
- Donations
- Anything that doesn't fit other categories

**Examples**: "Doctor visit", "Dog food", "Online course"

**Tips**:
- Choose the most specific category
- Be consistent (always use same category for similar items)
- When in doubt, use "Other"

---

### 📝 Description

**What to write**: What you spent the money on

**Good Examples**:
- ✅ "Lunch at Mario's Pizza"
- ✅ "Weekly groceries at Safeway"
- ✅ "Gas for road trip"
- ✅ "Birthday gift for Sarah"
- ✅ "Netflix monthly subscription"

**Bad Examples**:
- ❌ "Food" (too vague)
- ❌ "Stuff" (not helpful)
- ❌ "Thing" (useless later)
- ❌ "" (empty)

**Rules**:
- ✅ At least 1 character
- ✅ Maximum 200 characters
- ❌ Can't be empty

**Tips**:
- Be specific enough to remember later
- Include store/restaurant name if relevant
- Note what the item was for
- Use consistent naming for recurring expenses

**Character Counter**:
If your description is long, count characters:
- "Coffee" = 6 characters ✅
- "Bought a new laptop computer from Best Buy for work" = 52 characters ✅
- Very long descriptions might hit the 200 limit ⚠️

---

### 📅 Date

**What to select**: When you spent this money

**How it works**:
- Click the date field to open a calendar picker
- Or type the date in format: `YYYY-MM-DD`
- Defaults to today's date

**Examples**:
- Today: Use the default (don't change it)
- Yesterday: Select yesterday's date
- Last week: Pick the specific day

**Rules**:
- ✅ Required field
- ✅ Any past or present date
- ✅ Future dates allowed (for planned expenses)

**Tips**:
- Add expenses as soon as possible (while fresh in memory)
- Use today's date for today's purchases
- Backfill old expenses if you have receipts
- Be accurate - charts depend on correct dates

---

## Adding a New Expense

### Step-by-Step Guide

![Add Expense Steps](../images/expense-form-filled.png)

1. **Navigate to Add Expense**
   - Click "Add Expense" in the top navigation
   - Or go to URL: /add

2. **Fill Out the Form**

   **Amount**:
   - Click in the "Amount" field
   - Type the dollar amount (e.g., `45.50`)

   **Category**:
   - Click the "Category" dropdown
   - Select the appropriate category

   **Description**:
   - Click in the "Description" field
   - Type what you bought (e.g., "Lunch at Joe's Diner")

   **Date**:
   - Click the "Date" field
   - Select the date (or leave as today)

3. **Review Your Entry**
   - Double-check all fields
   - Make sure amount is correct
   - Verify category is appropriate
   - Ensure description is clear

4. **Submit**
   - Click the **"Add Expense"** button
   - Form will clear (ready for next expense)
   - Success! Expense is saved

5. **Add Another** (Optional)
   - Form is now empty and ready
   - Repeat steps to add more expenses

---

## Editing an Existing Expense

### When to Edit

Edit an expense when:
- You entered the wrong amount
- You chose the wrong category
- Description has a typo
- Date is incorrect

**Important**: Only edit if information is wrong. Don't edit to "update" prices over time - add a new expense instead.

### Step-by-Step Edit

![Edit Expense Steps](../images/expense-form-filled.png)

1. **Navigate to Expenses List**
   - Click "Expenses" in navigation
   - Find the expense you want to edit

2. **Click Edit**
   - Look for the pencil icon ✏️ in the "Actions" column
   - Click it

3. **Form Appears with Current Values**
   - Amount field shows current amount
   - Category dropdown shows current category
   - Description shows current text
   - Date shows current date

4. **Make Your Changes**
   - Update any fields that were wrong
   - Leave correct fields as they are

5. **Save Changes**
   - Click **"Update Expense"** button
   - Expense is updated immediately
   - Form remains open (in case you need to edit more)

6. **Done!**
   - Changes are saved
   - Dashboard and charts update automatically
   - Navigate away or edit another expense

---

## Form Buttons

### Add Expense / Update Expense

**Blue button on the right**

- **In Add Mode**: Says "Add Expense"
- **In Edit Mode**: Says "Update Expense"
- **While Saving**: Says "Saving..." (button is disabled)

**What it does**:
- Validates your input
- Saves the expense
- Updates charts and lists

**When disabled**:
- Currently submitting (says "Saving...")
- Wait for it to re-enable

### Reset

**Gray button on the left**

**What it does**:
- Clears all fields
- Resets to default values
- Does NOT save or submit

**When to use**:
- You want to start over
- You changed your mind
- You need to clear the form

**Important**: Reset doesn't delete anything - it just clears the form.

---

## Error Messages

### What Errors Look Like

When something is wrong, you'll see red text below the field:

![Form Errors](../images/expense-form-add.png)

```
Amount: [___________]
⚠️ Amount must be a positive number
```

### Common Errors

**"Amount is required"**
- You left the amount field empty
- **Fix**: Enter a number

**"Amount must be a positive number"**
- You entered 0, a negative number, or text
- **Fix**: Enter a number greater than 0

**"Description is required"**
- You left the description field empty
- **Fix**: Type a description

**"Description must be less than 200 characters"**
- Your description is too long
- **Fix**: Shorten your description

**"Date is required"**
- You cleared the date field
- **Fix**: Select a date

### How to Fix Errors

1. Read the error message
2. Look at the field it's pointing to
3. Correct the issue
4. Error disappears when fixed
5. Try submitting again

**Tip**: You can't submit the form until all errors are fixed!

---

## Quick Add Workflow

For fast expense entry:

1. **Keep the Add page open** after your first entry
2. **Form auto-clears** after each submission
3. **Only change what's different** from last expense:
   - Amount always changes
   - Category might stay the same
   - Date usually stays as today
   - Description always changes
4. **Hit Enter** to submit (or click button)
5. **Repeat** for next expense

**Example**: Adding multiple grocery receipts:
- First: Amount, Food, "Groceries at Safeway", Today → Submit
- Second: Amount, Food, "Produce at farmer's market", Today → Submit
- Third: Amount, Food, "Coffee at Starbucks", Today → Submit

Fast! ⚡

---

## Tips for Accurate Tracking

### Best Practices

✅ **Add Immediately**
- Add expenses right after purchase
- Don't wait until end of day/week
- Fresh memory = better descriptions

✅ **Use Your Receipts**
- Keep receipts until entered
- Enter exact amounts
- Include all details

✅ **Be Specific**
- "Lunch at Chipotle" better than "Food"
- "Gas at Shell, Highway 101" better than "Gas"
- "Birthday gift for Mom - flowers" better than "Gift"

✅ **Double-Check Amount**
- Verify you typed correctly
- Check decimal placement
- Ensure it matches receipt

✅ **Consistent Categories**
- Always use Food for groceries
- Always use Transportation for gas
- Consistency helps with analytics

### Common Mistakes to Avoid

❌ **Waiting Too Long**
- Don't batch-enter old expenses
- Memory fades over time

❌ **Vague Descriptions**
- "Stuff" doesn't help future you
- Be specific

❌ **Wrong Categories**
- Don't mix categories
- Choose most appropriate

❌ **Typos in Amount**
- `4550` instead of `45.50`
- Always double-check!

❌ **Forgetting to Submit**
- Click the button!
- Wait for confirmation

---

## Frequently Asked Questions

**Q: Can I add multiple expenses at once?**
A: Not in one form submission. But the form resets after each add, so you can quickly add many in sequence.

**Q: What if I made a mistake after submitting?**
A: Go to the Expenses page, find the expense, and click the edit button to fix it.

**Q: Can I delete an expense from the form?**
A: No, use the delete button on the Expenses page instead.

**Q: Why does the date default to today?**
A: Most people add expenses the day they happen. You can change it if needed.

**Q: Do I have to use the exact amount or can I round?**
A: Use exact amounts for best tracking. But rounding is fine if you don't need precision.

**Q: Can I use the form on my phone?**
A: Yes! The form works great on mobile browsers.

**Q: What happens if I navigate away without submitting?**
A: Your data is lost. Make sure to click Submit before leaving!

**Q: Can I add future expenses?**
A: Yes, you can select future dates for planned expenses.

---

## Next Steps

After adding expenses:

- **[View Dashboard](dashboard.md)** - See your spending analytics
- **[Manage Expenses](expense-list.md)** - Filter, edit, delete, export
- **[Understand Charts](dashboard.md)** - Learn what the data means

---

## Quick Reference

| Action | Steps |
|--------|-------|
| Add New Expense | Navigate to /add → Fill form → Click "Add Expense" |
| Edit Expense | Go to /expenses → Click pencil icon → Update → Click "Update Expense" |
| Clear Form | Click "Reset" button |
| Fix Error | Read error message → Correct field → Resubmit |

---

**Pro Tip**: Bookmark the /add page for quick access to add expenses anytime!

---

[← Back to User Guide](user-guide.md)
