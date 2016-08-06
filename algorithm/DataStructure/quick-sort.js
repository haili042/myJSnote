
let testData = [9, 6, 4, 8, 1, 25, 0, 47, 3];

let quickSort = function (arr, low, high) {
    let p;
    if (low < high) {
        p = partition(arr, low, high);
        partition(arr, low, p - 1);
        partition(arr, p + 1, high);
    }
};

let partition = function(arr, i, j) {
    let p = arr[i];

    while (i < j) {
        while (i < j && arr[j] >= p) {
            --j;
        }

        if (i < j) {
            arr[i++] = arr[j];
        }

        while (i < j && arr[i] <= p) {
            ++i;
        }

        if (i < j) {
            arr[j--] = arr[i];
        }
    }

    arr[i] = p;
    return i;
};

quickSort(testData, 0, testData.length - 1);
console.log(testData);