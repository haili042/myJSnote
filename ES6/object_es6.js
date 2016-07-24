'use strict';

/*============属性简洁表示法=============*/
{
    let foo = 'bar';
    let bar = {
        foo
    };

    console.log(bar);

    // 方法简写

    let o = {
        method() {

        }
    };

    console.log(o);
}

// 方法的name 属性
{
    let person = {
        sayName() {
            console.log(this.name);
        },
        get firstName() {
            return 'haili';
        }
    };
    console.log(person.sayName.name); // sayName
    console.log(person.firstName.name); // sayName
}

// Object.is方法
{
    console.log(-0 === +0); // true
    console.log(NaN === NaN); // false

    console.log(Object.is(+0, -0)); // false
    console.log(Object.is(NaN, NaN)); // true
}

// Object.assgin
{
    let target = { a: 1 };
    let s1 = { b: 1 };
    let s2 = { c: 1 };
    Object.assign(target, s1, s2);
    console.log(target); // { a: 1, b: 1, c: 1 }


    typeof Object.assign(2); // "object"

    // 是浅拷贝, 复制的是指针
    let o = {
        a: {
            x: 1
        },
        b: 3
    };
    let ocp = Object.assign({}, o);
    o.a.x = 2;
    console.log(o, ocp); // { a: { x: 2 }, b: 3 } { a: { x: 2 }, b: 3 }

}

// 遍历
{
    let o = {
        [Symbol()]: 0,
        b: 'zgd',
        10: 2,
        2: 643,
        a: 'gad'
    };
    Object.defineProperty(o, 'b', {
        enumerable: false
    });

    // for in
    console.log('\nfor in');
    for (let k in o) {
        if (o.hasOwnProperty(k)) {
            console.log(`key=${k}, value=${o[k]}`);
        }
    }

    // Object.keys
    console.log('\nObject.keys');
    Object.keys(o).forEach(k => console.log(`key=${k}, value=${o[k]}`));

    // Object.getOwnPropertyNames
    console.log('\nObject.getOwnPropertyNames');
    Object.getOwnPropertyNames(o).forEach(k => console.log(`key=${k}, value=${o[k]}`));

    // Object.getOwnPropertySymbols
    console.log('\nObject.getOwnPropertySymbols');
    Object.getOwnPropertySymbols(o).forEach(k => console.log('key=' + k.toString() + ', value=' + o[k]));

    // Reflect.ownKeys
    console.log('\nReflect.ownKeys');
    Reflect.ownKeys(o).forEach(k => console.log('key=' + k.toString() + ', value=' + o[k]));

}


// keys values entries
{
    let o = {
        [Symbol()]: 0,
        b: 'zgd',
        10: 2,
        2: 643,
        a: 'gad'
    };
    Object.defineProperty(o, 'b', {
        enumerable: false
    });


}