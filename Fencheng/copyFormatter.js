/**
 * Created by Administrator on 2015/7/28.
 */

var  s1 = "project_id	project_name	area_id	bss_name	repay_id	repay_nbr	provider_id	start_dt	end_dt	last_months	td_price	bd_charge	upper_charge	offer_spec_id	offer_spec	status_cd	col_1	col_2	col_3	col_4	batch_id	dt_flag	div_pprice	bss_id	provider";
var s2 = "活动项目ID(PIID)	活动项目名称（选出）	营业区编码(固定表中区--地区区号)	业务名称（政企+尊享保底）	产品ID（产品号码+年月日+时间戳）	产品号码（手机号）	支付对象ID（接口取供应商ID）	结算开始时间(稽核后给)	结算结束时间（稽核后给）	结算持续时间（承诺保底月份sharePeriod）	终端结算价（导入的终端供货价wholesalePrice）	承诺保底金额（导入的保底值guaranteValue）	封顶金额 终端结算价*1.3（稽核计算得）	销售品ID（稽核获取）	销售品名称（稽核获取）	有效状态 	保留字段1	保留字段1	保留字段1	保留字段1	批次	项目还是清单（0、1）	历史分成钱 当月为1	业务id	支付对象名称";


var title1 = ["活动项目ID(PIID)","活动项目名称（选出）","营业区编码(固定表中区--地区区号)",
    "业务名称（政企+尊享保底）","产品ID（产品号码+年月日+时间戳）","产品号码（手机号）",
    "支付对象ID（接口取供应商ID）","结算开始时间(稽核后给)","结算结束时间（稽核后给）",
    "结算持续时间（承诺保底月份sharePeriod）","终端结算价（导入的终端供货价wholesalePrice）",
    "承诺保底金额（导入的保底值guaranteValue）","封顶金额 终端结算价*1.3（稽核计算得）",
    "销售品ID（稽核获取）","销售品名称（稽核获取）","有效状态 ","保留字段1","保留字段1",
    "保留字段1","保留字段1","批次","项目还是清单（0、1）","历史分成钱 当月为1","业务id","支付对象名称"];

var keys1 = ["projectId","projectName","areaId","bssName","repayId","repayNbr","providerId","startDt",
    "endDt","lastMonths","tdPrice","bdCharge","upperCharge","offerSpecId","offerSpec","statusCd",
    "col1","col2","col3","col4","batchId","dtFlag","divPprice","bssId","provider"];


//console.log(toJsExpression(title1, keys1));

console.log('' != "");
console.log(toArrayString("String[]", "keys", s2, "\t"));
console.log(lengthFormatter(toArrayString("String[] ", "keys", s1, "\t"), 80, ','));
var length = 13;
var re = new RegExp("{\\d{1," + (length + '').length + "}}", "g");//找{*}
var sub_re = new RegExp("\\d{1," + (length+ '').length + "}");//找数字
var reArray= [];//校验结果数组

do{
    var res = re.exec("{12}ds{0}weg{d}{2}");//验证表达式
    if(res != null){
        var sub_res = sub_re.exec(res[0]);//验证子表达式, 取出数据块的下标
        if(parseInt(sub_res[0]) < length){//若小于已有的数据块数组的长度
            reArray.push(res);
        }
    }
} while(res != null);

console.log('s'.split('\n'));
console.log('{1ds0}weg{d}2}'.split(re));
console.log('{12}ds{0}weg{d}{2}'.split(re));
console.log('{12}ds{0}weg{d}{2}'.replace(/{|}/g, ""));


/**
 * 根据负责来的一定格式的文字, 生成字符串, 方便写代码
 * res 要处理的字符串
 * spliter: 根据这个来划分, 一般是 \t \n
 * func: 对字符串的处理, 比如wordAdd_, wordRm_
 * */
function toArrayString(type, param, res, spliter, func){
    spliter = spliter == undefined ? '\t' : spliter;
    var array = res.split(spliter);
    for (var i = 0; i < array.length; i++) {
        array[i] = wordAdd_(array[i], '_');
    }
    var result =  type + " " + param + " = {";
    for (var i = 0; i < array.length; i++) {
        result += "\"" + array[i] + "\",";
    }
    result += "};";
    return result;
}

/**
 * 根据字符串长度来把长字符串分行
 * str 处理的string
 * length 参数规定多少字符就换行
 * spliter 根据这个字符划分
 * */
function lengthFormatter(str, length, spliter){
    var result = '';
    var preIndex = 0;
    for(var i = 0, j = 0; i < str.length; i++, j++) {
        if(j == length - 1){
            var frontStr = str.substring(preIndex, i);
            var tailStr = str.substring(i, str.length);
            var frontIndex = frontStr.lastIndexOf(spliter);
            var tailIndex = tailStr.indexOf(spliter);
            var index = frontStr.length - frontIndex < tailIndex ?
                i - frontStr.length + frontIndex : i + tailIndex;// 取最小的值str坐标
            result += str.substring(preIndex, index) + '\n\t';
            preIndex = index;
            j = 0;
        } else if (str.length - preIndex < length) {
            result += str.substring(preIndex, str.length) + '\n\t';
            break;
        }
    }
    return result;
}

