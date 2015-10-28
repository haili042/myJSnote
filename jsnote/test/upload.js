/**
 * Created by Administrator on 2015/5/25.
 */
/**
 --------- �ϴ��ᱨ��, �������: ---------
 debMode��form�е�input����action�������input name ��setter��
 ��������jsp��nameΪsubmit�ı�ǩ��action��û�ж�Ӧ��setter�������¡�
 ��value��Ϊtrueʱ��Ҫ�����е�name��input�������ж�Ӧ��setter��
 ��ˣ�Ҳ�ɽ�ҳ���е�nameȥ��������id����������⡣
 */

// �ļ�ͼ��
function getFileIcon(basePath, fileName){
	var suffix = fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length);
	var iconUrl = basePath+"/style/fileIcons/";
	switch(suffix){
		// ͼƬ
		case "gif": iconUrl += "gif.gif";break;
		case "jpg": iconUrl += "jpg.gif";break;
		case "jpeg": iconUrl += "jpeg.gif";break;
		case "bmp": iconUrl += "bmp.gif";break;
		case "png": iconUrl += "png.gif";break;
		case "pdf":iconUrl += "pdf.gif";break;
		// �ļ�
		case "zip": iconUrl += "tar.gif";break;
		case "tar": iconUrl += "tar.gif";break;
		case "rar": iconUrl += "tar.gif";break;
		case ".7z": iconUrl += "tar.gif";break;
		// �ĵ���
		case "doc": iconUrl += "doc.gif";break;
		case "docx": iconUrl += "doc.gif";break;
		case "xls": iconUrl += "xls.gif";break;
		case "xlsx": iconUrl += "xls.gif";break;
		case "ppt": iconUrl += "ppt.gif";break;
		case "pptx": iconUrl += "ppt.gif";break;
		case "wpt": iconUrl += "wpt.gif";break;
		case "wps": iconUrl += "wps.gif";break;
		case "txt": iconUrl += "wps.gif";break;
		// ����
		default: iconUrl += "unknown.gif";break;
	}
	return iconUrl;
}

/*���캯��*/
function AttachUploader(myFile, div ,fileQueue, processInstanceId, taskId, basePath,uploadUrl,deleteUrl){
	this.myFile = myFile;// file ��ǩ��id
	this.div = div;// ��ǩ�ĸ�id
	this.fileQueue = fileQueue;//������div ��ǩ��id
	this.processInstanceId = processInstanceId;//����ʵ��id
	this.taskId = taskId;// ����id
	this.basePath = basePath;// ����·��
	this.uploadUrl = uploadUrl;//�ϴ�url
	this.deleteUrl = deleteUrl;// ɾ������id

	this.attachIds = new Array();// ����
	this.fileIndex = 0;
	this.dv = document.getElementById(div);	// ��ʾ�����ļ��������� div

}

/*�ϴ��ļ�*/
AttachUploader.prototype.uploadAttach = function (){
	var that = this;
	$("#"+that.myFile).uploadify({
		'method'   : 'post',				//Ĭ��Ϊpost , �ϴ�ֻ��Ϊpost
		'uploader' : that.basePath+"/script/uploadify/uploadify.swf",
		'script' : that.uploadUrl+actionExtension,//��̨���������
		'scriptData': {'processInstanceId':that.processInstanceId,'taskId': that.taskId},
		'cancelImg' : that.basePath+"/script/uploadify/cancel.png",
		'fileDataName' :that.myFile,	//�������˸�����������ļ�
		'fileDesc' : 'ѡ���ļ�',			//��������ѡ���ļ��Ի����е���ʾ�ı�
		'queueID' : that.fileQueue,		// �ļ��ϴ���������ID����ID�����ļ����е�div��IDһ��
		'auto' : true,						//false��Ҫ����ϴ���ť���ϴ�
		'multi' : false,					//�����ϴ�����ļ�
		'buttonText' : 'ѡ�񸽼�',		//��ť����
		/**������*/
		'onError' : function(event, queueID, fileObj, errorObj) {
			$.messager.alert('����',' �ϴ�ʧ��' + errorObj.info + '��������' + errorObj.type,'error');
		},
		/**�ɹ�����*/
		'onComplete' : function (event, queueID, fileObj, response, data) {
			var str = eval("("+response+")");
			var error = str.success;		// �ɹ���Ϣ
			var fname = str.fileName;			// �ļ���
			var id = str.fileId;			// �ļ�id
			that.attachIds.push(id);

			if (error != "success") {
				$.messager.alert('����',error,'error');
			} else {
				if (fname != "") {
					that.drawFile(fname, id);
				}
			}// end of if else
		}// end of oncomplete
	});// end of uploadify
};


