var gulp = require('gulp');
var browserSync = require('browser-sync').create();

const { src } = (() => {

    let watchDir = [
        'AMD',
        'CMD',
        'Angular',
        'CSS3',
        'HTML5',
        'WebPack',
    ];

    let files = {
        less: '**/*.less',
        jade: '**/*.jade',
        js: '**/*.js',
        css: '**/*.css',
        html: '**/*.html',
    };

    let src = {};

    for (let k in files) {

        if (files.hasOwnProperty(k)) {

            let arr = [];
            watchDir.forEach(v => {
                arr.push(v + '/' + files[k]);
            });
            src[k] = arr;
        }
    }


    return { src };
})();

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
    gulp.watch(src.js, ['reload']);
    gulp.watch(src.css, ['reload']);
    gulp.watch(src.html, ['reload']);
    gulp.watch(src.less, ['reload']);
    gulp.watch(src.jade, ['reload']);
});

gulp.task('default', ['watch']);


