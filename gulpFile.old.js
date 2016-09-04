var gulp = require('gulp');
var path = require('path');
var plugins = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();

const { watchTypes, srcDir, destDir, types } = (() => {

    let watchDir = [
        'AMD',
        'CMD',
        'Angular',
        'CSS3',
        'HTML5',
        'WebPack',
        'app',
    ];

    let types = {
        less: '*.less',
        sass: '*.{sass,scss}',
        jade: '*.jade',
        js: '*.js',
        css: '*.css',
        html: '*.html',
    };

    let src = 'src';
    let dest = 'app';

    let watchTypes = {};
    let srcDir = {};

    for (let k in types) {

        if (types.hasOwnProperty(k)) {

            let arr = [];
            watchDir.forEach( v => arr.push(v + '/**/' + types[k]) );
            srcDir[k] = path.join(src, k, types[k]);
            watchTypes[k] = arr;
        }
    }

    return { watchTypes, srcDir, destDir:dest,  types};
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
gulp.task('watch', () => {
    gulp.watch(watchTypes.html, ['reload']);
    gulp.watch(watchTypes.less, ['reload']);
    gulp.watch(watchTypes.jade, ['reload']);
    gulp.watch(watchTypes.js, (e) => js(e));
    gulp.watch(watchTypes.sass, (e) => { sass(e) });
});

// 获取一级目录
function getDir(e) {
    let rPathArr = path.relative(__dirname, e.path).split(path.sep);
    let dir = rPathArr.length > 1 ? (rPathArr.shift() || "") : ""; // 一级目录
    return dir;
}

// sass / scss
function sass(e) {
    let dir = getDir(e);
    gulp.src(path.join(dir, srcDir.sass))
        .pipe(plugins.sass({outputStyle: 'compact'}).on('error', plugins.sass.logError))
        .pipe(gulp.dest(path.resolve(dir, destDir)))
        .pipe(browserSync.reload({stream: true}))
}

// js
function js(e) {
    let dir = getDir(e);

    gulp.src(path.join(dir, '**', types.js))
        .pipe(plugins.babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest(path.resolve(dir, destDir)))

    gulp.src(path.resolve(dir, 'app/src/js', types.js))
        .pipe(plugins.browserify({
            insertGlobals : true
        }))
        .pipe(gulp.dest(path.resolve(dir, destDir)))
        .pipe(browserSync.reload({stream: true}))
}

// tasks
gulp.task('default', ['watch', 'browser-sync']);


