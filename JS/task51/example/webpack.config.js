const pkg = require('./package.json')
const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    entry: './src/entry.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.scss'],
        modules: [
            path.resolve(__dirname, 'node_modules'),
            path.join(__dirname, './src')
        ],
        alias: {
            "action" : path.resolve(__dirname, 'src/action'),
            "components" : path.resolve(__dirname, 'src/components'),
            "containers" : path.resolve(__dirname, 'src/containers'),
            "reducers" : path.resolve(__dirname, 'src/reducers'),
            "utils" : path.resolve(__dirname, 'src/utils'),
            "public" : path.resolve(__dirname, './public'),
            "mock" : path.resolve(__dirname, './mock')
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: path.resolve(__dirname, 'node_modules')
            },
            {
                test: /\.(css|scss)$/,
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
                test: /\.(png|jpg|gif|svg)$/,
                exclude: path.resolve(__dirname, 'node_modules'),
                use: ['url-loader?limit=1000&name=files/[md5:hash:base64:10].[ext]']
            }
        ]
    },
    devServer: {
        hot: true,
        compress: true,
        historyApiFallback: true,
        inline: true,
        port: 8000,
        contentBase: path.resolve(__dirname, "build"),
        stats: {
            modules: false,
            chunks: false
        }
    },
    plugins: [
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
        })
    ]
}