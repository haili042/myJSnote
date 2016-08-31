/**
 * Created by Administrator on 2015/5/25.
 */
/**
 --------- 上传会报错, 解决方案: ---------
 debMode下form中的input会再action中找针对input name 的setter，
 错误是由jsp中name为submit的标签在action中没有对应的setter方法所致。
 当value设为true时，要求所有的name的input都必须有对应的setter。
 因此，也可将页面中的name去掉，都用id来解决此问题。
 */

// 文件图标
function getFileIcon(basePath, fileName){
	var suffix = fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length);
	var iconUrl = basePath+"/style/fileIcons/";
	switch(suffix){
		// 图片
		case "gif": iconUrl += "gif.gif";break;
		case "jpg": iconUrl += "jpg.gif";break;
		case "jpeg": iconUrl += "jpeg.gif";break;
		case "bmp": iconUrl += "bmp.gif";break;
		case "png": iconUrl += "png.gif";break;
		case "pdf":iconUrl += "pdf.gif";break;
		// 文件
		case "zip": iconUrl += "tar.gif";break;
		case "tar": iconUrl += "tar.gif";break;
		case "rar": iconUrl += "tar.gif";break;
		case ".7z": iconUrl += "tar.gif";break;
		// 文档类
		case "doc": iconUrl += "doc.gif";break;
		case "docx": iconUrl += "doc.gif";break;
		case "xls": iconUrl += "xls.gif";break;
		case "xlsx": iconUrl += "xls.gif";break;
		case "ppt": iconUrl += "ppt.gif";break;
		case "pptx": iconUrl += "ppt.gif";break;
		case "wpt": iconUrl += "wpt.gif";break;
		case "wps": iconUrl += "wps.gif";break;
		case "txt": iconUrl += "wps.gif";break;
		// 其他
		default: iconUrl += "unknown.gif";break;
	}
	return iconUrl;
}

/*构造函数*/
function AttachUploader(myFile, div ,fileQueue, processInstanceId, taskId, basePath,uploadUrl,deleteUrl){
	this.myFile = myFile;// file 标签的id
	this.div = div;// 标签的父id
	this.fileQueue = fileQueue;//进度条div 标签的id
	this.processInstanceId = processInstanceId;//流程实例id
	this.taskId = taskId;// 环节id
	this.basePath = basePath;// 基本路径
	this.uploadUrl = uploadUrl;//上传url
	this.deleteUrl = deleteUrl;// 删除附件id

	this.attachIds = new Array();// 数组
	this.fileIndex = 0;
	this.dv = document.getElementById(div);	// 显示整个文件名的区域 div

}

/*上传文件*/
AttachUploader.prototype.uploadAttach = function (){
	var that = this;
	$("#"+that.myFile).uploadify({
		'method'   : 'post',				//默认为post , 上传只能为post
		'uploader' : that.basePath+"/script/uploadify/uploadify.swf",
		'script' : that.uploadUrl+actionExtension,//后台处理的请求
		'scriptData': {'processInstanceId':that.processInstanceId,'taskId': that.taskId},
		'cancelImg' : that.basePath+"/script/uploadify/cancel.png",
		'fileDataName' :that.myFile,	//服务器端根据这个接收文件
		'fileDesc' : '选择文件',			//用来设置选择文件对话框中的提示文本
		'queueID' : that.fileQueue,		// 文件上传进度条的ID，该ID与存放文件队列的div的ID一致
		'auto' : true,						//false需要点击上传按钮才上传
		'multi' : false,					//可以上传多个文件
		'buttonText' : '选择附件',		//按钮的字
		/**错误处理*/
		'onError' : function(event, queueID, fileObj, errorObj) {
			$.messager.alert('错误',' 上传失败' + errorObj.info + '错误类型' + errorObj.type,'error');
		},
		/**成功处理*/
		'onComplete' : function (event, queueID, fileObj, response, data) {
			var str = eval("("+response+")");
			var error = str.success;		// 成功信息
			var fname = str.fileName;			// 文件名
			var id = str.fileId;			// 文件id
			that.attachIds.push(id);

			if (error != "success") {
				$.messager.alert('错误',error,'error');
			} else {
				if (fname != "") {
					that.drawFile(fname, id);
				}
			}// end of if else
		}// end of oncomplete
	});// end of uploadify
};


