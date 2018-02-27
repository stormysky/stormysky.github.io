(function(window){

var Calculator = function(){
	this.callist = [];
	this.showlist = [];
	this.Res = "";

	this.showStr = document.getElementById("progress");
	this.resultStr = document.getElementById("resultStr");
	this.list = document.getElementsByTagName("li");
	this.buttons = document.getElementsByClassName("button");

	this.l1 = ["√","Sin","Cos","Tan","Ln"];
	this.l2 = ["^"];
	this.l3 = ["*","/"];
	this.l4 = ["+","-"];

	this.restartFlag = false;
}

Calculator.prototype = {
	constructor: Calculator,

	init: function(){
		for (var i = 0; i < this.list.length; i++) {
			var f = this;
			this.list[i].onclick = function(){f.log(this)};
			this.list[i].onmousedown = function(){f.MouseDown(this)};
			this.list[i].onmouseup = function(){f.MouseUp(this)};

		}
	},

	log: function(obj){
		var text = obj.innerHTML;
		if(this.restartFlag) {this.clearList();}
		if(text == "Ac"){
			this.clearList();
			this.resultStr.innerHTML = 0;
			this.restartFlag = false;
		}
		else if(text == "← "){
			this.showlist.pop();
		}
		else if(text == "="){
			this.callist = this.showlist.concat();
			this.resultStr.innerHTML = this.Res = this.cal(this.callist);
			this.restartFlag = true;
		}
		else{
			if(this.restartFlag)
			{
				this.showlist.push(this.Res);
				if(this.l2.indexOf(text) > -1
					|| this.l3.indexOf(text) > -1 
					|| this.l4.indexOf(text) > -1){
					this.showlist.push(text);
				}
				else if(this.l1.indexOf(text) > -1){
					this.showlist.unshift(text);
				}
			}else{
				this.showlist.push(text);
			}
			this.restartFlag = false;
			
		}
		this.showSome();
	},

	showSome: function(){
		this.showStr.innerHTML = this.showlist.join("");
		console.log(this.showlist);

	},

	MouseDown: function(obj){
		var str = obj.getAttribute("class");
		obj.setAttribute("class",str + " mousedown");
	},

	MouseUp: function(obj){
		var str = obj.getAttribute("class");
		obj.setAttribute("class",str.slice(0,str.indexOf("mousedown")));	
	},

	cal: function(obj){
		var temp = [];
		var single = "";
		for (var i = 0; i < obj.length; i++) {
			if(obj[i] == "π")
				obj[i] = Math.PI;

			if(obj[i] == "e")
				obj[i] = Math.E;

			if(obj[i] == "Res")
				obj[i] = this.Res;

			if(this.isInt(obj[i]) || obj[i] == "."){
				single+=obj[i];
				if(i == obj.length -1){
					temp.push(single);
					single = "";
				}
			}
			else{
				if(obj[i] == "+" || obj[i] == "-"){
					if(i == 0 || !this.isInt(obj[i-1])){
						single = obj[i] + single;
						continue;
					}
				}
				if(single == ""){
					temp.push(obj[i]);
				}
				else{
					temp.push(single);
					single = "";
					temp.push(obj[i]);
				}
			}
		}
		this.callist = temp;
		return this.brackets(this.callist);
	},

	TurnToOne: function(str){
		var pn = 1;
		var one;
		for (var i = 0; i < str.length-1; i++) {
			if(str[i] == "-")
				pn = pn *-1;
		}
		one = str[str.length-1]*pn;
		return one;
	},

	brackets: function(calobj){
		var start=-1,end=-1;

		for(var i = 0; i < calobj.length; i++){
			if(calobj[i] == "(")
				start = i;
			if(calobj[i] == ")"){
				end = i;
				break;
			}
		}
		if(start == -1 || end == -1){
			if(start == end){
				 this.calculate_l1(calobj,0,calobj.length-1);
				 return calobj[0];
			}
			else{
				return "error";
			}
		}
		else if(start < end){
			calobj.splice(end,1);
			calobj.splice(start,1);
			if(calobj.length > 1)
				this.brackets(this.calculate_l1(calobj,start,end-2));
		}

		this.calculate_l1(calobj,0,calobj.length-1);
		console.log(calobj);
		return calobj[0];		
	},

	calculate_l1: function(obj,l,r){
		for (var i = l; i <= r; i++) {
			if(this.l1.indexOf(obj[i]) > -1){
				if(i == r){
					return "error";
				}
				else if(!this.isNum(obj[i+1])){
					return "error";
				}
				obj.splice(i,2,this.calTwo(obj[i])(obj[i+1]));
				r = r-1;
			}
		}
		return this.calculate_l2(obj,l,r); 		
	},

	calculate_l2: function(obj,l,r){
		for(var i = l; i <= r; i++){
			if(this.l2.indexOf(obj[i]) > -1){
				if(i == l || i == r || !this.isNum(obj[i-1]) || !this.isNum(obj[i+1])){
					return "error";
				}
				obj.splice(i-1,3,this.calThree(obj[i])(obj[i-1],obj[i+1]));
				r = r-2;
				i = 0;
			}
		}
		return this.calculate_l3(obj,l,r);
	},

	calculate_l3: function(obj,l,r){
		for (var i = l; i <= r; i++) {
			if(this.l3.indexOf(obj[i]) > -1){
				if(i == l || i == r || !this.isNum(obj[i-1]) || !this.isNum(obj[i+1])){
					return "error";
				}
				obj.splice(i-1,3,this.calThree(obj[i])(obj[i-1],obj[i+1]));
				r = r-2;
				i = 0;
			}
		}
		return this.calculate_l4(obj,l,r);		
	},

	calculate_l4: function(obj,l,r){
		for (var i = l; i <= r; i++) {
			if(this.l4.indexOf(obj[i]) > -1){
				if(i == l || i == r || !this.isNum(obj[i-1]) || !this.isNum(obj[i+1])){
					return "error";
				}
				obj.splice(i-1,3,this.calThree(obj[i])(obj[i-1],obj[i+1]));
				r = r-2;
				i = 0;
			}
		}
		return obj;
	},

	calTwo: function(operator){
		var f = this;
		switch(operator){
			case"√":return Math.sqrt;break;
			case"Sin":return function(x){return f.roundPow(Math.sin(x/180*Math.PI));};break;
			case"Cos":return function(x){return f.roundPow(Math.cos(x/180*Math.PI));};break;
			case"Tan":return function(x){return f.roundPow(Math.tan(x/180*Math.PI));};break;
			case"Ln":return Math.log;break;
			default:return "error";
		}
		return "error";		
	},

	calThree: function(operator){
		var f = this;
		switch(operator){
			case"+":return function(l,r){return f.roundPow(parseFloat(l)+parseFloat(r));};break;
			case"-":return function(l,r){return f.roundPow(parseFloat(l)-parseFloat(r));};break;
			case"*":return function(l,r){return f.roundPow(l*r);};break;
			case"/":return function(l,r){return f.roundPow(l/r);};break;
			case"^":return function(l,r){return Math.pow(l,r)};break;
			default:return "error";
		}
		return "error";	
	},	

	isNum: function(num){
		return !isNaN(Number(parseFloat(num)));
	},

	isInt: function(num){
		return /^-?\d+$/.test(num);
	},

	clearList: function(){
		this.resultStr.innerHTML = "";
		this.showlist = []; 
	},

	roundPow: function(num){
		var precise = 13;
		return Math.round(num*Math.pow(10,precise))/Math.pow(10,precise);
		//precise<14  unless rewrite +-*/
	}
}

var calculate = new Calculator();
calculate.init();

})(window);

