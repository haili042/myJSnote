/**
 * 一个袋子里有N个球, 每个球上面都有一个号码(同样的号码的求是没区别的)
 * 我们定义当且仅当所有球的号码的和大于所有求的号码的积时, 为幸运袋
 * 例如 {1,1,2,3} 是幸运袋子: 1+1+2+3 > 1*1*2*3
 *
 * 现在你可以从袋子里移除一些球(可以是0个, 但是不能移除完), 要使移除后的袋子都是幸运袋
 * 求最多有几种不同的幸运袋子
 *
 * case
 * input
 *      {1,1,1}
 * output
 *      2
 *
 * */

//TODO
// 尚未解决......................


(function() {

    function test(res, expect) {

        if (res === expect) {
            console.log(res + ' passed');
        } else {
            console.log(res + ' not passed');
        }
    }


    //test(luckBag([1,1,1]) + 1, 2);
    //test(luckBag([1,1,1,1]) + 1, 2);
    //test(luckBag([1,1,2]) + 1, 2);
    //test(luckBag([1,1,1,2]) + 1, 2);
    test(luckBag([1,1,2,3,5]) + 1, 2);
    //test(luckBag([1,1,2,3,5,8]) + 1, 2);


    /**
     * 求幸运袋数
     *
     *
     * luckBag
     * @param {Array} arr
     * @return {Number}
     * */

    function luckBag(arr) {

        if (arr.length <= 1) {
            return 1;
        }

        let result = isLuckBag(arr) ? 1 : 0;

        arr.forEach((v, i) => {

            // a map to make sure unique value
            let set = new Set();
            for (let vv of arr) {
                set.add(vv);
            }

            let backUp = Array.from(set);

            backUp.splice(i, 1);

            result += luckBag(backUp);
        });


        return result;
    }


    /**
     * 判断是否是幸运袋
     *
     *
     * isLuckBag
     * @param {Array} arr
     * @return {Boolean}
     * */

    function isLuckBag(arr) {

        if (arr === undefined) {
            return false;
        }

        let sum = 0;
        let product = 1;

        for (let v of arr) {
            sum += v;
            product *= v;
        }

        sum > product && console.log(arr);

        return sum > product;
    }

})();