
var myModule = (function() {
    var o = {};

    o.name = 'haili';
    o.handler = function() {
        console.log(this.name);
    };

    return o;

})();