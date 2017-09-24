/**
 * @fileoverview Rewrites import statements such that:
*/

const fs = require('fs');
const path = require('path');
const glob = require('glob');

main(process.argv);

function main(argv) {
  if (argv.length < 3) {
    console.error('Missing root directory path');
    process.exit(1);
  }

  const rootDir = path.resolve(process.argv[2]);
  const srcFiles = glob.sync(`${rootDir}/**/*.scss`);
  srcFiles.forEach((srcFile) => transform(srcFile, rootDir));
}

function transform(srcFile, rootDir) {
  const src = fs.readFileSync(srcFile, 'utf8');
  let rewrittenImport = src.replace(/"@material/g, '"..');

  fs.writeFileSync(srcFile, rewrittenImport, 'utf8');
  console.log(`[rewrite] ${srcFile}`);
}
