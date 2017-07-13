import nodeResolve from 'rollup-plugin-node-resolve';
import angular from 'rollup-plugin-angular';
import { minify as minifyHtml } from 'html-minifier';
import typescript from 'rollup-plugin-typescript';

const ROLLUP_GLOBALS = {
  '@angular/core': 'ng.core',
  '@angular/common': 'ng.common',
  '@angular/forms': 'ng.forms',
  '@angular/http': 'ng.http',
  '@angular-mdc/web': 'ng.material',
  'rxjs': 'Rx'
};

const htmlminOpts = {
  caseSensitive: true,
  collapseWhitespace: true,
  removeComments: true,
};

export default {
  entry: 'build/index.js',
  format: 'iife',
  plugins: [
    angular({
      preprocessors: {
        template: template => minifyHtml(template, htmlminOpts)
      }
    }),
    typescript(),
    nodeResolve({ jsnext: true, main: true, jail: '/src/lib' })
  ],
  onwarn: function(warning) {
    // Suppress known error message caused by TypeScript compiled code with Rollup
    // https://github.com/rollup/rollup/wiki/Troubleshooting#this-is-undefined
    if (warning.code !== 'THIS_IS_UNDEFINED')
      console.log("Rollup warning: ", warning.message);
  },
  sourceMap: true,
  targets: [
    { dest: 'dist/bundles/material.umd.js', format: 'umd', moduleName: 'ng.material' },
    { dest: 'dist/material.es5.js', format: 'es' }
  ],
  external: Object.keys(ROLLUP_GLOBALS),
  globals: ROLLUP_GLOBALS
};
