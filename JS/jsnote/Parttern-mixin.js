/**
 * mixin 混入模式
 *
 **/
var mixin = {
    moveUp: function () {
        console.log('move up');
    },
    moveDown: function () {
        console.log('move down');
    },
    stop: function () {
        console.log('stop! in the name of love');
    }
};

function carAnimate() {
    this.moveLeft = function () {
        console.log('move left');
    };
}

function personAnimate() {
    this.moveRandomly = function () {
    }
}