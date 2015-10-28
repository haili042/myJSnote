/**
 * easyui datagrid 行编辑, 增加修改删除 等通用
 */


// 结束编辑处理, 校验
function endEditing(grid, index){
	if (index == undefined || index < 0){return true;}
	if(grid.datagrid('validateRow', index)){
		grid.datagrid('endEdit', index);
		return true;
	} else {
		return false;
	}
}

/***
 * preIndex : 上一个节点
 */
function onClickRow(grid, index){
//	var index = grid.datagrid('getRowIndex',grid.datagrid('getSelected'));// 获取选择的行
	if (endEditing(grid, grid.preIndex)){
		grid.datagrid('selectRow', index)
		.datagrid('beginEdit', index);
		return index;//若通过校验则返回现在选择的index
	} else {
		return grid.preIndex;//若没通过校验则返回原来的index
	}
}

// 添加行
function appendRow(grid){
//	var index = grid.datagrid('getRowIndex',grid.datagrid('getSelected'));// 获取上一次选择的行

	if (endEditing(grid, grid.preIndex)){
		grid.datagrid('appendRow',{});
		var index = grid.datagrid('getRows').length-1;// 最新插入的一行开始编辑
		grid.datagrid('selectRow', index) // 选中新增的这行
				.datagrid('beginEdit', index);// 开始编辑
		grid.datagrid('fitColumns');
		return index;
	} else {
		return grid.preIndex;
	}
}

// 删除行
function removeRow(grid, index){
	if(index == undefined){
		index = grid.datagrid('getRowIndex',grid.datagrid('getSelected'));// 获取选择的行
	}
//	var index = grid.datagrid('getRowIndex',grid.datagrid('getChecked')[0]);// 获取勾选的行

	if (index == undefined || index < 0){return;}
	grid.datagrid('cancelEdit', index)
			.datagrid('deleteRow', index);
	return index;
}

// 保存行内容
function acceptRow(grid){
	var index = grid.datagrid('getRowIndex',grid.datagrid('getSelected'));// 获取选择的行
//	var index = grid.datagrid('getRowIndex',grid.datagrid('getChecked')[0]);// 获取勾选的行

	if (endEditing(grid, index)){
		grid.datagrid('acceptChanges');
		return true;
	} else {
		return false;
	}
	
//	var rows = $("#checkRuleDataGrid").datagrid('getRows');
//	for(var i = 0; i < rows.length; i++) {
//		if (!endEditing(grid, i)){
//			return false;
//		}
//	}
//	return true;
}


/**treeGrid 处理*/
// 添加行
function treeGrid_appendRow(grid, treeId){
	var superRow = grid.treegrid('getSelected');// 获取上一次选择的行
	if(superRow == null){
		superRow = grid.treegrid('getRoots')[0];
	}

	if (endEditing(grid, grid.preIndex)){
		var lastId = 1;//取最大的id避免重复, 没有则为000
		if(superRow.children != null && superRow.children.length > 0){
			lastId = superRow.children[superRow.children.length - 1][treeId] + 1;//在最大id上+1
			lastId = '' + lastId;
			lastId = lastId.substring(lastId.length-3);
		}
		var newId = parseInt('' + superRow[treeId] + fix(lastId, 3));//新的id
		grid.treegrid('append',{
			parent: superRow[treeId],  // the node has a 'id' value that defined through 'idField' property
			data: [{
				id: newId
			}]
		});

		grid.treegrid('select', newId)
			.treegrid('beginEdit', newId);// 开始编辑
		return newId;
	} else {
		return grid.preIndex;
	}
}

// 删除行
function treeGrid_removeRow(grid, treeId, index){
	if(index == undefined){
		index = grid.treegrid('getSelected')[treeId];// 获取选择的行
	}
//	var index = grid.datagrid('getRowIndex',grid.datagrid('getChecked')[0]);// 获取勾选的行

	if (index == undefined || index < 0){return;}
	grid.treegrid('cancelEdit', index)
		.treegrid('remove', index);
	return index;
}

// 保存行内容
function treeGrid_acceptRow(grid, treeId){
	var index = grid.treegrid('getSelected')[treeId];// 获取选择的行
	if(grid.preIndex != index){
		index = grid.preIndex;
	}
	if (endEditing(grid, index)){
		grid.treegrid('acceptChanges');
		return true;
	} else {
		return false;
	}

}

// 转几位数字输出
function fix(num, length) {
	return ('' + num).length < length ? ((new Array(length + 1)).join('0') + num).slice(-length) : '' + num;
}

/*

// 结束编辑处理, 校验
function treeGrid_endEditing(grid, index){
	if (index == undefined || index < 0){return true;}
	if(grid.treegrid('validateRow', index)){
		grid.treegrid('endEdit', index);
		return true;
	} else {
		return false;
	}
}

// 先不删, 这个是全部都是treegrid 的写法
function treeGrid_onClickRow(grid, index){
	if (treeGrid_endEditing(grid, grid.preIndex)){
		grid.treegrid('selectRow', index)
			.treegrid('beginEdit', index);
		return index;//若通过校验则返回现在选择的index
	} else {
		return grid.preIndex;//若没通过校验则返回原来的index
	}
}

// 添加行
function treeGrid_appendRow(grid){

	if (treeGrid_endEditing(grid, grid.preIndex)){
		grid.treegrid('appendRow',{});
		var index = grid.treegrid('getRows').length-1;// 最新插入的一行开始编辑
		grid.treegrid('selectRow', index) // 选中新增的这行
			.treegrid('beginEdit', index);// 开始编辑
		grid.treegrid('fitColumns');
		return index;
	} else {
		return grid.preIndex;
	}
}

// 删除行
function treeGrid_removeRow(grid, index){
	if(index == undefined){
		index = grid.treegrid('getSelected').id;// 获取选择的行
	}

	if (index == undefined || index < 0){return;}
	grid.treegrid('cancelEdit', index)
		.treegrid('remove', index);
	return index;
}

// 保存行内容
function treeGrid_acceptRow(grid){
	var index = grid.treegrid('getSelected').id;// 获取选择的行
	if(grid.preIndex != index){
		index = grid.preIndex;
	}
	if (treeGrid_endEditing(grid, index)){
		grid.treegrid('acceptChanges');
		return true;
	} else {
		return false;
	}

}*/