// ɾ������, �����Ǹ�div
AttachUploader.prototype.deleteAttach = function (fDiv){
	that = this;
	// ɾ������ _attachIds Ԫ��
	for(var i=0,n=0;i<that.attachIds.length;i++) {
		if(fDiv.id != that.attachIds[i]){
			that.attachIds[n++] = that.attachIds[i];
		}
	}
	that.attachIds.length -= 1;

	var deleteIds = fDiv.id;//Ҫɾ����id
	var postData = {'deletIds': deleteIds};
	//ajax ����ɾ��ѡ�е���
	$.ajax({
		url: that.deleteUrl+actionExtension,
		type: 'POST',
		data: postData,//ɾ����id
		traditional: true,//���������ǣ�һ��Ҫ���� traditional:true��
						  //��ֹjquery������л���������,�����������ת��Ϊ��ͳ��ʽ��deletIds=1&deletIds=2
		async: true,//Ĭ��Ϊtrue�������첽�������Ϊfalse������ͬ������
		success: function(data){
			var e = document.getElementById(fDiv.id);
			that.dv.removeChild(e);
		}
	});//end of $.ajax
};


// ���غ���
AttachUploader.prototype.downLoadAttach = function (id){

};

// չʾ�ļ���ҳ��,ҳ�沼�ָ�ʽ����
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
	// �ļ�div
	var fDiv = document.createElement("div");// �½�Ԫ��
	fDiv.id = id;											// ����Ϊ�Ǹ��ļ���id
	that.dv.appendChild(fDiv);							// ���븸dv

	//�ļ�ͼ�겿��
	var fileIcon = document.createElement("img");// �½�Ԫ��
	fileIcon.src = getFileIcon(that.basePath, fname);					// ͼ��·��
	fileIcon.className = "fileIcon";					// ��ʽ
	fDiv.appendChild(fileIcon);							// ���븸dv

	// �ļ���
	var fileName = document.createElement("span");// �½�Ԫ��
	fileName.innerHTML= "<u>" + fname + "</u>&nbsp;";// ����
	fileName.onclick = function() {
		// ����
	};
	fDiv.appendChild(fileName);							// ���븸dv

	// ɾ����ť����
	var delectButton = document.createElement("img");
	delectButton.src = that.basePath+"/script/themes/icons/cancel.png";
	delectButton.onclick = function(){
		that.deleteAttach(this.parentNode);//ɾ��
	};
	fDiv.appendChild(delectButton);							// ��span ����� ɾ����

//	this.dv.appendChild(document.createElement("br"));			// ��div ����� <br>
	that.fileIndex++;
};

//===============����������, �ϴ�excel����������====================
// �̳� AttachUploader
function ExcelUploader(myFile, div ,fileQueue, processInstanceId, taskId, basePath,uploadUrl,deleteUrl, deleteImportUrl){
	AttachUploader.call(this, myFile, div ,fileQueue, processInstanceId, taskId, basePath,uploadUrl,deleteUrl);
	this.deleteImportUrl = deleteImportUrl;
	this.randIdentifier = "";
}
//�������ʽ�̳� ,,ò�Ʋ��������
//parasitcInherit(ExcelUploader, AttachUploader);//Ҫд�����๹�캯��֮��
// �������ʽ�̳�
ExcelUploader.prototype = new AttachUploader();
ExcelUploader.constructor = ExcelUploader;

