var path = require("path");
var webpack = require("webpack");

module.exports = [
    {
        entry: {
            entry: './src/client.ts'
        },
        output: {
            path: __dirname + "/dist/",
            filename: "personium-client.js",
            libraryTarget: "var"
        },
        module: {
            rules: [{
                test: /\.ts(x?)$/,
                use: [
                    { loader: "tslint-loader" },
                    { loader: "ts-loader" }
                ]
            }]
        },
        plugins: [
            new webpack.DefinePlugin({
                PACKAGE_VERSION: JSON.stringify(require("./package.json").version)
            }),
        ],
        resolve: {
            extensions: ['.ts', '.js'],
        },
        devtool: 'inline-source-map'
    },
    {
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
                    { loader: "tslint-loader" },
                    { loader: "ts-loader" }
                ]
            }]
        },
        externals: {
        },
        resolve: {
            extensions: ['.js', '.ts']
        },
        devtool: 'inline-source-map'
    }];