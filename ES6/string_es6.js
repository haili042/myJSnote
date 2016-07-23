'use strict';

/**====================codePointAt===================**/
var s = '𠮷';
console.log(s.charCodeAt(2));
console.log(s.codePointAt(2));

/**====================字符串遍历接口===================**/
for (let s of 'foo') {
    console.log(s);
}

var str = 'hello world';
console.log(str.includes('wor'));
console.log(str.startsWith('he'));
console.log(str.endsWith('ld'));
console.log(str.repeat('3'));

// 模版字符串
let [a, b] = [1, 2];
let temp = `
    ${a} + ${b}
     = ${a + b}
`;
console.log(temp);
let sss = `a ${`sd`}`; // 能嵌套
console.log(sss);


// 编译模版
function templateHandler(data) {
    let t = `
    <ul>
      ${data.map(d => `<li>${d.txt}</li>`).join('')}
    </ul>
    `;
    return t;
}
let res = templateHandler([{txt: 1}, {txt: 2}]);
console.log(res);
