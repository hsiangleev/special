// JavaScript Document
	//水平匀速位移
	function move(element,target,speed){        //元素，目标点，移动步长（速度）
		var spe=target>element.offsetLeft ? speed : -speed;
		clearInterval(element.timer);
		element.timer=setInterval(function(){
			var val=target-element.offsetLeft;
			element.style.left=element.offsetLeft+spe+"px";

			if(Math.abs(val)<=Math.abs(spe)){
				element.style.left=target+"px";
				clearInterval(element.timer);
			}
		},30);
	}

//缓动框架函数封装
	function animate(ele,json,endFn){
		clearInterval(ele.timer);
		ele.timer=setInterval(function(){
			var bool=true;
			for(var k in json){
				var leader;
				if(k==="opacity"){
					leader=getStyle(ele,k)*100 || 1;
				}
				else {
					leader=parseInt(getStyle(ele,k)) || 0;
				}
				var step=(json[k]-leader)/10;
				step=step>0?Math.ceil(step):Math.floor(step);
				leader=leader+step;
				if(k==="opacity"){
					ele.style[k]=leader/100;
					ele.style.filter="alpha(opacity:"+leader+")";
				}
				else if(k==="z-index"){
					ele.style.zIndex=json[k];
				}
				else {
					ele.style[k]=leader+"px";
				}

				if(Math.abs(json[k]-leader)>Math.abs(step)){
					bool=false;
				}
			}
			if(bool){
				for(var k in json){
					ele.style[k]=json[k]+"px";
				}
				clearInterval(ele.timer);
				endFn&&endFn();			//回调函数
			}
		},15);
	}
//浏览器窗口回到target位置
	function move3(target){
		var timer=null;
		clearInterval(timer);
		timer=setInterval(function(){
			var leader=scroll().top;
			var step=(target-leader)/10;
			step=step>0?Math.ceil(step):Math.floor(step);
			leader=leader+step;
			
			window.scrollTo(0,leader);
			if(Math.abs(target-leader)<=Math.abs(step)){
				window.scrollTo(0,target);
				clearInterval(timer);
			}
		},30);
	}
//兼容方法获取元素样式
	function getStyle(ele,attr){
		if(window.getComputedStyle){
			return window.getComputedStyle(ele,null)[attr];
		}
		return ele.currentStyle[attr];
	}

//获取浏览器卷去的距离
	function scroll(){
		return {
			"left" : window.pageXOffset || document.body.scrollLeft || document.documentElement.scrollLeft,
			"top": window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop
			}
		
	}
	
	//获取浏览器可视区域的宽高
	function client(){
		if(window.innerHeight!==undefined){
			return {
				"width" : window.innerWidth,
				"height" : window.innerHeight
			}
		}
		else if(document.compatMode==="CSS1Compat"){
				return {
				"width" : document.documentElement.clientWidth,
				"height" : document.documentElement.clientHeight
			}
		}
		else{
			return {
				"width" : document.body.clientWidth,
				"height" : document.body.clientHeight
			}
		}
	}
