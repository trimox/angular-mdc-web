const webpack = require('webpack');
var util = require('./util');

module.exports = {
  entry: './src/lib/index.ts',
  output: {
    path: util.root('dist/bundle'),
    filename: 'core.js',
    libraryTarget: 'umd',
    library: 'angularMDCWeb'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  externals: {
    '@angular/core': {
      root: ['ng', 'core'],
      commonjs: '@angular/core',
      commonjs2: '@angular/core',
      amd: '@angular/core'
    },
    '@angular/common': {
      root: ['ng', 'common'],
      commonjs: '@angular/common',
      commonjs2: '@angular/common',
      amd: '@angular/common'
    },
    '@angular/forms': {
      root: ['ng', 'forms'],
      commonjs: '@angular/forms',
      commonjs2: '@angular/forms',
      amd: '@angular/forms'
    },
    '@angular/platform-browser': {
      root: ['ng', 'platformBrowser'],
      commonjs: '@angular/platform-browser',
      commonjs2: '@angular/platform-browser',
      amd: '@angular/platform-browser'
    },
    '@angular/platform-browser-dynamic': {
      root: ['ng', 'platformBrowserDynamic'],
      commonjs: '@angular/platform-browser-dynamic',
      commonjs2: '@angular/platform-browser-dynamic',
      amd: '@angular/platform-browser-dynamic'
    },
    'material-components-web': {
      root: ['mdc', 'material-components-web'],
      commonjs: 'material-components-web',
      commonjs2: 'material-components-web',
      amd: 'material-components-web'
    }
  },
  module: {
    rules: [{
      test: /\.ts$/,
      use: [{
        loader: 'babel-loader?presets[]=es2015'
      }, {
        loader: 'awesome-typescript-loader',
        options: {
          configFileName: './src/lib/tsconfig.json'
        }
      }, {
        loader: 'angular2-template-loader'
      }],
      exclude: [/\.(spec|e2e)\.ts$/]
    }, {
      test: /\.html$/,
      loader: 'html-loader'
    }, {
      test: /\.(sass|scss)$/,
      use: [
        'style-loader',
        'css-loader', {
          loader: 'sass-loader',
          options: {
            includePaths: [
              'node_modules'
            ]
          },
        },
      ]
    }]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      sourceMap: true,
      include: /\.min\.js$/,
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: 'core.js.map',
      test: /\.js($|\?)/i
    })
  ]
};
