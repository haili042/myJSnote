/**
 * 给定一个数, 你想让它成为Fibonacci数, 每一步可以把当前数字x变为: x, x+1, x-1
 * 问最少需多少步才能变成Fibonacci数
 *
 *
 * test case:
 * input
 *      15
 * output
 *      2
 * */

(function () {

    // test
    console.log(minStep(0));
    console.log(minStep(1));
    console.log(minStep(1));
    console.log(minStep(2));
    console.log(minStep(3));
    console.log(minStep(4));//1
    console.log(minStep(5));
    console.log(minStep(8));
    console.log(minStep(13));
    console.log(minStep(15));//2

    /**
     * 求最小步数
     *
     * minStep
     * @param {Number} num
     * @return {Number}
     * */

    function minStep(num) {
        // 小于4的都是了, 一眼看到
        if (num < 4) {
            return 0;
        }

        var aft = 0;
        var pre = 0;

        for (var i = 0; i <=num; i++) {
            aft = fibonacciInN(i);

            if (num < aft) {
                break;
            } else {
                pre = aft;
                if (num == aft) {
                    return 0;
                }
            }
        }

        return Math.min(Math.abs(aft - num), Math.abs(num - pre));
    }



   /**
    * 求第n项Fibonacci数的通项公式
    *
    * @param {Number} n
    * @return {Boolean}
    * */

    function fibonacciInN(n) {
        var x = Math.sqrt(5);
        var z1 = Math.pow(((1 + x) / 2), n);
        var z2 = Math.pow(((1 - x) / 2), n);
        return (z1 - z2) / x;
    }

})();