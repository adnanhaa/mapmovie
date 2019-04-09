const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
//const CleanWebpackPlugin = require('clean-webpack-plugin');
require('dotenv').config();
const htmlPlugin = new HtmlWebPackPlugin({
    template: "./src/index.html",
    filename: "./index.html"
});

module.exports = {
    entry: ['babel-polyfill', './src/index.js'],
    output: {
        //path: resolve('dist'),
        path: __dirname + '/public',
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './public',
        hot: true, //Reload - there is some problems with inactivity
        host: '20.20.1.4',//LAN - ip address
        port: 8008,
        historyApiFallback: true,
    },
    plugins: [
        /*DONT clean - only for me!!!
        new CleanWebpackPlugin(['public'], {
            //root: '/',
            verbose: true,
            dry: false,
            exclude: ['example.txt']
        }),*/
        new webpack.HotModuleReplacementPlugin(),
        htmlPlugin
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: "[name]_[local]_[hash:base64]",
                            sourceMap: true,
                            /*minimize: true*/
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'eslint-loader']
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
};
