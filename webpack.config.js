
//npm init -y


// npm install --save-dev webpack webpack-cli




const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { watchFile } = require("fs");

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    devtool: "eval-source-map",
    devServer: {
        watchFiles: ["./src/index.html"],
    },
    plugins: [
        // npm install --save-dev html-webpack-plugin

        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
    ],
    module: {
        rules: [
            {
                //npm install --save-dev style-loader css-loader

                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                //npm install --save-dev html-loader
                test: /\.html$/i,
                loader: "html-loader"
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
              }
        ],
    },
};