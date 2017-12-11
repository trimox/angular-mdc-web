const path = require('path');
const webpack = require('webpack');
const TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;

module.exports = {
  resolve: {
    plugins: [
      new TsConfigPathsPlugin({
        configFileName: './test/unit/tsconfig.json',
        compiler: 'typescript'
      })
    ],
    extensions: ['.js', '.ts'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader?{configFileName: "test/unit/tsconfig.json"}'
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
        include: path.resolve('src/lib/')
      }
    ]
  },
  plugins: [
    // Workaround for angular/angular#1158
    new webpack.ContextReplacementPlugin(
      /(.+)?angular(\\|\/)core(.+)?/,
      path.resolve(__dirname, './test')
    )
  ]
};
