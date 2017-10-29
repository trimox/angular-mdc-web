const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.js', '.ts'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: ['ts-loader?configFile=test/unit/tsconfig.json']
      },
      {
        enforce: 'post',
        test: /\.(js|ts)$/, loader: 'sourcemap-istanbul-instrumenter-loader?force-sourcemap=true',
        include: path.resolve('src/lib/')
      }
    ]
  },
  plugins: [
    // Workaround for angular/angular#1158
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      path.resolve(__dirname, './test')
    )
  ]
};