/*����excel*/
ExcelUploader.prototype.uploadExcel = function (){
	var that = this;
	$("#"+that.myFile).uploadify({
		'uploader' : that.basePath+"/script/uploadify/uploadify.swf",
		'script' : that.uploadUrl+actionExtension,//��̨���������
		'cancelImg' : that.basePath+"/script/uploadify/cancel.png",
		'fileDataName' : that.myFile,//�������˸�����������ļ�
		'queueID' : that.fileQueue,// �ļ����е�ID����ID�����ļ����е�div��IDһ��
		'queueSizeLimit' : 1,//��������ļ�����ʱ������ѡ���ļ��ĸ���
		'fileDesc' : 'excel�ļ�',//��������ѡ���ļ��Ի����е���ʾ�ı�
		'fileExt' : '*.xls;*.xlsx', //���ƿ��ϴ��ļ�����չ�������ñ���ʱ��ͬʱ����fileDesc
		'auto' : true,//false��Ҫ����ϴ���ť���ϴ�
		'multi' : false,//�����ϴ�����ļ�
		'simUploadLimit' : 1,//����ͬʱ�ϴ��ĸ���
		'buttonText' : '����ļ�',
		'onCancel' : function(event, queueID, fileObj,
							  data) {
			$.messager.alert('ȡ��', '�ļ� ' + fileObj.name
				+ ' ��ȡ��!', 'error');
		},//ȡ���ϴ��ļ�
		'onClearQueue' : function(event) {
			//  alert('The queue has been cleared.');
		},//����ϴ�����

		'onError' : function(event, queueID, fileObj,
							 errorObj) {
			$.messager.alert('����', ' �ϴ�ʧ��'
				+ errorObj.info + '��������'
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
			that.attachIds.push(ImportFileId);// ���븽����id��

			if (error != "success") {
				$.messager.alert('����', error, 'error');
			} else {
				if (total != "") {
					that.drawFile(fname, ImportFileId);
					$.messager.alert('��ʾ', '������' + total + '����¼', 'info',
						function() {});
				}
			}
		}
	});// end of uploadify

};


//��дɾ������
ExcelUploader.prototype.deleteAttach = function (fDiv){
	that = this;
	// ɾ������ _attachIds Ԫ��
	for(var i=0,n=0;i<that.attachIds.length;i++) {
		if(fDiv.id != that.attachIds[i]){
			that.attachIds[n++] = that.attachIds[i];
		}
	}
	that.attachIds.length -= 1;

	var deleteIds = fDiv.id;//Ҫɾ����id
	var postData = {'deletIds': deleteIds};
	//ajax ����ɾ��ѡ�е��ļ�
	$.ajax({
		url: that.deleteUrl+actionExtension,
		type: 'POST',
		data: postData,//ɾ����id
		traditional: true,//���������ǣ�һ��Ҫ���� traditional:true��
		//��ֹjquery������л���������,�����������ת��Ϊ��ͳ��ʽ��deletIds=1&deletIds=2
		async: true,//Ĭ��Ϊtrue�������첽�������Ϊfalse������ͬ������
		success: function(data){
			var e = document.getElementById(fDiv.id);
			that.dv.removeChild(e);
		}
	});//end of $.ajax

	/**����ɹ���ɾ����**/
	if(that.randIdentifier != ''){
		$.ajax({
			url: that.deleteImportUrl+actionExtension,
			type: 'POST',
			data: {'randIdentifier': that.randIdentifier},//ɾ����id
			traditional: true,//���������ǣ�һ��Ҫ���� traditional:true��
							  //��ֹjquery������л���������,�����������ת��Ϊ��ͳ��ʽ��deletIds=1&deletIds=2
			async: true,//Ĭ��Ϊtrue�������첽�������Ϊfalse������ͬ������
			success: function(data){
			}
		});//end of $.ajax
	}

};

// ������ϼ̳�ʵ��:
function parasitcInherit(subType, superType){
	var prototype = Object(superType.prototype);
	prototype.constructor = subType;
	subType.prototype = prototype;
}

