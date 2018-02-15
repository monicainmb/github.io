$(function(){

// キャンバス関連
var canvas1 = null;
var canvas2 = null;
var ctx1 = null;
var ctx2 = null;

// 座標
var centerX = null;
var centerY = null;


// テクスチャー
var picture = null;
var drawStack1 = [];
var drawStack2 = [];

// イベント
var mouse = null;
var clicked = null;

//プレイヤー
var COUNT_LEVEL = 3;
var player = null;

//敵
var MAX_ENEMY_CNT = 10;
var enemys = [];

// タイマー
var PHASE_INIT = 0;
var PHASE_MAIN = 1;
var timer = null;
var loopCount = 0;
var phase = PHASE_INIT;

window.onload = function(){
	//キャンバスを初期化
	canvas1 = document.getElementById('id_canvas1');
	canvas2 = document.getElementById('id_canvas2');
	divs = document.getElementById('divs');
	
	ctx1 = canvas1.getContext('2d');
	ctx2 = canvas2.getContext('2d');
	
	picture = new Image();
	picture.src = 'src/player.png';

	centerX = Math.floor(canvas1.width / 2);
	centerY = Math.floor(canvas1.height / 2);

	//イベント登録
	mouse = new Point();
	divs.addEventListener('onmousemove', function(){mousemove(event)});
	divs.onmousemove = mousemove;
	
	// イベント処理
	clicked = false;
	
	window.addEventListener('click', function(){click(event)});
	window.onclick = click;
	
	timer = setInterval(function(){timerFunc()}, 50);
}

// インターバルタイマー(メイン処理)
function timerFunc(){
	switch (phase){
	case PHASE_INIT:
		initgame();
		break;
	case PHASE_MAIN:
		//メイン処理
		movePlayer();
		moveEnemy();
	
		//レンダリング
		draw();
		render();

		break;
	}

	//loopCount ++;
	//if (loopCount == 20 * 5)clearInterval(timer);
}

function initgame(){
	player = new Character();
	player.init(centerX, centerY);
	
	for (var i = 0; i < MAX_ENEMY_CNT; i++){
		enemys.push(new Character());
		enemys[i].init(canvas1.width * Math.random(), canvas1.height * Math.random());
	}
	phase = PHASE_MAIN;
}

function movePlayer(){
	var x = mouse.x;
	var y = mouse.y;
	var dx = mouse.x - x;
	var dy = mouse.y - y;
	
	if (x < 0)x = 0;
	if (y < 0)y = 0;
	if (x > canvas1.width)x = canvas1.width;
	if (y > canvas1.height)y = canvas1.height;
	
	player.move(x, y);
}

function moveEnemy(){
	
	for (var i = 0; i < MAX_ENEMY_CNT; i++){
		var x = enemys[i].position.x + 4 * Math.random() - 2;
		var y = enemys[i].position.y + 4 * Math.random() - 2;
		
		if (x < 0)x = 0;
		if (y < 0)y = 0;
		if (x > canvas1.width)x = canvas1.width;
		if (y > canvas1.height)y = canvas1.height;
		enemys[i].move(x, y);
	}
	
}

//
function draw(){
	drawStack1.push([player.position.x, player.position.y]);
	for (var i = 0; i < MAX_ENEMY_CNT; i++){
		drawStack2.push([enemys[i].position.x, enemys[i].position.y]);
	}
}

// 画面を反映
function render(){
	//canvasを塗りつぶして初期化
	ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
	ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
	
	//バッファからの情報により画像を描きこみ
	for (var i = 0; i < drawStack1.length; i++){
		data = drawStack1.shift();
		ctx1.drawImage(picture, player.position.x, player.position.y);
	}
	for (var i = 0; i < drawStack2.length; i++){
		data = drawStack2.shift();
		ctx2.drawImage(picture, data[0], data[1]);
	}
	
	ctx2.fillText("座標x:" + player.position.x + ", y:" + player.position.y, 10, 10);
}

//$("divs").mousemove(function(event){
//		event = event || window.event;
//		mouse.x = event.clientX - canvas1.offsetLeft;
//		mouse.y = event.clientY - canvas1.offsetTop;
//	});

function mousemove(event){
	event = event || window.event;
	mouse.x = event.clientX - divs.offsetLeft;
	mouse.y = event.clientY - divs.offsetTop;
};

function click(event){
	clicked = true;
}

});