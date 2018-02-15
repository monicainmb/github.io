function header(){
	var html = "";
	
	html += "<h1><U>monicaの管理室</U></h1>";
	html += "<p>何か作ったものを載せるだけのHP</p>";

	document.write(html);
}

function linkmenu(){
	var html = "";
	
	html += "<ul>";
	html += "	作ったもの";
	html += "	<li>ゲーム</li>";
	html += "	<li>ツール</li>";
	html += "	<li>サンプル</li>";
	html += "</ul>";

	document.write(html);
}

function footer(){
	var html = "";
	
	html += "<p>ふったー</p>";
	
	document.write(html);
}
