#!/usr/bin/env node

/**
 * Script that runs the demo-app.
 */

const {execSync} = require('child_process');
const {set, cd} = require('shelljs');
const {join} = require('path');

// ShellJS should throw if any command fails.
set('-e');

/** Path to the demo directory. */
const projectDirPath = join(__dirname, '../demos');

// Go to demos directory.
cd(projectDirPath);

// Check if dependencies are installed, run demo-app.
exec('yarn && yarn start');

function exec(command, captureStdout) {
  const stdout = execSync(command, {
    cwd: projectDirPath,
    stdio: ['inherit', captureStdout ? 'pipe' : 'inherit', 'inherit'],
  });

  if (captureStdout) {
    process.stdout.write(stdout);
    return stdout.toString().trim();
  }
}