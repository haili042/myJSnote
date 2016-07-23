'use strict';

// parent class
var Shape = function (id, x, y) {
    this.id = id;
    this.location(x, y);
};

Shape.prototype.location = function(x, y) {
    this.x = x;
    this.y = y;
};

Shape.prototype.toString = function() {
    console.log('Shape ->' + this.id);
};

Shape.prototype.getLocation = function() {
    return {
        x: this.x,
        y: this.y
    };
};

// child class
var Circle = function(id, x, y, radius) {
    Shape.call(this, id, x, y);
    this.radius = radius;
};

Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

Circle.prototype.toString = function() {
    console.log('Circle ->' + this.id);
};

// static method
Circle.foo = function() {
    console.log('static function foo');
};

// test
Circle.foo();
var c = new Circle('test', 20, 30, 15);
c.toString();
console.log(c.getLocation());