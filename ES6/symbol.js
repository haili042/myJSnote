'use strict';

{
    let x = Symbol('x');
    let x1 = Symbol('x');
    let y = Symbol('y');
    let z = Symbol();

    console.log(x.toString(), x1.toString(), y.toString(), z.toString());


    let a = Symbol.for('aa');
    let akey = Symbol.keyFor(a);
    console.log(a, akey);


}