// 删除附件, 参数是父div
AttachUploader.prototype.deleteAttach = function (fDiv){
	that = this;
	// 删除数组 _attachIds 元素
	for(var i=0,n=0;i<that.attachIds.length;i++) {
		if(fDiv.id != that.attachIds[i]){
			that.attachIds[n++] = that.attachIds[i];
		}
	}
	that.attachIds.length -= 1;

	var deleteIds = fDiv.id;//要删除的id
	var postData = {'deletIds': deleteIds};
	//ajax 请求删除选中的行
	$.ajax({
		url: that.deleteUrl+actionExtension,
		type: 'POST',
		data: postData,//删除的id
		traditional: true,//传递数组是，一定要设置 traditional:true，
						  //防止jquery深度序列化参数对象,即将数组参数转化为传统格式：deletIds=1&deletIds=2
		async: true,//默认为true，代表异步请求；如果为false，代表同步请求
		success: function(data){
			var e = document.getElementById(fDiv.id);
			that.dv.removeChild(e);
		}
	});//end of $.ajax
};


// 下载函数
AttachUploader.prototype.downLoadAttach = function (id){

};

// 展示文件到页面,页面布局格式如下
//	_____________________________________
//	|dv									|
//	|	_____________________________	|
//	|	|fDiv						|	|
//	|	|	_______________________	|	|
//	|	|	|icon+fname+deleteButton|	|
//	|___|___|_______________________|___|
//
AttachUploader.prototype.drawFile = function(fname, id){
	that = this;
	// 文件div
	var fDiv = document.createElement("div");// 新建元素
	fDiv.id = id;											// 设置为那个文件的id
	that.dv.appendChild(fDiv);							// 加入父dv

	//文件图标部分
	var fileIcon = document.createElement("img");// 新建元素
	fileIcon.src = getFileIcon(that.basePath, fname);					// 图标路径
	fileIcon.className = "fileIcon";					// 样式
	fDiv.appendChild(fileIcon);							// 加入父dv

	// 文件名
	var fileName = document.createElement("span");// 新建元素
	fileName.innerHTML= "<u>" + fname + "</u>&nbsp;";// 名称
	fileName.onclick = function() {
		// 下载
	};
	fDiv.appendChild(fileName);							// 加入父dv

	// 删除按钮部分
	var delectButton = document.createElement("img");
	delectButton.src = that.basePath+"/script/themes/icons/cancel.png";
	delectButton.onclick = function(){
		that.deleteAttach(this.parentNode);//删除
	};
	fDiv.appendChild(delectButton);							// 在span 中添加 删除键

//	this.dv.appendChild(document.createElement("br"));			// 在div 中添加 <br>
	that.fileIndex++;
};

//===============以下是子类, 上传excel并导入内容====================
// 继承 AttachUploader
function ExcelUploader(myFile, div ,fileQueue, processInstanceId, taskId, basePath,uploadUrl,deleteUrl, deleteImportUrl){
	AttachUploader.call(this, myFile, div ,fileQueue, processInstanceId, taskId, basePath,uploadUrl,deleteUrl);
	this.deleteImportUrl = deleteImportUrl;
	this.randIdentifier = "";
}
//寄生组合式继承 ,,貌似不适用这个
//parasitcInherit(ExcelUploader, AttachUploader);//要写在子类构造函数之后
// 采用组合式继承
ExcelUploader.prototype = new AttachUploader();
ExcelUploader.constructor = ExcelUploader;

