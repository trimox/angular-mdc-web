const webpack = require('webpack');
const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  context: path.resolve(__dirname, './'),
  entry: {
    'polyfills': './polyfills.ts',
    'app': './main.ts'
  },
  devServer: {
    contentBase: './demos',
    historyApiFallback: true,
    port: 4000,
    inline: true
  },
  plugins: [
    // Workaround for angular/angular#1158
    new webpack.ContextReplacementPlugin(
      /(.+)?angular(\\|\/)core(.+)?/,
      path.resolve(__dirname, "./demos")
    )
  ],
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@angular-mdc/web': path.resolve(__dirname, '../packages')
    },
    plugins: [
      new TsconfigPathsPlugin({
        configFile: './demos/tsconfig.json'
      })
    ]
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
  }
}
