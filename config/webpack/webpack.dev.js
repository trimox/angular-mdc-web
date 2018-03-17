const webpack = require('webpack');
const path = require('path');
const OUT_PATH = path.resolve('./publish');
const TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;

module.exports = [{
  context: path.resolve(__dirname, '../../src/demo-app'),
  entry: {
    'polyfills': './polyfills.ts',
    'vendor': './vendor.ts',
    'app': './main.ts'
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './src/demo-app',
    port: 4000,
  },
  output: {
    path: OUT_PATH,
    filename: '[name].bundle.js'
  },
  resolve: {
    plugins: [
      new TsConfigPathsPlugin({
        configFileName: './src/demo-app/tsconfig.json',
        compiler: 'typescript'
      })
    ],
    extensions: ['.js', '.ts']
  },
  plugins: [
    // Workaround for angular/angular#1158
    new webpack.ContextReplacementPlugin(
      /(.+)?angular(\\|\/)core(.+)?/,
      path.resolve(__dirname, './src')
    ),
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
              presets: ['@babel/preset-env']
            },
          },  {
            loader: 'awesome-typescript-loader?{configFileName: "src/demo-app/tsconfig.json"}'
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
        ],
      }, {
          test: /\.html$/,
          loader: 'html-loader'
      }, {
        test: /\.(png|jpg|svg)$/,
        loader: "file-loader",
        options: {
          name: '[path][name].[ext]',
          publicPath: 'assets/'
        }
      }, {
        test: /\.(sass|scss)$/,
        loaders: [
          'raw-loader',
          'sass-loader',
        ]
      }
    ]
  }
}]