/*导入excel*/
ExcelUploader.prototype.uploadExcel = function (){
	var that = this;
	$("#"+that.myFile).uploadify({
		'uploader' : that.basePath+"/script/uploadify/uploadify.swf",
		'script' : that.uploadUrl+actionExtension,//后台处理的请求
		'cancelImg' : that.basePath+"/script/uploadify/cancel.png",
		'fileDataName' : that.myFile,//服务器端根据这个接收文件
		'queueID' : that.fileQueue,// 文件队列的ID，该ID与存放文件队列的div的ID一致
		'queueSizeLimit' : 1,//当允许多文件生成时，设置选择文件的个数
		'fileDesc' : 'excel文件',//用来设置选择文件对话框中的提示文本
		'fileExt' : '*.xls;*.xlsx', //控制可上传文件的扩展名，启用本项时需同时声明fileDesc
		'auto' : true,//false需要点击上传按钮才上传
		'multi' : false,//可以上传多个文件
		'simUploadLimit' : 1,//允许同时上传的个数
		'buttonText' : '浏览文件',
		'onCancel' : function(event, queueID, fileObj,
							  data) {
			$.messager.alert('取消', '文件 ' + fileObj.name
				+ ' 被取消!', 'error');
		},//取消上传文件
		'onClearQueue' : function(event) {
			//  alert('The queue has been cleared.');
		},//清空上传队列

		'onError' : function(event, queueID, fileObj,
							 errorObj) {
			$.messager.alert('错误', ' 上传失败'
				+ errorObj.info + '错误类型'
				+ errorObj.type, 'error');
		},
		'onComplete' : function(event, queueID,
								fileObj, response, data) {
			var str = eval("("+response+")");
			var error = str.success;
			var total = str.size;
			var rand = str.rand;
			var ImportFileId = str.fileId;
			var fname = str.fileName;
//			that.randIdentifier += rand + "@";
			that.randIdentifier = rand;
			that.attachIds.push(ImportFileId);// 加入附件的id中

			if (error != "success") {
				$.messager.alert('错误', error, 'error');
			} else {
				if (total != "") {
					that.drawFile(fname, ImportFileId);
					$.messager.alert('提示', '共插入' + total + '条记录', 'info',
						function() {});
				}
			}
		}
	});// end of uploadify

};


//重写删除方法
ExcelUploader.prototype.deleteAttach = function (fDiv){
	that = this;
	// 删除数组 _attachIds 元素
	for(var i=0,n=0;i<that.attachIds.length;i++) {
		if(fDiv.id != that.attachIds[i]){
			that.attachIds[n++] = that.attachIds[i];
		}
	}
	that.attachIds.length -= 1;

	var deleteIds = fDiv.id;//要删除的id
	var postData = {'deletIds': deleteIds};
	//ajax 请求删除选中的文件
	$.ajax({
		url: that.deleteUrl+actionExtension,
		type: 'POST',
		data: postData,//删除的id
		traditional: true,//传递数组是，一定要设置 traditional:true，
		//防止jquery深度序列化参数对象,即将数组参数转化为传统格式：deletIds=1&deletIds=2
		async: true,//默认为true，代表异步请求；如果为false，代表同步请求
		success: function(data){
			var e = document.getElementById(fDiv.id);
			that.dv.removeChild(e);
		}
	});//end of $.ajax

	/**如果成功就删号码**/
	if(that.randIdentifier != ''){
		$.ajax({
			url: that.deleteImportUrl+actionExtension,
			type: 'POST',
			data: {'randIdentifier': that.randIdentifier},//删除的id
			traditional: true,//传递数组是，一定要设置 traditional:true，
							  //防止jquery深度序列化参数对象,即将数组参数转化为传统格式：deletIds=1&deletIds=2
			async: true,//默认为true，代表异步请求；如果为false，代表同步请求
			success: function(data){
			}
		});//end of $.ajax
	}

};

// 寄生组合继承实现:
function parasitcInherit(subType, superType){
	var prototype = Object(superType.prototype);
	prototype.constructor = subType;
	subType.prototype = prototype;
}

