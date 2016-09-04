var path = require('path');

// 要监听的目录
let watchDir = [
    'AMD',
    'CMD',
    'Angular',
    'CSS3',
    'HTML5',
    'WebPack',
    'app',
];

// 要监听的文件
let types = {
    less: '*.less',
    sass: '*.sass',
    scss: '*.scss',
    jade: '*.jade',
    js: '*.js',
    css: '*.css',
    html: '*.html',
};

let src = 'src';
let dest = 'app';

let watchTypes = {};
let srcDir = {};

// make paths
for (let k in types) {

    if (types.hasOwnProperty(k)) {

        let arr = [];
        watchDir.forEach(v => arr.push(path.join(v, src, '**', types[k])));
        srcDir[k] = path.join(src, k, 'index.'+k);
        watchTypes[k] = arr;
    }
}

module.exports = { watchTypes, srcDir, destDir: dest };