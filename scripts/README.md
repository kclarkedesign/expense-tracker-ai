# Documentation Scripts

This directory contains automation scripts for capturing screenshots and generating documentation with visual assets.

## Scripts Overview

### 1. `capture-screenshots.mjs`

Automated screenshot capture using Playwright.

**What it does**:
- Launches headless Chrome browser
- Navigates to each page of the app
- Loads sample data for realistic screenshots
- Captures screenshots of all key UI elements
- Saves images to `docs/images/`

**Prerequisites**:
- Development server running at `http://localhost:3000`
- Playwright installed (`npm install -D playwright`)

**Usage**:
```bash
# Make sure dev server is running first
npm run dev

# Then in another terminal:
npm run capture-screenshots
```

**Screenshots captured**:
- Dashboard overview (with and without data)
- Navigation bar
- Expense form (empty and filled)
- Expense list page
- Expense table
- Filters
- Charts (bar chart, pie chart)
- Summary cards
- Top categories list

---

### 2. `update-screenshot-links.mjs`

Updates markdown documentation with screenshot image paths.

**What it does**:
- Scans all `docs/user/*.md` files
- Finds screenshot placeholders
- Replaces placeholders with actual image references
- Updates links to point to `../images/*.png`

**Usage**:
```bash
npm run update-screenshot-links
```

**Placeholder format**:
```markdown
![Dashboard Overview - Placeholder]
```

**Becomes**:
```markdown
![Dashboard Overview](../images/dashboard-with-data.png)
```

---

### 3. `generate-docs-with-screenshots.mjs`

Complete automated workflow for documentation with screenshots.

**What it does**:
1. Checks if dev server is running
2. Starts dev server if needed
3. Waits for app to be ready
4. Runs screenshot capture
5. Updates documentation links
6. Stops dev server (if started by script)

**Usage**:
```bash
# Single command to do everything
npm run docs:screenshots
```

**Perfect for**:
- After generating new documentation
- Updating screenshots after UI changes
- CI/CD pipelines
- Documentation releases

---

## Installation

### Required Dependencies

```bash
# Install Playwright for browser automation
npm install -D playwright @playwright/test

# Install glob for file pattern matching
npm install -D glob
```

### Package.json Scripts

Add these to your `package.json`:

```json
{
  "scripts": {
    "capture-screenshots": "node scripts/capture-screenshots.mjs",
    "update-screenshot-links": "node scripts/update-screenshot-links.mjs",
    "docs:screenshots": "node scripts/generate-docs-with-screenshots.mjs"
  }
}
```

---

## Workflow

### Complete Documentation with Screenshots

When using the `/document-feature` command:

1. **Generate documentation**:
   ```
   /document-feature all
   ```
   This creates all markdown files with screenshot placeholders.

2. **Capture screenshots automatically**:
   ```bash
   npm run docs:screenshots
   ```
   This runs the complete workflow.

3. **Verify**:
   - Check `docs/images/` for PNG files
   - Review user docs to see embedded screenshots

### Manual Screenshot Workflow

If you need more control:

```bash
# Step 1: Start dev server
npm run dev

# Step 2: Capture screenshots (in another terminal)
npm run capture-screenshots

# Step 3: Update documentation
npm run update-screenshot-links
```

---

## Customizing Screenshots

### Adding New Screenshots

Edit `capture-screenshots.mjs`:

```javascript
const screenshots = [
  // Add new screenshot definition
  {
    name: 'my-new-feature',           // Output filename
    path: '/my-feature',               // Route to visit
    description: 'My New Feature',     // Description for logs
    waitFor: 'text=Feature Title',     // Wait for this element
    setup: async (page) => {           // Optional setup
      // Click buttons, fill forms, etc.
    },
    beforeScreenshot: async (page) => { // Optional pre-capture
      await page.waitForTimeout(1000);
    },
    clip: { x: 0, y: 0, width: 800, height: 600 } // Optional crop
  }
];
```

### Adding New Screenshot Mappings

Edit `update-screenshot-links.mjs`:

```javascript
const screenshotMappings = {
  'My Feature - Placeholder': '../images/my-new-feature.png',
  // Add more mappings
};
```

---

## Troubleshooting

### "Dev server not running"

**Problem**: Screenshot script can't connect to `localhost:3000`

**Solution**:
- Manually start: `npm run dev`
- Or use: `npm run docs:screenshots` (auto-starts server)

### "Playwright not found"

**Problem**: Missing Playwright dependency

**Solution**:
```bash
npm install -D playwright @playwright/test
```

### Screenshots are blank/broken

**Problem**: Page didn't load or timing issues

**Solution**:
- Increase `waitForTimeout` values
- Add more specific `waitFor` selectors
- Check browser console errors

### "Cannot find module 'glob'"

**Problem**: Missing glob dependency

**Solution**:
```bash
npm install -D glob
```

---

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Generate Documentation

on:
  push:
    branches: [main]

jobs:
  docs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run docs:screenshots
      - uses: actions/upload-artifact@v3
        with:
          name: documentation
          path: docs/
```

---

## Best Practices

1. **Run after UI changes**: Regenerate screenshots when UI is updated
2. **Keep sample data consistent**: Use the same sample data for reproducible screenshots
3. **Optimize image sizes**: Consider compressing PNGs for web use
4. **Version control**: Commit screenshots to git for documentation history
5. **Review before commit**: Check that screenshots look correct
6. **Update mappings**: Keep screenshot mappings in sync with documentation

---

## Future Enhancements

- [ ] Add image compression (pngquant, sharp)
- [ ] Support dark mode screenshots
- [ ] Add responsive screenshots (mobile, tablet)
- [ ] Generate GIFs for workflows
- [ ] Add visual regression testing
- [ ] Support multiple languages
- [ ] Add annotations/callouts to screenshots

---

## Files

```
scripts/
├── README.md                              # This file
├── capture-screenshots.mjs                # Playwright screenshot capture
├── update-screenshot-links.mjs            # Markdown link updater
└── generate-docs-with-screenshots.mjs     # Full workflow orchestrator
```

---

For more information, see the [documentation command](./.claude/commands/document-feature.md).
