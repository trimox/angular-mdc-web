/**
 * @fileoverview Prepares the deployment packages
*/

const fs = require('fs');
const path = require('path');
const glob = require('glob');

main(process.argv);

function main(argv) {
  const srcFiles = glob.sync(`src/theme/**/*.scss`);
  srcFiles.forEach((srcFile) => copy(srcFile));
}

function copy(srcFile) {
  const src = fs.readFileSync(srcFile, 'utf8');
  let rewrittenImport = src.replace(/"@material/g, '"..');

  fs.writeFileSync(srcFile, rewrittenImport, 'utf8');
  console.log(`[rewrite] ${srcFile}`);
}
