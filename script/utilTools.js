/**
 * Created by Administrator on 2015/8/22.
 */
/**
 * 包含了公用的方法
 * */

/**
 * 调试日志/
 *
 */
 /*
(function ($){

    $.extend({
        log: function (msg) {
            var now = new Date();
            var y = now.getFullYear();
            var m = now.getMonth() + 1;
            var d = now.getDay();
            var h = now.getHours();
            var min = now.getMinutes();
            var s = now.getSeconds();
            var time = y + '-' + m + '-' + d + ' ' + h + ':' + min + ':' + s;
            console.log(time + ': ' + msg);
        }
    });

})(jQuery);
*/


var UtilTools = (function() {
	
	function dateFormate(date) {
		var result;
		if (!date instanceof Date) {
			console.log('param is not date');
			return false;
		} else {
			result = [
				[date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-'),
				[date.getHours(), date.getMinutes(), date.getSeconds()].join(':')
			].join(' ').replace(/(?=\b\d\b)/g, '0');
		}
		return result;
	}
	
	return {
		dateFormate: dateFormate
	};
})();
console.log(UtilTools.dateFormate(new Date()));