/**
 * 简单选择排序
 *
 * */

const arr = [49,38,65,97,76,13,27,49,78,34,12,64,5,4,62,99,98,54,56,17,18,23,34,15,35,25,53,51];


function selectSort(arr) {

    if (!Array.isArray(arr)) {
        throw TypeError('arr must be array');
    }

    for (let i = 0; i < arr.length; i++) {

        let min = arr[i], flag = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < min) {
                min = arr[j];
                flag = j;
            }
        }

        arr[flag] = arr[i];
        arr[i] = min;
    }

    return arr;
}

var s = '';
selectSort(arr).forEach((v) => s += v + ' ');
console.log(s);