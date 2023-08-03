const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require("path");

let mode = 'development';
if (process.env.NODE_ENV === 'production'){
    mode = 'production'
}
console.log(mode + ' mode')
// const nodeExternals = require('webpack-node-externals');
//
// {
//     target: 'node',
//         externals: [nodeExternals()],
// }

module.exports = {
    mode : mode,
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
        template: "./src/index.html"
    })],
    devServer: {
        static: './dist',
    },
    resolve : {fallback: {
            "fs": false,
            "tls": false,
            "net": false,
            "path": false,
            "zlib": false,
            "http" : require.resolve("stream-http"),
            //"http": false,
            "https": false,
            "stream": false,
            "crypto": false,
            "util" : false,
            "sass" : false,
            "utf-8-validate" : false
        },

    },

    module: {
        rules: [
            {
              test : /\.(sa|sc|c)ss$/,
              use : [
                  (mode === 'development') ? "style-loader" : MiniCssExtractPlugin.loader,
                  "css-loader",
                  {
                      loader : "postcss-loader",
                      options : {
                          postcssOptions : {
                              plugins: [
                                  [
                                      "postcss-preset-env",
                                      {

                                      }
                                  ]
                              ]
                          }
                      }
                  },
                  "sass-loader",
              ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
        ]
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        publicPath: '/',
    },
}