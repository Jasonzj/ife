const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/entry.js",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: 'js/[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js|jsx$/,
                loader: 'babel-loader',
                include: path.resolve(__dirname, "src"),
                query: {
                    presets: ['react', 'env']
                }
            },
            {
                test: /\.scss$/,
                use:[
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: (loader) => [
                                require('autoprefixer')({
                                    browsers: ["last 5 versions"]
                                })
                            ]
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader'
            }
        ]
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    devServer: {
        contentBase: path.resolve(__dirname, "build"),
        port: 8000
    },
    plugins: [
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: './public/index.html'
        })
    ]
    
}