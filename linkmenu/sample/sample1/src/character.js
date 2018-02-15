function Character(){
	this.position = new Point();
}

Character.prototype.init = function(x, y){
	this.position.x = x;
	this.position.y = y;
}

Character.prototype.move = function(x, y){
	this.position.x = x;
	this.position.y = y;
}
