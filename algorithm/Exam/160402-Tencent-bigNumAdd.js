/*
* 两个大数相加
*
*
* */

var sum = function(num1, num2) {
    var arr1 = (num1 + '').split(''),
        arr2 = (num2 + '').split(''),
        len1 = arr1.length - 1,
        len2 = arr2.length - 1,
        index = Math.max(len2, len2) + 1,
        res = [],
        addUp = 0
        ;


    while(index > -1) {
        var s = parseInt(arr1[len1--] || 0) + parseInt(arr2[len2--] || 0) + addUp;
        res[index] = s;

        addUp = 0;
        if (s >= 10) {
            addUp++;
            res[index] = s % 10;
        } else {
            res[index] = s;
        }

        index--;
    }

    !res[0] && res.shift();

    return res.join('');
};

console.log(sum(868683838345436, 3135363613631316));