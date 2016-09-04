var webpack = require('webpack');
var path = require('path');
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
var cssExporter = new ExtractTextWebpackPlugin('[name].css');

var config = {

    //�����
    plugins: [
        // �ṩȫ�ֵı���, �Ͳ���ÿ�ζ� require ��
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
        }),

        // �����������������ϲ�Ϊһ���ļ����
        //new webpack.optimize.CommonsChunkPlugin('libs', 'libs.js'),
        new webpack.optimize.CommonsChunkPlugin('common', 'common.js'),


        // �� CSS ��ȡ��һ�������ļ�
        cssExporter,

    ],

    //ҳ������ļ�����
    // entry: {
        // 'index' : path.join(__dirname, 'WebPack/src/js/index.js'),

        // ���Ҫ����� common ����Ŀ�
        // 'common' : ['jquery', 'easyui'],
    // },

    //����ļ��������
    // output: {
    //     path: path.join(__dirname, 'WebPack/app'),
    //     filename: '[name].js'
    // },

    // �ⲿ jquery ͨ�� script ����
    externals: {
       jquery: 'jQuery'
    },

    module: {

        //����������
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

    //���������������
    resolve: {
        //�Զ���չ�ļ���׺������ζ������requireģ�����ʡ�Բ�д��׺��
        extensions: ['', '.js', '.json', '.less', '.sass', '.scss'],
    },

};

module.exports = config;