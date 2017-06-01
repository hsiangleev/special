// JavaScript Document
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
//decoration为方向top 或left   move1(img1,500,"top");
	function move2(element,target,decoration){
			clearInterval(element.timer);
			element.timer=setInterval(function(){
				if(decoration==="left"){
					var step=(target-element.offsetLeft)/10;
					step=target>element.offsetLeft ? Math.ceil(step) : Math.floor(step);
					var val=target-element.offsetLeft;
					element.style.left=element.offsetLeft+step+"px";
					if(Math.abs(val)<=Math.abs(step)){
						element.style.left=target+"px";
						clearInterval(element.timer);
					}
				}
				else{
					var step=(target-element.offsetTop)/10;
					step=target>element.offsetTop ? Math.ceil(step) : Math.floor(step);
					var val=target-element.offsetTop;
					element.style.top=element.offsetTop+step+"px";
					if(Math.abs(val)<=Math.abs(step)){
						element.style.top=target+"px";
						clearInterval(element.timer);
					}
				}
					
			},18);

		}
	//单属性缓动动画
		function animate(ele,attr,target){
			clearInterval(ele.timer);

			ele.timer=setInterval(function(){
				var leader=parseInt(getStyle(ele,attr))||0;
				var step=(target-leader)/10;
				step=step>0?Math.ceil(step):Math.floor(step);
				leader=leader+step;
				ele.style[attr]=leader+"px";

				if(Math.abs(target-leader)<=Math.abs(step)){
					ele.style[attr]=target+"px";
					clearInterval(ele.timer);
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