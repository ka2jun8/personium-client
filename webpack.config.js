var path = require("path");
var webpack = require("webpack");

module.exports = {
    entry: {
      'bundle': './src/client.ts',
    },
    output: {
        path: __dirname,
        filename: './lib/personium-client.js'
    },
    module: {
      rules: [{
        test: /\.ts(x?)$/,
        use: [
          {  loader: "tslint-loader"},
          {  loader: "ts-loader"}
        ]
      }]
    },
    externals: {
    },
    resolve: {
      extensions: ['.js', '.ts']
    },
    devtool: 'inline-source-map'
};