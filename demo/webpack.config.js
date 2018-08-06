var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, 'public/index.html'),
    filename: './index.html'
});

module.exports = {
    entry: path.join(__dirname, 'index.js'),
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
        ],
    },
    plugins: [htmlWebpackPlugin],
    resolve: {
        extensions: ['.js', '.jsx']
    },
    devServer: {
        port: 3001
    }
};