var gulp = require('gulp');
var watch = require('gulp-watch');
var config = require('../config');

gulp.task('watch', function(){
    gulp.watch(config.less.all, function(){  //��������less
        gulp.start('less');             //�����޸ġ�����ִ��less����
    })
})