/**
 * 冒泡排序
 *
 * */

const arr = [49,38,65,97,76,13,27,49,78,34,12,64,5,4,62,99,98,54,56,17,18,23,34,15,35,25,53,51];


function bubbleSort(arr) {

    if (!Array.isArray(arr)) {
        throw TypeError('arr must be array');
    }

    let temp = 0;
    for (let i = 0; i < arr.length - 1; i++) {

        for (let j = 0; j < arr.length- i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                temp = arr[j + 1];
                arr[j + 1] = arr[j];
                arr[j] = temp;
            }
        }

    }

    return arr;
}
var s = '';
bubbleSort(arr).forEach((v) => s += v + ' ');
console.log(s);