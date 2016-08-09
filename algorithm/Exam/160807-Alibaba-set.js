/**
 * 求差集
 * 如 difference([1,2,3,4,5], [2,5,7])
 * 输出 [1,3,4,7]
 *
 * */

console.log(difference([1,2,3,4,5], [2,5,7]));


function difference(arr1, arr2) {

    if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
        throw TypeError('arr1, arr2 must be Array');
    }

    if (Set) {
        let set2 = new Set(arr2);
        let union = new Set([...arr1, ...arr2]);
        let intersect = new Set(arr1.filter((v) => set2.has(v)));

        return [...union].filter((v) => !intersect.has(v));

    } else {

        let set2 = {};
        let union = {};
        let result = [];

        arr2.forEach(v => set2[v] = v);
        arr1.concat(arr2).forEach(v => union[v] = union[v] ? ++union[v] : 1);
        for (let k in union) {
            if (union.hasOwnProperty(k)) {
                if (union[k] < 2) {
                    result[result.length] = parseInt(k);
                }
            }
        }

        return result;

    }
}

Array.isArray = Array.isArray || function(arr) {
        return arr instanceof Array;
    };
