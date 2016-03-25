define(["jqueryMobile"], function() {
'use strict';
/** 特性支持检测 */
var support=(function(){
	var support = {
		touch : !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch)
	};
	return support;
}());

/***** 定义局部参数 *****/
var Local = {
	/** 区域设定 */
	WrapperArea:'WrapperArea',
	/** 层高 */
	LayerIndex: '2000',
	/** 加载 */
	LoadingTitle: '正在加载...',
	LoadingHtml: '<span class="Loading"></span>',
	/** 模态框 */
	ModalTitle: "提示",
	ModalButtonOk: "确定",
	ModalButtonCancel: "取消",
	ModalActionsClose: false,
	/** 通知 */
	Material: false,
	/** 事件类型 */
	onClick: ( support.touch ? 'tap' : 'click'),
	TransitionEnd : "webkitTransitionEnd transitionend",
	AnimationEnd : "webkitAnimationEnd animationend"
},
/** 点击波事件 */
Ripple = function() {
	$(document).on(Local.onClick, ".InkRipple", function(event) {
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
		})
	});
},
/** 返回顶部 */
BackToTop = function(){
	var isScroll = true;
	var BackToTop = '<div class="BackToTop"><i class="I IGoTop"></i></div>';
	//window绑定scroll事件
	$(window).on("scroll",function(){
		var $BackToTop = $(BackToTop);
		//滚动条位置
		var Scroll=NewSelf.GetPageScroll();
		var ScrollTop = Scroll.Y;
		if(ScrollTop >= 200 && isScroll){
			isScroll = false;
			$(document.getElementById(Local.WrapperArea)).append($BackToTop.fadeIn());
			$BackToTop.one(Local.onClick,function(){
				$BackToTop.animate({opacity:"0"},400,function(){
					$(this).remove();
				});
				$('html,body').animate({scrollTop:'0px'},100);
			});
		}else if(ScrollTop < 100){
			isScroll = true;
			$(".BackToTop").remove();
		};	
	});
};
/***** 创建对象 *****/
var Public = function(){
	var app = this;
	/** 版本 */
	app.version = "1.0.0";
	
	/** 删除前后空格 */
	app.trim = function(data) {
		return data.replace(/^\s+|\s+$/g,'');
	};
	
	/** JSON 查看 */
	app.JsonView = function(data){
		return JSON.stringify(data)
	};
	
	/** log */
	app.log = function(message, level){
		return console.log( level || 'warning', ': ', message);
	};
	
	/** 本地存储 */
	app.ls = window.localStorage;
	
	/** 设备/操作系统探测 */
	app.device = (function () {
		var device = {};
		var ua = navigator.userAgent;

		var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
		var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
		var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
		var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);

		device.ios = device.android = device.iphone = device.ipad = device.androidChrome = false;
		
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
		var windowWidth = $(window).width();
		var windowHeight = $(window).height();
		device.statusBar = false;
		if(device.webView && (windowWidth * windowHeight === screen.width * screen.height)){
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
		//返回对象
		return device;
	})();
	

	/** 触摸事件 */
	app.touchEvents = {
		start: support.touch ? 'touchstart' : 'mousedown',
		move: support.touch ? 'touchmove' : 'mousemove',
		end: support.touch ? 'touchend' : 'mouseup',
		cancel: 'touchcancel'
	};	
	app.Touches = function(els, detach, callBack) {
		if (typeof detach === 'function') {
			callBack = arguments[1];
			detach = undefined;
		}
		var Touches = {
			startX:  0, startY:  0,
			currentX:0, currentY:0,
			diffX:   0, diffY:   0
		},
		$Element=els,
		action = detach ? 'removeEventListener' : 'addEventListener';
		
		$Element[action](app.touchEvents.start,touch, false);
		$Element[action](app.touchEvents.move,touch, false);
		$Element[action](app.touchEvents.end,touch, false);
		$Element[action](app.touchEvents.cancel,touch, false);
		function touch (event){
			var event = event || window.event || arguments.callee.caller.arguments[0];
			event.preventDefault();
			if(support.touch){
				Touches.touchLength = event.targetTouches.length || 0;
			};
			switch(event.type){
				case app.touchEvents.start:
					Touches.startX = Number(event.type === 'touchstart'?event.targetTouches[0].pageX:event.pageX);
					Touches.startY = Number(event.type === 'touchstart'?event.targetTouches[0].pageY:event.pageY);
					break;
				case app.touchEvents.end:
					Touches.diffX = Number(event.type === 'touchend'?event.changedTouches[0].clientX:event.pageX);
					Touches.diffY = Number(event.type === 'touchend'?event.changedTouches[0].clientY:event.pageY);
					break;
				case app.touchEvents.move:
					Touches.currentX = Number(event.type === 'touchmove'?event.targetTouches[0].pageX:event.pageX);
					Touches.currentY = Number(event.type === 'touchmove'?event.targetTouches[0].pageY:event.pageY);
					break;
				case app.touchEvents.cancel:
					break;
			};
			callBack(Touches, $Element);
		};
		return Touches;
	};
	
	/** 验证
	 * @param {String} string:验证数据
	 * @param {String} type  :验证类型
	 * @return {Boolean}
	 */
	app.Validate = function(string, type) {
		var Pattern={
			email  : /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
			phone  : /^((\(\d{3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}$/,
			mobile : /^1[34578]\d{9}$/,
			number : /^\d+$/,
			integer: /^[-\+]?\d+$/,
			english: /^[A-Za-z]+$/,
			chinese: /^[\u0391-\uFFE5]+$/,
			date   : /^(\d{4})年(0\d{1}|1[0-2])月(0\d{1}|[12]\d{1}|3[01])日$/
		};
		if(Pattern[type].test(string)){
			return true;
		}
		return false;
	};
	
	/** 分解url参数
	 * @return {Object}
	 */
	app.GetUrlParams = function() {
		var ArrayData = {},
			LinkURL=window.location.href,
			angularMark = LinkURL.indexOf("#/")+1 , 
			angularURLData = LinkURL.substring(angularMark),
			Mark = angularURLData.indexOf("?")+1,
			URLData = angularURLData.substring(Mark);
		if(Mark==0){
			return ArrayData;
		}else{
			//获取参数的值
			var _Data = URLData.split("&");
			for(var i=0;i<_Data.length;i++){
				var _Array=_Data[i].split("=");
				ArrayData[_Array[0]]=_Array[1];
			};
			return ArrayData;
		};
	};
	
	/**滚动条位置
	 * @return {Array} 滚动条 X,滚动条 Y
	 */
	app.GetPageScroll = function() {
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
	app.GetPageSize = function() {
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
	
	/** 动态加载 
	 * @param {String} path:加载对象路径
	 * @param {String} type:加载对象类型 js & css
	 * @param {function} callback:回调
	 */
	app.LoadJC = function(path, type, callback) {
		if (!path || path.length === 0) {throw new Error("");};
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
		return this;
	};
};
if(!window['Public']) {
    window['Public'] = Public;
};

var NewSelf = new window['Public'];

window['Public'].fn = window['Public'].prototype = {
	/*======================================================
	************   全局参数   ************
	======================================================*/
	Params: {
		/** 全局路径 */
		WEBSITE_URL: "http://192.168.190.52:7500/emuplus/"
	},
	
	/************* 页面UI部分 *************/
	/*======================================================
	************   返回顶部   ************
	======================================================*/
	BackToTop: function(){
		return new BackToTop;
	},
	
	/*======================================================
	************   通知   ************
	======================================================*/
	/** 通知 
	 * @param {Array} options:模态框选项数组
	 */
	addNotify: function(options){
		var Self = this;
		if(!options){return};
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
		var ItemHTML='<li class="ListItem">\
				<div class="ItemCon InkRipple">'+MediaHTML+
					'<div class="ItemInner">\
						<div class="ItemTitleRow">'+TitleHTML+CloseHTML+'</div>'
						+SubtitleHTML
						+MessageHTML
						+'</div>\
				</div>\
			</li>';
		var $ItemHTML = $(ItemHTML);
		
		$ItemHTML.on(Local.onClick, function (events) {
			var close = false;
			var target = $(events.target);
			if (target.is('.CloseNotify') || $(events.target).parents('.CloseNotify').length > 0) {
				close = true;
				if (options.onClose) { options.onClose($ItemHTML[0],events);};
			}
			if (close) { Self.closeNotify($ItemHTML[0]) };
		});
		$Notify[Local.Material ? 'append' : 'prepend']($ItemHTML[0]);
		var _ItemHeight = $ItemHTML.outerHeight();
		
		$ItemHTML.css('margin-top',-_ItemHeight + 'px');
		window.setTimeout(function(){
			$ItemHTML.addClass("ListItemInOut").css('margin-top','0px');
		},20);
		
        return this;
	},
	/** 关闭通知 
	 * @param {Object} item:通知对象
	 */
	closeNotify: function(item){
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
		return this;
	},
	
	/*======================================================
	************   Indicator加载   ************
	======================================================*/
	/** Indicator加载 */
	Indicator: function() {
		return $(document.getElementById(Local.WrapperArea)).append('<div class="LoadingIndicatorBlank"></div><div class="LoadingIndicatorBox"><span class="Loading LoadingWhite"></span></div>');
	},
	/** 卸载Indicator */
	unIndicator: function() {
		return $('.LoadingIndicatorBlank, .LoadingIndicatorBox').remove();
	},

	/*======================================================
	************   Loading加载   ************
	======================================================*/
	/** 加载 
	 * @param {String} title:Loading标题
	 */
	Loading: function(title) {
		return this.Modal({
			title: title || Local.LoadingTitle,
			content: '<div class="TC">' + Local.LoadingHtml + '</div>',
			className: "ModalLoading"
		});
	},
	/* 卸载 */
	unLoading: function() {
		return this.CloseModal(".ModalBox.ModalLoading");
	},

	/*======================================================
	************   模态框   ************
	======================================================*/
	/** 打开 
	 * @param {Object} modal:模态框对象
	 * @param {String} className:模态框样式名
	 */
	OpenModal: function(modal, className) {
		var Self = this;
		$(document.getElementById(Local.WrapperArea)).append('<div class="PF ModalBlank" style="z-index:' + Local.LayerIndex + '"/>');
		$(document.getElementById(Local.WrapperArea)).append(modal[0]);
		if (modal) {
			if (className == 'ModalPromptBox') {
				modal.addClass("ModalPromptBox").show();
				window.setTimeout(function() {
					Self.CloseModal();
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
		return this;
	},
	/** 关闭 
	 * @param {Object} modal:模态框对象
	 */
	CloseModal: function(modal) {
		modal = $(modal || ".ModalBox.ModalBoxIn");
		if (typeof modal !== 'undefined' && modal.length === 0) {
			return;
		};
		$(modal).addClass("ModalBoxOut").on(Local.TransitionEnd, function() {
			$(this).remove();
		}).prev(".ModalBlank,.ActionsModal").animate({
			opacity: "0"
		}, 400, function() {
			$(this).remove();
		});
		return this;
	},
	/** 元素创建 
	 * @param {Array} options:模态框选项数组
	 */
	Modal: function(options) {
		var Self = this;
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
			$(els).on(Local.onClick, function(event) {
				if (options.buttons[index].close !== false) { Self.CloseModal($Modal) };
				if (options.buttons[index].onClick) { options.buttons[index].onClick($Modal,event) };
				if (options.onClick) { options.onClick($Modal,index) };
			});
		});
		Self.OpenModal($Modal, options.className ? options.className : '');
		return Self;
	},
	/** alert 框 
	 * @param {String} content:内容
	 * @param {String} title:标题
	 * @param {function} callbackOk:确认事件
	 */
	alert: function(content, title, callbackOk) {
		if (typeof title === 'function') {
			callbackOk = arguments[1];
			title = undefined;
		}
		return this.Modal({
			content: content || '',
			title: typeof title === 'undefined' ? Local.ModalTitle : title,
			buttons: [{
				text: Local.ModalButtonOk,
				onClick: callbackOk
			}]
		});
	},
	/** 确认框 
	 * @param {String} content:内容
	 * @param {String} title:标题
	 * @param {function} callbackOk:确认事件
	 * @param {function} callbackCancel:取消事件
	 */
	confirm: function(content, title, callbackOk, callbackCancel) {
		if (typeof title === 'function') {
			callbackCancel = arguments[2];
			callbackOk = arguments[1];
			title = undefined;
		}
		return this.Modal({
			content: content || '',
			title: typeof title === 'undefined' ? Local.ModalTitle : title,
			buttons: [{
				text: Local.ModalButtonCancel,
				onClick: callbackCancel
			}, {
				text: Local.ModalButtonOk,
				onClick: callbackOk
			}]
		});
	},
	/** 自动消失提示框 
	 * @param {String} content:内容
	 */
	prompt: function(content) {
		return this.Modal({
			content: content || '',
			className: "ModalPromptBox"
		});
	},
	/** 底部确认框 
	 * @param {String} content:内容
	 * @param {String} title:标题
	 * @param {function} callbackOk:确认事件
	 * @param {function} callbackCancel:取消事件
	 */
	picker: function(content, title, callbackOk, callbackCancel) {
		if (typeof title === 'function') {
			callbackCancel = arguments[2];
			callbackOk = arguments[1];
			title = undefined;
		}
		return this.Modal({
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
		});
	},

	/*======================================================
	************   空白提示   ************
	======================================================*/
	/** 空白提示 
	 * @param {String} title:标题
	 * @param {String} content:内容
	 * @param {function} callBack:回调
	 */
	BlankTips: function(title, content, callBack){
		if (typeof content === 'function') {
			callBack = arguments[1];
			content = undefined;
		};
		var TitleHTML    = title   ? '<div class="BlankTipsTitle">'  + title   + '</div>' : '';
		var ContentHTML  = content ? '<div class="BlankTipsContent">' + content + '</div>' : '';
		var BlankTipsHTML = '<div class="BlankTips">' + ContentHTML + TitleHTML + '</div></div>';
		var $BlankTipsHTML = $(BlankTipsHTML);
		$BlankTipsHTML.on(Local.onClick, function(event) {
			if (callBack) { callBack($BlankTipsHTML,event) };
		});
		$(document.getElementById(Local.WrapperArea)).append($BlankTipsHTML)
		return this;
	},

	/*======================================================
	************   操作表单   ************
	======================================================*/
	/** 显示操作表单 
	 * @param {Object} actions:对象
	 */
	OpenActions: function(actions){
		var Self = this;
		var $ActionsClose=$('<div class="PF ModalBlank" id="OpenActions" style="z-index:' + Local.LayerIndex + '"/>');
		$(document.getElementById(Local.WrapperArea)).append($ActionsClose);
		$(document.getElementById(Local.WrapperArea)).append(actions[0]);
		if(actions){
			actions.show().css({
				"z-index": ++Local.LayerIndex
			}).removeClass('ModalBoxOut').addClass('ModalBoxIn').one(Local.TransitionEnd, function() {
				$ActionsClose.on(Local.onClick,function(){
					Self.CloseModal(actions);
				});
			});
		};
		return this;
	},
	/** 操作表单 
	 * @param {Array} options:数组
	 */
	actions: function(options){
		var Self = this;
		var options = options || [];
		var ButtonsHTML = '',
			ActionsHTML = '';
		for (var i = 0; i < options.length; i++) {
			for (var j = 0; j < options[i].length; j++) {
				if (j === 0) ButtonsHTML += '<div class="ActionsModalGroup">';
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
					$onClick.on(Local.onClick, function (events) {
						if ($ButtonParams.close !== false) { Self.CloseModal($Actions) };
						if ($ButtonParams.onClick) { $ButtonParams.onClick($Actions,events) };
					});
				}
			});
		});
		Self.OpenActions($Actions);
		return this;
	},

	/*======================================================
	************   数字输入框   ************
	======================================================*/
	/** 数字输入框 */
	NumberBox: function(){
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
		$(document).on(Local.onClick,Plus+','+Minus,function(){
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
			CheckValue({
				'value':_Val,
				'min':_Min,
				'max':_Max,
				'parent':$Parent,
				'input':$Input
			});
		});
		return this
	},

	/*======================================================
	************   进度条   ************
	======================================================*/
	/** 进度条 
	 * @param {String} container:容器对象
	 * @param {Integer} time:显示时间
	 */
	Progressbar: function(container, time) {
		container = $(container || 'body');
		if (container.length === 0) return;
		var progressbar;
		if (container.hasClass('ProgressBar')) progressbar = container;
		else {
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
	},

	/*======================================================
	************   点击波   ************
	======================================================*/
	Ripple: function() {
		return new Ripple;
	},

	/*======================================================
	************   浮动菜单   ************
	======================================================*/
	/** 浮动菜单 */
	FloatingButton: function() {
		$(document).on(Local.onClick, ".FloatingButton", function(event) {
			event.preventDefault();
			$(this).parent(".SpeedDial").toggleClass("SpeedDialOpened");
		});
		return this
	},
	init: function(){
		this.Ripple();
	}
};
//执行函数
window['Public'].fn.init();
//返回对象
return window['Public'];
});