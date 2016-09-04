var webpack = require('webpack');
var path = require('path');
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
var cssExporter = new ExtractTextWebpackPlugin('[name].css');

var config = {

    //插件项
    plugins: [
        // 提供全局的变量, 就不用每次都 require 了
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
        }),

        // 将公共代码抽离出来合并为一个文件插件
        //new webpack.optimize.CommonsChunkPlugin('libs', 'libs.js'),
        new webpack.optimize.CommonsChunkPlugin('common', 'common.js'),


        // 把 CSS 提取到一个单独文件
        cssExporter,

    ],

    //页面入口文件配置
    // entry: {
        // 'index' : path.join(__dirname, 'WebPack/src/js/index.js'),

        // 添加要打包在 common 里面的库
        // 'common' : ['jquery', 'easyui'],
    // },

    //入口文件输出配置
    // output: {
    //     path: path.join(__dirname, 'WebPack/app'),
    //     filename: '[name].js'
    // },

    // 外部 jquery 通过 script 引入
    externals: {
       jquery: 'jQuery'
    },

    module: {

        //加载器配置
        loaders: [
            { test: /\.js?$/, exclude: /(node_modules)/, loader: 'babel?presets=es2015' },
            // { test: /\.css$/, loader: cssExporter.extract('style', 'css') },
            { test: /\.less$/, loader: 'style!css!less'},
            { test: /\.json$/, loader: 'json'},
            { test: /\.(sass|scss)$/, loader: cssExporter.extract('style', 'css!sass') },
            // { test: /\.(sass|scss)$/, loader: 'style!css!sass'},
            { test: /\.jpe?g$|\.gif$|\.png$|\.ico|\.svg$|\.woff$|\.ttf$/, loader: 'file?name=[path][name].[ext]'},
        ]
    },

    //其它解决方案配置
    resolve: {
        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions: ['', '.js', '.json', '.less', '.sass', '.scss'],
    },

};

module.exports = config;