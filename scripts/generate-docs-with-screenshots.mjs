#!/usr/bin/env node

/**
 * Complete documentation generation workflow with automated screenshots
 *
 * This script:
 * 1. Checks if dev server is running
 * 2. Starts dev server if needed
 * 3. Waits for app to be ready
 * 4. Captures screenshots
 * 5. Updates documentation with screenshot links
 * 6. Stops dev server if it was started by this script
 */

import { spawn } from 'child_process';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DEV_SERVER_PORT = 3000;
const DEV_SERVER_URL = `http://localhost:${DEV_SERVER_PORT}`;
const MAX_WAIT_TIME = 60000; // 60 seconds

let devServerProcess = null;
let serverWasStartedByUs = false;

async function isServerRunning() {
  try {
    const response = await fetch(DEV_SERVER_URL);
    return response.ok;
  } catch (error) {
    return false;
  }
}

async function waitForServer(maxWaitMs = MAX_WAIT_TIME) {
  console.log('⏳ Waiting for development server to be ready...');
  const startTime = Date.now();

  while (Date.now() - startTime < maxWaitMs) {
    if (await isServerRunning()) {
      console.log('✅ Development server is ready!\n');
      return true;
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.error('❌ Development server did not start in time');
  return false;
}

async function startDevServer() {
  console.log('🚀 Starting development server...\n');

  return new Promise((resolve, reject) => {
    const isWindows = process.platform === 'win32';
    const command = isWindows ? 'npm.cmd' : 'npm';

    devServerProcess = spawn(command, ['run', 'dev'], {
      stdio: ['ignore', 'pipe', 'pipe'],
      cwd: join(__dirname, '..'),
      detached: false
    });

    let output = '';

    devServerProcess.stdout.on('data', (data) => {
      output += data.toString();
      // Check for Next.js ready messages
      if (output.includes('Ready in') || output.includes('started server')) {
        resolve(true);
      }
    });

    devServerProcess.stderr.on('data', (data) => {
      output += data.toString();
      if (output.includes('Ready in') || output.includes('started server')) {
        resolve(true);
      }
    });

    devServerProcess.on('error', (error) => {
      console.error('❌ Failed to start dev server:', error);
      reject(error);
    });

    // Timeout after 30 seconds
    setTimeout(() => {
      if (devServerProcess && !devServerProcess.killed) {
        resolve(true); // Assume it started
      }
    }, 30000);
  });
}

function stopDevServer() {
  if (devServerProcess && !devServerProcess.killed) {
    console.log('\n🛑 Stopping development server...');

    const isWindows = process.platform === 'win32';
    if (isWindows) {
      // On Windows, use taskkill to kill the process tree
      spawn('taskkill', ['/pid', devServerProcess.pid, '/f', '/t']);
    } else {
      devServerProcess.kill('SIGTERM');
    }
  }
}

async function runScript(scriptName, description) {
  console.log(`\n▶️  ${description}...\n`);

  return new Promise((resolve, reject) => {
    const isWindows = process.platform === 'win32';
    const command = isWindows ? 'node.exe' : 'node';
    const scriptPath = join(__dirname, scriptName);

    const proc = spawn(command, [scriptPath], {
      stdio: 'inherit',
      cwd: join(__dirname, '..')
    });

    proc.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${scriptName} exited with code ${code}`));
      }
    });

    proc.on('error', (error) => {
      reject(error);
    });
  });
}

async function main() {
  console.log('╔═══════════════════════════════════════════════════╗');
  console.log('║  Documentation Generation with Screenshots       ║');
  console.log('╚═══════════════════════════════════════════════════╝\n');

  try {
    // Step 1: Check if server is already running
    console.log('🔍 Checking if development server is running...');
    const serverRunning = await isServerRunning();

    if (serverRunning) {
      console.log('✅ Development server is already running\n');
    } else {
      console.log('⚠️  Development server is not running');

      // Step 2: Start dev server
      await startDevServer();
      serverWasStartedByUs = true;

      // Step 3: Wait for server to be ready
      const ready = await waitForServer();
      if (!ready) {
        throw new Error('Development server failed to start');
      }
    }

    // Step 4: Capture screenshots
    await runScript('capture-screenshots.mjs', 'Capturing screenshots');

    // Step 5: Update documentation links
    await runScript('update-screenshot-links.mjs', 'Updating documentation with screenshot links');

    console.log('\n╔═══════════════════════════════════════════════════╗');
    console.log('║  ✨ Documentation generation complete!            ║');
    console.log('╚═══════════════════════════════════════════════════╝\n');

    console.log('📁 Screenshots saved to: docs/images/');
    console.log('📝 Documentation updated in: docs/user/\n');

  } catch (error) {
    console.error('\n❌ Error during documentation generation:');
    console.error(error.message);
    process.exitCode = 1;
  } finally {
    // Step 6: Clean up - stop dev server if we started it
    if (serverWasStartedByUs) {
      stopDevServer();
      console.log('✅ Development server stopped');
    }
  }
}

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n\n⚠️  Process interrupted');
  if (serverWasStartedByUs) {
    stopDevServer();
  }
  process.exit(1);
});

process.on('SIGTERM', () => {
  if (serverWasStartedByUs) {
    stopDevServer();
  }
  process.exit(1);
});

// Run the main function
main();
