var gulp = require('gulp');
var watch = require('gulp-watch');
var config = require('../config');

gulp.task('watch', function(){
    gulp.watch(config.less.all, function(){  //监听所有less
        gulp.start('less');             //出现修改、立马执行less任务
    })
})