(function () {
	'use strict';
	var $ = function (selector) {
		return document.querySelector(selector);
	};
	var EventUtil = {
		addHandler: function(element, type, handler) {
			element.addEventListener ? element.addEventListener(type, handler, false) :
				element.attachEvent ? element.attachEvent('on' + type, handler) :
					element['on' + type] = handler;
		},
	}
		// 禁用单个HTML5元素
	function mute(elem, state) {
		elem.muted = state;
		if (!state) {
			elem.play();// 播放 
		} else {
			elem.pause();// 暂停
		}
	};
	var Local = {
		// 开关
		clickState: true,
		// 是否全屏
		isFullscreen: false,
		element: document.documentElement,
		// 当前URL
		href: window.sessionStorage.getItem('TRANSIT_HREF') || window.location.href,
		// 激活
		activate: null

	};
	window.sessionStorage.setItem('TRANSIT_HREF', Local.href)
	var Transit = {
		historyState: false,
		switch: function () {
			var ActionMenu = $('#ActionMenu');
			if (Local.clickState) {
				Local.clickState = false;
				EventUtil.addHandler(document, 'click', function (event) {
					if (!event.target.classList.contains('DomainItme')) {
						ActionMenu.classList.remove('ActionMenuIn')
					}
				});
				ActionMenu.onclick = function (e) { e.stopPropagation(); };
			}
			setTimeout(function () {
				ActionMenu.classList.toggle('ActionMenuIn')
			}, 0);
		},
		// 加载框架
		load: function (url) {
			url = url || 'default.html';
			var iframe = document.createElement("iframe");
			iframe.src = url;
			iframe.style.display = "none";
			var Jump = function () {
				window.location.replace(url);
			}
			if (iframe.attachEvent) {
				iframe.attachEvent("onload", function () { // IE 
					Jump();
				});
			} else {
				iframe.onload = function () { // 非IE  
					Jump();
				};
			}
			document.body.appendChild(iframe);
		},
		// 刷新
		refresh: function () {
			// var Timestamp = +new Date();
			window.location.replace(Local.href)
		},
		// 关闭页面
		closePage: function () {
			// 退出设备详情页
			if ( window.navigator.userAgent.indexOf('App/Uplus Apicloud') !== -1 && window['api']) {
				window['api'].require('UpBaseModule').closeView();
			} else if (window.navigator.userAgent.indexOf('UpHybrid') !== -1 && (window['Cordova'] || window['cordova'])) {
				window['cordova'].require('uphybrid-plugin-core.upcore').closeH5ContainerView(function () { }, function () { });
			} else {
				history.go(-1);
			}
		},
		// 尝试在页面上静音所有视频和音频元素
		muted: function () {
			window.localStorage.setItem('IS_MUTED', $('#DomainSound').classList.contains('SoundMute') ? true : false);
			$('#DomainSound').classList.toggle('SoundMute');
			window.SoundSetting && window.SoundSetting();
		},
		// 尝试在页面上静音所有视频和音频元素
		music: function () {
			window.localStorage.setItem('IS_MUSIC', $('#DomainMusic').classList.contains('SoundMute') ? true : false);
			$('#DomainMusic').classList.toggle('SoundMute');
			window.SoundSetting && window.SoundSetting();
		},
		// 返回
		goBack: function() {
			if (window['transit'].historyState || (window.sessionStorage.IS_FIRST == 'true' && window.history.state !== null && window.history.state.page <= 1)){
				window['transit'].closePage();
			} else {
				window.history.go( -1 );
			}
		},
		// 页面浏览状态-是否第一次打开
		history: function(state){
			// todo 记录url
			if (state == 1) {
				window.sessionStorage.setItem('IS_FIRST', (window.history.length <= 1) ?  'true' : 'false');
			}
			if (window.history.state === null || (window.history.state && !window.history.state.page)) {
				window.history.replaceState({page: window.history.length}, '');
			}
		},
		remove: function() {
			var TransitID = document.getElementById('Transit');
			if (TransitID) {
				TransitID.classList.add('TransitOut');
				setTimeout(function(){
					if (TransitID) {
						TransitID.remove();
					}
				}, 320);
			}
		},
		add: function (options) {
			var li = document.createElement('li');
			var div = document.createElement('div');
			var img = document.createElement('img');
			img.src = options.icon;
			var p = document.createElement('p');
			p.innerText = options.name;
			li.id = options.id + "_li";
			div.id = options.id;
			div.appendChild(img);
			li.appendChild(div);
			li.appendChild(p);
			$('#LightApp').appendChild(li);
			// $('#LightApp').innerHTML = '<li id="' + options.id + '_li"><div id="' + options.id + '"><img src="'+ options.icon +'" /></div><p>' + options.name + '</p></li>';
			EventUtil.addHandler($('#' + options.id), 'click', function () {
				if (!Local.activate) {
					$('#DomainCloseApp').classList.add('CloseAppIn');
					var ICON = document.createElement('i');
					ICON.className = 'Icon IconMore'
					$('#' + options.id + '_li').appendChild(ICON);
					EventUtil.addHandler(ICON, 'click', function () { Transit['destroy']() });
					Local.activate = {
						close: ICON,
						id: options.id,
						state: true,
						destroy: options.destroy
					}
					options.init();
				}
			});
		}
	};
	// 绑定判断浏览器是否全屏
	EventUtil.addHandler(document, 'fullscreenchange', function (event) {
		if (document.fullscreenElement || document.webkitFullscreenElement) {
			Local.isFullscreen = true;
		} else {
			Local.isFullscreen = false;
		}
	});
	// 全屏操作
	Transit['fullScreen'] = function () {
		$('#DomainfullScreen').classList.toggle('FullScreen');
		if (!Local.isFullscreen) {
			if (Local.element.requestFullscreen) {
				Local.element.requestFullscreen();
			} else if (Local.element.webkitRequestFullscreen) {
				Local.element.webkitRequestFullscreen();
			}
		} else {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.webkitExitFullscreen) {
				document.webkitExitFullscreen();
			}
		}
	};
	// 销毁游戏
	Transit['destroy'] = function () {
		if (Local.activate) {
			$('#DomainCloseApp').classList.remove('CloseAppIn');
			Local.activate.close.remove();
			Local.activate.destroy();
			Local.activate = null;
		}
	};

	// 检查声音状态
	Transit['Sound'] = function () {
		if (Boolean(window.localStorage.getItem('IS_MUTED') === 'false')) {
			$('#DomainSound').classList.add('SoundMute');
		}
		if (Boolean(window.localStorage.getItem('IS_MUSIC') === 'false')) {
			$('#DomainMusic').classList.add('SoundMute');
		}
	};
	if(!window.sessionStorage.IS_FIRST){
		Transit.history(1);
	} else {
		Transit.history(0);
	}
	window['transit'] = Transit;
	return window['transit'];
}());
