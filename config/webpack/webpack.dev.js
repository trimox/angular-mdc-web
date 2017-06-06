const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const CopyPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OUT_PATH = path.resolve('./publish');
const MDC_DIR = path.resolve(__dirname, 'node_modules', '@material');
var util = require('./util');

const CSS_LOADER_CONFIG = [{
  loader: 'css-loader'
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
    filename: 'assets/style.min.css'
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
      minimize: true,
      debug: false
    }),
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
      // filename: '[name].[chunkhash].bundle.js',
      // sourceMapFilename: '[name].[chunkhash].bundle.js.map',
      // chunkFilename: '[name].chunk.[chunkhash].js',
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
        loader: 'babel-loader?presets[]=es2015',
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
      "enforce": "pre",
      "test": /\.(js|jsx)$/,
      "use": [{
        "loader": 'babel-loader',
        "options": {
          "presets": ['es2015'],
        },
      }, ],
      "exclude": [
        /\/node_modules\//
      ]
    }, {
      test: /\.html$/,
      loader: 'html-loader',
    }, {
      test: /\.(sass|scss)$/,
      use: [
        'style-loader',
        'css-loader', {
          loader: 'sass-loader',
          options: {
            includePaths: ['node_modules', "node_modules/@material/*"]
          }
        },
      ]
    }]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      //minimize: true, do not minimize for any loader - this will result in weird, unpredictable behavior
      debug: false
    }),
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
