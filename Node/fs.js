'use strict';

var fs = require('fs');
var text = 'tasdfasdfawegawegawg';


/*
* -----------------------------------
* 简单的文件读写
* -----------------------------------
* */
// write
fs.writeFile('test.txt', text, function(err) {
    if (err) throw err;
    console.log('save success');
});

// read
fs.readFile('test.txt', 'utf8', function (err, data) {
    if (err) throw err;
    console.log(data);
});