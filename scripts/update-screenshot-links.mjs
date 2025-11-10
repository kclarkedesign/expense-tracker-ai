import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Mapping of placeholder text to actual screenshot filenames
const screenshotMappings = {
  'Dashboard Overview - Placeholder': '../images/dashboard-with-data.png',
  'Dashboard Screenshot - Placeholder': '../images/dashboard-with-data.png',
  'Quick Start - Placeholder': '../images/dashboard-overview.png',
  'Navigation Bar - Placeholder': '../images/navigation-bar.png',
  'Expense Form - Placeholder': '../images/expense-form-add.png',
  'Add Expense Form - Placeholder': '../images/expense-form-add.png',
  'Add Expense Steps - Placeholder': '../images/expense-form-filled.png',
  'Edit Expense Steps - Placeholder': '../images/expense-form-filled.png',
  'Expense List Page - Placeholder': '../images/expense-list-page.png',
  'Expense List - Placeholder': '../images/expense-table.png',
  'Expense Table - Placeholder': '../images/expense-table.png',
  'Monthly Trend Chart - Placeholder': '../images/monthly-trend-chart.png',
  'Category Pie Chart - Placeholder': '../images/category-pie-chart.png',
  'Top Categories List - Placeholder': '../images/top-categories-list.png',
  'Edit Expense - Placeholder': '../images/expense-list-page.png',
  'Delete Expense - Placeholder': '../images/expense-table.png',
  'Export Button - Placeholder': '../images/expense-list-filters.png',
  'Form Errors - Placeholder': '../images/expense-form-add.png',
};

function updateScreenshotLinks() {
  console.log('🔄 Updating screenshot links in documentation...\n');

  // Find all markdown files in docs/user/
  const userDocsDir = join(__dirname, '../docs/user');
  const files = readdirSync(userDocsDir)
    .filter(f => f.endsWith('.md'))
    .map(f => join(userDocsDir, f));

  let totalReplacements = 0;

  files.forEach(filePath => {
    let content = readFileSync(filePath, 'utf-8');
    let replacements = 0;
    const fileName = filePath.split(/[/\\]/).pop();

    // Replace each placeholder
    Object.entries(screenshotMappings).forEach(([placeholder, imagePath]) => {
      const placeholderPattern = new RegExp(`!\\[${placeholder}\\]`, 'g');
      const matches = content.match(placeholderPattern);

      if (matches) {
        content = content.replace(
          placeholderPattern,
          `![${placeholder.replace(' - Placeholder', '')}](${imagePath})`
        );
        replacements += matches.length;
      }
    });

    if (replacements > 0) {
      writeFileSync(filePath, content, 'utf-8');
      console.log(`✅ ${fileName}: ${replacements} placeholder(s) updated`);
      totalReplacements += replacements;
    } else {
      console.log(`⏭️  ${fileName}: No placeholders found`);
    }
  });

  console.log(`\n✨ Total: ${totalReplacements} screenshot link(s) updated`);
}

updateScreenshotLinks();
