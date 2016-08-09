var gulp = require('gulp');
var browserSync = require('browser-sync').create();

const pathConf = {
    src: {
        less: '**/*.less',
        jade: '**/*.jade',
        js: '**/*.js',
        css: '**/*.css',
    },
    dist: {
    },
};


// Static server
gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        port: 8765
    });
});

// reload
gulp.task('reload', () => {
    browserSync.reload();
});


// watch
gulp.task('watch', ['browser-sync'], () => {
    gulp.watch(['./**/*.js', './**/*.css', './**/*.html', '!gulpFile.js'], ['reload']);
});


gulp.task('default', ['watch']);



