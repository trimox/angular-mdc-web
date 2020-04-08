#!/usr/bin/env node

/**
 * Script that builds the release output of all packages which have the "release-package
 * bazel tag set. The script builds all those packages and copies the release output to the
 * distribution folder within the project.
 */

const { execSync } = require('child_process');
const { join } = require('path');
const { chmod, cp, mkdir, rm, set, test } = require('shelljs');

// ShellJS should exit if a command fails.
set('-e');

/** Name of the Bazel tag that will be used to find release package targets. */
const releaseTargetTag = 'release-package';

/** Path to the project directory. */
const projectDir = join(__dirname, '../');

/** Command that runs Bazel. */
const bazelCmd = process.env.BAZEL_COMMAND || `yarn -s bazel`;

/** Command that queries Bazel for all release package targets. */
const queryPackagesCmd =
  `${bazelCmd} query --output=label "attr('tags', '\\[.*${releaseTargetTag}.*\\]', //packages/...) ` +
  `intersect kind('.*_package', //packages/...)"`;

// Export the methods for building the release packages. These
// can be consumed by the release tool.
exports.buildReleasePackages = buildReleasePackages;
exports.defaultBuildReleasePackages = defaultBuildReleasePackages;

if (module === require.main) {
  defaultBuildReleasePackages();
}

/**
 * Builds the release packages with the default compile mode and
 * output directory.
 */
function defaultBuildReleasePackages() {
  buildReleasePackages(false, join(projectDir, 'dist/releases'));
}

/**
 * Builds the release packages with the given compile mode and copies
 * the package output into the given directory.
 */
function buildReleasePackages(useIvy, distPath) {
  console.log('######################################');
  console.log('  Building release packages...');
  console.log(`  Compiling with Ivy: ${useIvy}`);
  console.log('######################################');

  const targets = exec(queryPackagesCmd, true).split(/\r?\n/);
  const bazelBinPath = exec(`${bazelCmd} info bazel-bin`, true);
  const outputPath = join(bazelBinPath, 'packages', 'npm_package');

  if (test('-d', outputPath)) {
    chmod('-R', 'u+w', outputPath);
    rm('-rf', outputPath);
  }

  // Build with "--config=release" so that Bazel runs the workspace stamping script. The
  // stamping script ensures that the version placeholder is populated in the release output.
  exec(`${bazelCmd} build --config=release --config=${useIvy ? 'ivy' : 'view-engine'} ${targets.join(' ')}`);

  // Delete the distribution directory so that the output is guaranteed to be clean. Re-create
  // the empty directory so that we can copy the release packages into it later.
  rm('-rf', distPath);
  mkdir('-p', distPath);

  // Copy the package output into the specified distribution folder.
  const targetFolder = join(distPath, 'packages');
  console.log(`> Copying package output to "${targetFolder}"`);
  cp('-R', outputPath, targetFolder);
  chmod('-R', 'u+w', targetFolder);
}

/**
 * Executes the given command in the project directory.
 * @param {string} command The command to run
 * @param {boolean=} captureStdout Whether the stdout should be captured and
 *   returned.
 */
function exec(command, captureStdout) {
  const stdout = execSync(command, {
    cwd: projectDir,
    stdio: ['inherit', captureStdout ? 'pipe' : 'inherit', 'inherit'],
  });

  if (captureStdout) {
    process.stdout.write(stdout);
    return stdout.toString().trim();
  }
}