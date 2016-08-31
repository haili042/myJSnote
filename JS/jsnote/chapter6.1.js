    /**
     * Created by Administrator on 2015/5/17.
     * 属性类型设置(4个)
     * value
     * writable
     * enumerable
     * configurable
     */
    var person = {
        name : "haili",
        age : "20",
        sayName : function (){
            console.log(this.name);
        }
    };

    Object.defineProperty(person, "age", {
        value : 24,
        writable : true,
        enumerable : false
    });

    person.age = 29;
    console.log(person.age);

    for(var i in person){
        console.log(i);
    }

    /**
     * Created by Administrator on 2015/5/17.
     * 访问器属性设置(4个属性)
     * get
     * set
     * enumerable
     * configurable
     */
    var book = {
        year : 2004,
        edition : 1
    };

    /*getSetYear 相当于定义一个 get/setter 同体*/
    Object.defineProperty(book, "getSetYear", {
        set: function (x) {
            this.year = x;
        },
        get: function () {
            return this.year;
        },
        enumerable: true,
        configurable: true

    });
    book.getSetYear = 11;   // 相当于 setter
    var getterValue = book.getSetYear;  // 相当于 getter
    console.log(getterValue);

    /**
     * 来个综合的例子
     */
    var book1 = {};
    Object.defineProperties(book1, {
        year:{
            value: 1111,
            writable: true
        },
        edition:{
            value: 1,
            enumerable: false,
            writable: false
        },
        getSetYear: {
            set: function(value){
                this.year = value;
            },
            get: function(){
                return this.year;
            }
        }

    });
    console.log(book1.getSetYear);