/*!
 * kelat JavaScript Library v1.0.1-beta1
 * https://kelat.com/
 *
 * Date: 2016-03-31
 */

(function( Global, factory ) {
	if ( typeof module === "object" && typeof module.exports === "object" ) {
		module.exports = Global.document ?
			factory( Global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "kelat 需要一个文档窗口" );
				}
				return factory( w );
			};
	} else {
		factory( Global );
	}
}(typeof window !== "undefined" ? window : this,function(window,noGlobal){
'use strict';
// 版本
var version = "1.0.0";
var classType = {};
var toString = classType.toString;
var hasOwn = classType.hasOwnProperty;
//运行授权
var running = ++[[]][+[]]+[]+[] >>> 0 ? true : false ;
/***** 定义局部参数 *****/
var Local = {
	title:'KMUI',
	message:'您使用期已到！',
	//图片
	ImgPlaceholder:'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
	ImgTip : '图片格式不正确或者跨域请求！',
	// 区域设定
	WrapperArea : 'WrapperArea',
	// 层高
	LayerIndex : '2000',
	// 加载
	LoadingTitle : '正在加载...',
	LoadingHtml : '<span class="Loading"></span>',
	// 模态框
	ModalTitle : "提示",
	ModalButtonOk : "确定",
	ModalButtonCancel : "取消",
	//正则
	RegExpr : {
		trim   : /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
		device : {
			android: /(Android);?[\s\/]+([\d.]+)?/,
			ipad   : /(iPad).*OS\s([\d_]+)/,
			ipod   : /(iPod)(.*OS\s([\d_]+))?/,
			iphone : /(iPhone\sOS)\s([\d_]+)/,
		},
		validate : {
			email  : /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
			phone  : /^((\(\d{3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}$/,
			mobile : /^1[34578]\d{9}$/,
			number : /^\d+$/,
			integer: /^[-\+]?\d+$/,
			english: /^[A-Za-z]+$/,
			chinese: /^[\u0391-\uFFE5]+$/,
			date   : /^(\d{4})年(0\d{1}|1[0-2])月(0\d{1}|[12]\d{1}|3[01])日$/
		}
	},
	// 特性支持检测
	support : (function () {
		var support = {};
			support['touch'] = !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
			//事件类型
			support['onClick'] = support.touch? 'tap' : 'click';
			/**滚动条位置
			 * @return {Array} 滚动条 X,滚动条 Y
			 */
			support['GetPageScroll'] = function() {
				var x = "",y = "";
				if(window.pageYOffset){
					//all except IE
					y = window.pageYOffset;x = window.pageXOffset;
				}else if(document.documentElement && document.documentElement.scrollTop){
					//IE 6 Strict
					y = document.documentElement.scrollTop;x = document.documentElement.scrollLeft;
				}else if(document.body){
					//all other IE
					y = document.body.scrollTop;x = document.body.scrollLeft;
				};
				return {X:x,Y:y};
			};
			/**页面位置及窗口大小
			 * @return {Array} 页面宽度 PageW,页面高度 PageH,窗口宽度 WinW,窗口高度 WinH
			 */
			support['GetPageSize'] = function() {
				var _ScrW = "",_ScrH = "";
				if(window.innerHeight && window.scrollMaxY){
					//Mozilla
					_ScrW = window.innerWidth + window.scrollMaxX;_ScrH = window.innerHeight + window.scrollMaxY;
				}else if (document.body.scrollHeight > document.body.offsetHeight){
					//all but IE Mac
					_ScrW = document.body.scrollWidth;_ScrH = document.body.scrollHeight;
				}else if (document.body){
					//IE Mac
					_ScrW = document.body.offsetWidth;_ScrH = document.body.offsetHeight;
				};
				var _WinW = "",_WinH = "";
				if(window.innerHeight){
					//all except IE
					_WinW = window.innerWidth;_WinH = window.innerHeight;
				}else if(document.documentElement && document.documentElement.clientHeight){
					//IE 6 Strict Mode
					_WinW = document.documentElement.clientWidth;_WinH = document.documentElement.clientHeight;
				}else if(document.body){
					//other
					_WinW = document.body.clientWidth;_WinH = document.body.clientHeight;
				};
				//页面小于窗口,设置和窗口相等
				var _PageW = (_ScrW < _WinW) ? _WinW : _ScrW;
				var _PageH = (_ScrH < _WinH) ? _WinH : _ScrH;
				return {PageW:_PageW,PageH:_PageH,WinW:_WinW,WinH:_WinH};
			};
		return support;
	})(),
	//CSS3事件
	TransitionEnd : "webkitTransitionEnd transitionend",
	AnimationEnd : "webkitAnimationEnd animationend"
};

/***** 创建对象 *****/
if(!window['kelat']) {
	window['kelat'] = function(selector, context){
		return new window['kelat']['fn']['init'](selector, context);
	};
	window['kelat']['version'] = version;
};

window['kelat']['fn'] = window['kelat'].prototype = {
	//构造函数
	constructor : kelat,
	//特性检测
	support : Local.support,
	//删除前后空格 和 BOM
	trim : function(text) {
		return typeof text === 'string' && running ? text.replace(Local.RegExpr.trim,'') : '';
	},
	//层边界
	layerBorder : function(){
		return [].forEach.call(document.querySelectorAll('*'),function(a){
			a.style.outline="1px solid #"+(~~(Math.random()*(1<<24))).toString(16);
		});
	},
	// JSON 序列
	jsonArray : function(obj){
		return running ? JSON.stringify(obj) : '';
	},
	//html转义
	escapeHTML : function(text) {  
		var replacements= {'<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;'};                      
		return text.replace(/[<>&"]/g, function(character) {  
			return replacements[character];  
		}); 
	},
	/** Javascript函数节流 
	 * @param {function} fn:执行方法
	 * @param {Number} delay:间隔时间
	 * @param {Number} mustRunDelay:必须运行时间
	 */
	throttle : function(callBack, delay, mustRunDelay){
		var timer = null;
		var start;
		return function(){
			var context = this, args = arguments, current = +new Date();
			clearTimeout( timer );
			start || ( start = current );
			if((current - start) >= mustRunDelay){
				callBack.apply(context, args);
				start = current;
			}else {
				timer = setTimeout(function(){
					callBack.apply(context, args);
				}, delay );
			};
		};
	},
	/** log 
	 * @param {Number || function || Object || Array || String} message:log消息体
	 * @param {String} level:log级别
	 */
	log : function(message, level){
		return running ? console.log(level || 'warning', ': ', message) : '';
	},
	/** 指定范围取随机数
	 * @param {Number} max:最大值
	 * @param {Number} min:最小值
	 */
	range : function(max,min){
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},	
	// H5 本地存储 
	ls : window.localStorage ,
	/** 设备/操作系统探测
	 * @return {Object}
	 */
	device : (function () {
		var device = {};
		var ua = navigator.userAgent;

		var android = ua.match(Local.RegExpr.device.android);
		var ipad = ua.match(Local.RegExpr.device.ipad);
		var ipod = ua.match(Local.RegExpr.device.ipod);
		var iphone = !ipad && ua.match(Local.RegExpr.device.iphone);
		device.browse = device.ios = device.android = device.iphone = device.ipad = device.androidChrome = false;
		
		// Android
		if (android) {
			device.os = 'android';
			device.osVersion = android[2];
			device.android = true;
			device.androidChrome = ua.toLowerCase().indexOf('chrome') >= 0;
		};
		if (ipad || iphone || ipod) {
			device.os = 'ios';
			device.ios = true;
		};
		// iOS
		if (iphone && !ipod) {
			device.osVersion = iphone[2].replace(/_/g, '.');
			device.iphone = true;
		};
		if (ipad) {
			device.osVersion = ipad[2].replace(/_/g, '.');
			device.ipad = true;
		};
		if (ipod) {
			device.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
			device.iphone = true;
		};
		// iOS 8+ changed UA
		if (device.ios && device.osVersion && ua.indexOf('Version/') >= 0) {
			if (device.osVersion.split('.')[0] === '10') {
				device.osVersion = ua.toLowerCase().split('version/')[1].split(' ')[0];
			};
		};

		// Webview
		device.webView = (iphone || ipad || ipod) && ua.match(/.*AppleWebKit(?!.*Safari)/i);
			
		// Minimal UI
		if (device.os && device.os === 'ios') {
			var osVersionArr = device.osVersion.split('.');
			device.minimalUi = !device.webView && (ipod || iphone) && (osVersionArr[0] * 1 === 7 ? osVersionArr[1] * 1 >= 1 : osVersionArr[0] * 1 > 7) && $('meta[name="viewport"]').length > 0 && $('meta[name="viewport"]').attr('content').indexOf('minimal-ui') >= 0;
		};

		//检查状态栏和全屏幕应用程序模式
		var PageSize = Local.support.GetPageSize();
		device.statusBar = false;
		if(device.webView && (PageSize.WinW * PageSize.WinH === screen.width * screen.height)){
			device.statusBar = true;
		}else{
			device.statusBar = false;
		};

		//样式
		var classNames = [];

		//像素比
		device.pixelRatio = window.devicePixelRatio || 1;
		classNames.push('PixelRatio' + Math.floor(device.pixelRatio));
		if (device.pixelRatio >= 2) {
			classNames.push('Retina');
		};

		//IOS 样式
		if (device.os) {
			classNames.push(device.os, device.os + '-' + device.osVersion.split('.')[0], device.os + '-' + device.osVersion.replace(/\./g, '-'));
			if (device.os === 'ios') {
				var major = parseInt(device.osVersion.split('.')[0], 10);
				for (var i = major - 1; i >= 6; i--) {
					classNames.push('iosGt' + i);
				}
			}
			
		};
		//状态栏类
		if(device.statusBar) {
			classNames.push('StatusbarOverlay');
		}else{
			$('html').removeClass('StatusbarOverlay');
		};

		//HTML添加样式
		if (classNames.length > 0) $('html').addClass(classNames.join(' '));
		
		//浏览器检测
		device.browse = ua.indexOf("MSIE") >= 0 ? "ie" : 
		ua.indexOf("Firefox") >= 0 ? "Firefox" : 
		ua.indexOf("Chrome")  >= 0 ? "Chrome" : 
		ua.indexOf("Edge")  >= 0 ? "Edge" : 
		ua.indexOf("Opera")   >= 0 ? "Opera" : 
		ua.indexOf("Safari")  >= 0 ? "Safari" :
		ua.indexOf("Netscape")>= 0 && ("Netscape");
		
		//返回对象
		return running ? device : '';
	}()),
	// 触摸事件
	touchEvents :{
		start: Local.support.touch ? 'touchstart' : 'mousedown',
		move: Local.support.touch ? 'touchmove' : 'mousemove',
		end: Local.support.touch ? 'touchend' : 'mouseup',
		cancel: 'touchcancel'
	},
	/** 触摸事件
	 * @param {Object} els:对象
	 * @param {*} detach:卸载绑定
	 * @param {function} callBack:回调
	 */
	touches : function(els, detach, callBack) {
		if (typeof detach === 'function') {
			callBack = arguments[1];
			detach = undefined;
		};
		var Touches = {
			startX:  0, startY:  0,
			currentX:0, currentY:0,
			diffX:   0, diffY:   0
		},
		$Element=els,
		action = detach ? 'removeEventListener' : 'addEventListener';
		
		$Element[action](kelat.fn.touchEvents.start,touch, false);
		$Element[action](kelat.fn.touchEvents.move,touch, false);
		$Element[action](kelat.fn.touchEvents.end,touch, false);
		$Element[action](kelat.fn.touchEvents.cancel,touch, false);
		function touch (event){
			var event = event || window.event || arguments.callee.caller.arguments[0];
			event.preventDefault();
			if(Local.support.touch){
				Touches.touchLength = event.targetTouches.length || 0;
			};
			switch(event.type){
				case kelat.fn.touchEvents.start:
					Touches.startX = Number(event.type === 'touchstart'?event.targetTouches[0].pageX:event.pageX);
					Touches.startY = Number(event.type === 'touchstart'?event.targetTouches[0].pageY:event.pageY);
					break;
				case kelat.fn.touchEvents.end:
					Touches.diffX = Number(event.type === 'touchend'?(Touches.currentX-Touches.startX):event.pageX);
					Touches.diffY = Number(event.type === 'touchend'?(Touches.currentY-Touches.startY):event.pageY);
					break;
				case kelat.fn.touchEvents.move:
					Touches.currentX = Number(event.type === 'touchmove'?event.targetTouches[0].pageX:event.pageX);
					Touches.currentY = Number(event.type === 'touchmove'?event.targetTouches[0].pageY:event.pageY);
					break;
				case kelat.fn.touchEvents.cancel:
					break;
			};
			callBack(Touches, $Element);
		};
		return running ? Touches : '';
	}	
};

//扩展 --- 功能参考 jQuery
window['kelat']['extend'] = window['kelat']['fn']['extend'] = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		index = 1,
		length = arguments.length,
		deep = false;
	// Handle a deep copy situation
	if( typeof target === "boolean" ) {
		deep = target;
		// Skip the boolean and the target
		target = arguments[index] || {};
		index++;
	}
	// Handle case when target is a string or something (possible in deep copy)
	if( typeof target !== "object" && !typeof target !=="function") {
		target = {};
	}
	// Extend jQuery itself if only one argument is passed
	if(index === length ){
		target = this;
		index--;
	}
	for (;index< length;index++){

		// Only deal with non-null/undefined values
		if ( ( options = arguments[index] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[name];
				copy = options[name];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( kelat.isPlainObject( copy ) ||
					( copyIsArray = kelat.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && kelat.isArray( src ) ? src : [];

					} else {
						clone = src && kelat.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[name] = kelat.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if (copy !== undefined ) {
					target[name] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

window['kelat']['extend']({
	//自定义特性
	expando : "kelat" + ( version + Math.random() ).replace( /\D/g, "" ),	
	//空操作
	noop : function() {},
	//是否为数字
	isNumber : function(Number){
		return !isNaN(parseFloat(Number)) && isFinite(Number);
	},
	//是否为数组
	isArray : Array.isArray,
	//是否在Window容器
	isWindow : function( obj ) {
		return obj != null && obj === obj.window;
	},
	//是否普通对象
	isPlainObject : function( obj ) {

		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( kelat.type( obj ) !== "object" || obj.nodeType || kelat.isWindow( obj ) ) {
			return false;
		}

		if ( obj.constructor &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
			return false;
		}

		// If the function hasn't returned already, we're confident that
		// |obj| is a plain object, created by {} or constructed with new Object
		return true;
	},
	//类型
	type : function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}

		// Support: Android<4.0 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			classType[ toString.call( obj ) ] || "object" :
			typeof obj;
	},
	//循环
	each : function(obj, callback ) {
		var length, i = 0;
		if (isArrayLike(obj)){
			length = obj.length;
			for ( ; i<length;i++ ){
				if (callback.call(obj[i],i,obj[i]) === false){
					break;
				};
			};
		} else {
			for(i in obj){
				if(callback.call(obj[i],i,obj[i]) === false){
					break;
				};
			};
		}
		return obj;
	},

});
//判断是否为数组 && 是否为空数组
function isArrayLike( obj ) {
	var length = !!obj && "length" in obj && obj.length,
		type = kelat.type( obj );
	if ( type === "function" || kelat.isWindow( obj ) ) {
		return false;
	}
	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
};
//类型
kelat.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function( i, name ) {
	classType[ "[object " + name + "]" ] = name.toLowerCase();
});

/** 防止事件冒泡
 * @param {Object} seifEvent:对象
 * @param {String} els  :子元素
 * @param {function} callback  :回调
 */
function Bubbles(seifEvent, els, callback){
	var seifEvent = window.event || arguments.callee.caller.arguments[0];
	var obj = seifEvent.target || seifEvent.srcElement;
	var bubblesIndex = [];
	kelat.each(els.toUpperCase().split(" "),function( i, name ) {
		bubblesIndex.push(obj.tagName !== name && running ? 0 : 1);
	});
	return (bubblesIndex.indexOf(1) == -1 && running) ? callback() : null;
};
window['kelat']['bubbles'] = Bubbles;


/** 验证
 * @param {String} string:验证数据
 * @param {String} type  :验证类型
 * @param {RegExp} regExp  :正则
 */
function Validate(string, type, regExp) {
	var _RegExp="";
	"regexp" === kelat.type(type) ? ( regExp = arguments[1] , _RegExp = type , type = undefined) : _RegExp = Local.RegExpr.validate[type];
	return _RegExp.test(string) && running ? true : false;
};
window['kelat']['validate'] = Validate;

/** 分解url参数
 * @return {Array} options:{'url':'http://www.***.com/',type:['=','id']} 分割符和参数名
 */
function GetUrlParams(options) {
	var ArrayData = {},
		LinkURL= options.url ? options.url : window.location.href,
		angularMark = LinkURL.indexOf("#/")+1 , 
		angularURLData = LinkURL.substring(angularMark),
		Mark = angularURLData.indexOf("?")+1,
		URLData = angularURLData.substring(Mark);
	if(Mark !== 0){
		if(type){
			var typeData = URLData.indexOf(options.type[0])+1;
			ArrayData[options.type[1]] = URLData.substring(typeData);
		}else{
			//获取参数的值
			var _Data = URLData.split("&");
			for(var i=0;i<_Data.length;i++){
				var _Array = _Data[i].split("=");
				ArrayData[_Array[0]]=_Array[1];
			};
		}
	};
	return Local.running ? ArrayData : null;
};
window['kelat']['getUrlParams'] = GetUrlParams;	

/** 动态加载 
 * @param {String} path:加载对象路径
 * @param {String} type:加载对象类型 js & css
 * @param {function} callback:js回调
 */
function LoadJC(path, type, callback) {
	if (typeof path !=='undefined' && running) {
		var head = document.getElementsByTagName('head')[0];
		if(type=="js"){
			var script = document.createElement('script')
			script.src = path;
			script.type = 'text/javascript';
			head.appendChild(script);
			if(callback){
				script.onload = script.onreadystatechange = function (){
					if (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete'){
						callback();
					};
				};
			};
		}else if(type=="css"){
			var link = document.createElement('link');
			link.href = path;
			link.rel = 'stylesheet';
			link.type = 'text/css';
			head.appendChild(link);
		};
	};
	return this;
};
window['kelat']['loadJC'] = LoadJC;


function BindFunction(obj, fn) {
    return function() {
        fn.apply(obj,arguments);    
    };
};
window['kelat']['bindFunction'] = BindFunction;

/*======================================================
************   全局参数   ************
======================================================*/
window['kelat']['params'] = {
	/** 全局路径 */
	//WEBSITE_URL: "http://192.168.190.52:7500/emuplus/"
}

/** 闪动 
 * @param {String} id:需要闪动的id
 */
function Glint(id){
	var $ID = $(id);
	var degree = ["#DD7886","#FBC7BB","#F4E4C9","#DD7886","#FBC7BB","#F4E4C9","#FFF"],number = 0,
		length = degree.length;
	(function fn() {
		length > ++number ? ($ID.css("background",degree[number]),setTimeout(fn,80)) : number = 0;
	})();
};
window['kelat']['glint'] = Glint;


/************* 页面UI部分 *************/
/**返回顶部 */
function BackToTop(){
	var isScroll = running;
	var BackToTop = '<div class="BackToTop"><i class="I IGoTop"></i></div>';
	//window绑定scroll事件
	$(window).on("scroll",function(){
		var $BackToTop = $(BackToTop);
		//滚动条位置
		var ScrollTop=Local.support.GetPageScroll().Y;
		if(ScrollTop >= 200 && isScroll){
			isScroll = !1;
			$(document.getElementById(Local.WrapperArea)).append($BackToTop.fadeIn());
			$BackToTop.one(Local.support.onClick,function(){
				$BackToTop.animate({opacity:"0"},400,function(){
					$(this).remove();
				});
				$('html,body').animate({scrollTop:'0px'},100);
			});
		}else if(ScrollTop < 100){
			isScroll = running;
			$(".BackToTop").remove();
		};	
	});
};
window['kelat']['backToTop'] = function(){return new BackToTop};


/*======================================================
************   通知   ************
======================================================*/
/** 通知 
 * @param {Array} options:模态框选项数组
 */
function AddNotify(options){
	if(options){
		options = options || {};
		var TitleHTML   = options.title   ? '<div class="ItemTitle">'   +options.title   +'</div>' :'';
		var SubtitleHTML= options.subtitle? '<div class="ItemSubtitle">'+options.subtitle+'</div>' :'';
		var MessageHTML = options.message ? '<div class="ItemText">'    +options.message +'</div>' :'';
		var MediaHTML   = options.media   ? '<div class="ItemMedia">'   +options.media   +'</div>' :'';
		var CloseHTML   = '<div class="ItemAfter"><a href="javascript:;" class="CloseNotify"><span></span></a></div>';
		var $Notify = $('.NotifyBox');
		if ($Notify.length === 0) {
			$(document.getElementById(Local.WrapperArea)).append('<ul class="NotifyBox ListBlock MediaList" style="z-index:'+Local.LayerIndex+'"></ul>');
			$Notify = $('.NotifyBox');
		};
		$Notify.show();
		//MediaHTML ? 
		var ItemHTML='<li class="ListItem"><div class="ItemCon InkRipple">'+MediaHTML+
                     '<div class="ItemInner"><div class="ItemTitleRow">'+TitleHTML+CloseHTML+'</div>'
                     +SubtitleHTML
                     +MessageHTML
                     +'</div></div></li>';
		var $ItemHTML = $(ItemHTML);
		
		$ItemHTML.on(Local.support.onClick, function (events) {
			var close = false;
			var target = $(events.target);
			if (target.is('.CloseNotify') || $(events.target).parents('.CloseNotify').length > 0) {
				close = true;
				if (options.onClose) { options.onClose($ItemHTML[0],events);};
			}
			if (close) { CloseNotify($ItemHTML[0]) };
		});
		$Notify['prepend']($ItemHTML[0]);
		var _ItemHeight = $ItemHTML.outerHeight();
		
		$ItemHTML.css('margin-top',-_ItemHeight + 'px');
		window.setTimeout(function(){
			$ItemHTML.addClass("ListItemInOut").css('margin-top','0px');
		},20);
	};
	return this;
};
/** 关闭通知 
 * @param {Object} item:通知对象
 */
function CloseNotify(item){
	item = $(item);
	if (item.length === 0) { return };
	var $Notify = $('.NotifyBox');
	var itemHeight = item.outerHeight();
	item.css('height', itemHeight + 'px');
	window.setTimeout(function(){
		item.addClass("ListItemInOut").css('height','0px');
	},20);
	item.addClass('NotifyBoxHidden').one(Local.TransitionEnd,function(){
		item.remove();
		if ($Notify.find('.ListItem').length === 0) {
			$Notify.hide();
		}
	});
};
window['kelat']['addNotify'] = AddNotify;

/*======================================================
************   Indicator加载   ************
======================================================*/
// Indicator加载
function Indicator() {
	return running ? $(document.getElementById(Local.WrapperArea)).append('<div class="LoadingIndicatorBlank"></div><div class="LoadingIndicatorBox"><span class="Loading LoadingWhite"></span></div>') : null;
};
// 卸载Indicator
function unIndicator() {
	return $('.LoadingIndicatorBlank, .LoadingIndicatorBox').remove();
};
window['kelat']['indicator'] = Indicator;
window['kelat']['unIndicator'] = unIndicator;

/*======================================================
************   Loading加载   ************
======================================================*/
/** 加载 
 * @param {String} title:Loading标题
 */
function Loading(title) {
	return running ? Modal({
		title: title || Local.LoadingTitle,
		content: '<div class="TC">' + Local.LoadingHtml + '</div>',
		className: "ModalLoading"
	}) : null;
};
/* 卸载 */
function unLoading() {
	return CloseModal(".ModalBox.ModalLoading");
};
window['kelat']['loading'] = Loading;
window['kelat']['unLoading'] = unLoading;

/*======================================================
************   模态框   ************
======================================================*/
/** 打开 
 * @param {Object} modal:模态框对象
 * @param {String} className:模态框样式名
 */
function OpenModal(modal, className) {
	$(document.getElementById(Local.WrapperArea)).append('<div class="PF ModalBlank" style="z-index:' + Local.LayerIndex + '"/>');
	$(document.getElementById(Local.WrapperArea)).append(modal[0]);
	if (modal && running) {
		if (className == 'ModalPromptBox') {
			modal.addClass("ModalPromptBox").show();
			window.setTimeout(function() {
				CloseModal();
			}, 2E3);
		} else {
			modal.addClass(className).css({
				marginTop: -Math.round(modal.outerHeight() / 2) + 'px'
			});
		}
		modal.css({
			"z-index": ++Local.LayerIndex
		}).removeClass('ModalBoxOut').addClass('ModalBoxIn');
	};
};
/** 关闭 
 * @param {Object} modal:模态框对象
 */
function CloseModal(modal) {
	modal = $(modal || ".ModalBox.ModalBoxIn");
	if (typeof modal !== 'undefined' && modal.length === 0) {
		return;
	};
	$(modal).addClass("ModalBoxOut").on(Local.TransitionEnd, function() {
		$(this).remove();
	}).prev(".ModalBlank,.ActionsModal").animate({opacity:"0"},400,function() {
		$(this).remove();
	});
};
/** 元素创建 
 * @param {Array} options:模态框选项数组
 */
function Modal(options) {
	options = options || {};
	var ButtonsHTML = '',
		ButtonsNAME = '',
		ModalHTML = '';
	if (options.buttons && options.buttons.length > 0) {
		for (var i = 0; i < options.buttons.length; i++) {
			if (i == 0) {
				ButtonsNAME = "First";
			} else if (i == (options.buttons.length - 1)) {
				ButtonsNAME = "Last";
			}
			ButtonsHTML += '<a href="javascript:;" class="ModalButton ' + ButtonsNAME + '">' + options.buttons[i].text + '</a>';
		}
	};
	var TitleHTML    = options.title    ? '<div class="ModalHeader">' + options.title + '</div>' : '';
	var ContentHTML  = options.content  ? '<div class="ModalContent">' + options.content + '</div>' : '';
	var AfterTextHTML= options.afterText? options.afterText : '';
	var NoButtons    = !options.buttons || options.buttons.length === 0 ? 'ModalNoButtons' : '';
	var ModalButtonsHTML = options.buttons && options.buttons.length > 0 ? '<div class="ModalFooter ModalFooter' + options.buttons.length + '">' + ButtonsHTML + '</div>' : '';
	ModalHTML = '<div class="ModalBox ' + NoButtons + '"><div class="ModalInner">' + (TitleHTML + ContentHTML + AfterTextHTML) + '</div>' + ModalButtonsHTML + '</div>';
	var $Modal = $(ModalHTML);

	// 添加按钮事件
	$Modal.find('.ModalButton').each(function(index, els) {
		$(els).on(Local.support.onClick, function(event) {
			if (options.buttons[index].close !== false) { CloseModal($Modal) };
			if (options.buttons[index].onClick) { options.buttons[index].onClick($Modal,event) };
			if (options.onClick) { options.onClick($Modal,index) };
		});
	});
	OpenModal($Modal, options.className ? options.className : '');
	return $Modal[0];
};
/** alert 框 
 * @param {String} content:内容
 * @param {String} title:标题
 * @param {function} callbackOk:确认事件
 */
function Alert(content, title, callbackOk) {
	if (typeof title === 'function') {
		callbackOk = arguments[1];
		title = undefined;
	}
	return running ? Modal({
		content: content || '',
		title: typeof title === 'undefined' ? Local.ModalTitle : title,
		buttons: [{
			text: Local.ModalButtonOk,
			onClick: callbackOk
		}]
	}) : null;
};
/** 确认框 
 * @param {String} content:内容
 * @param {String} title:标题
 * @param {function} callbackOk:确认事件
 * @param {function} callbackCancel:取消事件
 */
function Confirm(content, title, callbackOk, callbackCancel) {
	if (typeof title === 'function') {
		callbackCancel = arguments[2];
		callbackOk = arguments[1];
		title = undefined;
	}
	return running ? Modal({
		content: content || '',
		title: typeof title === 'undefined' ? Local.ModalTitle : title,
		buttons: [{
			text: Local.ModalButtonCancel,
			onClick: callbackCancel
		}, {
			text: Local.ModalButtonOk,
			onClick: callbackOk
		}]
	}) : null;
};
/** 自动消失提示框 
 * @param {String} content:内容
 */
function Prompt(content) {
	return running ? Modal({
		content: content || '',
		className: "ModalPromptBox"
	}) : null;
};
/** 底部确认框 
 * @param {String} content:内容
 * @param {String} title:标题
 * @param {function} callbackOk:确认事件
 * @param {function} callbackCancel:取消事件
 */
function Picker(content, title, callbackOk, callbackCancel) {
	if (typeof title === 'function') {
		callbackCancel = arguments[2];
		callbackOk = arguments[1];
		title = undefined;
	}
	return running ? Modal({
		content: content || '',
		title: typeof title === 'undefined' ? Local.ModalTitle : title,
		className: "ModalPickerBox",
		buttons: [{
			text: Local.ModalButtonCancel,
			onClick: callbackCancel
		}, {
			text: Local.ModalButtonOk,
			onClick: callbackOk
		}]
	}) : null;
};
window['kelat']['alert'] = Alert;
window['kelat']['confirm'] = Confirm;
window['kelat']['prompt'] = Prompt;
window['kelat']['picker'] = Picker;

/*======================================================
************   空白提示   ************
======================================================*/
/** 空白提示 
 * @param {String} title:标题
 * @param {String} content:内容
 * @param {function} callBack:回调
 */
function BlankTips(title, content, callBack){
	if (typeof content === 'function') {
		callBack = arguments[1];
		content = undefined;
	};
	var TitleHTML    = title   ? '<div class="BlankTipsTitle">'  + title   + '</div>' : '';
	var ContentHTML  = content ? '<div class="BlankTipsContent">' + content + '</div>' : '';
	var BlankTipsHTML = '<div class="BlankTips">' + ContentHTML + TitleHTML + '</div></div>';
	var $BlankTipsHTML = $(BlankTipsHTML);
	$BlankTipsHTML.on(Local.support.onClick, function(event) {
		if (callBack) { callBack($BlankTipsHTML,event) };
	});
	$(document.getElementById(Local.WrapperArea)).append($BlankTipsHTML)
	return this;
};
window['kelat']['blankTips'] = BlankTips;


/*======================================================
************   操作表单   ************
======================================================*/
/** 显示操作表单 
 * @param {Object} actions:对象
 */
function OpenActions(actions){
	var $ActionsClose=$('<div class="PF ModalBlank" id="OpenActions" style="z-index:' + Local.LayerIndex + '"/>');
	$(document.getElementById(Local.WrapperArea)).append($ActionsClose);
	$(document.getElementById(Local.WrapperArea)).append(actions[0]);
	if(actions && running){
		actions.show().css({
			"z-index": ++Local.LayerIndex
		}).removeClass('ModalBoxOut').addClass('ModalBoxIn').one(Local.TransitionEnd, function() {
			$ActionsClose.on(Local.support.onClick,function(){
				CloseModal(actions);
			});
		});
	};
};
/** 操作表单 
 * @param {Array} options:操作表单数组
 */
function Actions(options){
	var options = options || [];
	var ButtonsHTML = '',
		ActionsHTML = '';
	for (var i = 0; i < options.length; i++) {
		for (var j = 0; j < options[i].length; j++) {
			if (j === 0) { ButtonsHTML += '<div class="ActionsModalGroup">' };
			var button = options[i][j];
			var buttonClass = button.label ? 'ActionsLabel' : 'ActionsButton';
			var buttonText = button.text ? button.text : Local.ModalButtonCancel;
			if (button.bold) { buttonClass += ' ActionsButtonBold' };
			if (button.color) { buttonClass += ' ' + button.color };
			if (button.bg) { buttonClass += ' ' + button.bg };
			if (button.disabled) { buttonClass += ' disabled' };
			ButtonsHTML += '<div class="' + buttonClass + '">' + buttonText + '</div>';
			if (j === options[i].length - 1) {ButtonsHTML += '</div>'};
		}
	}
	ActionsHTML = '<div class="ModalBox ActionsModal">' + ButtonsHTML + '</div>';
	var ActionsGroup = '.ActionsModalGroup';
	var ActionsButton = '.ActionsButton';
	var $Actions = $(ActionsHTML);
	var $Groups = $Actions.find(ActionsGroup);
	$Groups.each(function (index, els) {
		var _GroupIndex = index;
		$(els).children().each(function (index, els) {
			var _ButtonIndex = index;
			var $ButtonParams = options[_GroupIndex][_ButtonIndex];
			var $onClick;
			if ($(els).is(ActionsButton)) { $onClick = $(els) };
			if ($(els).find(ActionsButton).length > 0) { $onClick = $(els).find(ActionsButton) };

			if ($onClick) {
				$onClick.on(Local.support.onClick, function (events) {
					if ($ButtonParams.close !== false) { CloseModal($Actions) };
					if ($ButtonParams.onClick) { $ButtonParams.onClick($Actions,events) };
				});
			}
		});
	});
	OpenActions($Actions);
	return this;
};
window['kelat']['actions'] = Actions;

/*======================================================
************   数字输入框   ************
======================================================*/
/** 数字输入框 */
function NumberBox(){
	var Plus = ".NumBoxPlus";
	var Minus = ".NumBoxMinus";
	var Disabled = "disabled";
	var CheckValue = function(options){
		if (options.value == null || options.value == '' || isNaN(options.value)) {
			options.input.val(options.min || 0);
		}else{
			if(options.max != null && !isNaN(options.max) && options.value >= parseInt(options.max)){
				options.value = options.max;
				options.parent.find(Plus).addClass(Disabled);
			}else{
				options.parent.find(Plus).removeClass(Disabled);
			}
			if(options.min != null && !isNaN(options.min) && options.value <= parseInt(options.min)){
				options.value = options.min;
				options.parent.find(Minus).addClass(Disabled);
			}else{
				options.parent.find(Minus).removeClass(Disabled);
			}
			options.input.val(options.value);
		};
	};
	$(document).on(Local.support.onClick,Plus+','+Minus,function(){
		var $This  = $(this);
		var $Parent= $This.parent('.NumBox');
		var $Input = $Parent.find('.NumBoxInput');
		var _Step  = parseInt($Parent.attr('data-step') || 1);
		var _Min   = parseInt($Parent.attr('data-min'));
		var _Max   = parseInt($Parent.attr('data-max'));
		var _Val;
		if($This.is(Plus)){
			_Val = parseInt($Input.val()) + _Step;
		}else if($This.is(Minus)){
			_Val = parseInt($Input.val()) - _Step;
		}
		running ?	CheckValue({
			'value':_Val,
			'min':_Min,
			'max':_Max,
			'parent':$Parent,
			'input':$Input
		}) : '';
	});
	return this
};
window['kelat']['numberBox'] = NumberBox;


/*======================================================
************   进度条   ************
======================================================*/
/** 进度条 
 * @param {String} container:容器对象
 * @param {Integer} time:显示时间
 */
function Progressbar(container, time) {
	container = $(container || 'body');
	if (container.length === 0 ) {return};
	var progressbar;
	if (container.hasClass('ProgressBar')){
		progressbar = container;
	}else{
		progressbar = container.children('.ProgressBar:not(.ProgressBarOut)');
		if (progressbar.length === 0) {
			progressbar = $('<span class="ProgressBar ProgressBarIn"></span>')
			container.append(progressbar);
		}
	}
	window.setTimeout(function() {
		progressbar.remove();
	}, time)
	return progressbar[0];
};
window['kelat']['progressbar'] = Progressbar;


/*======================================================
************   点击波   ************
======================================================*/
function Ripple(){
	return $(document).on(Local.support.onClick, ".InkRipple", function(event) {
		if( running ){
			var $Th = $(this), _Date = (new Date()).getTime();
			//使用父元素的最大宽高,创建一个覆盖元素的圆形。
			var _Diameter = Math.max($Th.outerWidth(), $Th.outerHeight());
			//得到点击坐标=点击坐标相对于页面 - 父元素的位置相对于页面 - 半自高度/宽度，使其从中心展示;
			var _OffsetX = event.pageX - $Th.offset().left - _Diameter / 2;
			var _OffsetY = event.pageY - $Th.offset().top - _Diameter / 2;
			//创建.ink元素，设置大小
			$Th.prepend('<span class="ink" id="ink' + _Date + '" style="top:'+_OffsetY+'px;left:'+_OffsetX+'px;height:'+_Diameter+'px;width:'+_Diameter+'px"></span>');
			var $Ink = $("#ink" + _Date);
			//设置位置和动画样式.RippleAnimate
			$Ink.addClass("RippleAnimate").one(Local.AnimationEnd, function() {
				$(this).remove();
			});
		};
	});
};

/*======================================================
************   浮动菜单   ************
======================================================*/
/** 浮动菜单 */
function FloatButton() {
	$(document).on(Local.support.onClick, ".FloatingButton", function(event) {
		event.preventDefault();
		$(this).parent(".SpeedDial").toggleClass("SpeedDialOpened");
	});
	return this
};
window['kelat']['floatButton'] = FloatButton;

/*图片处理*/
window['kelat']['extend']({
	/**图片头数据加载就绪事件 - 更快获取图片尺寸
	* @param {String} url:图片路径
	* @param {function}	ready:尺寸就绪
	* @param {function}	load:加载完毕 (可选)
	* @param {function}	error:加载错误 (可选)
	* @example imgReady('http://www.google.com.hk/intl/zh-CN/images/logo_cn.png', function () {
			alert('size ready: width=' + this.width + '; height=' + this.height);
		});
	*/
	imgReady:(function(){
		var _list = [], intervalId = null,
		// 用来执行队列
		FnTick = function () {
			var i = 0;
			for (; i < _list.length; i++) {
				_list[i].end ? _list.splice(i--, 1) : _list[i]();
			};
			!_list.length && FnStop();
		},		
		// 停止所有定时器队列
		FnStop = function () {
			clearInterval(intervalId);
			intervalId = null;
		};		
		return function (url, ready, load, error) {
			var FnOnready, _Width, _Height, _NewWidth, _NewHeight,
				_Image = new Image();
			_Image.src = url;
			// 如果图片被缓存，则直接返回缓存数据
			if (_Image.complete) {
				ready.call(_Image);
				load && load.call(_Image);
				return;
			};
			_Width = _Image.width;
			_Height = _Image.height;
			// 加载错误后的事件
			_Image.onerror = function () {
				error && error.call(_Image);
				FnOnready.end = true;
				_Image = _Image.onload = _Image.onerror = null;
			};
			// 图片尺寸就绪
			FnOnready = function () {
				_NewWidth = _Image.width;
				_NewHeight = _Image.height;
				if (_NewWidth !== _Width || _NewHeight !== _Height ||
					// 如果图片已经在其他地方加载可使用面积检测
					_NewWidth * _NewHeight > 1024
				) {
					ready.call(_Image);
					FnOnready.end = true;
				};
			};
			FnOnready();
			// 完全加载完毕的事件
			_Image.onload = function () {
				// onload在定时器时间差范围内可能比FnOnready快
				// 这里进行检查并保证FnOnready优先执行
				!FnOnready.end && FnOnready();
				load && load.call(_Image);
				// IE gif动画会循环执行onload，置空onload即可
				_Image = _Image.onload = _Image.onerror = null;
			};
			// 加入队列中定期执行
			if (!FnOnready.end) {
				_list.push(FnOnready);
				//无论何时只允许出现一个定时器，减少浏览器性能损耗
				if (intervalId === null) intervalId = setInterval(FnTick, 40);
			};
		};
	})(),
	/**图片渲染
	* @param {Array} path:图片路径  width:图片宽度  
	* @param {function}	callback():回调
	*/
	imgRender : function(options, callback){
		var image = new Image();
		//传过来的图片路径在这里用。
		image.src = options.path;
		//image.crossOrigin = "*";
		kelat.imgReady(options.path,function(){},function(){
			var that = this;
			//生成比例 
			var width = that.width, 
				height = that.height, 
				scale = width / height; 
			width = options.width || 100;
			height = width / scale;
			//生成canvas
			var canvas = document.createElement('canvas');
			var ctx = canvas.getContext('2d');
			canvas.style.width = width;
			canvas.style.height = height;
			ctx.drawImage(that,0,0,width,height);
			callback(canvas.toDataURL());
		},function(){
			kelat.alert(Local.ImgTip);
		});
	}
});

//执行函数
window['kelat']['init'] = (function(){
	Ripple();
})();
var rootjQuery;
var init = window['kelat']['fn']['init'] = function(selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}
		return jQuery.makeArray( selector, this );
};
init.prototype = window['kelat']['fn'];

rootjQuery = kelat( document );

if(typeof define === "function" && define.amd){
	define("kelat", ["jquery"], function() {
		return window['kelat'];
	});
};

if( !noGlobal ){
	window['kelat'] = window.$$ = kelat;
};
if( !running ){
	kelat.addNotify({
		title: Local.title,
		message: Local.message
	});
};
//返回对象
return window['kelat'];
}));
