require.config({

    // RequireJS 通过一个相对的路径 baseUrl来加载所有代码。
    // baseUrl通常被设置成data-main属性指定脚本的同级目录。

    baseUrl: './modules', // 路径是相对与index.html (即引入require.js的文件)的路径

    // 配置路径
    paths: {

        // 可以配置 CDN
        // libs 别名
        jquery: '../lib/jquery.min',
        easyui: '../lib/easyui-1.4.3/jquery.easyui.min'


        // js 文件夹下的所有 js 文件可以不用写
        // cbx: 'js/cbx',
        // ...
    },

    // 部分时候需要加载非AMD规范的js，这时候就需要用到另一个功能：shim
    // 插件形式的非AMD模块，例如我们经常会用到jquery插件，基本都不符合AMD规范
    // 比如jquery.easyui插件，这时候就需要 shim

    shim: {
        'easyui':  {
            deps: [
                'jquery'
            ]
        },
        'shimTest':  {
            init: function() {
                return {
                    test: test,
                    test2: test2
                };
            }
        },
        'shimTest2': {
            exports: 'myModule'
        }
    }
});

// 全局 require

// jquery plugins
require(['cbx']);

// test 循环引用
require(['cycleA']);

// test shim, 直接引入和插入script 没区别
require(['shimTest'], function(test) {
    test.test();
    test.test2();
});

require(['shimTest2'], function(myModule) {
    myModule.handler();
});


require(['noModuleId'], function() {
    require(['a2']);
});
