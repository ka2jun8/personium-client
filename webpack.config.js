var path = require("path");
var webpack = require("webpack");
var nodeExternals = require('webpack-node-externals');

module.exports = [
    {
        target: 'web',
        entry: {
            entry: './src/client.ts'
        },
        output: {
            path: __dirname + "/dist/",
            filename: "personium-client.js",
            library: "PersoniumClient",
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
        target: 'web',
        entry: {
            entry: './src/client.ts'
        },
        output: {
            path: __dirname + "/dist/",
            filename: "personium-client.webpack.js",
            libraryTarget: "commonjs2"
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
        target: 'node',
        entry: {
            entry: './src/client.ts',
        },
        output: {
            path: __dirname,
            filename: './lib/personium-client.js',
            libraryTarget: "commonjs2"
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
        externals: [nodeExternals()],
        resolve: {
            extensions: ['.js', '.ts']
        },
        devtool: 'inline-source-map'
    }];