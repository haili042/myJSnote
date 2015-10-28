/**
 * Created by Administrator on 2015/8/21.
 */
/**
 * 自己制作的 ui 控件, 可能会有很多bug, 以后会逐步改进
 * copyright: 仅供自己学习使用
 * author : haili042
 * create time : 20150821
 * version : 1.0
 * */


/*
* 建立闭包, 可以减少全局变量, 避免第三方插件重名, 还可以在函数里面引用$而不会引起 prototype 的冲突了
* 前面加个引号可以提高容错力, 兼容别人的错误代码, 是个好习惯
* window等系统变量在插件内部就有了一个局部的引用，可以提高访问速度，会有些许性能的提升,
* undefined并不是javascript的关键字，使用参数undefined是为了防外面定义了全局的undefined变量而受到污染。
* */
;(function ($, window, document, undefined) {
    /*采用 面向 jquery对象的开发方式*/
    $.fn.hailigrid = function () {

    };
})(jQuery, window, document);