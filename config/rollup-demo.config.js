import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'publish-demo/main-aot.js',
  plugins: [
    nodeResolve(),
    commonjs({
      include: 'node_modules/**',
    })
  ],
  onwarn: function(warning) {
    // Suppress known error message caused by TypeScript compiled code with Rollup
    // https://github.com/rollup/rollup/wiki/Troubleshooting#this-is-undefined
    if (warning.code !== 'THIS_IS_UNDEFINED')
      console.log("Rollup warning: ", warning.message);
  },
  sourcemap: false,
  output: {
    file: 'publish-demo/dist/build.js',
    format: 'iife',
  },
};
