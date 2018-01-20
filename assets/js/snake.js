(function(){
var Snake = function(){

	this.canvas = document.getElementById("drawenv");
	this.context = this.canvas.getContext("2d");

	this.scores = document.getElementById("scores");
	this.control = document.getElementById("control");
	this.controlText =  document.getElementById("controlText");
	this.container = document.getElementById("container");

	//snake prop
	this.radius = 7;
	this.startX = this.radius;
	this.startY = this.radius;
	this.snakeColor = ["#FF3030","#EEC900","#6495ED"];
	this.snakeArray = [];
	this.speed = 500;

	//candy active
	this.candy = {};
	this.iscandy = false;

	this.DefaultDirection = 1;

	this.key = 0;
	this.ActID = 0;

	//touch info
	this.Tx = 0;
	this.Ty = 0;
	this.touchLength = 35;

};

Snake.prototype = {
	drawCircle: function(centerX, centerY, size, color, isclear = false){
		if(isclear)
			this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
	
		this.context.beginPath();
		this.context.strokeStyle = this.context.fillStyle = color;
		this.context.arc(centerX,centerY,size,0,2*Math.PI);
		this.context.fill();//和stroke任意一个即可
	},

	clearArea: function(){
		this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
	},

	drawSnake: function(){
		this.clearArea();

		for (var i = 0; i < this.snakeArray.length; i++) {
			var s = this.snakeArray[i];
			this.drawCircle(s.x,s.y,this.radius,s.color);
		}
	},

	snakeInit: function(){
		this.snakeArray = [];
		this.DefaultDirection = 1;
		var xt = this.startX;
		var yt = this.startY;
		for (var i = 0; i < 3; i++) {
			this.snakeArray[2-i] = { x:     xt,
									 y:     yt,
									 color: this.snakeColor[i]};
			xt = xt + this.radius*2;
		}
		this.drawSnake();
	},

	circleDistance: function(x1,y1,x2,y2){
		return Math.sqrt(Math.pow((x1-x2),2) + Math.pow((y1-y2),2));
	},

	isCracked: function(){
		var r = this.circleDistance(this.snakeArray[0].x,
			                        this.snakeArray[0].y,
			                        this.candy.x,
			                        this.candy.y);
		if(r < 2*this.radius)
			return true;
		else
			return false;
	},

	isDead: function(){
		var x = this.snakeArray[0].x;
		var y = this.snakeArray[0].y;

		if( x < this.radius ||
			y < this.radius ||
		    x > this.canvas.width-this.radius || 
		    y > this.canvas.height- this.radius ){
			return true;
		}

		for (var i = 1; i < this.snakeArray.length; i++) {
			var r = this.circleDistance(x,y,this.snakeArray[i].x,this.snakeArray[i].y);
			if(r < 2*this.radius){
				return true;
			}
		}
		return false;
	},

	createCandy: function(){
		if(!this.iscandy){
			var diameter = 2*this.radius;
			var width = this.canvas.width;
			var height = this.canvas.height;
			this.candy.x = Math.ceil(this.radius + Math.random()*(width-diameter));
			this.candy.y = Math.ceil(this.radius + Math.random()*(height-diameter));
			this.candy.color = this.snakeColor[Math.floor(Math.random()*this.snakeColor.length)];
			this.drawCandy();
			this.iscandy = true;
		}
	},

	drawCandy: function(){
		this.drawCircle(this.candy.x,this.candy.y,this.radius,this.candy.color);
	},

	directionJudge: function(obj,direction){
		var o = JSON.parse(JSON.stringify(obj));
		if(direction == 0){
			o.y = obj.y + 2*this.radius;//down
		}
		else if(direction == 1){
			o.x = obj.x + 2*this.radius;//right
		}
		else if(direction == 2){
			o.y = obj.y - 2*this.radius;//up
		}
		else if(direction == 3){
			o.x = obj.x - 2*this.radius;//left
		}
		return o;
	},

	snakeMove: function(direction){
		var obj = this.directionJudge(this.snakeArray[0],direction);

		var lastColor;
		length = this.snakeArray.length;
		for (var i = 0; i < length-1; i++) {
			this.snakeArray[i].color = this.snakeArray[i+1].color;
		}
		if(this.isCracked()){
			this.scores.innerHTML = this.snakeArray.length - 3 + 1;
			lastColor = this.candy.color;
			this.iscandy = false;
		}
		else{
			lastColor = this.snakeArray[length-1].color; 
			this.snakeArray.pop();
		}
		this.snakeArray[this.snakeArray.length-1].color = lastColor;

		this.snakeArray.unshift(obj);		
	},

	dataInit: function(){
		this.canvas.width = this.container.offsetWidth;
		this.canvas.height = this.container.offsetHeight;
		this.startX = this.radius;
		this.startY = this.radius;
		this.snakeArray = [];
		this.candy = {};
		this.iscandy = false;
		this.DefaultDirection = 1;
		this.key = 0;//按键值
		this.ActID = 0;
		this.scores.innerHTML = 0;
		this.controlText.style.opacity = 0.5;
		this.control.style.background = "url('../images/start.png') no-repeat";
	},

	Act: function(key){
		//结束
		if(this.isDead()){
			clearInterval(this.ActID);
			this.dataInit();

			reply = confirm("your snake is dead, continued game?");
			this.snakeInit();
			this.createCandy();
			if(reply == true){
				ActID = setInterval(function(){Act(39)},500);
			}
			return;
		}

		//防止反方向
		if(key >= 37 && key <= 40){
			//left:37 up:38 right:39 down:40
			if(Math.abs(40 - key - this.DefaultDirection) != 2)
				this.DefaultDirection = 40 - key;
		}
		this.snakeMove(this.DefaultDirection);
		this.drawSnake(true);
		if(!this.iscandy){
			this.createCandy();
		}
		else{
			this.drawCandy();
		}
	},

	Pause: function(){
		clearInterval(this.ActID);
		this.DefaultDirection = 40 - this.key;	//存储最后方向
	},

	Start: function(){
		this.key = 40 - this.DefaultDirection; //使用默认方向
		this.ActID = setInterval(function(){
			this.Act(this.key)
		}.bind(this),snake.speed);
	},

	resize: function(){
		var OW = this.canvas.width;
		this.canvas.width = this.container.offsetWidth;
		this.canvas.height = this.container.offsetHeight;
		this.candy.x = this.candy.x *  this.canvas.width / OW;
		this.drawSnake();
		this.drawCandy();
	}
};

var snake = new Snake();

window.addEventListener(
	"keydown",
	function(event){
		snake.key = event.keyCode;
		if(event.keyCode >= 37 && event.keyCode <= 40){
			event.preventDefault();
		}
	},
	false
);

snake.canvas.addEventListener(
	"touchstart",
	function(event){
		event.preventDefault();
		event.stopPropagation();	//防止事件冒泡
		var touch = event.targetTouches[0];
		snake.Tx = touch.pageX;
		snake.Ty = touch.pageY;
	},
	false
);

snake.canvas.addEventListener(
	"touchend",
	function(event){
		event.preventDefault();
		event.stopPropagation();	//防止事件冒泡
		var x = snake.Tx;
		var y = snake.Ty;

		var lastTouch = event.changedTouches[0];
		var x1 = lastTouch.pageX;
		var y1 = lastTouch.pageY;

		var r = snake.circleDistance(x,y,x1,y1);
		var opposite = y1 - y;
		var neighbor = x1 - x;
		var radius = Math.abs(Math.asin(opposite/r)/Math.PI*180);

		if(r > snake.touchLength){
			//defaultdirection: left:3 up:2 right:1 down:0
			//key: left:37 up:38 right:39 down:40
			if(opposite > 0 && neighbor > 0){
				snake.key = radius > 45 ? 40 : 39;
			}
			if(opposite < 0 && neighbor < 0){
				snake.key = radius > 45 ? 38 : 37;
			}
			if(opposite > 0 && neighbor < 0){
				snake.key = radius > 45 ? 40 : 37;
			}
			if(opposite < 0 && neighbor > 0){
				snake.key = radius > 45 ? 38 : 39;
			}
		}
		else{
			return false;
		}
	},
	false
);

snake.control.addEventListener(
	"mousedown",
	function(event){
		console.log("down");
		if(snake.controlText.style.opacity != "0"){
			snake.control.style.background = "url('../images/starton.png') no-repeat";
			snake.controlText.style.opacity = "0";
			snake.Start();
		}
		else{
			snake.control.style.background = "url('../images/pauseon.png') no-repeat";
			snake.controlText.style.opacity = "0.5";
			snake.Pause();
		}
	},
	false
);

snake.control.addEventListener(
	"mouseup",
	function(event){
		console.log("up");
		var tips = snake.controlText.innerHTML;
		if(snake.controlText.style.opacity == "0"){
			snake.control.style.background = "url('../images/pause.png') no-repeat";
		}
		else{
			snake.control.style.background = "url('../images/start.png') no-repeat";
		}
	},
	false
);

window.addEventListener(
	"resize",
	function(event){
		snake.resize();
	},
	false
)


snake.dataInit();
snake.snakeInit();
snake.createCandy();
}());