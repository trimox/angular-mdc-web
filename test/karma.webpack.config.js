const path = require('path');
const webpack = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  optimization: {
    splitChunks: false,
    runtimeChunk: false,
    minimize: false
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
        configFile: './test/tsconfig.json'
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
        loader: 'ts-loader?silent=true',
        exclude: /node_modules/
      },
      {
        test: /\.(js|ts)$/,
        loader: 'istanbul-instrumenter-loader',
        options: { esModules: true },
        enforce: 'post',
        exclude: [/(node_modules|base|overlay|scrolling|testing|dom|\.test\.ts$)/]
      }
    ]
  }
};
