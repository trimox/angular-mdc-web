import nodeResolve from 'rollup-plugin-node-resolve';
import angular from 'rollup-plugin-angular';
import { minify as minifyHtml } from 'html-minifier';
import typescript from 'rollup-plugin-typescript';

const globals = {
  '@angular/common': 'ng.common',
  '@angular/core': 'ng.core',
  '@angular/forms': 'ng.forms',
  '@material/animation': 'material.animation',
  '@material/button': 'material.button',
  '@material/card': 'material.card',
  '@material/checkbox': 'material.checkbox',
  '@material/elevation': 'material.elevation',
  '@material/fab': 'material.fab',
  '@material/form-field': 'material.formfield',
  '@material/linear-progress': 'material.linear-progress',
  '@material/menu': 'material.menu',
  '@material/radio': 'material.radio',
  '@material/ripple': 'material.ripple',
  '@material/snackbar': 'material.snackbar',
  '@material/switch': 'material.switch',
  '@material/textfield': 'material.textfield',
  '@material/theme': 'material.theme',
  '@material/toolbar': 'material.toolbar',
  '@material/typography': 'material.typography',
  '@angular-mdc/web': 'ng.material',
  'rxjs': 'Rx'
};

const htmlminOpts = {
  caseSensitive: true,
  collapseWhitespace: true,
  removeComments: true,
};

export default {
  entry: 'build/material.js',
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
    { dest: 'dist/bundles/material.umd.js', format: 'umd', moduleName: 'angularMDCWeb' },
    { dest: 'dist/material.es5.js', format: 'es' }
  ],
  external: Object.keys(globals),
  globals: globals
};
