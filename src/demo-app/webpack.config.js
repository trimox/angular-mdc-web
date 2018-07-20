const webpack = require('webpack');
const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  context: path.resolve(__dirname, './'),
  entry: {
    'polyfills': './polyfills.ts',
    'app': './main.ts'
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@angular-mdc/web': path.resolve(__dirname, '../lib')
    },
    plugins: [
      new TsconfigPathsPlugin({
        configFile: './src/demo-app/tsconfig.json'
      })
    ]
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }, {
            loader: 'ts-loader'
          }, {
            loader: 'angular2-template-loader'          
          }, {
            loader: 'string-replace-loader',
            options: {
              search: 'moduleId: module.id,',
              replace: '',
              flags: 'g'
            }
          }
        ]
      },      
      {
        test: /\.(sass|scss)$/,
        loaders: [
          'raw-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
    ]
  },

  devServer: {
    contentBase: './src/demo-app',
    port: 4000,
    inline: true
  }
}
