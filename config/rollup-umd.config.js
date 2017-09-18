import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

const ROLLUP_GLOBALS = {
  '@angular/core': 'ng.core',
  '@angular/common': 'ng.common',
  '@angular/forms': 'ng.forms',
  '@angular/http': 'ng.http',
  'rxjs': 'Rx'
};

export default {
  input: 'build/index.js',
  plugins: [
    nodeResolve({
      jsnext: true,
      main: true
    }),
    commonjs({
      include: 'node_modules/**'
    }),
  ],
  onwarn: function(warning) {
    // Suppress known error message caused by TypeScript compiled code with Rollup
    // https://github.com/rollup/rollup/wiki/Troubleshooting#this-is-undefined
    if (warning.code !== 'THIS_IS_UNDEFINED')
      console.log("Rollup warning: ", warning.message);
  },
  sourcemap: true,
  external: Object.keys(ROLLUP_GLOBALS),
  globals: ROLLUP_GLOBALS,
  output: {
    file: 'dist/bundles/material.umd.js',
    format: 'iife',
    name: 'ng.material',
  },
};
