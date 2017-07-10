const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OUT_PATH = path.resolve('./publish');
var util = require('./util');

const CSS_LOADER_CONFIG = [{
  loader: 'css-loader',
  options: {
    minimize: true
  }
}, {
  loader: 'postcss-loader',
  options: {
    plugins: () => [require('autoprefixer')({
      grid: false
    })]
  }
}, {
  loader: 'sass-loader',
  options: {
    includePaths: ['node_modules', 'node_modules/@material/*', 'sass']
  }
}];

module.exports = [{
  name: 'css',
  entry: path.resolve('./src/demo-app/sass/main.scss'),
  output: {
    path: OUT_PATH,
    // this output file is replaced below when ExtractTextPlugin generates final css.
    filename: 'assets/style.css'
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: CSS_LOADER_CONFIG
      })
    }]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: function() {
          return [autoprefixer];
        }
      }
    }),
    new ExtractTextPlugin('assets/style.css')
  ]
}, {
  devtool: false,
  output: {
    path: OUT_PATH,
    filename: '[name].bundle.js'
  },
  entry: {
    'polyfills': './src/demo-app/polyfills.ts',
    'vendor': './src/demo-app/vendor.ts',
    'app': './src/demo-app/root.module.ts'
  },
  resolve: {
    extensions: ['.js', '.ts'],
    modules: [util.root('src'), util.root('node_modules')],
  },
  module: {
    rules: [{
      test: /\.ts$/,
      use: [{
        loader: 'babel-loader?presets[]=env',
      }, {
        loader: 'awesome-typescript-loader',
        options: {
          configFileName: './src/demo-app/tsconfig.json'
        }
      }, {
        loader: 'angular2-template-loader'
      }],
      exclude: [/\.(spec|e2e)\.ts$/]
    }, {
      test: /\.html$/,
      loader: 'html-loader'
    }]
  },
  plugins: [
    // Workaround for angular/angular#1158
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      path.resolve(__dirname, './src')
    ),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills'],
      minChunks: Infinity
    }),
  ]
}];
