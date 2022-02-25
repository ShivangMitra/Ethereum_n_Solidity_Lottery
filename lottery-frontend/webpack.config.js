const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
var webpack = require('webpack')

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'development',
  devServer: { static: path.join(__dirname, "src") },
  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    fallback: {
      "fs": false,
      "tls": false,
      "net": false,
      "path": false,
      "zlib": false,
      "http": false,
      "https": false,
      "stream": false,
      "crypto": false,
      "assert": false,
      "os": false,
      "url": false,
    } 
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.html"),
    }),
    new NodePolyfillPlugin({
			excludeAliases: ["console"]
		})
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(jsx|js)$/,
        include: path.resolve(__dirname, 'src'),
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                "targets": "defaults" 
              }],
              '@babel/preset-react'
            ]
          }
        }]
      }
    ]
  }
}