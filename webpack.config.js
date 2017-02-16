var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var BUILD_DIR = path.resolve(__dirname, 'src/client/public');
var APP_DIR = path.resolve(__dirname, 'src/client/app');

var config = {
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    alias: {
      jquery: "jquery/src/jquery"
    }
  },
  entry: {
    main: APP_DIR + '/index.jsx',
  },
  output: {
    publicPath: "/src/client/public/",
    path: BUILD_DIR,
    filename: '[name].js'
  },
  module : {
    loaders : [
      { test : /\.jsx?/, include : APP_DIR, loader : 'babel-loader' },
      { test: /.(woff|woff2|eot|ttf)$/, loader:"url-loader?prefix=font/&limit=5000" },
      {test: /\.(scss|css)$/, loader: ExtractTextPlugin.extract('css-loader!sass-loader')}
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      'Promise': 'es6-promise', // Thanks Aaron (https://gist.github.com/Couto/b29676dd1ab8714a818f#gistcomment-1584602)
      'fetch': 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
    }),
    new ExtractTextPlugin("[name].css"),
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
    }),
    new HtmlWebpackPlugin({
      title: 'PhotoTank',
      template: 'src/client/app/html-template.ejs',
      filename: '../index.html'
    })
  ],

  devServer: {
    //publicPath: "/src/client/public/",

     // progress: true,
     //hot: true,
     //inline: true,
     // https: true,
     //port: 8081,
     contentBase: path.resolve(__dirname, 'src/client'),
     proxy: {
       "/api": {
          target: "http://localhost:5000",
          pathRewrite: {"^/api" : ""}
       }
     },
     historyApiFallback: true
   },

};

module.exports = config;
