'use strict';

// parent class
class Shape {

    constructor(id, x, y) {
        this.id = id;
        this.location(x, y);
    }

    location(x, y) {
        this.x = x;
        this.y = y;
    }

    toString() {
        console.log('Shape ->' + this.id);
    }

    getLocation() {
        return {
            x: this.x,
            y: this.y
        };
    }
}

// child class
class Circle extends Shape {

    constructor(id, x, y, radius) {
        super(id, x, y);
        this.radius = radius;
    }

    toString() {
        console.log('Circle ->' + this.id);
    }

    // static method
    static foo(){
        console.log('static function foo');
    }
}


// test
Circle.foo();
var c = new Circle('test', 20, 30, 15);
c.toString();
console.log(c.getLocation());