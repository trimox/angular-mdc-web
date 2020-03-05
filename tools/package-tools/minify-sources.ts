import {readFileSync, writeFileSync} from 'fs';

// There are no type definitions available for these imports.
const terser = require('terser');

/** Minifies a JavaScript file by using terser-js. Also writes sourcemaps to the output. */
export function terserJs(inputPath: string, outputPath: string) {
  const sourceMapPath = `${outputPath}.map`;

  const result = terser.minify(readFileSync(inputPath, 'utf8'), {
    sourceMap: {
      filename: `${inputPath}.map`,
      url: sourceMapPath
    },
    output: {
      comments: 'some'
    }
  });

  // console.log(result.error); // runtime error, `undefined` in this case
  // console.log(result.warnings); // [ 'Dropping unused variable u [0:1,18]' ]
  writeFileSync(outputPath, result.code);
  writeFileSync(sourceMapPath, result.map);
}
