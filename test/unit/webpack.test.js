const path = require('path');
const webpack = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  mode: 'production',
  devtool: 'inline-source-map',
  performance: {
    hints: false
  },
  plugins: [
    // Workaround for angular/angular#1158
    new webpack.ContextReplacementPlugin(
      /(.+)?angular(\\|\/)core(.+)?/,
      path.resolve(__dirname, "./test")
    )
  ],
  resolve: {
    plugins: [
      new TsconfigPathsPlugin({
        configFile: './test/unit/tsconfig.json'
      })
    ],
    extensions: ['.js', '.ts'],
  },
  module: {
    rules: [
      {
          // Mark files inside `@angular/core` as using SystemJS style dynamic imports.
          // Removing this will cause deprecation warnings to appear.
          test: /[\/\\]@angular[\/\\]core[\/\\].+\.js$/,
          parser: { system: true },
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      }, {
        loader: 'string-replace-loader',
          query: {
            search: 'moduleId: module.id,',
            replace: '',
            flags: 'g'
          }
        },
      {
        enforce: 'post',
        test: /\.(js|ts)$/, loader: 'sourcemap-istanbul-instrumenter-loader?force-sourcemap=true',
        include: path.resolve('packages/')
      }
    ]
  }
};
