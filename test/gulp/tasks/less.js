var gulp = require('gulp');
var less = require('gulp-less');
var config = require('../config').less;

gulp.task('less', function(){
    return gulp.src(config.src)         //lessԴ�ļ�
        .pipe(less(config.settings))    //ִ�б���
        .pipe(gulp.dest(config.dest))   //���Ŀ¼
});