var gulp = require('gulp');
var path = require('path');
var argv = require('yargs').argv;
var plugins = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();
var webpack = require('webpack');

var webpackConf = require('./webpack.config');

const { watchTypes, srcDir, destDir } = require('./gulpPathConf');

var isWatch = true;
var isProduct = false;

// tasks
gulp.task('default', ['browser-sync'], () => {

    isProduct = argv.product;
    isWatch = !isProduct;
    console.log('正在处理: ' + (isProduct ? '线上' : '调试') + '环境');

    gulp.start('watch');
});

// watch
gulp.task('watch', () => {

    gulp.watch(watchTypes.js, (e) => webpackTask(e));
    gulp.watch(watchTypes.sass.concat(watchTypes.scss), (e) => webpackTask(e));
});

// reload
gulp.task('reload', () => {
    browserSync.reload();
});

// browserSync server
gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        port: 8765
    });
});

// webpack
function webpackTask(e) {
    let dir = getDir(e);
    let cfg = {
        //入口文件配置
        entry: { 
            'index' : path.resolve(dir, srcDir.js), // xxx/src/js/index.js
        },
        //输出配置
        output: {
            path: path.resolve(dir, destDir),
            filename: '[name].js'
        }
    };
    Object.assign(webpackConf, cfg); // extend the configure

    webpack(webpackConf, (err, stats) => {
        console.log(stats.toString());
        gulp.start('reload');
    });

}

// 获取一级目录
function getDir(e) {
    let rPathArr = path.relative(__dirname, e.path).split(path.sep);
    let dir = rPathArr.length > 1 ? (rPathArr.shift() || "") : ""; // 一级目录
    return dir;
}
