'use strict';

// values in set are unique
{
    let s = new Set();
    [2, 3, 5, 4, 5, 2, 2].map(k => s.add(k));

    for (let v of s) {
        console.log(v);
    }
    console.log(typeof s);

    // 遍历
    for (let v of s.keys()) {
        console.log(v);
    }
    for (let v of s.values()) {
        console.log(v);
    }
    for (let [k, v] of s.entries()) {
        console.log(k, v);
    }

    // crud
    s.add(6);
    s.delete(2);
    console.log(s.has(5)); // true
    console.log(s.size); // 4
    //s.clear();
    console.log(s); // 空

    // to array
    let arr = Array.from(s);
    console.log(Array.isArray(arr));

}

// 求并交差等
{
    const a = new Set([1, 2, 3]);
    const b = new Set([4, 3, 2]);

    // 并集
    let union = new Set([...a, ...b]);
    console.log(union);

    // 交集
    let intersect = new Set([...a].filter(v => b.has(v)));
    console.log(intersect);

    // 差集
    let difference = new Set([...a].filter(v => !b.has(v)));
    console.log(difference);

}

// WeakSet
{
    const ws = new WeakSet([[], []]);

    class Foo {
        constructor() {
            ws.add(this);
        }
        method() {
            if (!ws.has(this)) {
                throw new TypeError('Foo.prototype.method 只能在Foo的实例上调用！');
            }
        }
    }
}

// map
{
    var m = new Map();
    var o = { p: 'hello' };

    m.set(o, 'world');
    m.get(o); // world

    m.has(o); // true
    m.delete(o); // ture
    m.has(o); // false

    var map = new Map([['name', 'hello'], ['title', 'world']]);
    console.log(map.size); // 2
    console.log(map.has('name')); // true
    console.log(map.get('name')); // hello

    // 遍历

    // keys
    for (let k of map.keys()) {
        console.log(k);
    }

    // values
    for (let v of map.values()) {
        console.log(v);
    }

    // entries
    for (let [k, v] of map.entries()) {
        console.log(k, v);
    }

    // forEach
    map.forEach((v, k) => console.log(v, k));


    // application
    let map0 = new Map()
        .set(1, 'a')
        .set(2, 'b')
        .set(3, 'c');
    let map1 = new Map(
        [...map0].filter((k, v) => k < 3)
    );
}

// 转化
{
    // map => array
    let myMap = new Map().set(true, 7).set({foo: 3}, ['abc']);
    let newMap = [...myMap]; // [ [ true, 7 ], [ { foo: 3 }, [ 'abc' ] ] ]

    // array => map
    new Map([[true, 7], [{foo: 3}, ['abc']]]);

}