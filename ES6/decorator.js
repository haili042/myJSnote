'use strict';

function testable(target) {
    target.isTestable = true;
}

@testable
class MyTest {}

console.log(MyTest.isTestable);