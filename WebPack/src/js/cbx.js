require('easyui');
require('easyuiCss');

console.log(('#cbx'));

// 加载 下拉框
$('#cbx').combobox({
    valueField:'id',
    textField:'text',
    data: [{
        "id":1,
        "text":"text1"
    },{
        "id":2,
        "text":"text2"
    },{
        "id":3,
        "text":"text3"
    },{
        "id":4,
        "text":"text4"
    },{
        "id":5,
        "text":"text5"
    }]
});