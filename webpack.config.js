const webpack = require("webpack");
const Path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MergeIntoSingleFilePlugin = require('webpack-merge-and-include-globally');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const serverHost = "https://docker";

module.exports = {
  context: __dirname,
  // devtool: "cheap-module-source-map",
  resolve: {
    modules: ["node_modules"],
    alias: {
      jquery: Path.join(__dirname, "node_modules/jquery/dist/jquery")
    }
  },
  entry: {
    "core": './lib/core/index.js',
    "ows": './lib/owsjs/index.js'
  },
  output: {
    filename: '[name].js',
    path: Path.resolve(__dirname, 'testdist'),
  },
  plugins: [
    new CleanWebpackPlugin(['testdist']),
    new MergeIntoSingleFilePlugin({
      files: {
       "vendor.js": [
        // bundle vendor core
        Path.resolve(__dirname, "examples/ol-debug.js"),
        Path.resolve(__dirname, "node_modules/angular/angular.min.js"),
        Path.resolve(__dirname, "node_modules/bootstrap/dist/js/bootstrap.min.js"),
        Path.resolve(__dirname, "node_modules/nouislider/distribute/nouislider.min.js"),
        Path.resolve(__dirname, "node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js"),
        Path.resolve(__dirname, "node_modules/angular-bootstrap-colorpicker/js/bootstrap-colorpicker-module.js")
      ]
    }
    })
  ]
};
