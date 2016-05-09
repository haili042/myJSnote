//求斐波拉契数列

var fabolasy = function(n) {
    return n < 2 ? n : fabolasy(n-1) + fabolasy(n-2);
};

onmessage = function(e) {
    console.log('received ' + e.data);
    postMessage(fabolasy(40));
};