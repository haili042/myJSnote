var createXHR = function() {
    if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
    } else if (typeof ActiveXObject !== 'undefined') {
        var version = 'Microsoft.XMLHTTP';
        return new ActiveXObject(version);
    } else {
        throw new Error('no xhr available');
    }
};

var xhr = createXHR();
var url = '';

xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
        if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
            //callback(xhr.responseText);
        } else {
            throw new Error('Requset was unsuccessful : ' + xhr.status);
        }
    }
};

xhr.open('get', url, true);
xhr.send(null);