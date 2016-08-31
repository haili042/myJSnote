/**
 * bind 函数
 * */
Function.prototype.bind = Function.prototype.bind || function(context) {
        var args = Array.prototype.slice.call(arguments, 1),
            that = this;
        return function() {
            var innerArgs = Array.prototype.slice.call(arguments);
            var outerArgs = args.concat(innerArgs);
            return that.apply(context, outerArgs);
        };
    };