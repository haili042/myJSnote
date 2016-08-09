/*
setTimeout(function(){
    console.log('head 1');
}, 2000);
*/
var n = 0;
for(var i = 0; i < 1000; i++) {
    for(var j = 0; j < 1000; j++) {
        for(var k = 0; k < 1000; k++) {
            n++;
        }
    }
}
console.log('head async 2');