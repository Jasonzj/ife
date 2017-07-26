const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    entry: {
        app: './src/entry.js',
        vendor: [
            'react',
            'react-dom',
            'react-redux',
            'react-d3',
            'react-router',
            'react-router-dom',
            'redux',
            'prop-types',
            'react-addons-css-transition-group',
            'redux-localstorage'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'js/[name]-[chunkhash:6].js',
        chunkFilename: 'js/[name]-[chunkhash:6].js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.scss', '.css'],
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
                test: /\.scss$/,
                exclude: path.resolve(__dirname, 'node_modules'),
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
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
                        'sass-loader'
                    ]
                })
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                exclude: path.resolve(__dirname, 'node_modules'),
                use: ['url-loader?limit=1000&name=files/[md5:hash:base64:10].[ext]']
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('style.css'),
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor'],
            filename: 'vendor.js'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ]
}