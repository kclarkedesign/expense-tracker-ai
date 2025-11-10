import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mkdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const OUTPUT_DIR = join(__dirname, '../docs/images');

// Ensure output directory exists
mkdirSync(OUTPUT_DIR, { recursive: true });

const screenshots = [
  {
    name: 'dashboard-overview',
    path: '/',
    description: 'Dashboard Overview',
    waitFor: 'text=Total Spending',
    beforeScreenshot: async (page) => {
      // Wait for charts to render
      await page.waitForTimeout(2000);
    }
  },
  {
    name: 'dashboard-with-data',
    path: '/',
    description: 'Dashboard with Sample Data',
    waitFor: 'text=Total Spending',
    setup: async (page) => {
      // Click "Load Sample Data" button if it exists
      const sampleButton = await page.locator('button:has-text("Add Sample Data")').first();
      if (await sampleButton.isVisible()) {
        await sampleButton.click();
        await page.waitForTimeout(1000);
      }
    },
    beforeScreenshot: async (page) => {
      await page.waitForTimeout(2000);
    }
  },
  {
    name: 'navigation-bar',
    path: '/',
    description: 'Navigation Bar',
    clip: { x: 0, y: 0, width: 1280, height: 80 }
  },
  {
    name: 'expense-form-add',
    path: '/add',
    description: 'Add Expense Form',
    waitFor: 'text=Add New Expense'
  },
  {
    name: 'expense-form-filled',
    path: '/add',
    description: 'Expense Form Filled Example',
    waitFor: 'text=Add New Expense',
    setup: async (page) => {
      await page.fill('input[type="number"]', '45.50');
      await page.selectOption('select', 'Food');
      await page.fill('input[type="text"]', 'Lunch at Mario\'s Pizza');
      // Date field already has today's date
    }
  },
  {
    name: 'expense-list-page',
    path: '/expenses',
    description: 'Expense List Page',
    waitFor: 'text=Expenses',
    beforeScreenshot: async (page) => {
      await page.waitForTimeout(1000);
    }
  },
  {
    name: 'expense-list-filters',
    path: '/expenses',
    description: 'Expense List Filters',
    waitFor: 'text=Expenses',
    clip: { x: 0, y: 100, width: 1280, height: 200 }
  },
  {
    name: 'expense-table',
    path: '/expenses',
    description: 'Expense Table',
    waitFor: 'text=Expenses',
    beforeScreenshot: async (page) => {
      await page.waitForTimeout(1000);
    }
  },
  {
    name: 'monthly-trend-chart',
    path: '/',
    description: 'Monthly Trend Chart',
    waitFor: 'text=Monthly Spending Trend',
    setup: async (page) => {
      // Ensure sample data is loaded
      const sampleButton = await page.locator('button:has-text("Add Sample Data")').first();
      if (await sampleButton.isVisible()) {
        await sampleButton.click();
        await page.waitForTimeout(1000);
      }
    },
    beforeScreenshot: async (page) => {
      await page.waitForTimeout(2000);
      // Scroll to chart
      await page.locator('text=Monthly Spending Trend').scrollIntoViewIfNeeded();
    },
    clip: { x: 0, y: 400, width: 640, height: 400 }
  },
  {
    name: 'category-pie-chart',
    path: '/',
    description: 'Category Pie Chart',
    waitFor: 'text=Spending by Category',
    setup: async (page) => {
      const sampleButton = await page.locator('button:has-text("Add Sample Data")').first();
      if (await sampleButton.isVisible()) {
        await sampleButton.click();
        await page.waitForTimeout(1000);
      }
    },
    beforeScreenshot: async (page) => {
      await page.waitForTimeout(2000);
      await page.locator('text=Spending by Category').scrollIntoViewIfNeeded();
    },
    clip: { x: 640, y: 400, width: 640, height: 400 }
  },
  {
    name: 'top-categories-list',
    path: '/',
    description: 'Top Categories List',
    waitFor: 'text=Top Categories',
    setup: async (page) => {
      const sampleButton = await page.locator('button:has-text("Add Sample Data")').first();
      if (await sampleButton.isVisible()) {
        await sampleButton.click();
        await page.waitForTimeout(1000);
      }
    },
    beforeScreenshot: async (page) => {
      await page.waitForTimeout(1000);
      await page.locator('text=Top Categories').scrollIntoViewIfNeeded();
    }
  },
  {
    name: 'summary-cards',
    path: '/',
    description: 'Summary Cards',
    waitFor: 'text=Total Spending',
    setup: async (page) => {
      const sampleButton = await page.locator('button:has-text("Add Sample Data")').first();
      if (await sampleButton.isVisible()) {
        await sampleButton.click();
        await page.waitForTimeout(1000);
      }
    },
    clip: { x: 0, y: 150, width: 1280, height: 200 }
  },
  {
    name: 'sample-data-button',
    path: '/',
    description: 'Sample Data Button',
    waitFor: 'button:has-text("Add Sample Data")',
    clip: { x: 200, y: 200, width: 880, height: 300 }
  }
];

async function captureScreenshots() {
  console.log('🚀 Starting screenshot capture...');
  console.log(`📍 Base URL: ${BASE_URL}`);
  console.log(`📁 Output directory: ${OUTPUT_DIR}`);
  console.log('');

  const browser = await chromium.launch({
    headless: true
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 2 // Retina display for better quality
  });

  const page = await context.newPage();

  let successCount = 0;
  let failCount = 0;

  for (const screenshot of screenshots) {
    try {
      console.log(`📸 Capturing: ${screenshot.description}...`);

      // Navigate to page
      await page.goto(`${BASE_URL}${screenshot.path}`, {
        waitUntil: 'networkidle'
      });

      // Wait for specific element
      if (screenshot.waitFor) {
        await page.waitForSelector(screenshot.waitFor, { timeout: 10000 });
      }

      // Run setup if provided (e.g., fill form, click button)
      if (screenshot.setup) {
        await screenshot.setup(page);
      }

      // Wait before screenshot
      if (screenshot.beforeScreenshot) {
        await screenshot.beforeScreenshot(page);
      }

      // Take screenshot
      const screenshotPath = join(OUTPUT_DIR, `${screenshot.name}.png`);
      await page.screenshot({
        path: screenshotPath,
        fullPage: !screenshot.clip,
        clip: screenshot.clip
      });

      console.log(`   ✅ Saved: ${screenshot.name}.png`);
      successCount++;

    } catch (error) {
      console.error(`   ❌ Failed: ${screenshot.description}`);
      console.error(`      Error: ${error.message}`);
      failCount++;
    }
  }

  await browser.close();

  console.log('');
  console.log('📊 Summary:');
  console.log(`   ✅ Success: ${successCount}`);
  console.log(`   ❌ Failed: ${failCount}`);
  console.log(`   📁 Screenshots saved to: ${OUTPUT_DIR}`);
  console.log('');

  if (failCount > 0) {
    console.log('⚠️  Some screenshots failed. Make sure the dev server is running at', BASE_URL);
    process.exit(1);
  } else {
    console.log('✨ All screenshots captured successfully!');
  }
}

// Run the script
captureScreenshots().catch(error => {
  console.error('❌ Screenshot capture failed:', error);
  process.exit(1);
});
