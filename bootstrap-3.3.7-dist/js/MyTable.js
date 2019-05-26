let table_id = "#DataTable";
let codeExcel;
function InsertLine(obj) {
	let count = $(obj).parent().prevAll().length - 1;
	$(obj).parent().parent().after(linebody(count));
	for(let i = 1; i < $(table_id).find("tr").length; i++) {
		let Lnum = i + "#";
		$(table_id).find("tr").eq(i).find("td").eq(0).html(Lnum);
	}
}

function linebody(count) {
	let body = "<tr><td></td>";
	for(let i = 0; i < count; i++) {
		body += "<td><div contenteditable='true'></div></td>";
	}
	body += `<td>
		    <button class="btn btn-success btn-sm" onclick="InsertLine(this)">添加</button>
		    <button class="btn btn-danger btn-sm" onclick="DeleteLine(this)">删除</button>
        </td>`;
	body += "</tr>";
	return body;
}

function DeleteLine(obj) {
	$(obj).parent().parent().remove();
	for(let i = 1; i < $(table_id).find("tr").length; i++) {
		let Lnum = i + "#";
		$(table_id).find("tr").eq(i).find("td").eq(0).html(Lnum);
	}
}

function Deleterow(obj) {
	let ti = $(obj).parent().prevAll().length;
	for(let i = 0; i < $(table_id).find("tr").length; i++) {
		$(table_id).find("tr").eq(i).find("td").eq(ti).remove();
	}
}

function Insertrow(obj) {
	let ti = $(obj).parent().prevAll().length;
	let width = $(table_id).width();
	let td1 = "<td><div contenteditable='true' ></div></td>"
	let td = `<td><div contenteditable='true' style='float: left;width: 70%'>请输入标题</div>
    <span class="glyphicon glyphicon-remove-sign" style="color: #999;font-size: 16px;" onclick="Deleterow(this)" aria-hidden="true"></span></td>`
	for(let i = 0; i < $(table_id).find("tr").length; i++) {
		if(i == 0) {
			$(table_id).find("tr").eq(i).find("td").eq(ti).before(td);
		} else {
			$(table_id).find("tr").eq(i).find("td").eq(ti).before(td1);
		}
	}
	let n = $(table_id).find("tr").length;
	width = width / n;
	for(let i = 0; i < $(table_id).find("tr").eq(0).find("td").length - 1; i++) {
		$(table_id).find("tr").eq(0).find("td").eq(i).width(width);
	}
}

function addtable() {
	if($("#DataTable").length>0){
		alert("已经创建表格了，如果想删除，请按F5");
		return
	}
	let row = $("#row").val();
	let col = $("#col").val();
	let sclass;
	switch(+$("#select").val()) {
		case 0:
			sclass = "table";
			break;
		case 1:
			sclass = "table table-striped";
			break;
		case 2:
			sclass = "table table-bordered";
			break;
		case 3:
			sclass = "table table-hover";
			break;
		case 4:
			sclass = "table table-condensed";
			break;
	}
	let body = `<table id='DataTable' class='text-center ${sclass}'><tr>`;
	for(let i = 0; i <= col; i++) {
		if(i == 0) {
			body += "<td><div>序号</div></td>"
		} else {
			body += `<td><div contenteditable='true' style='float: left;width: 70%'>请输入标题</div>
            <span class="glyphicon glyphicon-remove-sign" style="color: #999;font-size: 16px;" onclick="Deleterow(this)" aria-hidden="true"></span>`;

		}
	}
	body += "</tr>"
	for(let i = 1; i <= row; i++) {
		body += "<tr>";
		for(let j = 0; j <= col; j++) {
			if(j == 0) {
				body += "<td><div style='text-align: center;height: 100%'>" + i + "#</div></td>";
			} else {
				body += "<td><div contenteditable='true' style='text-align: center;height: 100%'></div></td>";
			}
		}
		body += "</tr>";
	}
	body += "</table>";
	$("#TableView").append(body);
	addRight("#DataTable");
}

function addRight(id) {
	for(let i = 0; i < $(id).find("tr").length; i++) {
		if(i == 0) {
			let td = `<td><button class="btn btn-success btn-sm" onclick="Insertrow(this)">添加</button></td>`;
			$(id).find("tr").eq(i).append(td);
		} else {
			let td = `<td>
				    <button class="btn btn-success btn-sm" onclick="InsertLine(this)">添加</button>
				    <button class="btn btn-danger btn-sm" onclick="DeleteLine(this)">删除</button>
		        </td>`;
			$(id).find("tr").eq(i).append(td);
		}
	}
}
function createHTML(){
	let $cloneNode = $('#TableView').clone();
	$.each($cloneNode.find("td"), function(i,item){
		let text = $(item).find("div").text();
		$(item).html(text);
	});
	$cloneNode.find("span").remove();//删除图标
	$cloneNode.find("tr td:last-child").remove();//删除最后一个td，因为最后一个td是按钮
	let code = $cloneNode.html();
	code = code.replace(new RegExp("<","g"),"&lt;");
	code = code.replace(new RegExp(">","g"),"&gt;");
	$("#HTMLtext").html("");
	$("#HTMLtext").append(`<pre>${code}</pre>`);
	$('#myTableHTML').modal('show');
}

function createExcel(){
	let $cloneNode = $('#TableView').clone();
	$.each($cloneNode.find("td"), function(i,item){
		let text = $(item).find("div").text();
		$(item).html(text);
	});
	$cloneNode.find("span").remove();//删除图标
	$cloneNode.find("tr td:last-child").remove();//删除最后一个td，因为最后一个td是按钮
	codeExcel = $cloneNode.html();
    var blob = new Blob([codeExcel], {
        type: "text/plain;charset=utf-8"
    });
    saveAs(blob,  "table.xls");
}
