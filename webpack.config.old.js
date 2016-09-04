var webpack = require('webpack');
var path = require('path');
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

var cssExporter = new ExtractTextWebpackPlugin('[name].css');
var lessExporter = new ExtractTextWebpackPlugin('less.css');

module.exports = {

    //插件项
    plugins: [
        // 提供全局的变量, 就不用每次都 require 了
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
        }),

        // 将公共代码抽离出来合并为一个文件插件
        new webpack.optimize.CommonsChunkPlugin('common', 'common.js'),


        // 把 CSS 提取到一个单独文件
        cssExporter,
        lessExporter,

    ],

    //页面入口文件配置
    entry: {
        'index' : path.join(__dirname, 'WebPack/src/js/index.js'),

        // 添加要打包在 common 里面的库
        'common' : ['jquery', 'easyui'],
    },

    //入口文件输出配置
    output: {
        path: path.join(__dirname, 'WebPack/app'),
        filename: '[name].js'
    },

    module: {

        //加载器配置
        loaders: [
            { test: /\.css$/, loader: cssExporter.extract('style-loader', 'css-loader') },
            { test: /\.less$/, loader: lessExporter.extract('style-loader', 'css-loader', 'less?sourceMap')},
            { test: /\.jade$/, loader: "jade-loader" },
            { test: /\.(png|jpg|gif)$/, loader: 'url?limit=8192'}
        ]
    },

    //externals: {
    //    jquery: 'jQuery'
    //},

    //其它解决方案配置
    resolve: {

        //查找module的话从这里开始查找
        // 路径一定要这么写.....不然一大波错误....................................
        root: path.join(__dirname, 'WebPack/src'),
        //root: path.resolve('WebPack/src'),

        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions: ['', '.js', 'css', '.json', '.less', '.jade'],

        // 配置别名
        alias: {
            'jquery' : path.join(__dirname, 'WebPack/lib/jquery.min.js'),
            'easyui' : path.join(__dirname, 'WebPack/lib/easyui-1.4.3/jquery.easyui.min.js'),
            'easyuiCss' : path.join(__dirname, 'WebPack/lib/easyui-1.4.3/easyui.css'),
        }
    },

    // 不包含列信息，同时 loader 的 sourcemap 也被简化为只包含对应行的。最终的 sourcemap 只有一份，它是 webpack 对 loader 生成的 sourcemap 进行简化，然后再次生成的。
    devtool: 'cheap-module-eval-source-map',

    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
    },
};

