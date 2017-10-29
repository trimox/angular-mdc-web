const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OUT_PATH = path.resolve('./publish-demo');

const CSS_LOADER_CONFIG = [{
  loader: 'css-loader',
  options: {
    minimize: false,
  }
}, {
  loader: 'postcss-loader',
  options: {
    plugins: () => [require('autoprefixer')({
      grid: false
    })]
  }
}, {
  loader: 'sass-loader'
}];

module.exports = [{
  entry: {
    'polyfills': './src/demo-app/polyfills.ts',
    'vendor': './src/demo-app/vendor.ts',
    'app': './src/demo-app/main.ts',
    'css': './src/demo-app/sass/main.scss',
  },
  devServer: {
    contentBase: 'src/demo-app',
    port: 4000
  },
  output: {
    path: OUT_PATH,
    filename: '[name].bundle.js'
  },
  resolve: {
    extensions: ['.js', '.ts'],
    modules: ['src', 'node_modules'],
  },
  plugins: [
    // Workaround for angular/angular#1158
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      path.resolve(__dirname, './src')
    ),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: function() {
          return [autoprefixer];
        }
      }
    }),
    new ExtractTextPlugin('assets/style.css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills'],
      minChunks: Infinity
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env']
            },
          }, {
            loader: 'ts-loader',
            options: {
              configFile: 'src/demo-app/tsconfig.json'
            }
          }, {
            loader: 'angular2-template-loader'
          }],
      }, {
          test: /\.html$/,
          loader: 'html-loader'
      }, {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: CSS_LOADER_CONFIG
      })
    }]
  }
}]
