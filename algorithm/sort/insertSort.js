/**
 * 直接插入排序
 *
 * */

const arr = [49,38,65,97,76,13,27,49,78,34,12,64,5,4,62,99,98,54,56,17,18,23,34,15,35,25,53,51];


function insertSort(arr) {

    if (!Array.isArray(arr)) {
        throw TypeError('arr must be array');
    }

    let temp = 0;

    for (let i = 1; i < arr.length; i++) {

        let j = i - 1;
        temp = arr[i];

        // 往后位移
        for (; j >= 0 && temp < arr[j]; j--) {
            arr[j+1] = arr[j];
        }
        arr[j + 1] = temp;

    }

    return arr;
}

var s = '';
insertSort(arr).forEach((v) => s += v + ' ');
console.log(s);