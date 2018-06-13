(function(){
    'use strict';
	window['actions'] = {
		hasClass:function (ele, cls) {
			return ele.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
		},
		addClass:function (ele, cls) {
			if (!this.hasClass(ele, cls)){
				ele.className += " " + cls;
			}
		},
		//删除指定dom元素的样式
		removeClass: function (ele, cls) {
			if (this.hasClass(ele, cls)) {
				var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
				ele.className = ele.className.replace(reg, " ");
			}
		},
		toggleClass: function (ele,cls){ 
			if(this.hasClass(ele,cls)){ 
				this.removeClass(ele, cls); 
			}else{ 
				this.addClass(ele, cls); 
			}
		}
	};
	window['transit'] = {
		load: function(url){
			url = url || 'default.html';
			var iframe = document.createElement("iframe");  
				iframe.src = url;  
				iframe.style.display = "none";
			var Jump = function(){
					window.location.replace(url) 
				}
			if (iframe.attachEvent){  
				iframe.attachEvent("onload", function(){ // IE 
					Jump();					
				});  
			} else {  
				iframe.onload = function(){ // 非IE  
				   Jump();
				};  
			}  
			document.body.appendChild(iframe);
		}
	};
	
	window['actions'].clickState = true;
	window['actions'].switch = function() {
		var _this_ = this;
		var ActionMenu= document.getElementById('ActionMenu');
		if(window['actions'].clickState){
			window['actions'].clickState = false;
			document.onclick = function(event){
				if(!_this_.hasClass(event.target,'DomainItme')){
					_this_.removeClass(ActionMenu,"ActionMenuIn");
				}
			}
			ActionMenu.onclick = function(e){
				e.stopPropagation();
			}
		}
		setTimeout(function(){
			_this_.toggleClass(ActionMenu,"ActionMenuIn");
		},0)
	}
	return window['actions'];
}());
	