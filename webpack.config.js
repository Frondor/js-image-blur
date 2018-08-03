/* global __dirname, require, module*/

const webpack = require('webpack');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const path = require('path');
const env = require('yargs').argv.env; // use --env with webpack 2

let libraryName = 'ImageBlur';

let plugins = [], outputFile;

let entries = {};
entries[libraryName] = './src/index.js';
entries[libraryName + '.min'] = entries[libraryName];

const config = {
  entry: entries,
  devtool: 'source-map',
  output: {
    path: __dirname + '/lib',
    filename: '[name].js',
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /(\.jsx|\.js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        include: path.resolve(process.cwd(), 'src/index.js'),
        options: {
          fix: true,
        }
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  resolve: {
    modules: [path.resolve('./node_modules'), path.resolve('./src')],
    extensions: ['.json', '.js']
  },
  plugins: [
    new UglifyJsPlugin({ 
      include: /\.min\.js$/,
      minimize: true
    })
  ]
};

module.exports = config;