/**
 *  字段加下划线 : userName -> user_name
 * */
function wordAdd_(str, character) {
    var result = '';
    var preIndex = 0;
    for(var i = 0; i < str.length; i++) {
        if(str.charAt(i) >= 'A' && str.charAt(i) <= 'Z') {
            var lower = str.charAt(i).toLowerCase();
            result += character + lower;
        } else {
            result += str.charAt(i);
        }
    }
    return result;
}
/**
 *  字段加下划线 : userName -> user_name
 *  用正则表达式实现
 * */
function addRm_ByRegular(str, character) {
    var reg = new RegExp("[A-Z]", "g");
    return str.replace(reg, function(word){
            return character + word.toLowerCase();}
    );
}


/**
 * 字段移除下划线: user_name -> userName
 * */
function wordRm_(str, character) {
    var array = str.split(character);
    var result = array[0];
    for(var i = 1; i < array.length; i++) {
        var upper = array[i].substring(0, 1).toUpperCase();
        result += upper + array[i].substring(1, array[i].length);
    }
    return result;
}

/**
 * 字段移除下划线: user_name -> userName
 * 用正则表达式实现
 * */
function wordRm_ByRegular(str, character) {
    var reg = new RegExp(character + "\\w", "g");
    return str.replace(reg, function(word){
            return word.substring(1,2).toUpperCase();}
    ).replace(character, '');
}


/**
 * 识别格式, 根据给定的表达式的模式来生成代码
 * expression 是表达式
 * length 为数组的个数
 * */
var sss = [['aa','bb','cc'],['11','22','33']];
console.log("\n"+toExpression(sss, "var s = {\n'{0}':'{1}',\n};", 13));
function toExpression(dataArray, expression, length, range_l, range_r){
    console.log(expression);
    var result = "";
    var reg_g = new RegExp("{\\d{1," + (length + '').length + "}}", "g");//找{*}
    var reg = new RegExp("{\\d{1," + (length + '').length + "}}");//找{*}
    var expArray = expression.split('\n');//识别每行表达式

    var maxIndex = getMaxLength(dataArray);

    //var preRes = reg_g.exec(expression);//验证表达式
    //expArray.push(expression.substring(0, preRes.index));
    //do{
    //    var res = reg_g.exec(expression);//验证表达式
    //    if(res == null){
    //        expArray.push(expression.substring(expArray[0].length, preRes.index + preRes[0].length));
    //        expArray.push(expression.substring((preRes.index + preRes[0].length), expression.length));
    //    } else {
    //        preRes = res;
    //    }
    //} while(res != null);


    /**v1.0*/
    for(var i = 0; i < expArray.length; i++) {
        if(reg.exec(expArray[i]) == null) {
            result += expArray[i] + '\n';
        } else {
            if(expArray[i].indexOf('\\n') >= 0) {//如果有换行符, 就向下复制,如果木有, 则横向复制
                for(var j = 0; j < maxIndex; j++) {//取最大的长度遍历
                    result += expArray[i].replace(reg_g, function (word) {
                        var index = word.replace(/{|}/g, '');//去掉括号
                        if (parseInt(index) < length) {//若小于已有的数据块数组的长度
                            return dataArray[parseInt(index)][j];
                        }
                    });
                    result = result.replace('\\n', '') + "\n";
                }
            } else {
                var fristRes = reg.exec(expArray[i]);
                result += expArray[i].substring(0, fristRes.index);
                for(var j = 0; j < maxIndex; j++) {//取最大的长度遍历
                    result += expArray[i]
                        .substring(fristRes.index, expArray[i].length)//子串
                        .replace(reg_g, function (word) {//替换函数
                        var index = word.replace(/{|}/g, '');//去掉括号
                        if (parseInt(index) < length) {//若小于已有的数据块数组的长度
                            return dataArray[parseInt(index)][j];
                        }
                    });
                }
            }
        }
    }


    return result;
}

function toExpressionV2(dataArray, expression, length, range_l, range_r){
    console.log(expression);
    var result = "";
    var reg_g = new RegExp("{\\d{1," + (length + '').length + "}}", "g");//找{*}
    var reg = new RegExp("{\\d{1," + (length + '').length + "}}");//找{*}
    var expArray = expression.split('\n');//识别每行表达式

    var maxIndex = getMaxLength(dataArray);


    /***v2.0*/
    for(var i = 0; i < expArray.length; i++) {

    }


    return result;
}

/**
 * 按照一块一块的格式 从textarea 取得数据放在数组中
 * rowSpliter: \n
 * columnSpliter: \t
 * */
var data = "\n\n\n\nid\t1\nprocessInstanceId\t2\nname\t3\n\nid\t1\nprocessInstanceId\t2\n\nid\t1\nprocessInstanceId\t2\n\n";

console.log(data.replace(/\n$/g, ''));
console.log(getMaxLength(getDataArray(data, '\n', '\t')));
console.log(getMaxLength([]));

function getDataArray(str, columnSpliter) {
    str = str.replace(/\n*$/g, '').replace(/^\n*/g, '');//去头尾除换行符
    var result = [];

    var rowArray = str.split(/\n{2,}/g);//先按照列划分
    var count = 0;// 初始长度为0
    var deg = 0;

    for(var i = 0; i < rowArray.length; i++) {//很多行, 一大块
        var subArray = rowArray[i].split('\n');
        for(var ii = 0; ii < subArray.length; ii++) {//行
            var subsubArray = subArray[ii].split(columnSpliter);
            deg = subsubArray.length;
            for (var iii = 0; iii < subsubArray.length; iii++) {//单元格
                if(result[iii + count] == undefined){
                    result[iii + count] = [];
                }
                result[iii + count].push(subsubArray[iii]);
            }
        }
        count += deg;
        deg = 0;
    }
    return result;
}


/**
 * 取得数组长度最短的长度
 * */
function getMaxLength(data) {
    if(data.length == 0 || data[0] == null) {
        return 0;
    }
    var result = data[0].length;
    for(var i = 0; i < data.length; i++) {
        if(data[i].length > result) {
            result = data[i].length;
        }
    }
    return result;

}

/**
 * 字符串转json格式
 * */
var jsonstr = "{\"rows\":[{\"hidden\":false,\"columnName\":\"活动项目ID(PIID)\",\"column\":\"projectId\",\"description\":\"\",\"searchAble\":true,\"inputType\":\"textbox\"},{\"hidden\":false,\"columnName\":\"活动项目名称\",\"column\":\"projectName\",\"description\":\"\",\"searchAble\":true,\"inputType\":\"textbox\"},{\"hidden\":false,\"columnName\":\"业务名称\",\"column\":\"bssName\",\"description\":\"\",\"searchAble\":true,\"inputType\":\"datebox\"},{\"columnName\":\"批次\",\"column\":\"batchId\",\"hidden\":false,\"searchAble\":true,\"description\":\"\",\"inputType\":\"textbox\"}],\"total\":4}";
function toJsonFormat(jsonstr) {

}
console.log(jsonstr);

/**
 1 压缩
 2 转义
 3 压缩转义
 */
function yasuo(ii){
    var txtA = document.getElementById("json_input");
    var text = txtA.value;
    if((ii==1||ii==3) ){
        text = text.split("\n").join(" ");
        var t = [];
        var inString = false;
        for (var i = 0, len = text.length; i < len  ; i++) {
            var c = text.charAt(i);
            if (inString && c === inString ) {
                // TODO: \\"
                if (text.charAt(i - 1) !== '\\') {
                    inString = false;
                }
            } else if (!inString && (c === '"' || c === "'")) {
                inString = c;
            } else if (!inString && (c === ' ' || c === "\t")) {
                c = '';
            }
            t.push(c);
        }
        text= t.join('');
    }
    if((ii==2||ii==3) ){
        text = text.replace(/\\/g,"\\\\").replace(/\"/g,"\\\"");
    }
    if(ii==4 ){
        text = text.replace(/\\\\/g,"\\").replace(/\\\"/g,'\"');
    }
    txtA.value = text;
}



/***
 * xml 转 json
 * @param c
 * @returns {XML|string}
 */

function repalceFh(c){
    return c.replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/&quot;/g,"\"");
}
//$(function(){
//
//    $("#tojson").on("click", function(e) {
//        var xotree = new XML.ObjTree();
//        var dumper = new JKL.Dumper();
//        var xmlText = $("#xml").val();
//        if($("#zyBianma").attr("checked")){
//            xmlText = repalceFh(xmlText);
//        }
//        var tree = xotree.parseXML(xmlText);
//        $("#json").val(dumper.dump(tree));
//    });
//
//    $("#toxml").on("click", function(e) {
//        var xotree = new XML.ObjTree();
//        var json = eval("(" + $("#json").val() + ")");
//        $("#xml").val(formatXml(xotree.writeXML(json)));
//    });
//
//    $("#example").click(function(){
//        $("#xml").val('<animals><dog><name>Rufus</name><breed>labrador</breed></dog><dog><name>Marty</name><breed>whippet</breed></dog><cat name="Matilda"/></animals>');
//    });
//
//    $("#reset").click(function(){
//        $("#xml,#json").val("");
//    });
//});
