/**
 * kelat JavaScript Library v1.2.4-beta
 * http://git.oschina.net/ficozhe/K-UI
 * https://github.com/ficozh/KUI
 *
 * Date: 2017-01-03
 */
(function(Global, factory){
    if(typeof module === "object" && typeof module.exports === "object"){
        module.exports = Global.document ?
            factory(Global, true) :
            function(w){
                if(!w.document){
                    throw new Error("kelat requires window & document");
                };
                return factory(w);
            };
    }else{
        factory(Global);
    };
}(typeof window !== "undefined" ? window : this,function(window,noGlobal){
'use strict';
// 版本
var version = "1.2.4";
var classType = {};
var toString = classType.toString;
var hasOwn = classType.hasOwnProperty;
//运行授权
var running = ++[[]][+[]]+[]+[] >>> 0 ? !0 : !1 ;
var KUIAPP = {
    //类型
    type : function( obj ) {
        if(obj === null){
            return obj + "";
        }
        //支持：Android的<4.0 功能正则表达式
        return typeof obj === "object" || typeof obj === "function" ? classType[ toString.call(obj) ] || "object" : typeof obj;
    },
    //是字符串
    isString : function(obj){ 
        return typeof obj === 'string';
    },
    //是否为数字
    isNumber : function(Number){
        return !isNaN(parseFloat(Number)) && isFinite(Number);
    },
    //是否为数组
    isArray : function(arr){
        return (Object.prototype.toString.apply(arr) === '[object Array]') ? true : false;
    },
    //是否在Window容器
    isWindow : function(obj) {
        return obj != null && obj === obj.window;
    }
};
//是否普通对象
KUIAPP.isPlainObject = function(obj) {
    // 不是普通的对象:
    // - 任何对象或值，其内部的 [[Class]] 属性不是 "[object Object]"
    // - DOM节点
    // - window窗口
    if(KUIAPP.type(obj) !== "object" || obj.nodeType || KUIAPP.isWindow(obj)){
        return false;
    };
    if(obj.constructor && !hasOwn.call( obj.constructor.prototype, "isPrototypeOf" )){
        return false;
    };
    //如果没有返回
    //|obj|是一个普通的对象, 通过创建 {} 或新构造的对象
    return true;
};
//是否为函数
KUIAPP.isFunction = function(obj) {
    return KUIAPP.type(obj) === "function";
};
//扩展 --- 功能参考 jQuery
KUIAPP.Extend = function(){
    var options, name, src, copy, copyIsArray, clone,
        target = arguments[0] || {},
        index = 1,
        length = arguments.length,
        deep = false;
    //深拷贝情况处理
    if(typeof target === "boolean"){
        deep = target;
        //跳过 boolean 和 target
        target = arguments[index] || {};
        index++;
    }
    //当目标是一个字符串或深拷贝的情况下
    if(typeof target !== "object" && typeof target !=="function"){
        target = {};
    };
    //扩展 kelat 本身，如果只有一个参数传递
    if(index === length ){
        target = this;
        index--;
    };
    for(;index< length;index++){
        //只处理非空/未定义的值
        if((options = arguments[index]) != null){
            //扩展基本对象
            for(name in options){
                src = target[name];
                copy = options[name];
                //防止无限循环
                if(target === copy){ continue; };
                //递归合并纯对象或数组
                if(deep && copy && (KUIAPP.isPlainObject(copy) || (copyIsArray = KUIAPP.isArray(copy)))){
                    if(copyIsArray){
                        copyIsArray = false;
                        clone = src && KUIAPP.isArray(src) ? src : [];
                    }else{
                        clone = src && KUIAPP.isPlainObject(src) ? src : {};
                    };
                    //不移动原始对象并克隆
                    target[name] = KUIAPP.Extend(deep, clone, copy);
                //不带未定义的值
                }else if(copy !== undefined){
                    target[name] = copy;
                };
            };
        };
    };
    //返回修改过的对象
    return target;
};

//设置语言
var KUILocale = {
  "SYSTEM_LANGUAGE": {
    "MODAL": {
        TIPS:'提示',
        OK:'确定',
        CANCEL:'取消'
    },
    "IMG":{
        IMGTIPS:'图片格式不正确或者跨域请求！',
        IMGPlaceholder :'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
    },
    "LOADING": [
      '正在加载...'
    ]
  },
  "WrapperArea": 'WrapperArea',
  "id": "zh-cn"
};
if(window['kelatlocale']){
    window['kelatlocale'] = KUIAPP.Extend(true,KUILocale,window['kelatlocale'])
}else{
    window['kelatlocale'] = KUILocale;
};
/***** 定义局部参数 *****/
var Local = {
    //网址
    website:'https://github.com/ficozh/KUI',
    //提示信息
    message:'\u60a8\u4f7f\u7528\u671f\u5df2\u5230\uff01',
    //图片
    ImgPlaceholder:kelatlocale.SYSTEM_LANGUAGE.IMG.IMGPlaceholder,
    ImgLazyLoadThreshold : 0,
    ImgLazyLoadSequential: true,
    ImgTips : kelatlocale.SYSTEM_LANGUAGE.IMG.IMGTIPS,
    // 区域设定
    WrapperArea : kelatlocale.WrapperArea,
    // 层高
    LayerIndex : '2000',
    // 加载
    LoadingTitle : kelatlocale.SYSTEM_LANGUAGE.LOADING,
    LoadingHtml : '<span class="Loading LoadingWhite"></span>',
    // 模态框
    ModalTitle : kelatlocale.SYSTEM_LANGUAGE.MODAL.TIPS,
    ModalButtonOk : kelatlocale.SYSTEM_LANGUAGE.MODAL.OK,
    ModalButtonCancel : kelatlocale.SYSTEM_LANGUAGE.MODAL.CANCEL,
    isModalPopover : false,
	// Material
	material: false,
	materialPageLoadDelay: 0,
	materialPreloaderSvg: '<svg xmlns="http://www.w3.org/2000/svg" height="75" width="75" viewbox="0 0 75 75"><circle cx="37.5" cy="37.5" r="33.5" stroke-width="8"/></svg>',
	materialPreloaderHtml:
		'<span class="preloader-inner">' +
			'<span class="preloader-inner-gap"></span>' +
			'<span class="preloader-inner-left">' +
				'<span class="preloader-inner-half-circle"></span>' +
			'</span>' +
			'<span class="preloader-inner-right">' +
				'<span class="preloader-inner-half-circle"></span>' +
			'</span>' +
		'</span>',
	materialRipple: true,
	materialRippleElements: '.ripple, a.link, a.item-link, .button, .modal-button, .tab-link, .label-radio, .label-checkbox, .actions-modal-button, a.searchbar-clear, a.floating-button, .floating-button > a, .speed-dial-buttons a, .form-checkbox, .form-radio, .data-table .sortable-cell',
            // Auto init
    //Swipeout
    swipeout: true,
    swipeoutActionsNoFold: false,
    swipeoutNoFollow: false,
    //屏幕大小标准
    screenSizes: {
        xs: 480,
        sm: 768,
        md: 992,
        lg: 1200
    },
    // 正则
    RegExpr : {
        rnotwhite : ( /\S+/g ),
        rclass : /[\t\r\n\f]/g,
        trim   : /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        device : {
            android : /(Android);?[\s\/]+([\d.]+)?/,
            ipad    : /(iPad).*OS\s([\d_]+)/,
            ipod    : /(iPod)(.*OS\s([\d_]+))?/,
            iphone  : /(iPhone\sOS)\s([\d_]+)/,
        },
        validate : {
            email   : /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
            phone   : /^((\(\d{3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}$/,
            mobile  : /^1[34578]\d{9}$/,
            number  : /^\d+$/,
            integer : /^[-\+]?\d+$/,
            english : /^[A-Za-z]+$/,
            chinese : /^[\u0391-\uFFE5]+$/,
            date    : /^(\d{4})年(0\d{1}|1[0-2])月(0\d{1}|[12]\d{1}|3[01])日$/
        }
    },
    // 特性支持检测
    support : (function(){
        /***** 事件检测 *****/
        var desktopEvents = ['mousedown', 'mousemove', 'mouseup'];
        if(window.navigator.pointerEnabled){
            desktopEvents = ['pointerdown', 'pointermove', 'pointerup'];
        }else if(window.navigator.msPointerEnabled){
            desktopEvents = ['MSPointerDown', 'MSPointerMove', 'MSPointerUp'];
        };
        var support = {};
            support['touch'] = !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
            //选中检查 checked="checked" or checked
            support['rchecked'] = /checked\s*(?:[^=]|=\s*.checked.)/i,
            //事件检测
            support['desktopEvents'] = desktopEvents;
            //事件类型
            support['onClick'] = support.touch ? 'tap' : 'click';
            /**滚动条位置
             * @return {Array} 滚动条 X,滚动条 Y
             */
            support['GetPageScroll'] = function() {
                var x = "",y = "";
                if(window.pageYOffset){
                    //除了IE
                    y = window.pageYOffset;x = window.pageXOffset;
                }else if(document.documentElement && document.documentElement.scrollTop){
                    //IE 6严格
                    y = document.documentElement.scrollTop;x = document.documentElement.scrollLeft;
                }else if(document.body){
                    //所有其他的IE
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
                return {"PageW":_PageW,"PageH":_PageH,"WinW":_WinW,"WinH":_WinH};
            };
        return support;
    })()
};

//提示信息
(function(){
    if(!window.isHello){
        var KUI ="kelat.js " + version + " - ✰ KUI ✰ ";
        var KUIMail ="\n\n如有任何意见和建议可发送邮件至 ficozh@163.com\n\n";
        var Padding = 'padding:5px 0';
        var Padding0CF = 'background:#0CF;'+Padding;
        var Padding111 = 'background:#111;color:#FFF;'+Padding;
        var PaddingCFF = 'background:#CFF;'+Padding;
        var Color000 = 'color:#000';
        if(navigator.userAgent.toLowerCase().indexOf("chrome") > -1){
            var Copyright = ["%c %c "+KUI+" %c %c " + Local.website + " %c %c " + KUIMail,Padding0CF,Padding111,Padding0CF,PaddingCFF,Padding0CF,Color000];
            window.console.log.apply(console, Copyright)
        }else{
            window.console && window.console.log(KUI + Local.website + KUIMail);
        }
        window.isHello = !0;
    }
})();

/***** 创建对象 *****/
if(!window['kelat']){
    window['kelat'] = function(selector, context){
        return new window['kelat']['kelatDom'](selector, context);
    };
    window['kelat']['version'] = version;
}else{
    return
};
/***** DOM 操作 *****/
/** 获得类 */
function getClass(elem) {
    return elem.getAttribute && elem.getAttribute( "class" ) || "";
};

var kelatDom = (function(){
    var kelatDom = function(arr){
        var _this = this, i = 0;
        //创建数组对象
        for(i = 0; i < arr.length; i++){
            _this[i] = arr[i];
        }
        _this.length = arr.length;
        //返回集合的方法
        return this;
    };
    var $ = function(selector, context){
        var arr = [], i = 0;
        if(selector && !context){
            if(selector instanceof kelatDom){
                return selector;
            };
        };
        if(selector){
            //String
            if(typeof selector === 'string'){
                var els, tempParent, html; 
                    selector = html = selector.replace(Local.RegExpr.trim,'');
                if(html.indexOf('<') >= 0 && html.indexOf('>') >= 0){
                    var toCreate = 'div';
                    if(html.indexOf('<li') === 0){toCreate = 'ul';}
                    if(html.indexOf('<tr') === 0){toCreate = 'tbody';}
                    if(html.indexOf('<td') === 0 || html.indexOf('<th') === 0){toCreate = 'tr';}
                    if(html.indexOf('<tbody') === 0){toCreate = 'table';}
                    if(html.indexOf('<option') === 0){toCreate = 'select';}
                    tempParent = document.createElement(toCreate);
                    tempParent.innerHTML = html;
                    for(i = 0; i < tempParent.childNodes.length; i++){
                        arr.push(tempParent.childNodes[i]);
                    };
                }else{
                    if(!context && selector[0] === '#' && !selector.match(/[ .<>:~]/)){
                        //纯ID选择器
                        els = [document.getElementById(selector.split('#')[1])];
                    }else{
                        //其他选择
                        els = (context || document).querySelectorAll(selector);
                    };
                    for(i = 0; i < els.length; i++){
                        if (els[i]) arr.push(els[i]);
                    };
                };
            }
            //节点/单元
            else if(selector.nodeType || selector === window || selector === document){
                arr.push(selector);
            }
            //对DOM元素或实例数组
            else if(selector.length > 0 && selector[0].nodeType){
                for(i = 0; i < selector.length; i++){
                    arr.push(selector[i]);
                }
            }
        }
        return new kelatDom(arr);
    };

    kelatDom.prototype = {
        //类和属性
        addClass: function(className){
            var classes, elem, cur, curValue, clazz, j, finalValue,i = 0;
            if(typeof className === "function"){
                return this.each(function(j){
                    $$(this).addClass(className.call(this, j, getClass(this)));
                });
            };
            if(typeof className === "string" && className ){
                classes = className.match(Local.RegExpr.rnotwhite) || [];
                while(( elem = this[ i++ ] )){
                    curValue = getClass(elem);
                    cur = elem.nodeType === 1 && (" " + curValue + " ").replace(Local.RegExpr.rclass," ");
                    if(cur){
                        j=0;
                        while((clazz = classes[ j++ ])){
                            if(cur.indexOf(" " + clazz + " ") < 0){
                                cur += clazz + " ";
                            }
                        }
                        // Only assign if different to avoid unneeded rendering.
                        finalValue = cur.replace(Local.RegExpr.trim,'');
                        if(curValue !== finalValue){
                            elem.setAttribute("class", finalValue);
                        }
                    }
                }
            }
            return this;
            /*if (typeof className === 'undefined' || className === '') {
                return this;
            }
            var classes = className.split(' ');
            for (var i = 0; i < classes.length; i++) {
                for (var j = 0; j < this.length; j++) {
                    if (typeof this[j].classList !== 'undefined') this[j].classList.add(classes[i]);
                }
            }
            return this;*/
        },
        removeClass: function(className){
            var classes = className.split(' ');
            for(var i = 0; i < classes.length; i++){
                for(var j = 0; j < this.length; j++){
                    if(typeof this[j].classList !== 'undefined'){
                        this[j].classList.remove(classes[i]);
                    }
                }
            }
            return this;
        },
        hasClass: function(className){
            return !this[0] ? false : this[0].classList.contains(className);
        },
        toggleClass: function(className){
            var classes = className.split(' ');
            for(var i = 0; i < classes.length; i++){
                for(var j = 0; j < this.length; j++){
                    if(typeof this[j].classList !== 'undefined'){
                        this[j].classList.toggle(classes[i]);
                    }
                }
            }
            return this;
        },
        attr: function(attrs, value){
            if(arguments.length === 1 && typeof attrs === 'string'){
                //获取attr
                if(this[0]) return this[0].getAttribute(attrs);
                else return undefined;
            }else{
                //设定attrs
                for(var i = 0; i < this.length; i++) {
                    if(arguments.length === 2){
                        //String
                        this[i].setAttribute(attrs, value);
                    }else{
                        //Object
                        for(var attrName in attrs){
                            this[i][attrName] = attrs[attrName];
                            this[i].setAttribute(attrName, attrs[attrName]);
                        }
                    }
                }
                return this;
            }
        },
        removeAttr: function(attr){
            for(var i = 0; i < this.length; i++){
                this[i].removeAttribute(attr);
            }
            return this;
        },
        prop: function(props, value){
            if(arguments.length === 1 && typeof props === 'string'){
                //获取
                return this[0] ? this[0][props] : undefined;
            }else{
                //设定
                for(var i = 0; i < this.length; i++){
                    if(arguments.length === 2){
                        // String
                        this[i][props] = value;
                    }else{
                        // Object
                        for(var propName in props){
                            this[i][propName] = props[propName];
                        }
                    }
                }
                return this;
            }
        },
        data: function(key, value){
            if(typeof value === 'undefined') {
                //获取value
                if(this[0]){
                    if(this[0].kelatDomElementDataStorage && (key in this[0].kelatDomElementDataStorage)){
                        return this[0].kelatDomElementDataStorage[key];
                    }else{
                        var dataKey = this[0].getAttribute('data-' + key); 
                        return dataKey ? dataKey : undefined;
                    }
                }else{
                    return undefined;
                }
            }else{
                //设定value
                for(var i = 0; i < this.length; i++){
                    var el = this[i];
                    if(!el.kelatDomElementDataStorage) el.kelatDomElementDataStorage = {};
                    el.kelatDomElementDataStorage[key] = value;
                }
                return this;
            }
        },
        removeData: function(key){
            for(var i = 0; i < this.length; i++){
                var el = this[i];
                if(el.kelatDomElementDataStorage && el.kelatDomElementDataStorage[key]){
                    el.kelatDomElementDataStorage[key] = null;
                    delete el.kelatDomElementDataStorage[key];
                }
            }
        },
        dataset: function(){
            var el = this[0];
            if(el){
                var dataset = {};
                if(el.dataset){
                    for(var dataKey in el.dataset){
                        dataset[dataKey] = el.dataset[dataKey];
                    }
                }else{
                    for(var i = 0; i < el.attributes.length; i++){
                        var attr = el.attributes[i];
                        if(attr.name.indexOf('data-') >= 0){
                            dataset[$.toCamelCase(attr.name.split('data-')[1])] = attr.value;
                        }
                    }
                }
                for(var key in dataset){
                    if(dataset[key] === 'false') { dataset[key] = false; }
                    else if (dataset[key] === 'true') { dataset[key] = true; }
                    else if (parseFloat(dataset[key]) === dataset[key] * 1) { dataset[key] = dataset[key] * 1; }
                }
                return dataset;
            }else {
                return undefined;
            }
        },
        val: function(value){
            if(typeof value === 'undefined'){
                return this[0] ? this[0].value : undefined;
            }else{
                for(var i = 0; i < this.length; i++){
                    this[i].value = value;
                }
                return this;
            }
        },
        //变换
        transform : function(transform){
            for(var i = 0; i < this.length; i++){
                var elStyle = this[i].style;
                elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = transform;
            }
            return this;
        },
        transition: function(duration){
            if(typeof duration !== 'string'){
                duration = duration + 'ms';
            }
            for(var i = 0; i < this.length; i++){
                var elStyle = this[i].style;
                elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = duration;
            }
            return this;
        },
        //事件
        on: function(eventName, targetSelector, listener, capture){
            function handleLiveEvent(e) {
                var target = e.target;
                if($(target).is(targetSelector)) {
                    listener.call(target, e);
                }else{
                    var parents = $(target).parents();
                    for(var k = 0; k < parents.length; k++){
                        if($(parents[k]).is(targetSelector)){
                            listener.call(parents[k], e);
                        }
                    }
                }
            }
            var events = eventName.split(' ');
            var i, j;
            for(i = 0; i < this.length; i++){
                if(typeof targetSelector === 'function' || targetSelector === false){
                    // Usual events
                    if(typeof targetSelector === 'function'){
                        listener = arguments[1];
                        capture = arguments[2] || false;
                    }
                    for(j = 0; j < events.length; j++){
                        this[i].addEventListener(events[j], listener, capture);
                    }
                }else{
                    //Live events
                    for(j = 0; j < events.length; j++){
                        if(!this[i].kelatDomLiveListeners) this[i].kelatDomLiveListeners = [];
                        this[i].kelatDomLiveListeners.push({listener: listener, liveListener: handleLiveEvent});
                        this[i].addEventListener(events[j], handleLiveEvent, capture);
                    }
                }
            }
            return this;
        },
        off: function(eventName, targetSelector, listener, capture){
            var events = eventName.split(' ');
            for(var i = 0; i < events.length; i++){
                for(var j = 0; j < this.length; j++){
                    if(typeof targetSelector === 'function' || targetSelector === false){
                        //异常事件
                        if(typeof targetSelector === 'function'){
                            listener = arguments[1];
                            capture = arguments[2] || false;
                        }
                        this[j].removeEventListener(events[i], listener, capture);
                    }else{
                        //Live event
                        if(this[j].kelatDomLiveListeners){
                            for(var k = 0; k < this[j].kelatDomLiveListeners.length; k++){
                                if(this[j].kelatDomLiveListeners[k].listener === listener){
                                    this[j].removeEventListener(events[i], this[j].kelatDomLiveListeners[k].liveListener, capture);
                                }
                            }
                        }
                    }
                }
            }
            return this;
        },
        once: function(eventName, targetSelector, listener, capture){
            var dom = this;
            if(typeof targetSelector === 'function'){
                listener = arguments[1];
                capture = arguments[2];
                targetSelector = false;
            }
            function proxy(e){
                listener.call(e.target, e);
                dom.off(eventName, targetSelector, proxy, capture);
            }
            return dom.on(eventName, targetSelector, proxy, capture);
        },
        bind: function(types, data, fn){
            return this.on(types, null, data, fn);
        },
        unbind: function(types, fn){
            return this.off(types, null, fn);
        },
        trigger: function(eventName, eventData){
            var events = eventName.split(' ');
            for(var i = 0; i < events.length; i++){
                for(var j = 0; j < this.length; j++){
                    var evt;
                    try{
                        evt = new CustomEvent(events[i], {detail: eventData, bubbles: true, cancelable: true});
                    }catch(e){
                        evt = document.createEvent('Event');
                        evt.initEvent(events[i], true, true);
                        evt.detail = eventData;
                    }
                    this[j].dispatchEvent(evt);
                }
            }
            return this;
        },
        transitionEnd: function(callback){
            var events = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'], i, dom = this;
            function fireCallBack(e){
                /*jshint validthis:true */
                if(e.target !== this){ return; }
                callback.call(this, e);
                for(i = 0; i < events.length; i++){
                    dom.off(events[i], fireCallBack);
                }
            }
            if(callback){
                for(i = 0; i < events.length; i++){
                    dom.on(events[i], fireCallBack);
                }
            }
            return this;
        },
        animationEnd: function(callback){
            var events = ['webkitAnimationEnd', 'OAnimationEnd', 'MSAnimationEnd', 'animationend'], i, dom = this;
            function fireCallBack(e){
                callback(e);
                for(i = 0; i < events.length; i++){
                    dom.off(events[i], fireCallBack);
                }
            }
            if(callback){
                for(i = 0; i < events.length; i++){
                    dom.on(events[i], fireCallBack);
                }
            }
            return this;
        },
        //尺寸/样式
        width: function(){
            if(this[0] === window){
                return window.innerWidth;
            }else{
                return (this.length > 0) ? parseFloat(this.css('width')) : null;
            }
        },
        outerWidth: function(includeMargins){
            if(this.length > 0){
                if(includeMargins){
                    var styles = this.styles();
                    return this[0].offsetWidth + parseFloat(styles.getPropertyValue('margin-right')) + parseFloat(styles.getPropertyValue('margin-left'));
                }else{
                    return this[0].offsetWidth;
                }
            }else{
                return null;
            }
        },
        height: function(){
            if(this[0] === window){
                return window.innerHeight;
            }else{
                return (this.length > 0) ? parseFloat(this.css('height')) : null ;
            }
        },
        outerHeight: function(includeMargins){
            if(this.length > 0){
                if(includeMargins){
                    var styles = this.styles();
                    return this[0].offsetHeight + parseFloat(styles.getPropertyValue('margin-top')) + parseFloat(styles.getPropertyValue('margin-bottom'));    
                }else{
                    return this[0].offsetHeight;
                }
            }else{
                return null;
            }
        },
        offset: function(){
            if(this.length > 0){
                var el = this[0];
                var box = el.getBoundingClientRect();
                var body = document.body;
                var clientTop  = el.clientTop  || body.clientTop  || 0;
                var clientLeft = el.clientLeft || body.clientLeft || 0;
                var scrollTop  = window.pageYOffset || el.scrollTop;
                var scrollLeft = window.pageXOffset || el.scrollLeft;
                return {
                    top: box.top  + scrollTop  - clientTop,
                    left: box.left + scrollLeft - clientLeft
                };
            }else{
                return null;
            }
        },
        hide: function(){
            for(var i = 0; i < this.length; i++){
                this[i].style.display = 'none';
            }
            return this;
        },
        show: function(){
            for(var i = 0; i < this.length; i++){
                this[i].style.display = 'block';
            }
            return this;
        },
        styles: function(){
            if(this[0]){ return window.getComputedStyle(this[0], null); }
        },
        css: function(props, value){
            var i;
            if(arguments.length === 1){
                if(typeof props === 'string'){
                    if(this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(props);
                }else{
                    for(i = 0; i < this.length; i++){
                        for(var prop in props){
                            this[i].style[prop] = props[prop];
                        }
                    }
                    return this;
                }
            }
            if(arguments.length === 2 && typeof props === 'string'){
                for(i = 0; i < this.length; i++){
                    this[i].style[props] = value;
                }
                return this;
            }
            return this;
        },
        //DOM操作
        each: function(callback){
            for(var i = 0; i < this.length; i++){
                callback.call(this[i], i, this[i]);
            }
            return this;
        },
        filter: function(callback){
            var matchedItems = [];
            var dom = this;
            for(var i = 0; i < dom.length; i++){
                if(callback.call(dom[i], i, dom[i])) matchedItems.push(dom[i]);
            }
            return new kelatDom(matchedItems);
        },
        html: function(html){
            if(typeof html === 'undefined'){
                return this[0] ? this[0].innerHTML : undefined;
            }else{
                for(var i = 0; i < this.length; i++) {
                    this[i].innerHTML = html;
                }
                return this;
            }
        },
        text: function(text){
            if(typeof text === 'undefined'){
                return this[0] ? this[0].textContent.trim() : null;
            }else{
                for(var i = 0; i < this.length; i++){
                    this[i].textContent = text;
                }
                return this;
            }
        },
        is: function(selector){
            if(!this[0] || typeof selector === 'undefined') return false;
            var compareWith, i;
            if(typeof selector === 'string'){
                var el = this[0];
                if(el === document) return selector === document;
                if(el === window) return selector === window;
                if(el.matches){ return el.matches(selector);}
                else if(el.webkitMatchesSelector){return el.webkitMatchesSelector(selector);}
                else if(el.mozMatchesSelector){return el.mozMatchesSelector(selector);}
                else if(el.msMatchesSelector){return el.msMatchesSelector(selector);}
                else{
                    compareWith = $(selector);
                    for(i = 0; i < compareWith.length; i++){
                        if(compareWith[i] === this[0]){
                            return true;
                        };
                    }
                    return false;
                }
            }else if(selector === document){return this[0] === document;}
            else if(selector === window){return this[0] === window;}
            else {
                if(selector.nodeType || selector instanceof kelatDom){
                    compareWith = selector.nodeType ? [selector] : selector;
                    for(i = 0; i < compareWith.length; i++){
                        if(compareWith[i] === this[0]) return true;
                    }
                    return false;
                }
                return false;
            }
    
        },
        indexOf: function(el){
            for(var i = 0; i < this.length; i++){
                if(this[i] === el) return i;
            }
        },
        index: function(){
            if(this[0]){
                var child = this[0];
                var i = 0;
                while((child = child.previousSibling) !== null){
                    if(child.nodeType === 1) i++;
                }
                return i;
            }else{
                return undefined;
            }
        },
        eq: function(index){
            if(typeof index === 'undefined') return this;
            var length = this.length;
            var returnIndex;
            if(index > length - 1){
                return new kelatDom([]);
            }
            if(index < 0){
                returnIndex = length + index;
                if (returnIndex < 0) return new kelatDom([]);
                else return new kelatDom([this[returnIndex]]);
            }
            return new kelatDom([this[index]]);
        },
        append: function(newChild){
            var i, j;
            for(i = 0; i < this.length; i++){
                if(typeof newChild === 'string'){
                    var tempDiv = document.createElement('div');
                    tempDiv.innerHTML = newChild;
                    while (tempDiv.firstChild) {
                        this[i].appendChild(tempDiv.firstChild);
                    }
                }else if(newChild instanceof kelatDom){
                    for(j = 0; j < newChild.length; j++){
                        this[i].appendChild(newChild[j]);
                    }
                }else{
                    this[i].appendChild(newChild);
                }
            }
            return this;
        },
        appendTo: function(parent){
            $(parent).append(this);
            return this;
        },
        prepend: function(newChild){
            var i, j;
            for(i = 0; i < this.length; i++){
                if(typeof newChild === 'string'){
                    var tempDiv = document.createElement('div');
                    tempDiv.innerHTML = newChild;
                    for(j = tempDiv.childNodes.length - 1; j >= 0; j--){
                        this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0]);
                    }
                    // this[i].insertAdjacentHTML('afterbegin', newChild);
                }else if(newChild instanceof kelatDom){
                    for(j = 0; j < newChild.length; j++){
                        this[i].insertBefore(newChild[j], this[i].childNodes[0]);
                    }
                }else{
                    this[i].insertBefore(newChild, this[i].childNodes[0]);
                }
            }
            return this;
        },
        prependTo: function(parent){
            $(parent).prepend(this);
            return this;
        },
        insertBefore: function(selector){
            var before = $(selector);
            for(var i = 0; i < this.length; i++){
                if(before.length === 1){
                    before[0].parentNode.insertBefore(this[i], before[0]);
                }else if(before.length > 1){
                    for(var j = 0; j < before.length; j++){
                        before[j].parentNode.insertBefore(this[i].cloneNode(true), before[j]);
                    }
                }
            }
        },
        insertAfter: function(selector){
            var after = $(selector);
            for (var i = 0; i < this.length; i++) {
                if (after.length === 1) {
                    after[0].parentNode.insertBefore(this[i], after[0].nextSibling);
                }
                else if (after.length > 1) {
                    for (var j = 0; j < after.length; j++) {
                        after[j].parentNode.insertBefore(this[i].cloneNode(true), after[j].nextSibling);
                    }
                }
            }
        },
        next: function(selector){
            if(this.length > 0){
                if(selector){
                    if(this[0].nextElementSibling && $(this[0].nextElementSibling).is(selector)){
                        return new kelatDom([this[0].nextElementSibling]);
                    }else{
                        return new kelatDom([]);
                    };
                }else{
                    if(this[0].nextElementSibling){
                        return new kelatDom([this[0].nextElementSibling]);
                    }else{
                        return new kelatDom([]);
                    };
                }
            }
            else return new kelatDom([]);
        },
        nextAll: function(selector){
            var nextEls = [];
            var el = this[0];
            if(!el) return new kelatDom([]);
            while(el.nextElementSibling){
                var next = el.nextElementSibling;
                if(selector){
                    if($(next).is(selector)) nextEls.push(next);
                }
                else nextEls.push(next);
                el = next;
            }
            return new kelatDom(nextEls);
        },
        prev: function(selector){
            if(this.length > 0){
                if(selector){
                    if(this[0].previousElementSibling && $(this[0].previousElementSibling).is(selector)) return new kelatDom([this[0].previousElementSibling]);
                    else return new kelatDom([]);
                }else{
                    if (this[0].previousElementSibling) return new kelatDom([this[0].previousElementSibling]);
                    else return new kelatDom([]);
                }
            }
            else return new kelatDom([]);
        },
        prevAll: function(selector){
            var prevEls = [];
            var el = this[0];
            if(!el) return new kelatDom([]);
            while(el.previousElementSibling){
                var prev = el.previousElementSibling;
                if(selector){
                    if($(prev).is(selector)) prevEls.push(prev);
                }
                else prevEls.push(prev);
                el = prev;
            }
            return new kelatDom(prevEls);
        },
        siblings: function (selector) {
            return this.nextAll(selector).add(this.prevAll(selector));
        },
        parent: function(selector){
            var parents = [];
            for(var i = 0; i < this.length; i++){
                if(this[i].parentNode !== null){
                    if(selector){
                        if($(this[i].parentNode).is(selector)) parents.push(this[i].parentNode);
                    }else{
                       parents.push(this[i].parentNode);
                    }
                }
            }
            return $($.unique(parents));
        },
        parents: function(selector){
            var parents = [];
            for(var i = 0; i < this.length; i++){
                var parent = this[i].parentNode;
                while(parent){
                    if(selector){
                        if($(parent).is(selector)) parents.push(parent);
                    }else{
                        parents.push(parent);
                    }
                    parent = parent.parentNode;
                }
            }
            return $($.unique(parents));
        },
        closest: function(selector){
            var closest = this;
            if(typeof selector === 'undefined'){
                return new kelatDom([]);
            }
            if(!closest.is(selector)){
                closest = closest.parents(selector).eq(0);
            }
            return closest;
        },
        find : function(selector){
            var foundElements = [];
            for(var i = 0; i < this.length; i++){
                var found = this[i].querySelectorAll(selector);
                for(var j = 0; j < found.length; j++){
                    foundElements.push(found[j]);
                }
            }
            return new kelatDom(foundElements);
        },
        children: function(selector){
            var children = [];
            for(var i = 0; i < this.length; i++){
                var childNodes = this[i].childNodes;
                for(var j = 0; j < childNodes.length; j++){
                    if(!selector){
                        if(childNodes[j].nodeType === 1) children.push(childNodes[j]);
                    }else{
                        if(childNodes[j].nodeType === 1 && $(childNodes[j]).is(selector)) children.push(childNodes[j]);
                    }
                }
            }
            return new kelatDom($.unique(children));
        },
        remove: function(){
            for(var i = 0; i < this.length; i++){
                if(this[i].parentNode) this[i].parentNode.removeChild(this[i]);
            }
            return this;
        },
        detach: function(){
            return this.remove();
        },
        add: function(){
            var dom = this;
            var i, j;
            for(i = 0; i < arguments.length; i++){
                var toAdd = $(arguments[i]);
                for(j = 0; j < toAdd.length; j++){
                    dom[dom.length] = toAdd[j];
                    dom.length++;
                }
            }
            return dom;
        },
        ready: function(fn){
            var fired = false;
            function trigger(){
                document.removeEventListener( "DOMContentLoaded", trigger );
                window.removeEventListener( "load", trigger );
                if(fired){
                    return
                };
                fired = true;
                fn && fn();
            };           
            //检查 document 是否已加载
            if (document.readyState === 'complete' || ( document.readyState !== "loading" && !document.documentElement.doScroll )) {
                window.setTimeout(trigger);
            }else{
                //使用事件回调
                document.addEventListener( "DOMContentLoaded", trigger );
                window.addEventListener( "load", trigger );
            }
        },
        trim: function(text){
            return typeof text === 'string' && running ? text.replace(Local.RegExpr.trim,'') : '';
        },
        empty: function () {
            for (var i = 0; i < this.length; i++) {
                var el = this[i];
                if (el.nodeType === 1) {
                    for (var j = 0; j < el.childNodes.length; j++) {
                        if (el.childNodes[j].parentNode) el.childNodes[j].parentNode.removeChild(el.childNodes[j]);
                    }
                    el.textContent = '';
                }
            }
            return this;
        }
    };
    
    //事件扩展
    (function(){
        var shortcuts = ('click blur focus focusin focusout keyup keydown keypress submit change mousedown mousemove mouseup mouseenter mouseleave mouseout mouseover touchstart touchend touchmove resize scroll').split(' ');
        var notTrigger = ('resize scroll').split(' ');
        function createMethod(name) {
            kelatDom.prototype[name] = function(targetSelector, listener, capture){
                var i;
                if(typeof targetSelector === 'undefined'){
                    for(i = 0; i < this.length; i++){
                        if(notTrigger.indexOf(name) < 0){
                            if(name in this[i]) {
                                this[i][name]();
                            }else{
                                $(this[i]).trigger(name);
                            }
                        }
                    }
                    return this;
                }else{
                    return this.on(name, targetSelector, listener, capture);
                }
            };
        }
        for(var i = 0; i < shortcuts.length; i++){
            createMethod(shortcuts[i]);
        }
    })();


    // Global Ajax Setup
    var globalAjaxOptions = {};
    $.ajaxSetup = function(options){
        if(options.type) options.method = options.type;
        $.each(options, function (optionName, optionValue){
            globalAjaxOptions[optionName]  = optionValue;
        });
    };
    
    //Ajax
    var _jsonpRequests = 0;
    $.ajax = function(options){
        var defaults = {
            method: 'GET',
            data: false,async: true,cache: true,processData: true,
            user: '',password: '',
            headers: {},xhrFields: {},statusCode: {},
            dataType: 'text',
            contentType: 'application/x-www-form-urlencoded',
            timeout: 0
        };
        var callbacks = ['beforeSend', 'error', 'complete', 'success', 'statusCode'];
        //For jQuery guys
        if(options.type){
            options.method = options.type;
        };
        //合并全局和默认值
        $.each(globalAjaxOptions, function (globalOptionName, globalOptionValue){
            if(callbacks.indexOf(globalOptionName) < 0) defaults[globalOptionName] = globalOptionValue;
        });    
        //XHR回调和事件
        function fireAjaxCallback(eventName, eventData, callbackName){
            var a = arguments;
            if(eventName){
                $(document).trigger(eventName, eventData);
            };
            if(callbackName){
                // Global callback
                if(callbackName in globalAjaxOptions){
                    globalAjaxOptions[callbackName](a[3], a[4], a[5], a[6]);
                };
                // Options callback
                if(options[callbackName]){
                    options[callbackName](a[3], a[4], a[5], a[6]);
                };
            };
        };    
        // 循环选项和缺省值
        $.each(defaults, function(prop, defaultValue){
            if(!(prop in options)){
                options[prop] = defaultValue;
            };
        });
        //默认URL
        if(!options.url){
            options.url = window.location.toString();
        }
        //参数前缀
        var paramsPrefix = options.url.indexOf('?') >= 0 ? '&' : '?';
        //UC方法
        var _method = options.method.toUpperCase();
        //Data to modify GET URL
        if((_method === 'GET' || _method === 'HEAD' || _method === 'OPTIONS' || _method === 'DELETE') && options.data){
            var stringData;
            if(typeof options.data === 'string'){
                //Should be key=value string
                if(options.data.indexOf('?') >= 0){
                    stringData = options.data.split('?')[1];
                }else{
                    stringData = options.data;
                };
            }else{
                // Should be key=value object
                stringData = $.serializeObject(options.data);
            };
            if(stringData.length){
                options.url += paramsPrefix + stringData;
                if(paramsPrefix === '?'){
                    paramsPrefix = '&';
                };
            };
        };
        //JSONP
        if(options.dataType === 'json' && options.url.indexOf('callback=') >= 0){
            var callbackName = 'kelat_jsonp_' + Date.now() + (_jsonpRequests++);
            var abortTimeout;
            var callbackSplit = options.url.split('callback=');
            var requestUrl = callbackSplit[0] + 'callback=' + callbackName;
            if(callbackSplit[1].indexOf('&') >= 0){
                var addVars = callbackSplit[1].split('&').filter(function (el) { return el.indexOf('=') > 0; }).join('&');
                if(addVars.length > 0){
                    requestUrl += '&' + addVars;
                };
            };
            //创建脚本
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.onerror = function(){
                clearTimeout(abortTimeout);
                fireAjaxCallback(undefined, undefined, 'error', null, 'scripterror');
            };
            script.src = requestUrl;
            //处理器
            window[callbackName] = function(data){
                clearTimeout(abortTimeout);
                fireAjaxCallback(undefined, undefined, 'success', data);
                script.parentNode.removeChild(script);
                script = null;
                delete window[callbackName];
            };
            document.querySelector('head').appendChild(script);
            if(options.timeout > 0){
                abortTimeout = setTimeout(function () {
                    script.parentNode.removeChild(script);
                    script = null;
                    fireAjaxCallback(undefined, undefined, 'error', null, 'timeout');
                }, options.timeout);
            };    
            return;
        };
        //缓存GET / HEAD请求
        if(_method === 'GET' || _method === 'HEAD' || _method === 'OPTIONS' || _method === 'DELETE'){
            if(options.cache === false){
                options.url += (paramsPrefix + '_nocache=' + Date.now());
            };
        };
        //创建XHR
        var xhr = new XMLHttpRequest();
        //保存请求URL
        xhr.requestUrl = options.url;
        xhr.requestParameters = options;
        //打开XHR
        xhr.open(_method, options.url, options.async, options.user, options.password);
        //创建POST数据
        var postData = null;
        if((_method === 'POST' || _method === 'PUT' || _method === 'PATCH') && options.data){
            if(options.processData){
                var postDataInstances = [ArrayBuffer, Blob, Document, FormData];
                //POST数据
                if(postDataInstances.indexOf(options.data.constructor) >= 0){
                    postData = options.data;
                }else{
                    //POST Headers
                    var boundary = '---------------------------' + Date.now().toString(16);
                    if(options.contentType === 'multipart\/form-data'){
                        xhr.setRequestHeader('Content-Type', 'multipart\/form-data; boundary=' + boundary);
                    }else{
                        xhr.setRequestHeader('Content-Type', options.contentType);
                    };
                    postData = '';
                    var _data = $.serializeObject(options.data);
                    if(options.contentType === 'multipart\/form-data'){
                        boundary = '---------------------------' + Date.now().toString(16);
                        _data = _data.split('&');
                        var _newData = [];
                        for(var i = 0; i < _data.length; i++) {
                            _newData.push('Content-Disposition: form-data; name="' + _data[i].split('=')[0] + '"\r\n\r\n' + _data[i].split('=')[1] + '\r\n');
                        }
                        postData = '--' + boundary + '\r\n' + _newData.join('--' + boundary + '\r\n') + '--' + boundary + '--\r\n';
                    }else{
                        postData = options.contentType === 'application/x-www-form-urlencoded' ? _data : _data;
                    }
                }
            }else{
                postData = options.data;
            };
        };
        // 附加 headers
        if(options.headers){
            $.each(options.headers, function(headerName, headerCallback){
                xhr.setRequestHeader(headerName, headerCallback);
            });
        }    
        // 检查跨域
        if(typeof options.crossDomain === 'undefined'){
            options.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(options.url) && RegExp.$2 !== window.location.host;
        }    
        if(!options.crossDomain){
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        }    
        if(options.xhrFields){
            $.each(options.xhrFields, function (fieldName, fieldValue) {
                xhr[fieldName] = fieldValue;
            });
        }    
        var xhrTimeout;
        //句柄XHR
        xhr.onload = function(e){
            if(xhrTimeout) clearTimeout(xhrTimeout);
            if((xhr.status >= 200 && xhr.status < 300) || xhr.status === 0){
                var responseData;
                if(options.dataType === 'json'){
                    try{
                        responseData = JSON.parse(xhr.responseText);
                        fireAjaxCallback('ajaxSuccess', {xhr: xhr}, 'success', responseData, xhr.status, xhr);
                    }catch(err){
                        fireAjaxCallback('ajaxError', {xhr: xhr, parseerror: true}, 'error', xhr, 'parseerror');
                    };
                }else{
                    responseData = xhr.responseType === 'text' || xhr.responseType === '' ? xhr.responseText : xhr.response;
                    fireAjaxCallback('ajaxSuccess', {xhr: xhr}, 'success', responseData, xhr.status, xhr);
                };
            }else{
                fireAjaxCallback('ajaxError', {xhr: xhr}, 'error', xhr, xhr.status);
            }
            if(options.statusCode){
                if(globalAjaxOptions.statusCode && globalAjaxOptions.statusCode[xhr.status]){
                    globalAjaxOptions.statusCode[xhr.status](xhr);
                };
                if(options.statusCode[xhr.status]){
                    options.statusCode[xhr.status](xhr);
                };
            };
            fireAjaxCallback('ajaxComplete', {xhr: xhr}, 'complete', xhr, xhr.status);
        };    
        xhr.onerror = function(e){
            if(xhrTimeout) clearTimeout(xhrTimeout);
            fireAjaxCallback('ajaxError', {xhr: xhr}, 'error', xhr, xhr.status);
        };    
        // Ajax start callback
        fireAjaxCallback('ajaxStart', {xhr: xhr}, 'start', xhr);
        fireAjaxCallback(undefined, undefined, 'beforeSend', xhr);    
        // Send XHR
        xhr.send(postData);    
        // Timeout
        if(options.timeout > 0){
            xhr.onabort = function(){
                if(xhrTimeout) clearTimeout(xhrTimeout);
            };
            xhrTimeout = setTimeout(function(){
                xhr.abort();
                fireAjaxCallback('ajaxError', {xhr: xhr, timeout: true}, 'error', xhr, 'timeout');
                fireAjaxCallback('ajaxComplete', {xhr: xhr, timeout: true}, 'complete', xhr, 'timeout');
            }, options.timeout);
        };    
        // Return XHR object
        return xhr;
    };
    //Ajax扩展
    (function(){
        var methods = ('get post getJSON').split(' ');
        function createMethod(method){
            $[method] = function(url, data, success){
                return $.ajax({
                    url: url,
                    method: method === 'post' ? 'POST' : 'GET',
                    data: typeof data === 'function' ? undefined : data,
                    success: typeof data === 'function' ? data : success,
                    dataType: method === 'getJSON' ? 'json' : undefined
                });
            };
        }
        for(var i = 0; i < methods.length; i++){
            createMethod(methods[i]);
        };
    })();
    

    //DOM库工具
    $.each = function(obj, callback){
        if(typeof obj !== 'object') return;
        if(!callback) return;
        var i, prop;
        if(KUIAPP.isArray(obj) || obj instanceof kelatDom){
            //数组 Array
            for(i = 0; i < obj.length; i++){
                callback(i, obj[i]);
            };
        }else{
            //对象 Object
            for(prop in obj){
                if(obj.hasOwnProperty(prop)){
                    callback(prop, obj[prop]);
                };
            };
        };
    };
    $.unique = function(arr){
        var unique = [];
        for(var i = 0; i < arr.length; i++){
            if(unique.indexOf(arr[i]) === -1) unique.push(arr[i]);
        };
        return unique;
    };
    $.serializeObject = $.param = function(obj, parents){
        if(typeof obj === 'string') return obj;
        var resultArray = [];
        var separator = '&';
        parents = parents || [];
        var newParents;
        function var_name(name){
            if(parents.length > 0){
                var _parents = '';
                for(var j = 0; j < parents.length; j++){
                    if(j === 0){
                        _parents += parents[j];
                    }else{
                        _parents += '[' + encodeURIComponent(parents[j]) + ']';
                    };
                };
                return _parents + '[' + encodeURIComponent(name) + ']';
            }else{
                return encodeURIComponent(name);
            };
        };
        function var_value(value){
            return encodeURIComponent(value);
        }
        for(var prop in obj){
            if(obj.hasOwnProperty(prop)){
                var toPush;
                if(KUIAPP.isArray(obj[prop])){
                    toPush = [];
                    for(var i = 0; i < obj[prop].length; i ++){
                        if(!KUIAPP.isArray(obj[prop][i]) && typeof obj[prop][i] === 'object'){
                            newParents = parents.slice();
                            newParents.push(prop);
                            newParents.push(i + '');
                            toPush.push($.serializeObject(obj[prop][i], newParents));
                        }else{
                            toPush.push(var_name(prop) + '[]=' + var_value(obj[prop][i]));
                        };                        
                    };
                    if(toPush.length > 0) resultArray.push(toPush.join(separator));
                }else if(typeof obj[prop] === 'object'){
                    //对象转换为指定数组
                    newParents = parents.slice();
                    newParents.push(prop);
                    toPush = $.serializeObject(obj[prop], newParents);
                    if(toPush !== ''){
                        resultArray.push(toPush);
                    };
                }else if(typeof obj[prop] !== 'undefined' && obj[prop] !== ''){
                    //字符串或空白值
                    resultArray.push(var_name(prop) + '=' + var_value(obj[prop]));
                }
            }
        }
        return resultArray.join(separator);
    };
    $.toCamelCase = function(string){
        return string.toLowerCase().replace(/-(.)/g, function(match, group1) {
            return group1.toUpperCase();
        });
    };
    $.dataset = function(el){
        return $(el).dataset();
    };
    $.getTranslate = function(el, axis){
        var matrix, curTransform, curStyle, transformMatrix;
        //自动轴检测
        if(typeof axis === 'undefined'){
            axis = 'x';
        };
        curStyle = window.getComputedStyle(el, null);
        if(window.WebKitCSSMatrix){
            curTransform = curStyle.transform || curStyle.webkitTransform;
            if(curTransform.split(',').length > 6){
                curTransform = curTransform.split(', ').map(function(a){
                    return a.replace(',','.');
                }).join(', ');
            };
            // Some old versions of Webkit choke when 'none' is passed; pass
            // empty string instead in this case
            transformMatrix = new WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
        }else{
            transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform  || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
            matrix = transformMatrix.toString().split(',');
        }
    
        if(axis === 'x'){
            if(window.WebKitCSSMatrix){
                //最新的 Chrome and webkits
                curTransform = transformMatrix.m41;
            }else if(matrix.length === 16){
                //Crazy IE10 Matrix
                curTransform = parseFloat(matrix[12]);
            }else{
                //正常的浏览器
                curTransform = parseFloat(matrix[4]);
            };
        };
        if(axis === 'y'){
            if(window.WebKitCSSMatrix){
                //最新的 Chrome and webkits
                curTransform = transformMatrix.m42;
            }else if(matrix.length === 16){
                //Crazy IE10 Matrix
                curTransform = parseFloat(matrix[13]);
            }else{
                //正常的浏览器
                curTransform = parseFloat(matrix[5]);
            };
        };        
        return curTransform || 0;
    };
    
    $.requestAnimationFrame = function(callback){
        if (window.requestAnimationFrame){
            return window.requestAnimationFrame(callback);
        }else if(window.webkitRequestAnimationFrame){
            return window.webkitRequestAnimationFrame(callback);
        }else{
            return window.setTimeout(callback, 1000 / 60);
        }
    };
    $.cancelAnimationFrame = function(id){
        if(window.cancelAnimationFrame){
            return window.cancelAnimationFrame(id);
        }else if(window.webkitCancelAnimationFrame){
            return window.webkitCancelAnimationFrame(id);
        }else{
            return window.clearTimeout(id);
        }  
    };
    //链接到原型
    $.fn = kelatDom.prototype;
    //插件
    $.fn.scrollTo = function(left, top, duration, easing, callback){
        if (arguments.length === 4 && typeof easing === 'function') {
            callback = easing;
            easing = undefined;
        }
        return this.each(function(){
            var el = this;
            var currentTop, currentLeft, maxTop, maxLeft, newTop, newLeft, scrollTop, scrollLeft;
            var animateTop = top > 0 || top === 0;
            var animateLeft = left > 0 || left === 0;
            if(typeof easing === 'undefined'){
                easing = 'swing';
            }
            if(animateTop){
                currentTop = el.scrollTop;
                if(!duration){
                    el.scrollTop = top;
                }
            }
            if (animateLeft) {
                currentLeft = el.scrollLeft;
                if(!duration){
                    el.scrollLeft = left;
                }
            }
            if(!duration) return;
            if(animateTop){
                maxTop = el.scrollHeight - el.offsetHeight;
                newTop = Math.max(Math.min(top, maxTop), 0);
            }
            if(animateLeft){
                maxLeft = el.scrollWidth - el.offsetWidth;
                newLeft = Math.max(Math.min(left, maxLeft), 0);
            }
            var startTime = null;
            if(animateTop && newTop === currentTop) animateTop = false;
            if(animateLeft && newLeft === currentLeft) animateLeft = false;
            function render(time){
                if(time === undefined){
                    time = +(new Date());
                }
                if(startTime === null){
                    startTime = time;
                }
                var done;
                var progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
                var easeProgress = easing === 'linear' ? progress : (0.5 - Math.cos( progress * Math.PI ) / 2);
                if(animateTop) scrollTop = currentTop + (easeProgress * (newTop - currentTop));
                if(animateLeft) scrollLeft = currentLeft + (easeProgress * (newLeft - currentLeft));
                if(animateTop && newTop > currentTop && scrollTop >= newTop){
                    el.scrollTop = newTop;
                    done = true;
                }
                if(animateTop && newTop < currentTop && scrollTop <= newTop){
                    el.scrollTop = newTop;
                    done = true;
                };
                if(animateLeft && newLeft > currentLeft && scrollLeft >= newLeft){
                    el.scrollLeft = newLeft;
                    done = true;
                };
                if(animateLeft && newLeft < currentLeft && scrollLeft <= newLeft){
                    el.scrollLeft = newLeft;
                    done = true;
                };
                if(done){
                    if(callback) callback();
                    return;
                };
                if(animateTop) el.scrollTop = scrollTop;
                if(animateLeft) el.scrollLeft = scrollLeft;
                $.requestAnimationFrame(render);
            }
            $.requestAnimationFrame(render);
        });
    };
    $.fn.scrollTop = function(top, duration, easing, callback){
        if(arguments.length === 3 && typeof easing === 'function'){
            callback = easing;
            easing = undefined;
        }
        var dom = this;
        if(typeof top === 'undefined'){
            if (dom.length > 0) return dom[0].scrollTop;
            else return null;
        }
        return dom.scrollTo(undefined, top, duration, easing, callback);
    };
    $.fn.scrollLeft = function(left, duration, easing, callback){
        if(arguments.length === 3 && typeof easing === 'function'){
            callback = easing;
            easing = undefined;
        }
        var dom = this;
        if(typeof left === 'undefined'){
            if (dom.length > 0) return dom[0].scrollLeft;
            else return null;
        }
        return dom.scrollTo(left, undefined, duration, easing, callback);
    };
    return $;
})();
window['kelat']['kelatDom'] = kelatDom;

var $$ = kelatDom;

/***** fn方法 *****/
window['kelat']['fn'] = window['kelat'].prototype = {
    //文本流从右到左
    rtl : $$('body').css('direction') === 'rtl',
    //特性检测
    support : Local.support,
    //删除前后空格 和 BOM
    trim : function(string) {
        return typeof string === 'string' && running ? string.replace(Local.RegExpr.trim,'') : '';
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
    escapeHTML : function(string) {
        var replacements= {'<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;'};
        return string.replace(/[<>&"]/g, function(character){
            return replacements[character];
        }); 
    },
    //删除 html 标签
    removeHTML : function(string) {
        return string.replace(/<.*?>/ig,"");
    },
    //删除 指定 元素
    removeString : function(string, value) {
        var RE = new RegExp(value, "ig");
        return string.replace(RE,"");
    },
    /** Javascript函数节流
     * @alias throttle
     * @param {function} callBack:执行方法
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
        return running && window.console ? console.log(level || 'warning', ': ', message) : '';
    },
    /** 指定范围取随机数
     * @param {Number} max:最大值
     * @param {Number} min:最小值
     */
    range : function(max,min){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },    
    //H5本地存储 
    ls : window.localStorage ,
    /** 设备&操作系统探测
     * @alias device
     * @return {Object}
     */
    device : (function(){
        //定义设备对象    
        var device = {};
        var ua = navigator.userAgent;
    
        var android = ua.match(Local.RegExpr.device.android);
        var ipad = ua.match(Local.RegExpr.device.ipad);
        var ipod = ua.match(Local.RegExpr.device.ipod);
        var iphone = !ipad && ua.match(Local.RegExpr.device.iphone);
        device.browse = device.ios = device.android = device.iphone = device.ipad = device.androidChrome = false;
        
        // Android
        if(android){
            device.os = 'android';
            device.osVersion = android[2];
            device.android = true;
            device.androidChrome = ua.toLowerCase().indexOf('chrome') >= 0;
        };
        if(ipad || iphone || ipod){
            device.os = 'ios';
            device.ios = true;
        };
        // iOS
        if(iphone && !ipod){
            device.osVersion = iphone[2].replace(/_/g, '.');
            device.iphone = true;
        };
        if(ipad){
            device.osVersion = ipad[2].replace(/_/g, '.');
            device.ipad = true;
        };
        if(ipod){
            device.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
            device.iphone = true;
        };
        // iOS 8+ changed UA
        if(device.ios && device.osVersion && ua.indexOf('Version/') >= 0){
            if(device.osVersion.split('.')[0] === '10'){
                device.osVersion = ua.toLowerCase().split('version/')[1].split(' ')[0];
            };
        };
        // Webview
        device.webView = (iphone || ipad || ipod) && ua.match(/.*AppleWebKit(?!.*Safari)/i);
        // Minimal UI
        if(device.os && device.os === 'ios'){
            var osVersionArr = device.osVersion.split('.');
            device.minimalUi = !device.webView && (ipod || iphone) && (osVersionArr[0] * 1 === 7 ? osVersionArr[1] * 1 >= 1 : osVersionArr[0] * 1 > 7) && $$('meta[name="viewport"]').length > 0 && $$('meta[name="viewport"]').attr('content').indexOf('minimal-ui') >= 0;
        };

        //检查状态栏和全屏幕应用程序模式
        $$(document).ready(function(){
            var PageSize = Local.support.GetPageSize();
            device.statusBar = false;
            if(device.webView && (PageSize.WinW * PageSize.WinH === screen.width * screen.height)){
                device.statusBar = true;
            }else{
                device.statusBar = false;
            };
        });
        //样式
        var classNames = [];
        //像素比
        device.pixelRatio = window.devicePixelRatio || 1;
        classNames.push('PixelRatio' + Math.floor(device.pixelRatio));
        if(device.pixelRatio >= 2){
            classNames.push('Retina');
        };
        //IOS 样式
        if(device.os){
            classNames.push(device.os, device.os + '-' + device.osVersion.split('.')[0], device.os + '-' + device.osVersion.replace(/\./g, '-'));
            if(device.os === 'ios'){
                var major = parseInt(device.osVersion.split('.')[0], 10);
                for(var i = major - 1; i >= 6; i--){
                    classNames.push('iosGt' + i);
                };
            };
        };
        //状态栏类
        if(device.statusBar) {
            classNames.push('WithStatusbarOverlay');
        }else{
            $$('html').removeClass('WithStatusbarOverlay');
        };
        //HTML添加样式
        if(classNames.length > 0){
            $$('html').addClass(classNames.join(' '));
        };
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
    //触摸事件
    touchEvents : {
        start: Local.support.touch ? 'touchstart' : Local.support.desktopEvents[0],
        move: Local.support.touch ? 'touchmove' : Local.support.desktopEvents[1],
        end: Local.support.touch ? 'touchend' : Local.support.desktopEvents[2]
    },
    /** 触摸事件
     * @alias touches
     * @param {Object} els:对象
     * @param {function} callBackStart:回调
     * @param {function} callBackMove:回调
     * @param {function} callBackEnd:回调
     */
    touches : function(els, detach, callBackStart,callBackMove,callBackEnd) {
        var isTouched = false;
        var Touches = {
            startX:  0, startY:  0,
            currentX:0, currentY:0,
            diffX:   0, diffY:   0,
            elsX:    0, elsY:    0
        },
        $Element=els,
        action = detach ? 'off' : 'on';

        $Element[action](_KLT_.touchEvents.start,touch);
        $Element[action](_KLT_.touchEvents.move,touch);
        $Element[action](_KLT_.touchEvents.end,touch);

        function touch(event){
            var event = event || window.event || arguments.callee.caller.arguments[0];
            event.preventDefault();
            if(Local.support.touch){
                Touches.touchLength = event.targetTouches.length || 0;
            };
            switch(event.type){
                case _KLT_.touchEvents.start:
                    isTouched = true;
                    Touches.startX = Number(event.type === 'touchstart'?event.targetTouches[0].pageX:event.pageX);
                    Touches.startY = Number(event.type === 'touchstart'?event.targetTouches[0].pageY:event.pageY);
                    callBackStart(Touches, $Element);
                    break;
                case _KLT_.touchEvents.end:
                    isTouched = false;
                    Touches.diffX = Number(Touches.currentX-Touches.startX);
                    Touches.diffY = Number(Touches.currentY-Touches.startY);
                    callBackEnd(Touches, $Element);
                    break;
                case _KLT_.touchEvents.move:
                    if(!isTouched) return;
                    Touches.currentX = Number(event.type === 'touchmove'?event.targetTouches[0].pageX:event.pageX);
                    Touches.currentY = Number(event.type === 'touchmove'?event.targetTouches[0].pageY:event.pageY);
                    if(Number(Touches.currentX-Touches.startX)>0){
                        Touches.elsX = Number(Touches.currentX-Touches.startX-Touches.diffX);
                        Touches.elsY = Number(Touches.currentY-Touches.startY-Touches.diffY);
                    }else{
                        Touches.elsX = Number(Touches.currentX-Touches.startX+Touches.diffX);
                        Touches.elsY = Number(Touches.currentY-Touches.startY+Touches.diffY);
                    }
                    callBackMove(Touches, $Element);
                    break;
            };
            
        };
        return running ? Touches : '';
    }
};

var _KLT_ = window['kelat']['fn'];

//扩展 --- 功能参考 jQuery
window['kelat']['extend'] = $$.extend = $$.fn.extend = _KLT_.extend = KUIAPP.Extend ;

window['kelat']['extend']({
    //自定义特性
    expando : "kelat" + ( version + Math.random() ).replace( /\D/g, "" ),
    //空操作
    noop : function() {},
    //Ajax
    ajax : $$.ajax,
    ajaxSetup : $$.ajaxSetup,
    get : $$.get,
    post : $$.post,
    getJSON  : $$.getJSON,
    //是字符串
    isString : KUIAPP.isString,
    //是否为函数
    isFunction: KUIAPP.isFunction,
    //是否为数字
    isNumber : KUIAPP.isNumber,
    //是否为数组
    isArray : KUIAPP.isArray,
    //是否在Window容器
    isWindow : KUIAPP.isWindow,
    //是否普通对象
    isPlainObject : KUIAPP.isPlainObject,
    //类型
    type : KUIAPP.type,
    //循环
    each : $$.each
});

//扩展触发事件
(function($){
var specialEvents={},
    returnTrue = function(){return true},
    returnFalse = function(){return false},
    eventMethods = {
        preventDefault: 'isDefaultPrevented',
        stopImmediatePropagation: 'isImmediatePropagationStopped',
        stopPropagation: 'isPropagationStopped'
    };
    //专用事件
    specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = 'MouseEvents';
  
var compatible = function(event, source){
        if(source || !event.isDefaultPrevented){
            source || (source = event);
            $.each(eventMethods, function(name, predicate){
                var sourceMethod = source[name];
                event[name] = function(){
                    this[predicate] = returnTrue;
                    return sourceMethod && sourceMethod.apply(source, arguments);
                };
                event[predicate] = returnFalse;
            });
            if(source.defaultPrevented !== undefined ? source.defaultPrevented :
                'returnValue' in source ? source.returnValue === false :
                source.getPreventDefault && source.getPreventDefault()){
                event.isDefaultPrevented = returnTrue
            };
        };
        return event;
    };
    $.fn.trigger = function(event, args){
        event = (kelat.isString(event) || kelat.isPlainObject(event)) ? $.Event(event) : compatible(event);
        event._args = args;
        return this.each(function(){
            //直接调用处理  focus(), blur() 
            if(event.type in focus && typeof this[event.type] === "function"){
                this[event.type]();
            }else if('dispatchEvent' in this){
                //集合中的项可能不是DOM元素
                this.dispatchEvent(event)
            }else{
                $(this).triggerHandler(event, args)
            };
        })
    }
    //如果事件发生,处理当前元素触发事件,
    //不触发实际的事件，不冒泡
    $.fn.triggerHandler = function(event, args){
        var seifEvent, result;
        this.each(function(i, element){
            seifEvent = createProxy(isString(event) ? $.Event(event) : event);
            seifEvent._args = args;
            seifEvent.target = element;
            $.each(findHandlers(element, event.type || event), function(i, handler){
                result = handler.proxy(seifEvent);
                if(seifEvent.isImmediatePropagationStopped()){
                    return false
                };
            });
        });
        return result;
    };

    $.Event = function(type, props) {
        if(!kelat.isString(type)){
            props = type, type = props.type;
        };
        var event = document.createEvent(specialEvents[type] || 'Events'), 
            bubbles = true;
        if(props){
            for(var name in props){
                (name === 'bubbles') ? (bubbles = !!props[name]) : (event[name] = props[name]);
            };
        };
        event.initEvent(type, bubbles, true);
        return compatible(event);
    };
})($$);
//快速点击事件
(function($){
    var touch = {},
        touchTimeout, tapTimeout, swipeTimeout, longTapTimeout,
        longTapDelay = 750,
        gesture;
    //滑动方向
    function swipeDirection(x1, x2, y1, y2){
        return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down');
    };
    //长按
    function longTap(){
        longTapTimeout = null;
        if(touch.last){
            touch.el.trigger('longTap');
            touch = {};
        };
    };
    //取消长按
    function cancelLongTap(){
        if(longTapTimeout){
            clearTimeout(longTapTimeout);
        };
        longTapTimeout = null;
    };
    //取消所有绑定事件
    function cancelAll(){
        if(touchTimeout)  {clearTimeout(touchTimeout)};
        if(tapTimeout)    {clearTimeout(tapTimeout)};
        if(swipeTimeout)  {clearTimeout(swipeTimeout)};
        if(longTapTimeout){clearTimeout(longTapTimeout)};
        touchTimeout = tapTimeout = swipeTimeout = longTapTimeout = null;
        touch = {};
    };
    //原始触摸类型
    function isPrimaryTouch(event){
        return (event.pointerType === 'touch' || event.pointerType === event.MSPOINTER_TYPE_TOUCH) && event.isPrimary;
    };
    //指针事件类型
    function isPointerEventType(e, type){
        return (e.type === 'pointer'+type || e.type === 'mouse'+type || e.type.toLowerCase() === 'mspointer'+type);
    };
    //元素准备完成
    $(document).ready(function(){
        var now, delta, deltaX = 0, deltaY = 0, firstTouch, _isPointerType, _targetTouches;
        if('MSGesture' in window){
            gesture = new MSGesture();
            gesture.target = document.body;
        };
        $(document).bind('MSGestureEnd', function(e){
            var swipeDirectionFromVelocity =
                e.velocityX > 1 ? 'Right' : e.velocityX < -1 ? 'Left' : e.velocityY > 1 ? 'Down' : e.velocityY < -1 ? 'Up' : null;
            if(swipeDirectionFromVelocity && typeof touch.el !== "undefined"){
              touch.el.trigger('swipe');
              touch.el.trigger('swipe'+ swipeDirectionFromVelocity);
            };
        })
        .on('touchstart MSPointerDown pointerdown',function(e){
            if(((_isPointerType = isPointerEventType(e, 'down')) && !isPrimaryTouch(e))){return};
            firstTouch = _isPointerType ? e : e.touches[0];
            if(e.touches && e.touches.length === 1 && touch.x2){
                //清除触摸数据
                //如果 touchcancel 不触发或者触发 preventDefault事件等等
                touch.x2 = undefined;
                touch.y2 = undefined;
            };
            _targetTouches = e.targetTouches;
            now = Date.now();
            delta = now - (touch.last || now);
            touch.el = $('tagName' in firstTouch.target ? firstTouch.target : firstTouch.target.parentNode);
            touchTimeout && clearTimeout(touchTimeout);
            touch.x1 = firstTouch.pageX;
            touch.y1 = firstTouch.pageY;
            if(delta > 0 && delta <= 250){
                touch.isDoubleTap = true;
            };
            touch.last = now;
            longTapTimeout = setTimeout(longTap, longTapDelay);
            //增加IE浏览器的手势识别
            if(gesture && _isPointerType){
                gesture.addPointer(e.pointerId);
            };
        })
        .on('touchmove MSPointerMove pointermove',function(e){
            if(((_isPointerType = isPointerEventType(e, 'move')) && !isPrimaryTouch(e))){return};
            firstTouch = _isPointerType ? e : e.touches[0];
            cancelLongTap();
            touch.x2 = firstTouch.pageX;
            touch.y2 = firstTouch.pageY;

            deltaX += Math.abs(touch.x1 - touch.x2);
            deltaY += Math.abs(touch.y1 - touch.y2);
        })
        .on('touchend MSPointerUp pointerup',function(e){
            if((_isPointerType = isPointerEventType(e, 'up')) && !isPrimaryTouch(e)){
                var touchElement = $(e.target);
                if(touchElement && !Local.support.touch){
                    touchElement.trigger('tap');
                }
                return;
            };
            cancelLongTap();
            //滑动事件
            if((touch.x2 && Math.abs(touch.x1 - touch.x2) > 30) || (touch.y2 && Math.abs(touch.y1 - touch.y2) > 30)){
                swipeTimeout = setTimeout(function() {
                    if(typeof touch.el !== "undefined"){
                        touch.el.trigger('swipe');
                        touch.el.trigger('swipe' + (swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2)))
                        touch = {}
                    }
                },0)
            }else if('last' in touch){
                //正常点击事件
                //当坐标位置改变超过30像素的时候,取消点击,
                //例如,当移动到一个点和回到原点
                if (deltaX < 30 && deltaY < 30) {
                    //点击触发前滚动
                    tapTimeout = setTimeout(function(){
                        try{
                            var event = $.Event('tap');
                            event.cancelTouch = cancelAll;
                            event.targetTouches = _targetTouches;
                            touch.el.trigger(event);
                            //立即触发双击
                            if(touch.isDoubleTap){
                                if(touch.el){
                                    touch.el.trigger('doubleTap')
                                };
                                touch = {};
                            }else{
                                //间隔250毫秒后触发点击
                                touchTimeout = setTimeout(function(){
                                    touchTimeout = null;
                                    if(touch.el){
                                        touch.el.trigger('singleTap');
                                    };
                                    touch = {};
                                },250)
                            };
                        }catch(err){
                            //防止快速点击时 touch.el 未定义
                            return
                        };
                    },0);
                }else{
                    touch = {};
                }
                deltaX = deltaY = 0;
            };
        })
        //当浏览器窗口失去焦点时,
        //例如:当一个模态对话框显示时,取消所有正在进行的事件
        .on('touchcancel MSPointerCancel pointercancel', cancelAll);
        //用户滚动窗口
        //滚动时,不点击或滑动,取消所有正在进行的事件
        $(window).on('scroll', cancelAll);
    });
    //事件扩展
    ['swipe', 'swipeLeft', 'swipeRight', 'swipeUp', 'swipeDown','doubleTap', 'tap', 'singleTap', 'longTap'].forEach(function(eventName){
        $.fn[eventName] = function(callback){
            return !!callback ? this.on(eventName,callback) : this.trigger(eventName);
        };
    });
})($$);

//设置默认参数
window['kelat']['defaults'] = {
    shift: 0
};
//处理显示动画
function animatedShift(shift){
    var _Shift = '';
    if(shift!==0){
        switch(shift){
            case 1: _Shift = 'zoomInDown';break;
            case 2: _Shift = 'fadeInUpBig';break;
            case 3: _Shift = 'zoomInLeft';break;
            case 4: _Shift = 'rollIn';break;
            case 5: _Shift = 'shake';break;
        };
    };
    return _Shift;
}

//判断是否为数组 && 是否为空数组
function isArrayLike(obj){
    var length = !!obj && "length" in obj && obj.length,
        type = kelat.type( obj );
    if(type === "function" || kelat.isWindow(obj)){
        return false;
    }
    return type === "array" || length === 0 ||
        typeof length === "number" && length > 0 && ( length - 1 ) in obj;
};
//类型
kelat.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(i,name){
    classType["[object " + name + "]"] = name.toLowerCase();
});

/** 防止事件冒泡
 * @alias bubbles
 * @param {Object} seifEvent:对象
 * @param {String} els  :子元素
 * @param {function} callback  :回调
 */
KUIAPP.Bubbles = function(seifEvent, els, callback){
    var seifEvent = window.event || arguments.callee.caller.arguments[0];
    var obj = seifEvent.target || seifEvent.srcElement;
    var bubblesIndex = [];
    kelat.each(els.toUpperCase().split(" "),function( i, name ) {
        bubblesIndex.push(obj.tagName !== name && running ? 0 : 1);
    });
    return (bubblesIndex.indexOf(1) === -1 && running) ? callback() : null;
};
window['kelat']['bubbles'] = KUIAPP.Bubbles;

/** 验证
 * @alias validate
 * @param {String} string:验证数据
 * @param {String} type  :验证类型
 * @param {RegExp} regExp  :正则
 */
KUIAPP.Validate = function(string, type) {
    var _RegExp="";
    "regexp" === kelat.type(type) ? ( _RegExp = type , type = undefined) : _RegExp = Local.RegExpr.validate[type];
    return _RegExp.test(string) && running ? true : false;
};
window['kelat']['validate'] = KUIAPP.Validate;

/** 分解url参数
 * @alias getUrlParams
 * @return {Array} options:{'url':'http://www.***.com/',type:['=','id']} 分割符和参数名
 */
KUIAPP.GetUrlParams = function(options) {
    options = options || {};
    var ArrayData = {},
        LinkURL= options.url ? options.url : window.location.href,
        Mark = LinkURL.indexOf("?")+1,
        URLData = LinkURL.substring(Mark);
    if(Mark !== 0){
        if(!!options.type){
            var typeData = URLData.indexOf(options.type[0])+options.type[0].length;
            ArrayData[options.type[1]] = URLData.substring(typeData);
        }else{
            //angular #/ 多问号 特殊处理
            URLData = URLData.replace(/%26/gi, '&').
            replace(/%2F/gi, '/').
            replace(/%3D/gi, '=').
            replace(/%2B/gi, '+').
            replace(/%40/gi, '@').
            replace(/%3A/gi, ':').
            replace(/%24/g, '$').
            replace(/%2C/gi, ',').
            replace(/%3B/gi, ';').
            replace(/%20/g, ' ').
            replace(/\?/g,"&").
            replace(/\#\//g,"&").
            replace(/\&&/g,"&");
            //获取参数的值
            var _Data = URLData.split("&");
            for(var i=0;i<_Data.length;i++){
                var _Array = _Data[i].split("=");
                ArrayData[_Array[0]]=_Array[1];
            };
        }
    };
    return running ? ArrayData : null;
};
window['kelat']['getUrlParams'] = KUIAPP.GetUrlParams;

/** 分解url参数
 * @alias getUrlParams
 * @return {Array} options:{'url':'http://www.***.com/',type:['=','id']} 分割符和参数名
 */
KUIAPP.UrlParamDel = function(name) {
    var loca = window.location;
    var baseUrl = loca.origin + loca.pathname + "?";
    var query = loca.search.substr(1);
    if(query.indexOf(name)>-1) {
        var obj = {};
        var arr = query.split("&");
        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].split("=");
            obj[arr[i][0]] = arr[i][1];
        };
        delete obj[name];
        var url = baseUrl + JSON.stringify(obj).replace(/[\"\{\}]/g,"").replace(/\:/g,"=").replace(/\,/g,"&");
        return url;
    };
};
window['kelat']['urlParamDel'] = KUIAPP.UrlParamDel;

/** 动态加载 
 * @alias loadJC
 * @param {String} path:加载对象路径
 * @param {String} type:加载对象类型 js & css
 * @param {function} callback:js回调
 */
KUIAPP.LoadJC = function(path, type, callback) {
    if(typeof path !=='undefined' && running){
        var head = document.getElementsByTagName('head')[0];
        if(type==="js"){
            var script = document.createElement('script')
            script.src = path;
            script.type = 'text/javascript';
            head.appendChild(script);
            if(callback){
                script.onload = script.onreadystatechange = function (){
                    if(!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete'){
                        callback();
                    };
                };
            };
        }else if(type==="css"){
            var link = document.createElement('link');
            link.href = path;
            link.rel = 'stylesheet';
            link.type = 'text/css';
            head.appendChild(link);
        };
    };
    return this;
};
window['kelat']['loadJC'] = KUIAPP.LoadJC;

/************* 页面UI部分 *************/
/** 闪动 
 * @alias glint
 * @param {String} id:需要闪动的id
 */
KUIAPP.Glint = function(id){
    var $ID = $$(id);
    var degree = ["#DD7886","#FBC7BB","#F4E4C9","#DD7886","#FBC7BB","#F4E4C9","#FFF"],number = 0,
        length = degree.length;
    (function GlintFn(){
        length > ++number ? ($ID.css("background",degree[number]),setTimeout(GlintFn,80)) : number = 0;
    })();
};
window['kelat']['glint'] = KUIAPP.Glint;

/*======================================================
************   下拉刷新   ************
======================================================*/
/** 初始化
 * @alias initPullToRefresh
 * @param {object} Container:容器对象
 */
KUIAPP.InitPullToRefresh = function(Container) {
    var eventsTarget = $$(Container);
    if(!eventsTarget.hasClass('PullToRefreshContent')){
        eventsTarget = eventsTarget.find('.PullToRefreshContent');
    };
    if(!eventsTarget || eventsTarget.length === 0 || !running){
        return;
    };

    var touchId, isTouched, isMoved, isScrolling, 
        touchesStart = {}, touchesDiff, touchStartTime, container, 
        refresh = false, useTranslate = false, startTranslate = 0, 
        translate, scrollTop, wasScrolled, triggerDistance, 
        dynamicTriggerDistance, pullStarted;
    var Wrapper = eventsTarget.hasClass('Wrapper') ? eventsTarget : eventsTarget.parents('.Wrapper');
    var hasNavbar = false;
    if(Wrapper.find('.NavBar').length > 0 ){
        hasNavbar = true;
    };
    if(!hasNavbar){
        eventsTarget.addClass('PullToRefreshNoNavbar');
    };
    container = eventsTarget;

    //定义触发距离
    if(container.attr('data-distance')){
        dynamicTriggerDistance = true;
    }else{
        triggerDistance = 44;   
    };
    //触摸事件
    function handleTouchStart(e){
        if(isTouched){
            if(_KLT_.device.android){
                if('targetTouches' in e && e.targetTouches.length > 1){
                    return;
                };
            }else{
                return;
            };
        };
        
        container = $$(this);
        if(container.hasClass('Refresh')) {
            return;
        };
        
        isMoved = false; pullStarted = false; isTouched = true;
        isScrolling = undefined; wasScrolled = undefined;
        if(e.type === 'touchstart'){
            touchId = e.targetTouches[0].identifier;
        };
        touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
        touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
        touchStartTime = +new Date();
    }
    //滑动事件
    function handleTouchMove(e) {
        if(!isTouched){
            return;
        };
        var pageX, pageY, touch;
        if(e.type === 'touchmove'){
            if(touchId && e.touches){
                for(var i = 0; i < e.touches.length; i++){
                    if(e.touches[i].identifier === touchId){
                        touch = e.touches[i];
                    };
                };
            };
            if(!touch){
                touch = e.targetTouches[0];
            };
            pageX = touch.pageX;
            pageY = touch.pageY;
        }else{
            pageX = e.pageX;
            pageY = e.pageY;
        };
        if(!pageX || !pageY){
            return;
        };
            

        if(typeof isScrolling === 'undefined'){
            isScrolling = !!(isScrolling || Math.abs(pageY - touchesStart.y) > Math.abs(pageX - touchesStart.x));
        };
        if (!isScrolling) {
            isTouched = false;
            return;
        };

        scrollTop = $$('body').scrollTop();
        if(typeof wasScrolled === 'undefined' && scrollTop !== 0){
            wasScrolled = true;
        };

        if(!isMoved){
            container.removeClass('transitioning');
            if(scrollTop > container[0].offsetHeight){
                isTouched = false;
                return;
            };
            if(dynamicTriggerDistance){
                triggerDistance = container.attr('data-distance');
                if(triggerDistance.indexOf('%') >= 0){
                    triggerDistance = container[0].offsetHeight * parseInt(triggerDistance, 10) / 100;
                };
            };
            startTranslate = container.hasClass('Refresh') ? triggerDistance : 0;
            if(container[0].scrollHeight === container[0].offsetHeight || !_KLT_.device.ios) {
                useTranslate = true;
            }else{
                useTranslate = false;
            };
        }
        isMoved = true;
        touchesDiff = pageY - touchesStart.y;
        
        if(touchesDiff > 0 && scrollTop <= 0 || scrollTop < 0){
            // iOS 8 fix
            if(_KLT_.device.ios && parseInt(_KLT_.device.osVersion.split('.')[0], 10) > 7 && scrollTop === 0 && !wasScrolled){
                useTranslate = true;
            };

            if(useTranslate){
                e.preventDefault();
                translate = (Math.pow(touchesDiff, 0.85) + startTranslate);
                container.transform('translate3d(0,' + translate + 'px,0)');
            }
            if((useTranslate && Math.pow(touchesDiff, 0.85) > triggerDistance) || (!useTranslate && touchesDiff >= triggerDistance * 2)){
                refresh = true;
                container.addClass('PullUp').removeClass('PullDown');
            }else{
                refresh = false;
                container.removeClass('PullUp').addClass('PullDown');
            };
            if(!pullStarted){
                container.trigger('pullstart');
                pullStarted = true;
            };
            container.trigger('pullmove', {
                event: e,
                scrollTop: scrollTop,
                translate: translate,
                touchesDiff: touchesDiff
            });
        }else{
            pullStarted = false;
            container.removeClass('PullUp PullDown');
            refresh = false;
            return;
        };
    };
    //离开事件
    function handleTouchEnd(e){
        if(e.type === 'touchend' && e.changedTouches && e.changedTouches.length > 0 && touchId){
            if(e.changedTouches[0].identifier !== touchId){
                return;
            };
        };
        if(!isTouched || !isMoved){
            isTouched = false; isMoved = false;
            return;
        };
        if(translate){
            container.addClass('transitioning');
            translate = 0;
        };
        container.transform('');
        if(refresh){
            container.addClass('Refresh');
            container.trigger('refresh', {
                done: function(){
                    KUIAPP.PullToRefreshDone(container);
                }
            });
        }else{
            container.removeClass('PullDown');
        };
        isTouched = false; isMoved = false;
        if(pullStarted){
            container.trigger('pullend');
        };
    };
    //绑定事件
    eventsTarget.on(_KLT_.touchEvents.start, handleTouchStart);
    eventsTarget.on(_KLT_.touchEvents.move, handleTouchMove);
    eventsTarget.on(_KLT_.touchEvents.end, handleTouchEnd);
    //卸载事件
    function destroyPullToRefresh() {
        eventsTarget.off(_KLT_.touchEvents.start, handleTouchStart);
        eventsTarget.off(_KLT_.touchEvents.move, handleTouchMove);
        eventsTarget.off(_KLT_.touchEvents.end, handleTouchEnd);
    };
    eventsTarget[0].KLTDestroyPullToRefresh = destroyPullToRefresh;
};
/** 刷新结束
 * @alias pullToRefreshDone
 * @param {object} Container:容器对象
 */
KUIAPP.PullToRefreshDone = function(Container) {
    Container = $$(Container);
    if(Container.length === 0){
        Container = $$('.PullToRefreshContent.Refresh');
    };
    Container.removeClass('Refresh').addClass('transitioning');
    Container.transitionEnd(function(){
        Container.removeClass('transitioning PullUp PullDown');
        Container.trigger('refreshdone');
    });
};
KUIAPP.PullToRefreshTrigger = function (Container) {
    Container = $(Container);
    if(Container.length === 0){
        container = $('.PullToRefreshContent');
    };
    if(Container.hasClass('Refresh')) return;
    Container.addClass('transitioning Refresh');
    Container.trigger('refresh', {
        done: function () {
            KUIAPP.PullToRefreshDone(Container);
        }
    });
};
KUIAPP.DestroyPullToRefresh = function (pageContainer) {
    pageContainer = $(pageContainer);
    var pullToRefreshContent = pageContainer.hasClass('PullToRefreshContent') ? pageContainer : pageContainer.find('.PullToRefreshContent');
    if(pullToRefreshContent.length === 0) return;
    if(pullToRefreshContent[0].KLTDestroyPullToRefresh){
        pullToRefreshContent[0].KLTDestroyPullToRefresh();
    }
};

window['kelat']['pullToRefreshDone'] = KUIAPP.PullToRefreshDone;
window['kelat']['initPullToRefresh'] = KUIAPP.InitPullToRefresh;
window['kelat']['pullToRefreshTrigger'] = KUIAPP.PullToRefreshTrigger;
window['kelat']['destroyPullToRefresh'] = KUIAPP.DestroyPullToRefresh;

/* =====================================================
************   无限滚动   ************
======================================================*/
/** 处理滚动 */
KUIAPP.isInfiniteScroll = true;
KUIAPP.scrollCurrent = 0;
KUIAPP.HandleInfiniteScroll = function(){
    var $InfiniteScroll = $$('.InfiniteScroll');
    if(KUIAPP.isInfiniteScroll &&  $InfiniteScroll.length > 0){
        var height = $InfiniteScroll[0].offsetHeight;
        var distance = parseInt($InfiniteScroll.attr('data-distance'));
        var onTop = $InfiniteScroll.hasClass('InfiniteScrollTop');
        if(!distance){distance = 50;};
        if(typeof distance === 'string' && distance.indexOf('%') >= 0){
            distance = parseInt(distance, 10) / 100 * height;
        };
        if(distance > height){distance = height;};
        
        //滚动条位置
        var scrollTop=Local.support.GetPageScroll().Y;
        //元素位置
        var InfiniteOffsetTop=$InfiniteScroll.offset().top;
        //window height
        var winHeight=Local.support.GetPageSize().WinH;
        //防止向上滚动触发事件
        if(KUIAPP.scrollCurrent>scrollTop){
            return
        };
        if(onTop){
            if(scrollTop < distance){
                $InfiniteScroll.trigger('infinite');
            }
        }else{
            if((scrollTop+distance+winHeight - InfiniteOffsetTop) > height ){
                KUIAPP.scrollCurrent = scrollTop
                $InfiniteScroll.trigger('infinite');
            };
        }
    }else{
        KUIAPP.isInfiniteScroll = false;
        KUIAPP.DetachInfiniteScroll();
    }
};
/** 添加滚动 */
KUIAPP.AttachInfiniteScroll = function(){
    KUIAPP.isInfiniteScroll = true;
    $$(window).on('scroll', KUIAPP.HandleInfiniteScroll);
};
/** 卸载滚动 */
KUIAPP.DetachInfiniteScroll = function(infinite){
    KUIAPP.scrollCurrent = 0;
    $$(window).off('scroll', KUIAPP.HandleInfiniteScroll);
};
/** 初始化滚动 */
KUIAPP.InitInfiniteScroll = function(infinite, callBack){
    if(infinite){
        KUIAPP.scrollCurrent = 0;
        callBack();
        KUIAPP.AttachInfiniteScroll();
    }
};
window['kelat']['infiniteScroll'] = KUIAPP.InitInfiniteScroll;
window['kelat']['detachInfiniteScroll'] = KUIAPP.DetachInfiniteScroll;
window['kelat']['attachInfiniteScroll'] = KUIAPP.AttachInfiniteScroll;

/* =====================================================
************   选择器   ************
======================================================*/
/** 选择器 
 * @alias picker
 * @param {Array} params:选择器选项数组
 */
KUIAPP.Picker = function(params){
    var $Picker = this;
    var defaults = {
        //计算高度
        calculateHeight : true,
        updateValuesOnMomentum: false,
        updateValuesOnTouchmove: true,
        //旋转效果
        rotateEffect: false,
        //高效
        isEfficient:false,
        //自动更新
        autoUpdate:true,
        //动量比
        momentumRatio: 7,
        //自由模式
        freeMode: false,
        //常用设置
        //点击其他区域关闭
        closeByOutsideClick: true,
        //滚动输入
        scrollToInput: true,
        //输入只读
        inputReadOnly: true,
        //转换成Popover
        convertToPopover: true,
        //只显示Popover
        onlyInPopover: false,
		openCallback :function(){},
        //工具栏
        toolbar: true,
        toolbarOkText: Local.ModalButtonOk,
        toolbarCloseText: Local.ModalButtonCancel,
        toolbarTemplate: 
            '<div class="ToolBar RippleBox">' +
                '<div class="ToolBarInner">' +
                    '<div class="Left"><a href="javascript:;" class="Link InkRipple ClosePicker">{{closeText}}</a></div>' +
                    '<div class="Right"><a href="javascript:;" class="Link InkRipple OkPicker">{{okText}}</a></div>' +
                '</div>' +
            '</div>'
    };
    params = params || {};
    for(var def in defaults){
        if(typeof params[def] === 'undefined'){
            params[def] = defaults[def];
        };
    };
    $Picker.params = params;
    $Picker.cols = [];
    $Picker.initialized = false;
    $Picker.isCreate = true;
    
    //滚动区域
    var $WrapContent = $$('.WrapContent');

    // 内嵌的标志
    $Picker.inline = $Picker.params.container ? true : false;

    // 3D Transforms bug, 只在 safari浏览器
    var originBug = _KLT_.device.ios || (navigator.userAgent.toLowerCase().indexOf('safari') >= 0 && navigator.userAgent.toLowerCase().indexOf('chrome') < 0) && !_KLT_.device.android;

    // 转换为弹框
    function isPopover(){
        var toPopover = false;
        if(!$Picker.params.convertToPopover && !$Picker.params.onlyInPopover){
            return toPopover;
        };
        if(!$Picker.inline && $Picker.params.input){
            if($Picker.params.onlyInPopover){
                toPopover = true;
            }else{
                if (_KLT_.device.ios){
                    toPopover = _KLT_.device.ipad ? true : false;
                }else{
                    $$(window).width()>=768 && (toPopover = true);
                };
            };
        };
        return toPopover; 
    };
    function inPopover(){
        return ($Picker.opened && $Picker.container && $Picker.container.length > 0 && $Picker.container.parents('.ModalPopover').length > 0) ? true : false;
    };

    // Value
    $Picker.setValue = function(arrValues, transition){
        var valueIndex = 0;
        if($Picker.cols.length === 0){
            $Picker.value = arrValues;
            $Picker.updateValue(arrValues);
            return;
        };
        for(var i = 0; i < $Picker.cols.length; i++){
            if($Picker.cols[i] && !$Picker.cols[i].divider){
                $Picker.cols[i].setValue(arrValues[valueIndex], transition);
                valueIndex++;
            };
        };
    };
    //更新 Value
    $Picker.updateValue = function(forceValues){
        var newValue = forceValues || [];
        var newDisplayValue = [];
        for(var i = 0; i < $Picker.cols.length; i++){
            if(!$Picker.cols[i].divider){
                newValue.push($Picker.cols[i].value);
                newDisplayValue.push($Picker.cols[i].displayValue);
            };
        };
        if(newValue.indexOf(undefined) >= 0){
            return;
        };
        $Picker.value = newValue;
        $Picker.displayValue = newDisplayValue;
        if($Picker.params.onChange){
            $Picker.params.onChange($Picker, $Picker.value, $Picker.displayValue);
        };
        if($Picker.input && $Picker.input.length > 0){
            var method = $Picker.input[0].tagName === "INPUT" ? ['val','change'] : ['text',Local.support.onClick];
            var _val = $Picker.params.formatValue ? $Picker.params.formatValue($Picker, $Picker.value, $Picker.displayValue) : $Picker.value.join(' ')
            //赋值并格式化
            $$($Picker.input)[method[0]](_val);
            $$($Picker.input).on(method[1]);
        }
    };

    //列处理程序
    $Picker.initPickerCol = function (colElement, updateItems) {
        var colContainer = $$(colElement);
        var colIndex = colContainer.index();
        var col = $Picker.cols[colIndex];
        if(col.divider){return};
        col.container = colContainer;
        col.wrapper = col.container.find('.PickerItemsColWrapper');
        col.items = col.wrapper.find('.PickerItem');
        
        var wrapperHeight, itemHeight, itemsHeight, minTranslate, maxTranslate;
        //替换 Value
        col.replaceValues = function(values, displayValues){
            col.destroyEvents();
            col.values = values;
            col.displayValues = displayValues;
            var newItemsHTML = $Picker.columnHTML(col, true);
            col.wrapper.html(newItemsHTML);
            col.items = col.wrapper.find('.PickerItem');
            col.calcSize();
            col.setValue(col.values[0], 0, true);
            col.initEvents();
        };
        //计算尺寸
        col.calcSize = function () {
            if($Picker.params.rotateEffect){
                col.container.removeClass('PickerItemsColAbsolute');
                if(!col.width){
                    col.container.css({width:''});
                };
            };
            var colWidth, colHeight;
            colWidth = 0;
            colHeight = col.container[0].offsetHeight;
            wrapperHeight = col.wrapper[0].offsetHeight;
            itemHeight = col.items[0].offsetHeight;
            itemsHeight = itemHeight * col.items.length;
            minTranslate = colHeight / 2 - itemsHeight + itemHeight / 2;
            maxTranslate = colHeight / 2 - itemHeight / 2;    
            if(col.width){
                colWidth = col.width;
                if(parseInt(colWidth, 10) === colWidth){
                    colWidth = colWidth + 'px';
                };
                col.container.css({width: colWidth});
            };
            if($Picker.params.rotateEffect){
                if(!col.width){
                    col.items.each(function(){
                        var item = $$(this);
                        item.css({width:'auto'});
                        colWidth = Math.max(colWidth, item[0].offsetWidth);
                        item.css({width:''});
                    });
                    col.container.css({width: (colWidth + 2) + 'px'});
                };
                col.container.addClass('PickerItemsColAbsolute');
            };
        };
        col.calcSize();
        //外壳旋转
        function wrapperRotate(Translate,isTransition){
            col.wrapper.transform('translate3d(0,' + Translate + 'px,0)');
            if(isTransition){
                col.wrapper.transition(0);
            }
        };
        
        //col.wrapper.transform('translate3d(0,' + maxTranslate + 'px,0)').transition(0);
        wrapperRotate(maxTranslate,true);

        var animationFrameId;

        //设置 Value
        col.setValue = function(newValue, transition, valueCallbacks) {
            typeof transition === 'undefined' && (transition = '');
            var newActiveIndex = col.wrapper.find('.PickerItem[data-picker-value="' + newValue + '"]').index();
            if(typeof newActiveIndex === 'undefined' || newActiveIndex === -1) {
                return;
            };
            var newTranslate = -newActiveIndex * itemHeight  + maxTranslate;
            //更新外层元素
            col.wrapper.transition(transition);
            //col.wrapper.transform('translate3d(0,' + (newTranslate) + 'px,0)');
            wrapperRotate((newTranslate));
            
            //检测元素
            if($Picker.params.updateValuesOnMomentum && col.activeIndex && col.activeIndex !== newActiveIndex ){
                $$.cancelAnimationFrame(animationFrameId);
                col.wrapper.transitionEnd(function(){
                    $$.cancelAnimationFrame(animationFrameId);
                });
                updateDuringScroll();
            };
            //更新元素
            col.updateItems(newActiveIndex, newTranslate, transition, valueCallbacks);
        };
        //更新元素
        col.updateItems = function (activeIndex, translate, transition, valueCallbacks) {
            if(typeof translate === 'undefined'){translate = $$.getTranslate(col.wrapper[0], 'y');};
            if(typeof activeIndex === 'undefined'){activeIndex = -Math.round((translate - maxTranslate)/itemHeight);};
            if(activeIndex < 0){activeIndex = 0;};
            if(activeIndex >= col.items.length){activeIndex = col.items.length - 1;};
            var previousActiveIndex = col.activeIndex;
            col.activeIndex = activeIndex;
            col.items.removeClass('PickerSelected');
            
            
            var selectedItem = col.items.eq(activeIndex).addClass('PickerSelected');
                
            //设置3D旋转效果
            if($Picker.params.rotateEffect){
                col.items.transition(transition);
                //var percentage = (translate - (Math.floor((translate - maxTranslate)/itemHeight) * itemHeight + maxTranslate)) / itemHeight;
                
                col.items.each(function(index){
                    var item = $$(this);
                    //var itemOffsetTop = (index) * itemHeight;
                    //var translateOffset = maxTranslate - translate;
                    //var itemOffset = itemOffsetTop - translateOffset;
                    //var percentage = itemOffset / itemHeight;
                    var percentage = (((index) * itemHeight) - (maxTranslate - translate)) / itemHeight;

                    var itemsFit = Math.ceil(col.height / itemHeight / 2) + 1;
                    
                    var angle =(-18*percentage);
                    if(angle > 180){angle = 180;};
                    if(angle < -180){angle = -180;};
                    // Far class
                    if(Math.abs(percentage) > itemsFit){
                        item.addClass('PickerItemFar');
                    }else{
                        item.removeClass('PickerItemFar');
                    };
                    
                    //设置 transform
                    item.transform('translate3d(0, ' + (-translate + maxTranslate) + 'px, ' + (originBug ? -110 : 0) + 'px) rotateX(' + angle + 'deg)');
                    //$$(this).transform('translate3d(0, 0,' + (originBug ? -110 : 0) + 'px) rotateX(' + (angle) + 'deg)');
                });
            }else{
                col.items.transition(transition);
            };

            if(valueCallbacks || typeof valueCallbacks === 'undefined'){
                //更新 values
                col.value = selectedItem.attr('data-picker-value');
                col.displayValue = col.displayValues ? col.displayValues[activeIndex] : col.value;
                //onChange 回调
                if(previousActiveIndex !== activeIndex){
                    if(col.onChange){
                        col.onChange($Picker, col.value, col.displayValue);
                    };
                    if($Picker.params.autoUpdate){
                        $Picker.updateValue();
                    };
                }
            }
        };
        //更新过程滚动
        function updateDuringScroll() {
            animationFrameId = $$.requestAnimationFrame(function () {
                col.updateItems(undefined, undefined, 0);
                updateDuringScroll();
            });
        };

        //初始化
        if(updateItems){
            col.updateItems(0, maxTranslate, 0);
        };

        var allowItemClick = true;
        var isTouched, isMoved, touchStartY, touchCurrentY, touchStartTime, touchEndTime, startTranslate, returnTo, currentTranslate, prevTranslate, velocityTranslate, velocityTime;
        //触摸事件
        function handleTouchStart(e){
            if(isMoved || isTouched){return;};
            e.preventDefault();
            isTouched = true;
            touchStartY = touchCurrentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
            touchStartTime = +(new Date());
            allowItemClick = true;
            startTranslate = currentTranslate = $$.getTranslate(col.wrapper[0], 'y');
        };
        //滑动事件
        function handleTouchMove (e) {
            if(!isTouched){return;};
            e.preventDefault();
            allowItemClick = false;
            touchCurrentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
            if(!isMoved){
                //首次移动
                $$.cancelAnimationFrame(animationFrameId);
                isMoved = true;
                startTranslate = currentTranslate = $$.getTranslate(col.wrapper[0], 'y');
                col.wrapper.transition(0);
            }
            e.preventDefault();

            var diff = touchCurrentY - touchStartY;
            currentTranslate = startTranslate + diff;
            returnTo = undefined;

            //正常 translate
            if(currentTranslate < minTranslate){
                currentTranslate = minTranslate - Math.pow(minTranslate - currentTranslate, 0.8);
                returnTo = 'min';
            };
            if(currentTranslate > maxTranslate){
                currentTranslate = maxTranslate + Math.pow(currentTranslate - maxTranslate, 0.8);
                returnTo = 'max';
            };
            //更新外层元素
            //col.wrapper.transform('translate3d(0,' + currentTranslate + 'px,0)');
            wrapperRotate(currentTranslate);

            //更新元素
            col.updateItems(undefined, currentTranslate, 0, $Picker.params.updateValuesOnTouchmove);
            
            //计算速度
            velocityTranslate = currentTranslate - prevTranslate || currentTranslate;
            velocityTime = +(new Date());
            prevTranslate = currentTranslate;
        };
        //离开事件
        function handleTouchEnd (e) {
            if(!isTouched || !isMoved){
                isTouched = isMoved = false;
                return;
            };
            isTouched = isMoved = false;
            col.wrapper.transition('');
            if(returnTo){
                if(returnTo === 'min'){
                    //col.wrapper.transform('translate3d(0,' + minTranslate + 'px,0)');
                    wrapperRotate(minTranslate);
                }else{
                    //col.wrapper.transform('translate3d(0,' + maxTranslate + 'px,0)');
                    wrapperRotate(maxTranslate);
                };
            };
            touchEndTime = +(new Date());
            var velocity, newTranslate;
            if(touchEndTime - touchStartTime > 300){
                newTranslate = currentTranslate;
            }else{
                velocity = Math.abs(velocityTranslate / (touchEndTime - velocityTime));
                newTranslate = currentTranslate + velocityTranslate * $Picker.params.momentumRatio;
            };
            newTranslate = Math.max(Math.min(newTranslate, maxTranslate), minTranslate);

            //活动值
            var activeIndex = -Math.floor((newTranslate - maxTranslate)/itemHeight);

            //正常 translate
            if(!$Picker.params.freeMode){
                newTranslate = -activeIndex * itemHeight + maxTranslate;
            };

            //更新外层元素
            //col.wrapper.transform('translate3d(0,' + (parseInt(newTranslate,10)) + 'px,0)');
            wrapperRotate((parseInt(newTranslate,10)));

            //更新元素
            col.updateItems(activeIndex, newTranslate, '', true);

            //检测元素
            if($Picker.params.updateValuesOnMomentum){
                updateDuringScroll();
                col.wrapper.transitionEnd(function(){
                    $$.cancelAnimationFrame(animationFrameId);
                });
            };

            //允许点击
            setTimeout(function(){
                allowItemClick = true;
            },100);
        }
        //点击事件
        function handleClick(e){
            if(!allowItemClick){
                return;
            };
            $$.cancelAnimationFrame(animationFrameId);
            /*jshint validthis:true */
            var value = $$(this).attr('data-picker-value');
            col.setValue(value);
        }
        //初始化事件
        col.initEvents = function(detach){
            var method = detach ? 'off' : 'on';
            col.container[method](_KLT_.touchEvents.start, handleTouchStart);
            col.container[method](_KLT_.touchEvents.move, handleTouchMove);
            col.container[method](_KLT_.touchEvents.end, handleTouchEnd);
            col.items[method](Local.support.onClick, handleClick);
        };
        //销毁事件
        col.destroyEvents = function () {
            col.initEvents(true);
        };
        //销毁选择器
        col.container[0].KLTDestroyPickerCol = function () {
            col.destroyEvents();
        };
        //初始化事件
        col.initEvents();
    };
    //销毁选择器
    $Picker.destroyPickerCol = function (colContainer) {
        colContainer = $$(colContainer);
        if('KLTDestroyPickerCol' in colContainer[0]){
            colContainer[0].KLTDestroyPickerCol();
        };
    };
    //调整大小
    function resizeCols(){
        if(!$Picker.opened){
            return;
        };
        for(var i = 0; i < $Picker.cols.length; i++){
            if(!$Picker.cols[i].divider){
                $Picker.cols[i].calcSize();
                $Picker.cols[i].setValue($Picker.cols[i].value, 0, false);
            };
        };
    };
    $$(window).on('resize',resizeCols);

    //HTML布局
    $Picker.columnHTML = function(col, onlyItems){
        var columnItemsHTML = '';
        var columnHTML = '';
        if(col.divider){
            columnHTML += '<div class="PickerItemsCol PickerItemsColDivider ' + (col.textAlign ? 'PickerItemsCol_' + col.textAlign : '') + ' ' + (col.cssClass || '') + '">' + col.content + '</div>';
        }else{
            for(var j = 0; j < col.values.length; j++){
                columnItemsHTML += '<div class="PickerItem" data-picker-value="' + col.values[j] + '">' + (col.displayValues ? col.displayValues[j] : col.values[j]) + '</div>';
            };
            columnHTML += '<div class="PickerItemsCol ' + (col.textAlign ? 'PickerItemsCol_' + col.textAlign : '') + ' ' + (col.cssClass || '') + '"><div class="PickerItemsColWrapper">' + columnItemsHTML + '</div></div>';
        };
        return onlyItems ? columnItemsHTML : columnHTML;
    };
    //布局
    $Picker.layout = function () {
        var pickerHTML = '';
        var pickerClass = '';
        var i;
        $Picker.cols = [];
        var colsHTML = '';
        for(i = 0; i < $Picker.params.cols.length; i++){
            var col = $Picker.params.cols[i];
            colsHTML += $Picker.columnHTML($Picker.params.cols[i]);
            $Picker.cols.push(col);
        };
        pickerClass = 'PickerModal PickerColumns ' + ($Picker.params.cssClass || '') + ($Picker.params.rotateEffect ? ' Picker3d' : '');
        pickerHTML =
            '<div class="' + (pickerClass) +'">' +
                ($Picker.params.toolbar ? $Picker.params.toolbarTemplate.replace(/{{closeText}}/, $Picker.params.toolbarCloseText).replace(/{{okText}}/, $Picker.params.toolbarOkText) : '') +
                '<div class="PickerModalInner PickerItems">' +
                    colsHTML +
                    '<div class="PickerCenterHighlight"></div>' +
                '</div>' +
            '</div>';
        $Picker.pickerHTML =  pickerHTML;
    };

    //输入事件
    function openOnInput(e) {
        $$('body').addClass('OVBody');
        e.preventDefault();
        if(!$Picker.isCreate){
            KUIAPP.ShowModal($Picker.container);
        }
        if($Picker.opened){
            return;
        };
        $Picker.open();
        
        if($Picker.params.scrollToInput && !isPopover() && $Picker.params.calculateHeight){
            var bodyContent = $Picker.input.parents('body');
            if(bodyContent.length === 0){
                return;
            };
            var paddingTop = parseInt($WrapContent.css('padding-top'), 10),
                paddingBottom = parseInt($WrapContent.css('padding-bottom'), 10),
                pageHeight = bodyContent[0].offsetHeight - paddingTop - $Picker.container.height(),
                pageScrollHeight = bodyContent[0].scrollHeight - paddingTop - $Picker.container.height(),
                newPaddingBottom;
            var inputTop = $Picker.input.offset().top - paddingTop + $Picker.input[0].offsetHeight;
            if(inputTop > pageHeight){
                var scrollTop = bodyContent.scrollTop() + inputTop - pageHeight - Local.support.GetPageScroll().Y;
                if(scrollTop + pageHeight > pageScrollHeight){
                    newPaddingBottom = scrollTop + pageHeight - pageScrollHeight + paddingBottom;
                    if(pageHeight === pageScrollHeight){
                        newPaddingBottom = $Picker.container.height();
                    };
                    $WrapContent.css({'padding-bottom': (newPaddingBottom) + 'px'});
                    //$WrapContent.transform('translateY(-' + (newPaddingBottom) + 'px)');
                };
                bodyContent.scrollTop(scrollTop, 300);
            };
        };
    };
    //关闭HTML事件
    function closeOnHTMLClick(e) {
        if(inPopover()){
            return;
        };
        if($Picker.input && $Picker.input.length > 0){
            if(e.target !== $Picker.input[0] && $$(e.target).parents('.PickerModal').length === 0){
                $Picker.close();
            }
        }else{
            if($$(e.target).parents('.PickerModal').length === 0) {
                $Picker.close();
            };
        };
    };

    if($Picker.params.input){
        $Picker.input = $$($Picker.params.input);
        if ($Picker.input.length > 0) {
            if($Picker.params.inputReadOnly){
                $Picker.input.prop('readOnly', true);
            };
            if(!$Picker.inline){
                $Picker.input.on('click', openOnInput);
            };
            if($Picker.params.inputReadOnly){
                $Picker.input.on('focus mousedown', function (e) {
                    e.preventDefault();
                });
            };
        };
    };
    
    if(!$Picker.inline && $Picker.params.closeByOutsideClick){
        $$('html').on('click', closeOnHTMLClick);
    };

    //关闭选择器
    function onPickerClose() {
        $Picker.opened = false;
        if($Picker.input && $Picker.input.length > 0){
            $WrapContent.css({'padding-bottom': ''});
            //$WrapContent.transform('translateY(0)');
        };
        if($Picker.params.onClose){
            $Picker.params.onClose($Picker);
        };
        //销毁事件
        $Picker.container.find('.PickerItemsCol').each(function () {
            $Picker.destroyPickerCol(this);
        });
    };
    //打开
    $Picker.opened = false;
    $Picker.isClick = 1;
    $Picker.open = function () {
        var Timestamp = +(new Date());
        var toPopover = isPopover();
        $Picker.Timestamp = Timestamp * $Picker.isClick;
        if(!$Picker.opened){
			$Picker.params.openCallback();
            //设置标识
            if($Picker.isCreate){
                //布局
                $Picker.layout();
                //插入指定内容
                if(toPopover){
                    $Picker.pickerHTML = '<div class="ModalPopover ModalPopoverPickerColumns"><div class="ModalPopoverInner">' + $Picker.pickerHTML + '</div></div>';
                    $Picker.popover = KUIAPP.Popover($Picker.pickerHTML, $Picker.params.input, {removeOnClose:true});
                    $Picker.container = $$($Picker.popover).find('.PickerModal');
                    $$($Picker.popover).on('close', function () {
                        onPickerClose();
                    });
                }else if($Picker.inline){
                    $Picker.container = $$($Picker.pickerHTML);
                    $Picker.container.addClass('PickerModalInline');
                    $$($Picker.params.container).append($Picker.container);
                }else{
                    $Picker.container = $$(KUIAPP.PickerModal($Picker.pickerHTML,!$Picker.params.isEfficient));
                    $$($Picker.container).on('close', function () {
                        onPickerClose();
                    });
                };

                if($Picker.params.isEfficient && !toPopover){
                    $Picker.isCreate = false;
                }
            }
            //绑定确认事件
            $Picker.PickerClick = function(){
                if($$(this).hasClass('OkPicker') && !$Picker.params.autoUpdate){
                    $Picker.updateValue();
                };
                $Picker.close();
                $$(this).off('click',$Picker.PickerClick);
            }
            $Picker.container.find(".OkPicker,.ClosePicker").on('click',$Picker.PickerClick);
            //储存选择器实例
            $Picker.container[0].KLTPicker = $Picker;

            //初始化事件
            $Picker.container.find('.PickerItemsCol').each(function () {
                var updateItems = true;
                if((!$Picker.initialized && $Picker.params.value) || ($Picker.initialized && $Picker.value)){
                    updateItems = false;
                };
                $Picker.initPickerCol(this, updateItems);
            });
            
            //设定值
            if(!$Picker.initialized){
                if($Picker.value){
                    $Picker.setValue($Picker.value, 0);
                }else if($Picker.params.value) {
                    $Picker.setValue($Picker.params.value, 0);
                };
            }else{
                if($Picker.value){
                    $Picker.setValue($Picker.value, 0);
                };
            };
        };

        //设置标识
        $Picker.opened = true;
        $Picker.initialized = true;

        if($Picker.params.onOpen && Timestamp == $Picker.Timestamp){
            if($Picker.params.isEfficient && !toPopover){
                $Picker.isClick++
            };
            $Picker.params.onOpen($Picker);
        };
    };

    //关闭
    $Picker.close = function () {
        if(!$Picker.opened || $Picker.inline){
            return;
        };
        if(inPopover()){
            if($Picker.isCreate){
                KUIAPP.CloseModal($Picker.popover);
            }else{
                KUIAPP.HideModal($Picker.popover);
                setTimeout(function(){
                    $Picker.opened = false;
                },400)
            }
            return;
        }else{
            if($Picker.isCreate){
                KUIAPP.CloseModal($Picker.container);
            }else{
                KUIAPP.HideModal($Picker.container);
                setTimeout(function(){
                    $Picker.opened = false;
                },400)
            }
            return;
        };
    };

    //销毁
    $Picker.destroy = function(){
        $Picker.close();
        if($Picker.params.input && $Picker.input.length > 0){
            $Picker.input.off('click focus', openOnInput);
        };
        $$('html').off('click', closeOnHTMLClick);
        $$(window).off('resize', resizeCols);
    };

    if($Picker.inline){
        $Picker.open();
    }else{
        if(!$Picker.initialized && $Picker.params.value){
            $Picker.setValue($Picker.params.value);
        };
    };

    return $Picker;
};
window['kelat']['picker'] = function(params){return new KUIAPP.Picker(params);};

/**返回顶部 */
KUIAPP.BackToTop = function(){
    var BackToTop = '<div class="BackToTop"><i class="I IGoTop"></i></div>';
    var $WrapperArea = $$(document.getElementById(Local.WrapperArea));
    var $BackToTop = $$(BackToTop);
    //window绑定scroll事件
    $$(window).on("scroll",function(){
        if($WrapperArea.find('.isBackToTop').length > 0){
            //滚动条位置
            var ScrollTop=Local.support.GetPageScroll().Y;
            if(ScrollTop >= 200){
                $WrapperArea.append($BackToTop);
                $BackToTop.once(Local.support.onClick,function(){
                    $$('html,body').scrollTop(0,100);
                    setTimeout(function(){
                        $BackToTop.remove()
                    },100)
                });
            }else if(ScrollTop < 100){
                $BackToTop.remove();
            };
        }else{
            return
        };
    });
};

/*======================================================
************   通知   ************
======================================================*/
/** 通知 
 * @alias addNotify
 * @param {Array} options:模态框选项数组
 */
KUIAPP.AddNotify = function(options){
    if(options){
        var TitleHTML   = options.title   ? '<div class="ItemTitle">'   +options.title   +'</div>' :'';
        var SubtitleHTML= options.subtitle? '<div class="ItemSubtitle">'+options.subtitle+'</div>' :'';
        var MessageHTML = options.message ? '<div class="ItemText">'    +options.message +'</div>' :'';
        var MediaHTML   = options.media   ? '<div class="ItemMedia">'   +options.media   +'</div>' :'';
        var CloseHTML   = '<div class="ItemAfter"><a href="javascript:;" class="CloseNotify"><span></span></a></div>';
        var $Notify = $$('.NotifyBox');
        if ($Notify.length === 0) {
            $$(document.getElementById(Local.WrapperArea)).append('<ul class="NotifyBox ListBlock MediaList" style="z-index:'+Local.LayerIndex+'"></ul>');
            $Notify = $$('.NotifyBox');
        };
        $Notify.show();
        //媒体HTML
        var ItemHTML= '<li class="ListItem"><div class="ItemCon InkRipple">'+MediaHTML+
                     '<div class="ItemInner"><div class="ItemTitleRow">'+TitleHTML+CloseHTML+'</div>'
                     +SubtitleHTML
                     +MessageHTML
                     +'</div></div></li>';
        var $ItemHTML = $$(ItemHTML);
        
        $ItemHTML.on(Local.support.onClick, function (events) {
            var close = false;
            var target = $$(events.target);
            if (target.is('.CloseNotify') || $$(events.target).parents('.CloseNotify').length > 0) {
                close = true;
                if(options.onClose){
                    options.onClose($ItemHTML[0],events);
                };
            }else{
                if(options.closeOnClick){
                    close = true;
                }
            }
            if(close){
                KUIAPP.CloseNotify($ItemHTML[0]);
            };
        });
        $Notify['prepend']($ItemHTML[0]);
        var _ItemHeight = $ItemHTML.outerHeight();
        
        $ItemHTML.css('margin-top',-_ItemHeight + 'px');
        window.setTimeout(function(){
            $ItemHTML.addClass("ListItemInOut "+options.additionalClass).css('margin-top','0px');
        },5);
    };
    return this;
};
/** 关闭通知 
 * @alias closeNotify
 * @param {Object} item:通知对象
 */
KUIAPP.CloseNotify = function(item){
    item = $$(item);
    if (item.length === 0) { return };
    var $Notify = $$('.NotifyBox');
    var itemHeight = item.outerHeight();
    item.css('height', itemHeight + 'px');
    window.setTimeout(function(){
        item.addClass("ListItemInOut").css('height','0px');
    },20);
    item.addClass('NotifyBoxHidden').transitionEnd(function(){
        item.remove();
        if($Notify.find('.ListItem').length === 0){
            $Notify.hide();
        }
    });
};
window['kelat']['addNotify'] = KUIAPP.AddNotify;
window['kelat']['closeNotify'] = KUIAPP.CloseNotify;

/*======================================================
************   Indicator加载   ************
======================================================*/
// Indicator加载
KUIAPP.Indicator = function() {
    return running ? $$(document.getElementById(Local.WrapperArea)).append('<div class="LoadingIndicatorBlank"></div><div class="LoadingIndicatorBox"><span class="Loading LoadingWhite"></span></div>') : null;
};
// 卸载Indicator
KUIAPP.unIndicator = function() {
    return $$('.LoadingIndicatorBlank, .LoadingIndicatorBox').remove();
};
window['kelat']['indicator'] = KUIAPP.Indicator;
window['kelat']['unIndicator'] = KUIAPP.unIndicator;

/*======================================================
************   Toast 显示信息   ************
======================================================*/
/** Toast 显示信息 
 * @alias toast
 * @param {Object} options: Toast配置
 */
KUIAPP.Toast = function(options){
    options = options || {};
    var ToastTitle = options.title ? options.title :'';
    var ToastContent = options.content ? '<div>'+options.content+'</div>' :'';
    var ToastClassName = options.className ? options.className :'';
    var $Toast = $$('<div class="ToastBox '+ToastClassName+' '+animatedShift(kelat.defaults.shift)+'" style="z-index:' + Local.LayerIndex + '">'+ ToastContent + ToastTitle +'</div>');
    $$(document.getElementById(Local.WrapperArea)).append($Toast);
    //设置位置 上 右 下 左
    var CSS={'margin-left':-($Toast.outerWidth() / 2) + 'px'};
    (function(position){
        if(!position){return};
        for(var i=0;i<position.length;i++){
            if(!position[i]){
                continue;
            }else{
                var _Site;
                if(typeof position[i] === 'string' && position[i].indexOf('%') >= 0){
                    _Site = position[i];
                }else{
                    _Site = position[i] + 'px';
                };
                switch(i){
                    case 0: CSS.top = _Site; CSS.bottom = 'auto'; break;
                    case 1: CSS.right = _Site; CSS.left = 'auto'; CSS['margin-left'] = 'auto'; break;
                    case 2: CSS.bottom = _Site; break;
                    case 3: CSS.left = _Site; CSS['margin-left'] = 'auto'; break;
                };
            };
        };
    })(options.site);
    $Toast.css(CSS);
    //设置时间
    var Timeout = function(callback, time){
        setTimeout(function(){
            running && callback();
        },time)
    };
    //显示
    Timeout(function(){
        $Toast.removeClass('ToastOut').css({"z-index": ++Local.LayerIndex}).addClass('ToastIn');
    },10);
    //隐藏
    Timeout(function(){
        $Toast.removeClass('ToastIn').addClass('ToastOut').transitionEnd(function(){
            $Toast.remove();
        });
    },(options.time ? options.time :2e3));
};
window['kelat']['toast'] = KUIAPP.Toast;

/*======================================================
************   Loading加载   ************
======================================================*/
/** 加载 
 * @alias loading
 * @param {String} title:Loading标题
 */
KUIAPP.Loading = function(title) {
    return running ? KUIAPP.Modal({
        title: ( title || Local.LoadingTitle ),
        content: '<div class="TC">' + Local.LoadingHtml + '</div>',
        className: "ModalLoading"
    }) : null;
};
/* 卸载 */
KUIAPP.unLoading = function() {
    return KUIAPP.CloseModal(".ModalBox.ModalLoading");
};
window['kelat']['loading'] = KUIAPP.Loading;
window['kelat']['unLoading'] = KUIAPP.unLoading;

/*======================================================
************   模态框   ************
======================================================*/
/** 导航栏标题位置
 * @param {Object} modal:模态对象
 */
KUIAPP.SizeNavbars = function(modal){
    var navbarInner = modal ? $$(modal).find('.NavBar .NavBarInner') : $$('.NavBar .NavBarInner');
    navbarInner.each(function(){
        var $Navbar = $$(this);
        var left = _KLT_.rtl ? $Navbar.find('.Right') : $Navbar.find('.Left'),
            right = _KLT_.rtl ? $Navbar.find('.Left') : $Navbar.find('.Right'),
            center = $Navbar.find('.Center'),
            noLeft = left.length === 0,
            noRight = right.length === 0,
            leftWidth = noLeft ? 0 : left.outerWidth(true),
            rightWidth = noRight ? 0 : right.outerWidth(true),
            centerWidth = center.outerWidth(true),
            navbarStyles = $Navbar.styles(),
            navbarWidth = $Navbar[0].offsetWidth - parseInt(navbarStyles.paddingLeft, 10) - parseInt(navbarStyles.paddingRight, 10),
            currLeft, diff;

        if(noRight){
            currLeft = navbarWidth - centerWidth;
        };
        if(noLeft){
            currLeft = 0;
        };
        if(!noLeft && !noRight){
            currLeft = (navbarWidth - rightWidth - centerWidth + leftWidth) / 2;
        };
        var requiredLeft = (navbarWidth - centerWidth) / 2;
        if(navbarWidth - leftWidth - rightWidth > centerWidth){
            if(requiredLeft < leftWidth){
                requiredLeft = leftWidth;
            };
            if(requiredLeft + centerWidth > navbarWidth - rightWidth){
                requiredLeft = navbarWidth - rightWidth - centerWidth;
            };
            diff = requiredLeft - currLeft;
        }else{
            diff = 0;
        };
    
        // Center left
        var centerLeft = diff;
        if(_KLT_.rtl && noLeft && noRight && center.length > 0){
            centerLeft = -centerLeft;
        };
        center.css({left: centerLeft + 'px'});
    });
};

/** 显示 Modal
 * @param {Object} modal:模态框对象
 * @param {function} callback:显示对象后回调
 */
KUIAPP.ShowModal = function(modal, callback){
     Local.LayerIndex++
    modal.prev('.ModalBlank').css('z-index',Local.LayerIndex).removeClass("ModalBlankVisibleOut").addClass('ModalBlankVisibleIn');
     Local.LayerIndex++
    modal.removeClass('ModalOut').css({"z-index": ++Local.LayerIndex}).addClass('ModalIn').transitionEnd(function(){
        callback && callback();
    });
    return modal;
};
/** 隐藏 Modal
 * @param {Object} modal:模态框对象
 */
KUIAPP.HideModal = function(modal){
    $$('body').removeClass('OVBody');
    modal.removeClass('ModalIn').addClass('ModalOut').transitionEnd(function(e){
        modal.removeClass('ModalOut');
    });
    modal.prev('.ModalBlank').removeClass('ModalBlankVisibleIn').addClass('ModalBlankVisibleOut').transitionEnd(function(){
        $$(this).removeClass('ModalBlankVisibleOut').removeAttr('style');
    });
};
/** 打开 
 * @param {Object} modal:模态框对象
 * @param {String} className:模态框样式名
 */
KUIAPP.OpenModal = function(modal, className, Shift, displayTime){
    var timesTamp = +(new Date());
    var isPopover = modal.hasClass('ModalPopover');
    var isPickerModal = modal.hasClass('PickerModal');
    var isPopup = modal.hasClass('PopupBox');
    //var removeOnClose = modal.hasClass('RemoveOnClose');
    
    $$(document.getElementById(Local.WrapperArea)).append('<div class="ModalBlank ModalBlank'+timesTamp+'" style="z-index:' + Local.LayerIndex + '"/>');
    $$(document.getElementById(Local.WrapperArea)).append(modal[0]);
    KUIAPP.SizeNavbars(modal);
    var $ModalBlank = $$('.ModalBlank'+timesTamp)
    if((!!className?className:'').indexOf('ModalWarnBox')!==-1){
        modal.addClass(className);
        window.setTimeout(function(){
            KUIAPP.CloseModal(modal);
        },displayTime);
    }else{
        if(Local.isModalPopover){
            modal.addClass(className);
        }else if(!isPopover && !isPickerModal && !isPopup){
            modal.css({
                marginTop: -Math.round(modal.outerHeight() / 2) + 'px'
            });
        };
        Local.isModalPopover = false;
    };
    window.setTimeout(function(){
        if(modal && running){
            KUIAPP.ShowModal(modal,function(){
                if(isPopover || isPickerModal || isPopup){
                    $ModalBlank.on(Local.support.onClick,function(){
                        KUIAPP.CloseModal(modal,Shift);
                    });
                };
            });
        };
    },5);
};
/** 关闭 
 * @param {Object} modal:模态框对象
 */
KUIAPP.CloseModal = function(modal, Shift, callback){
     if(typeof Shift === 'function'){
          callback = arguments[1];
          Shift = undefined;
     }
    $$('body').removeClass('OVBody');
    modal = $$(modal || ".ModalBox.ModalBoxIn");
    if(typeof modal !== 'undefined' && modal.length === 0){
        return;
    };
    //var isModal = modal.hasClass('Modal');
    var isPopover = modal.hasClass('ModalPopover');
    var isPopup = modal.hasClass('PopupBox');
    var isPickerModal = modal.hasClass('PickerModal');
    var removeOnClose = modal.hasClass('RemoveOnClose');
    var hideOnClose = modal.hasClass('HideOnClose');
    modal.trigger('close');
    //选择器 body class
    modal.removeClass('ModalIn').addClass('ModalOut').transitionEnd(function(e){
        !!Shift && Shift[0].append(Shift[1]);
        if(isPickerModal || isPopover || isPopup){
            if(hideOnClose){
                modal.removeClass('ModalOut');
            }else{
                modal.removeClass('ModalOut').hide();
            }
            if(removeOnClose && modal.length > 0) {
                modal.remove();
            };
        }else{//删除
            modal.remove();
        };
    }).prev().removeClass("ModalBlankVisibleIn").addClass('ModalBlankVisibleOut').transitionEnd(function(){
        if(hideOnClose && modal.length > 0) {
            $$(this).removeClass('ModalBlankVisibleOut').removeAttr('style');//.hide();
        }else{
            $$(this).remove();
        };
          callback && callback();
    });
    
    return true;
};
/** 元素创建 
 * @param {Array} options:模态框选项数组
 */
KUIAPP.Modal = function(options){
    options = options || {};
    var ButtonsHTML = '',
        ButtonsNAME = '',
        ModalHTML = '',
        Shift;
    var ContentType = typeof options.content;
    //创建按钮
    if(options.buttons && options.buttons.length > 0){
        for(var i = 0; i < options.buttons.length; i++){
            if(i === 0){
                ButtonsNAME = "First";
            }else if(i === (options.buttons.length - 1)){
                ButtonsNAME = "Last";
            };
            ButtonsHTML += '<a href="javascript:;" class="ModalButton ' + ButtonsNAME + ' ' + ( options.buttons[i].className || '') + '">' + options.buttons[i].text + '</a>';
        };
    };
    //创建标题
    var TitleHTML    = options.title    ? '<div class="ModalHeader">' + options.title + '</div>' : '';
    //创建内容
    var ContentHTML  = options.content  ? ContentType ==='object' ? '<div class="ModalContent"></div>' : '<div class="ModalContent">' + options.content + '</div>' : '';
    var AfterTextHTML= ( options.afterText || '');
    var NoButtons    = !options.buttons || options.buttons.length === 0 ? 'ModalNoButtons' : '';
    var ModalButtonsHTML = options.buttons && options.buttons.length > 0 ? '<div class="ModalFooter ModalFooter' + options.buttons.length + '">' + ButtonsHTML + '</div>' : '';
    ModalHTML = '<div class="ModalBox ' + NoButtons +' '+ (!!options.className ? options.className : '')+'"><div class="ModalInner">' + (TitleHTML + ContentHTML + AfterTextHTML) + '</div>' + ModalButtonsHTML + '</div>';
    //创建父元素
    var $Modal = $$(ModalHTML);
    //添加对象
    if(ContentType ==='object'){
        Shift = [options.content.parent(),options.content];
        $Modal.find('.ModalContent').append(Shift[1]);
    };
    //添加按钮事件
    $Modal.find('.ModalButton').each(function(index, els){
        $$(els).on(Local.support.onClick, function(event){
            if(options.buttons[index].close !== false){ KUIAPP.CloseModal($Modal) };
            if(options.buttons[index].onClick){ options.buttons[index].onClick($Modal,event) };
            if(options.onClick){ options.onClick($Modal,index) };
        });
    });
    //打开模态框
    KUIAPP.OpenModal($Modal, options.className ? options.className : '', Shift, options.displayTime);
    return $Modal[0];
};
/** alert 框 
 * @alias alert
 * @param {String} content:内容
 * @param {String} title:标题
 * @param {function} callbackOk:确认事件
 */
KUIAPP.Alert = function(content, title, callbackOk, buttonText){
    if(typeof title === 'function'){
        buttonText = arguments[2];
        callbackOk = arguments[1];
        title = undefined;
    }
    return running ? KUIAPP.Modal({
        content: ( content || '' ),
        title: typeof title === 'undefined' ? Local.ModalTitle : title,
        buttons: [{
            text: buttonText && buttonText[0] ? buttonText[0] : Local.ModalButtonOk,
            onClick: callbackOk
        }]
    }) : null;
};
/** 确认框 
 * @alias confirm
 * @param {String} content:内容
 * @param {String} title:标题
 * @param {function} callbackOk:确认事件
 * @param {function} callbackCancel:取消事件
 */
KUIAPP.Confirm = function(content, title, callbackOk, callbackCancel, buttonText, className){
    if(typeof title === 'function'){
        if(typeof callbackOk === 'object'){
            buttonText = arguments[2];
        }else{
            buttonText = arguments[3];
            callbackCancel = arguments[2];
        }
        callbackOk = arguments[1];
        title = undefined;
    }
    return running ? KUIAPP.Modal({
        content: ( content || '' ),
        title: typeof title === 'undefined' ? Local.ModalTitle : title,
        className: ( className || '' ),
        buttons: [{
            text: buttonText && buttonText[1] ? buttonText[1] : Local.ModalButtonCancel,
            onClick: callbackCancel
        }, {
            text: buttonText && buttonText[0] ? buttonText[0] : Local.ModalButtonOk,
            onClick: callbackOk
        }]
    }) : null;
};
/** 自动消失提示框 
 * @alias warn
 * @param {String} content:内容
 */
KUIAPP.Warn = function(content, showTime, className){
    if(!content){return}
    if(typeof showTime === 'string') {
      className = arguments[1];
      showTime = undefined;
    }
    return running ? KUIAPP.Modal({
        content: content || '',
        displayTime: showTime ? showTime : 2E3,
        className: "ModalWarnBox " + className
    }) : null;
};
/** 提示框 
 * @alias prompt
 * @param {String} content:内容
 */
KUIAPP.Prompt = function(content, title, callbackOk, callbackCancel, buttonText){
    if (typeof title === 'function') {
        callbackOk = arguments[1];
        callbackCancel = arguments[2];
        buttonText = arguments[3];
        title = undefined;
    }
    return KUIAPP.Modal({
        content: content || '',
        title: typeof title === 'undefined' ? Local.ModalTitle : title,
        afterText: '<div class="InputField"><input type="text" class="ModalTextInput"></div>',
        buttons: [
            {
                text: buttonText && buttonText[1] ? buttonText[1] : Local.ModalButtonCancel
            },
            {
                text: buttonText && buttonText[0] ? buttonText[0] : Local.ModalButtonOk,
                bold: true
            }
        ],
        onClick: function (modal, index) {
            if (index === 0 && callbackCancel) callbackCancel($$(modal).find('.ModalTextInput').val());
            if (index === 1 && callbackOk) callbackOk($$(modal).find('.ModalTextInput').val());
        }
    });
};
/** 弹出框 
 * @alias popup
 * @param {Object} modal:模态框对象
 * @param {boolean} removeOnClose:是否删除
 */
KUIAPP.Popup = function(modal, removeOnClose, callback){
    if(typeof removeOnClose === 'function'){
        callback = arguments[1];
        removeOnClose = undefined;
    }
    if(typeof removeOnClose === 'undefined'){
        removeOnClose = true;
    };
    if(typeof modal === 'string' && modal.indexOf('<') >= 0){
        KUIAPP.ModalString(modal, removeOnClose, function(modals){
            modal = modals;
        });
    };
    modal = $$(modal);
    if(modal.length === 0){
        return false;
    };
    modal.show();
    //绑定确认事件
    modal.find(".ClosePopup").once('click',function(){
       KUIAPP.CloseModal(modal,function(){
          callback && callback(); 
        });
    });
    KUIAPP.OpenModal(modal);
    return modal[0];
};
/** 关闭所有弹出框 
 */
KUIAPP.unDialog = function(){
    $$('body').removeClass('OVBody');
    $$('.ModalBlank.ModalBlankVisibleIn').remove();
    $$('.PopupBox,.ModalBox').removeClass("ModalIn").removeAttr('style');
    return this;
};
/** 底部确认框 
 * @alias confirmModal
 * @param {String} content:内容
 * @param {String} title:标题
 * @param {function} callbackOk:确认事件
 * @param {function} callbackCancel:取消事件
 */
KUIAPP.ConfirmModal = function(content, title, callbackOk, callbackCancel, buttonText){
    return new KUIAPP.Confirm(content, title, callbackOk, callbackCancel, buttonText, "ModalPickerBox");    
};
/** 选择器框 
 * @alias pickerModal
 * @param {Object} modal:模态框对象
 * @param {boolean} removeOnClose:是否删除
 */
KUIAPP.PickerModal = function(modal, removeOnClose){
    if(typeof removeOnClose === 'undefined'){
        removeOnClose = true;
    };
    if(typeof modal === 'string' && modal.indexOf('<') >= 0){
        modal = $$(modal);
        modal.dd='1'
        if (modal.length > 0) {
            if(removeOnClose){
                modal.addClass('RemoveOnClose');
            }else{
                modal.addClass('HideOnClose');
            };
            $$(document.getElementById(Local.WrapperArea)).append(modal[0]);
        }else{
            return false;
        };
    }
    modal = $$(modal);
    if(modal.length === 0){
        return false;
    };
    if($$('.PickerModal.ModalIn:not(.ModalOut)').length > 0 && !modal.hasClass('ModalIn')){
        KUIAPP.CloseModal('.PickerModal.ModalIn:not(.ModalOut)');
    }
    KUIAPP.OpenModal(modal);
    return modal[0];
};
/** 模态框字符串处理
 * @param {String} modal:模态框字符串
 * @param {boolean} removeOnClose:是否删除
 * @param {function} callback:回调事件
 */
KUIAPP.ModalString = function(modal, removeOnClose, callback){
    var _modal = document.createElement('div');
    _modal.innerHTML = modal.trim();
    if(_modal.childNodes.length > 0){
        modal = _modal.childNodes[0];
        if(removeOnClose){
            modal.classList.add('RemoveOnClose');
        };
        $$(document.getElementById(Local.WrapperArea)).append(modal);
    }else{
        return false;
    };
    return callback(modal);
};
/** 弹出菜单 
 * @alias popover
 * @param {Object & String} modal:模态框对象
 * @param {String} target:模态框目标
 * @param {Object} param:参数集
 */
KUIAPP.Popover = function(modal, target, param){
    if(typeof param !== 'object'){
        param = {};
    };
    if(typeof param.removeOnClose === 'undefined'){
        param.removeOnClose = true;
    };
    if(typeof modal === 'string' && modal.indexOf('<') >= 0){
        KUIAPP.ModalString(modal, param.removeOnClose,function(modals){
            modal = modals;
        });
    };
    Local.isModalPopover = true;
    modal = $$(modal);
    target = $$(target);
    if(modal.length === 0 || target.length === 0){
        return false;
    };
    if(modal.find('.ModalPopoverAngle').length === 0){
        modal.append('<div class="ModalPopoverAngle"></div>');
    };
    modal.show();

    function sizePopover(){
        modal.css({left: '', top: ''});
        var modalWidth =  modal.width();
        var modalHeight =  modal.height(); // 13 - height of angle
        var modalAngle, modalAngleSize = 0, modalAngleLeft, modalAngleTop;
            modalAngle = modal.find('.ModalPopoverAngle');
            modalAngleSize = modalAngle.width() / 2;
            modalAngle.removeClass('onLeft onRight onTop onBottom').css({left: '', top: ''});

        var targetWidth = target.outerWidth();
        var targetHeight = target.outerHeight();
        var targetOffset = target.offset();
        var targetParentPage = target.parents('body');
        if(targetParentPage.length > 0){
            targetOffset.top = targetOffset.top - targetParentPage[0].scrollTop;
        };
        //滚动条位置
        var scrollTop=Local.support.GetPageScroll();
        //window height
        var windowSize=Local.support.GetPageSize();
        var windowHeight = windowSize.WinH;
        var windowWidth = windowSize.WinW;

        var modalTop = 0;
        var modalLeft = 0;
        var diff = 0;
        //位置
        var modalPosition = 'top';
        if((modalHeight + modalAngleSize) < targetOffset.top){
            // On top
            modalTop = targetOffset.top - modalHeight - modalAngleSize  + scrollTop.Y;
        }else if((modalHeight + modalAngleSize) < windowHeight - targetOffset.top - targetHeight){
            // On bottom
            modalPosition = 'bottom';
            modalTop = targetOffset.top + targetHeight + modalAngleSize + scrollTop.Y;
        }else{
            // On middle
            modalPosition = 'middle';
            modalTop = targetHeight / 2 + targetOffset.top - modalHeight / 2;
            diff = modalTop;
            if(modalTop <= 0){
                modalTop = 5;
            }else if(modalTop + modalHeight >= windowHeight){
                modalTop = windowHeight - modalHeight - 5;
            }
            diff = diff - modalTop;
        };
        //特殊处理角
        if(param.angle){
            modalPosition = param.angle;
            modalTop = targetOffset.top - modalHeight - modalAngleSize  + scrollTop.Y;
        };
        //水平位置
        if(modalPosition === 'top' || modalPosition === 'bottom'){
            modalLeft = targetWidth / 2 + targetOffset.left - modalWidth / 2;
            diff = modalLeft;
            if(modalLeft < 5){
                modalLeft = 5;
            };
            if(modalLeft + modalWidth > windowWidth){
                modalLeft = windowWidth - modalWidth - 5;
            };
            if(modalPosition === 'top') {
                modalAngle.addClass('onBottom');
            };
            if(modalPosition === 'bottom') {
                modalAngle.addClass('onTop');
            };
            diff = diff - modalLeft;
            modalAngleLeft = (modalWidth / 2 - modalAngleSize + diff);
            modalAngleLeft = Math.max(Math.min(modalAngleLeft, modalWidth - modalAngleSize * 2 - 13), 13);
            modalAngle.css({left: modalAngleLeft + 'px'});

        }else if (modalPosition === 'middle') {
            modalLeft = targetOffset.left - modalWidth - modalAngleSize;
            modalAngle.addClass('onRight');
            if(modalLeft < 5 || (modalLeft + modalWidth > windowWidth)){
                if(modalLeft < 5){
                    modalLeft = targetOffset.left + targetWidth + modalAngleSize;
                };
                if(modalLeft + modalWidth > windowWidth){
                    modalLeft = windowWidth - modalWidth - 5;
                };
                modalAngle.removeClass('onRight').addClass('onLeft');
            }
            modalAngleTop = (modalHeight / 2 - modalAngleSize + diff);
            modalAngleTop = Math.max(Math.min(modalAngleTop, modalHeight - modalAngleSize * 2 - 13), 13);
            modalAngle.css({top: modalAngleTop + 'px'});
        };
        if(param.angle == 'top'){
            modalAngle.removeClass('onLeft onRight onTop onBottom').addClass('onTop');
            modalTop = targetOffset.top + modalAngleSize + targetHeight + targetParentPage[0].scrollTop;
        };
        if(param.center){
            modalLeft = (windowWidth - modalWidth) / 2;
        };
        //应用样式
        modal.css({top: modalTop + 'px', left: parseInt(modalLeft) + 'px'});
    };
    
    sizePopover();

    $$(window).on('resize', sizePopover);

    modal.on('close', function(){
        $$(window).off('resize', sizePopover);
    });

    KUIAPP.OpenModal(modal);
    return running ? modal[0] : null;
};
window['kelat']['alert'] = KUIAPP.Alert;
window['kelat']['confirm'] = KUIAPP.Confirm;
window['kelat']['warn'] = KUIAPP.Warn;
window['kelat']['prompt'] = KUIAPP.Prompt;
window['kelat']['pickerModal'] = KUIAPP.PickerModal;
window['kelat']['popup'] = KUIAPP.Popup;
window['kelat']['unDialog'] = KUIAPP.unDialog;
window['kelat']['popover'] = KUIAPP.Popover;
window['kelat']['confirmModal'] = KUIAPP.ConfirmModal;

/*======================================================
************   空白提示   ************
======================================================*/
/** 空白提示 
 * @alias blankTips
 * @param {String} title:标题
 * @param {String} content:内容
 * @param {function} callBack:回调
 */
KUIAPP.BlankTips = function(title, content, callBack){
    if(typeof content === 'function'){
        callBack = arguments[1];
        content = undefined;
    };
    var TitleHTML    = title   ? '<div class="BlankTipsTitle">'  + title   + '</div>' : '';
    var ContentHTML  = content ? '<div class="BlankTipsContent">' + content + '</div>' : '';
    var BlankTipsHTML = '<div class="BlankTips">' + ContentHTML + TitleHTML + '</div></div>';
    var $BlankTipsHTML = $$(BlankTipsHTML);
    $BlankTipsHTML.on(Local.support.onClick, function(event){
        if(!!callBack){callBack($BlankTipsHTML,event)};
    });
    $$('html,body').addClass('OH');
    $$(document.getElementById(Local.WrapperArea)).append($BlankTipsHTML)
    return this;
};
window['kelat']['blankTips'] = KUIAPP.BlankTips;

/*======================================================
************   操作表单   ************
======================================================*/
/** 显示操作表单 
 * @param {Object} actions:对象
 */
KUIAPP.OpenActions = function(actions){
    var timesTamp = +(new Date());
    $$(document.getElementById(Local.WrapperArea)).append($$('<div class="ModalBlank ActionsBlank'+timesTamp+'" style="z-index:' + Local.LayerIndex + '"/>'));
    $$(document.getElementById(Local.WrapperArea)).append($$(actions[0]));
    window.setTimeout(function(){
        if(actions && running){
            actions.css({
                "z-index": ++Local.LayerIndex
            }).removeClass('ModalOut').addClass('ModalIn');
        };
        $$('.ActionsBlank'+timesTamp).addClass('ModalBlankVisibleIn').transitionEnd(function(){
            $$(this).on(Local.support.onClick,function(){
                KUIAPP.CloseModal(actions);
            });
        });
    },5);
};
/** 操作表单 
 * @alias actions
 * @param {Array} options:操作表单数组
 */
KUIAPP.Actions = function(options){
    var options = options || [];
    var ButtonsHTML = '',
        ActionsHTML = '';
    for(var i = 0; i < options.length; i++){
        for(var j = 0; j < options[i].length; j++){
            if(j === 0){ ButtonsHTML += '<div class="ActionsModalGroup">' };
            var button = options[i][j];
            var buttonClass = button.label ? 'ActionsLabel' : 'ActionsButton';
            var buttonText = button.text ? button.text : Local.ModalButtonCancel;
            if(button.bold){ buttonClass += ' ActionsButtonBold' };
            if(button.color){ buttonClass += ' ' + button.color };
            if(button.bg){ buttonClass += ' ' + button.bg };
            if(button.disabled){ buttonClass += ' disabled' };
            ButtonsHTML += '<div class="' + buttonClass + '">' + buttonText + '</div>';
            if(j === (options[i].length - 1)){ButtonsHTML += '</div>'};
        }
    }
    ActionsHTML = '<div class="ModalBox ActionsModal">' + ButtonsHTML + '</div>';
    var ActionsGroup = '.ActionsModalGroup';
    var ActionsButton = '.ActionsButton';
    var $Actions = $$(ActionsHTML);
    var $Groups = $Actions.find(ActionsGroup);
    $Groups.each(function(index, els){
        var _GroupIndex = index;
        $$(els).children().each(function(index, els){
            var _ButtonIndex = index;
            var $ButtonParams = options[_GroupIndex][_ButtonIndex];
            var $onClick;
            if($$(els).is(ActionsButton)){ $onClick = $$(els) };
            if($$(els).find(ActionsButton).length > 0){ $onClick = $$(els).find(ActionsButton) };

            if($onClick){
                $onClick.on(Local.support.onClick, function (events) {
                    if($ButtonParams.close !== false){ KUIAPP.CloseModal($Actions) };
                    if($ButtonParams.onClick){ $ButtonParams.onClick($Actions,events) };
                });
            }
        });
    });
    return running ? KUIAPP.OpenActions($Actions):'';
};
window['kelat']['actions'] = KUIAPP.Actions;

/*======================================================
************   滑动操作(滑动删除)   ************
======================================================*/
KUIAPP.swipeoutOpenedEl = undefined;
KUIAPP.allowSwipeout = true;
/** 初始化滑动操作
 * @alias initSwipeout
 * @param {Object & String} swipeoutEl:滑动对象
 */
KUIAPP.initSwipeout = function(swipeoutEl){
    var isTouched, isMoved, isScrolling, touchesStart = {}, touchStartTime, touchesDiff, swipeOutEl, swipeOutContent, actionsRight, actionsLeft, actionsLeftWidth, actionsRightWidth, translate, opened, openedActions, buttonsLeft, buttonsRight, direction, overswipeLeftButton, overswipeRightButton, overswipeLeft, overswipeRight, noFoldLeft, noFoldRight;
    
    //滑动操作关闭
    $$(document).on('click','.SwipeoutClose',function(){
        KUIAPP.swipeoutClose($$(this).parents('.SwipeoutOpened'));
    });
        
    //滑动操作删除
    $$(document).on('click','.SwipeoutDelete',function(){
        var clicked = $$(this)
        var clickedData = clicked.dataset()
        if(clickedData.confirm){
            var text = clickedData.confirm;
            var title = clickedData.confirmtitle;
            if(title){
                kelat.confirm(text, title, function(){
                    KUIAPP.swipeoutDelete(clicked.parents('.Swipeout'));
                },function(){
                    if(clickedData.closeoncancel){
                        KUIAPP.swipeoutClose(clicked.parents('.Swipeout'));
                    };
                });
            }else{
                kelat.confirm(text, function(){
                    KUIAPP.swipeoutDelete(clicked.parents('.Swipeout'));
                },function(){
                    if(clickedData.closeoncancel){
                        KUIAPP.swipeoutClose(clicked.parents('.Swipeout'));
                    };
                });
            }
        }else{
            KUIAPP.swipeoutDelete(clicked.parents('.Swipeout'));
        }
    });
    
    //绑定取消事件
    $$(document).on(_KLT_.touchEvents.start,function(e){
        if (KUIAPP.swipeoutOpenedEl) {
            var target = $$(e.target);
            if(!(
                KUIAPP.swipeoutOpenedEl.is(target[0]) ||
                target.parents('.Swipeout').is(KUIAPP.swipeoutOpenedEl) ||
                target.hasClass('ModalIn') ||
                target.hasClass('ModalBlank') ||
                target.hasClass('ActionsModal') || 
                target.parents('.ActionsModal.ModalIn, .ModalBox.ModalIn').length > 0
                )){
                KUIAPP.swipeoutClose(KUIAPP.swipeoutOpenedEl);
            }
        }
    });
    //触摸事件
    function handleTouchStart(e) {
        if(!KUIAPP.allowSwipeout){return;};
        isMoved = false;isTouched = true;isScrolling = undefined;
        touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
        touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
        touchStartTime = (new Date()).getTime();
    };
    //滑动事件
    function handleTouchMove(e) {
        if(!isTouched){return;};
        var pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
        var pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
        if(typeof isScrolling === 'undefined'){
            isScrolling = !!(isScrolling || Math.abs(pageY - touchesStart.y) > Math.abs(pageX - touchesStart.x));
        };
        if(isScrolling){
            isTouched = false;
            return;
        };

        if(!isMoved){
            if($$('.ListBlock.SortableOpened').length > 0){return;};
            /*jshint validthis:true */
            swipeOutEl = $$(this);
            swipeOutContent = swipeOutEl.find('.SwipeoutCon');
            actionsRight = swipeOutEl.find('.SwipeoutActionsRight');
            actionsLeft = swipeOutEl.find('.SwipeoutActionsLeft');
            actionsLeftWidth = actionsRightWidth = buttonsLeft = buttonsRight = overswipeRightButton = overswipeLeftButton = null;
            noFoldLeft = actionsLeft.hasClass('SwipeoutActionsNoFold') || Local.swipeoutActionsNoFold;
            noFoldRight = actionsRight.hasClass('SwipeoutActionsNoFold') || Local.swipeoutActionsNoFold;
            if(actionsLeft.length > 0){
                actionsLeftWidth = actionsLeft.outerWidth();
                buttonsLeft = actionsLeft.children('.SwipeoutItem');
                overswipeLeftButton = actionsLeft.find('.SwipeoutOverswipe');
            };
            if(actionsRight.length > 0){
                actionsRightWidth = actionsRight.outerWidth();
                buttonsRight = actionsRight.children('.SwipeoutItem');
                overswipeRightButton = actionsRight.find('.SwipeoutOverswipe');
            };
            opened = swipeOutEl.hasClass('SwipeoutOpened');
            if(opened){
                openedActions = swipeOutEl.find('.SwipeoutActionsLeft.SwipeoutActionsOpened').length > 0 ? 'left' : 'right';
            };
            swipeOutEl.removeClass('transitioning');
            if(!Local.swipeoutNoFollow){
                swipeOutEl.find('.SwipeoutActionsOpened').removeClass('SwipeoutActionsOpened');
                swipeOutEl.removeClass('SwipeoutOpened');
            };
        }
        isMoved = true;
        e.preventDefault();
        
        touchesDiff = pageX - touchesStart.x;
        translate = touchesDiff;

        if(opened){
            if(openedActions === 'right'){
                translate = translate - actionsRightWidth;
            }else{
                translate = translate + actionsLeftWidth;
            }
        };

        if(translate > 0 && actionsLeft.length === 0 || translate < 0 && actionsRight.length === 0){
            if(!opened){
                isTouched = isMoved = false;
                swipeOutContent.transform('');
                if(buttonsRight && buttonsRight.length > 0){
                    buttonsRight.transform('');
                };
                if(buttonsLeft && buttonsLeft.length > 0){
                    buttonsLeft.transform('');
                };
                return;
            }
            translate = 0;
        };

        if(translate < 0){
            direction = 'toLeft';
        }else if(translate > 0){
            direction = 'toRight';
        }else{
            if(direction){
                direction = direction;
            }else{
                direction = 'toLeft';
            };
        };
        
        var i, buttonOffset, progress;
        
        if(Local.swipeoutNoFollow){
            if(opened){
                if(openedActions === 'right' && touchesDiff > 0){
                    KUIAPP.swipeoutClose(swipeOutEl);
                };
                if(openedActions === 'left' && touchesDiff < 0){
                    KUIAPP.swipeoutClose(swipeOutEl);
                };
            }else{
                if(touchesDiff < 0 && actionsRight.length > 0){
                    KUIAPP.swipeoutOpen(swipeOutEl, 'right');
                };
                if(touchesDiff > 0 && actionsLeft.length > 0){
                    KUIAPP.swipeoutOpen(swipeOutEl, 'left');
                };
            };
            isTouched = false;
            isMoved = false;
            return;
        };
        overswipeLeft = false;
        overswipeRight = false;
        var $button;
        if(actionsRight.length > 0){
            //右操作
            progress = translate / actionsRightWidth;
            if(translate < -actionsRightWidth) {
                translate = -actionsRightWidth - Math.pow(-translate - actionsRightWidth, 0.8);
                if(overswipeRightButton.length > 0){
                    overswipeRight = true;
                }
            };
            for(i = 0; i < buttonsRight.length; i++){
                if(typeof buttonsRight[i]._buttonOffset === 'undefined'){
                    buttonsRight[i]._buttonOffset = buttonsRight[i].offsetLeft;
                }
                buttonOffset = buttonsRight[i]._buttonOffset;
                $button = $$(buttonsRight[i]);
                if(overswipeRightButton.length > 0 && $button.hasClass('SwipeoutOverswipe')){
                    $button.css({left: (overswipeRight ? -buttonOffset : 0) + 'px'});
                    if(overswipeRight){
                        $button.addClass('swipeout-overswipe-active');
                    }else{
                        $button.removeClass('swipeout-overswipe-active');   
                    }
                };
                $button.transform('translate3d(' + (translate - buttonOffset * (1 + Math.max(progress, -1))) + 'px,0,0)');
            };
        };
        if(actionsLeft.length > 0){
            //左操作
            progress = translate / actionsLeftWidth;
            if(translate > actionsLeftWidth){
                translate = actionsLeftWidth + Math.pow(translate - actionsLeftWidth, 0.8);
                if(overswipeLeftButton.length > 0){
                    overswipeLeft = true;
                }
            };
            for(i = 0; i < buttonsLeft.length; i++){
                if(typeof buttonsLeft[i]._buttonOffset === 'undefined'){
                    buttonsLeft[i]._buttonOffset = actionsLeftWidth - buttonsLeft[i].offsetLeft - buttonsLeft[i].offsetWidth;
                }
                buttonOffset = buttonsLeft[i]._buttonOffset;
                $button = $$(buttonsLeft[i]);
                if(overswipeLeftButton.length > 0 && $button.hasClass('SwipeoutOverswipe')){
                    $button.css({left: (overswipeLeft ? buttonOffset : 0) + 'px'});
                    if(overswipeLeft){
                        $button.addClass('swipeout-overswipe-active');
                    }else{
                        $button.removeClass('swipeout-overswipe-active');   
                    }
                };
                if(buttonsLeft.length > 1){
                    $button.css('z-index', buttonsLeft.length - i); 
                };
                $button.transform('translate3d(' + (translate + buttonOffset * (1 - Math.min(progress, 1))) + 'px,0,0)');
            };
        };
        swipeOutContent.transform('translate3d(' + translate + 'px,0,0)');
    };
    //离开事件
    function handleTouchEnd(e) {
        if(!isTouched || !isMoved){
            isTouched = false;
            isMoved = false;
            return;
        };

        isTouched = false;
        isMoved = false;
        var timeDiff = (new Date()).getTime() - touchStartTime;
        var action, actionsWidth, actions, buttons, i, noFold;
        
        noFold = direction === 'toLeft' ? noFoldRight : noFoldLeft;
        actions = direction === 'toLeft' ? actionsRight : actionsLeft;
        actionsWidth = direction === 'toLeft' ? actionsRightWidth : actionsLeftWidth;

        if(
            timeDiff < 300 && (touchesDiff < -10 && direction === 'toLeft' || touchesDiff > 10 && direction === 'toRight') ||
            timeDiff >= 300 && Math.abs(translate) > actionsWidth / 2
        ){
            action = 'open';
        }else{
            action = 'close';
        };
        if(timeDiff < 300){
            if(Math.abs(translate) === 0){
                action = 'close';
            };
            if(Math.abs(translate) === actionsWidth){
                action = 'open';
            };
        };
        
        if(action === 'open'){
            KUIAPP.swipeoutOpenedEl = swipeOutEl;
            swipeOutEl.trigger('open');
            swipeOutEl.addClass('SwipeoutOpened transitioning');
            var newTranslate = direction === 'toLeft' ? -actionsWidth : actionsWidth;
            swipeOutContent.transform('translate3d(' + newTranslate + 'px,0,0)');
            actions.addClass('SwipeoutActionsOpened');
            buttons = direction === 'toLeft' ? buttonsRight : buttonsLeft;
            if(buttons){
                for(i = 0; i < buttons.length; i++){
                    $$(buttons[i]).transform('translate3d(' + newTranslate + 'px,0,0)');
                }
            };
            if(overswipeRight){
                actionsRight.find('.SwipeoutOverswipe')[0].click();
            }
            if(overswipeLeft){
                actionsLeft.find('.SwipeoutOverswipe')[0].click();
            }
        }else{
            swipeOutEl.trigger('close');
            KUIAPP.swipeoutOpenedEl = undefined;
            swipeOutEl.addClass('transitioning').removeClass('SwipeoutOpened');
            swipeOutContent.transform('');
            actions.removeClass('SwipeoutActionsOpened');
        };
        
        var buttonOffset;
        if(buttonsLeft && buttonsLeft.length > 0 && buttonsLeft !== buttons){
            for(i = 0; i < buttonsLeft.length; i++){
                buttonOffset = buttonsLeft[i]._buttonOffset;
                if(typeof buttonOffset === 'undefined'){
                    buttonsLeft[i]._buttonOffset = actionsLeftWidth - buttonsLeft[i].offsetLeft - buttonsLeft[i].offsetWidth;
                }
                $$(buttonsLeft[i]).transform('translate3d(' + (buttonOffset) + 'px,0,0)');
            }
        };
        if(buttonsRight && buttonsRight.length > 0 && buttonsRight !== buttons){
            for(i = 0; i < buttonsRight.length; i++){
                buttonOffset = buttonsRight[i]._buttonOffset;
                if(typeof buttonOffset === 'undefined'){
                    buttonsRight[i]._buttonOffset = buttonsRight[i].offsetLeft;
                }
                $$(buttonsRight[i]).transform('translate3d(' + (-buttonOffset) + 'px,0,0)');
            }
        };
        swipeOutContent.transitionEnd(function (e) {
            if(opened && action === 'open' || closed && action === 'close'){
                return;
            };
            swipeOutEl.trigger(action === 'open' ? 'opened' : 'closed');
            if(opened && action === 'close'){
                if(actionsRight.length > 0){
                    buttonsRight.transform('');
                }
                if(actionsLeft.length > 0){
                    buttonsLeft.transform('');
                }
            }
        });
        
    };
    //绑定事件
    if(swipeoutEl){
        if(!window.isSwipeoutEL){
            $$(swipeoutEl).on(_KLT_.touchEvents.start, handleTouchStart);
            $$(swipeoutEl).on(_KLT_.touchEvents.move, handleTouchMove);
            $$(swipeoutEl).on(_KLT_.touchEvents.end, handleTouchEnd);
            window.isSwipeoutEL = true;
        }
    }else{
        if(!window.isSwipeout){
            $$(document).on(_KLT_.touchEvents.start, '.ListBlock li.Swipeout', handleTouchStart);
            $$(document).on(_KLT_.touchEvents.move, '.ListBlock li.Swipeout', handleTouchMove);
            $$(document).on(_KLT_.touchEvents.end, '.ListBlock li.Swipeout', handleTouchEnd);
            window.isSwipeout = true;
        }
    };
};
/** 打开滑动操作
 * @alias swipeoutOpen
 * @param {Object} el:滑动对象
 * @param {String} dir:方向
 * @param {function} callback:回调事件
 */
KUIAPP.swipeoutOpen = function(el, dir, callback){
    el = $$(el);
    if(arguments.length === 2){
        if(typeof arguments[1] === 'function'){
            callback = dir;
        }
    };

    if(el.length === 0) return;
    if(el.length > 1) el = $$(el[0]);
    if(!el.hasClass('Swipeout') || el.hasClass('SwipeoutOpened')){
        return;
    };
    if(!dir){
        if(el.find('.SwipeoutActionsRight').length > 0){
            dir = 'right';
        }else{
            dir = 'left';
        };
    };
    var swipeOutActions = el.find('.swipeout-actions-' + dir);
    if(swipeOutActions.length === 0){
        return;
    };
    //var noFold = swipeOutActions.hasClass('SwipeoutActionsNoFold') || Local.swipeoutActionsNoFold;
    el.trigger('open').addClass('SwipeoutOpened').removeClass('transitioning');
    swipeOutActions.addClass('SwipeoutActionsOpened');
    var buttons = swipeOutActions.children('.SwipeoutItem');
    var swipeOutActionsWidth = swipeOutActions.outerWidth();
    var translate = dir === 'right' ? -swipeOutActionsWidth : swipeOutActionsWidth;
    var i;
    if(buttons.length > 1){
        for(i = 0; i < buttons.length; i++){
            if(dir === 'right'){
                $$(buttons[i]).transform('translate3d(' + (- buttons[i].offsetLeft) + 'px,0,0)');
            }else{
                $$(buttons[i]).css('z-index', buttons.length - i).transform('translate3d(' + (swipeOutActionsWidth - buttons[i].offsetWidth - buttons[i].offsetLeft) + 'px,0,0)');
            }
        }
        var clientLeft = buttons[1].clientLeft;
    };
    el.addClass('transitioning');
    for(i = 0; i < buttons.length; i++){
        $$(buttons[i]).transform('translate3d(' + (translate) + 'px,0,0)');
    };
    el.find('.SwipeoutCon').transform('translate3d(' + translate + 'px,0,0)').transitionEnd(function(){
        el.trigger('opened');
        if (callback) callback.call(el[0]);
    });
    KUIAPP.swipeoutOpenedEl = el;
};
/** 取消滑动操作
 * @alias swipeoutClose
 * @param {Object} el:滑动对象
 * @param {function} callback:回调事件
 */
KUIAPP.swipeoutClose = function(el, callback){
    el = $$(el);
    if(el.length === 0) return;
    if(!el.hasClass('SwipeoutOpened')) return;
    var dir = el.find('.SwipeoutActionsOpened').hasClass('SwipeoutActionsRight') ? 'right' : 'left';
    var swipeOutActions = el.find('.SwipeoutActionsOpened').removeClass('SwipeoutActionsOpened');
    //var noFold = swipeOutActions.hasClass('SwipeoutActionsNoFold') || Local.swipeoutActionsNoFold;
    var buttons = swipeOutActions.children('.SwipeoutItem');
    var swipeOutActionsWidth = swipeOutActions.outerWidth();
    KUIAPP.allowSwipeout = false;
    el.trigger('close');
    el.removeClass('SwipeoutOpened').addClass('transitioning');

    var closeTO;
    function onSwipeoutClose() {
        KUIAPP.allowSwipeout = true;
        if(el.hasClass('SwipeoutOpened')) return;
        el.removeClass('transitioning');
        buttons.transform('');
        el.trigger('closed');
        if(callback){
            callback.call(el[0]);
        };
        if(closeTO){
            clearTimeout(closeTO);
        };
    };
    el.find('.SwipeoutCon').transform('').transitionEnd(onSwipeoutClose);
    closeTO = setTimeout(onSwipeoutClose, 500);
    
    for(var i = 0; i < buttons.length; i++){
        if(dir === 'right'){
            $$(buttons[i]).transform('translate3d(' + (-buttons[i].offsetLeft) + 'px,0,0)');
        }else{
            $$(buttons[i]).transform('translate3d(' + (swipeOutActionsWidth - buttons[i].offsetWidth - buttons[i].offsetLeft) + 'px,0,0)');
        }
        $$(buttons[i]).css({left:0 + 'px'}).removeClass('swipeout-overswipe-active');
    };
    
    if(KUIAPP.swipeoutOpenedEl && KUIAPP.swipeoutOpenedEl[0] === el[0]){
        KUIAPP.swipeoutOpenedEl = undefined;
    };
};
/** 删除滑动操作
 * @alias swipeoutDelete
 * @param {Object} el:滑动对象
 * @param {function} callback:回调事件
 */
KUIAPP.swipeoutDelete = function(el, callback){
    el = $$(el);
    if(el.length === 0){
        return;
    };
    if(el.length > 1){
        el = $$(el[0]);
    };
    KUIAPP.swipeoutOpenedEl = undefined;
    el.trigger('delete');
    el.css({height: el.outerHeight() + 'px'});
    var clientLeft = el[0].clientLeft;
    el.css({height: 0 + 'px'}).addClass('Deleting transitioning').transitionEnd(function () {
        el.trigger('deleted');
        if(callback){
            callback.call(el[0]);
        }
        el.remove();
    });
    var translate = '-100%';
    el.find('.SwipeoutCon').transform('translate3d(' + translate + ',0,0)');
};
window['kelat']['initSwipeout'] = KUIAPP.initSwipeout;
window['kelat']['swipeoutOpen'] = KUIAPP.swipeoutOpen;
window['kelat']['swipeoutClose'] = KUIAPP.swipeoutClose;
window['kelat']['swipeoutDelete'] = KUIAPP.swipeoutDelete;


/*=====================================================
************   可排序列表   ************
=====================================================*/
/** 触发排序列表
 * @param {Object} sortableContainer:滑动对象
 */
KUIAPP.sortableToggle = function(sortableContainer){
    sortableContainer = $$(sortableContainer);
    if(sortableContainer.length === 0){
        sortableContainer = $$('.ListBlock.Sortable');
    };
    sortableContainer.toggleClass('SortableOpened');
    if(sortableContainer.hasClass('SortableOpened')){
        sortableContainer.trigger('open');
    }else{
        sortableContainer.trigger('close');
    };
    return sortableContainer;
};
/** 打开排序列表
 * @alias sortableOpen
 * @param {Object} sortableContainer:滑动对象
 */
KUIAPP.sortableOpen = function(sortableContainer){
    sortableContainer = $$(sortableContainer);
    if(sortableContainer.length === 0){
        sortableContainer = $$('.ListBlock.Sortable');
    };
    sortableContainer.addClass('SortableOpened');
    sortableContainer.trigger('open');
    return sortableContainer;
};
/** 关闭排序列表
 * @alias sortableClose
 * @param {Object} sortableContainer:滑动对象
 */
KUIAPP.sortableClose = function(sortableContainer){
    sortableContainer = $$(sortableContainer);
    if(sortableContainer.length === 0){
        sortableContainer = $$('.ListBlock.Sortable');
    };
    sortableContainer.removeClass('SortableOpened');
    sortableContainer.trigger('close');
    return sortableContainer;
};
/** 初始化排序列表 */
KUIAPP.initSortable = function () {
    var isTouched, isMoved, touchStartY, touchesDiff, sortingEl, sortingElHeight, sortingItems, minTop, maxTop, insertAfter, insertBefore, sortableContainer;
    //开关事件
    $$(document).on('click','.ToggleSortable,.CloseSortable,.OpenSortable',function(){
        var clicked = $$(this)
        var clickedData = clicked.dataset()
        if(clicked.hasClass('ToggleSortable')){
            KUIAPP.sortableToggle(clickedData.sortable);
        }
        if(clicked.hasClass('OpenSortable')){
            KUIAPP.sortableOpen(clickedData.sortable);
        }
        if(clicked.hasClass('CloseSortable')){
            KUIAPP.sortableClose(clickedData.sortable);
        }
    })

    //触摸事件
    function handleTouchStart(e) {
        isMoved = false;
        isTouched = true;
        touchStartY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
        /*jshint validthis:true */
        sortingEl = $$(this).parent();
        sortingItems = sortingEl.parent().find('li');
        sortableContainer = sortingEl.parents('.sortable');
        e.preventDefault();
        KUIAPP.allowSwipeout = false;
    }
    //移动事件
    function handleTouchMove(e) {
        if(!isTouched || !sortingEl){
            return;
        };
        //var pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
        var pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
        if(!isMoved){
            sortingEl.addClass('sorting');
            sortableContainer.addClass('sortable-sorting');
            minTop = sortingEl[0].offsetTop;
            maxTop = sortingEl.parent().height() - sortingEl[0].offsetTop - sortingEl.height();
            sortingElHeight = sortingEl[0].offsetHeight;
        }
        isMoved = true;

        e.preventDefault();
        touchesDiff = pageY - touchStartY;
        var translate = touchesDiff;
        if(translate < -minTop){
            translate = -minTop;
        };
        if(translate > maxTop){
            translate = maxTop;
        };
        sortingEl.transform('translate3d(0,' + translate + 'px,0)');

        insertBefore = insertAfter = undefined;

        sortingItems.each(function(){
            var currentEl = $$(this);
            if(currentEl[0] === sortingEl[0]){
                return;
            };
            var currentElOffset = currentEl[0].offsetTop;
            var currentElHeight = currentEl.height();
            var sortingElOffset = sortingEl[0].offsetTop + translate;

            if((sortingElOffset >= currentElOffset - currentElHeight / 2) && sortingEl.index() < currentEl.index()){
                currentEl.transform('translate3d(0, '+(-sortingElHeight)+'px,0)');
                insertAfter = currentEl;
                insertBefore = undefined;
            }else if((sortingElOffset <= currentElOffset + currentElHeight / 2) && sortingEl.index() > currentEl.index()){
                currentEl.transform('translate3d(0, '+(sortingElHeight)+'px,0)');
                insertAfter = undefined;
                if(!insertBefore){
                    insertBefore = currentEl;
                };
            }else{
                $$(this).transform('translate3d(0, 0%,0)');
            };
        });
    }
    //离开事件
    function handleTouchEnd(e) {
        KUIAPP.allowSwipeout = true;
        if(!isTouched || !isMoved){
            isTouched = false;
            isMoved = false;
            return;
        }
        e.preventDefault();
        sortingItems.transform('');
        sortingEl.removeClass('sorting');
        sortableContainer.removeClass('sortable-sorting');
        if(insertAfter){
            sortingEl.insertAfter(insertAfter);
            sortingEl.trigger('sort');
        };
        if(insertBefore){
            sortingEl.insertBefore(insertBefore);
            sortingEl.trigger('sort');
        };
        insertAfter = insertBefore = undefined;
        isTouched = false;
        isMoved = false;
    }
    //绑定事件
    $$(document).on(_KLT_.touchEvents.start, '.ListBlock.Sortable .SortableHandler', handleTouchStart);
    if(Local.support.touch){
        $$(document).on(_KLT_.touchEvents.move, '.ListBlock.Sortable .SortableHandler', handleTouchMove);
        $$(document).on(_KLT_.touchEvents.end, '.ListBlock.Sortable .SortableHandler', handleTouchEnd);
    }else{
        $$(document).on(_KLT_.touchEvents.move, handleTouchMove);
        $$(document).on(_KLT_.touchEvents.end, handleTouchEnd);
    }        
};
window['kelat']['initSortable'] = KUIAPP.initSortable;  
window['kelat']['sortableOpen'] = KUIAPP.sortableOpen;  
window['kelat']['sortableClose'] = KUIAPP.sortableClose;  

/*=====================================================
************   折叠面板   ************
=====================================================*/
/** 触发折叠面板
 * @alias accordionToggle
 * @param {Object} item:折叠面板对象
 */
KUIAPP.isAccordion = true;
KUIAPP.accordionToggle = function (item) {
    item = $$(item);
    if(item.length === 0){
        return;
    }
    if(item.hasClass('AccordionItemExpanded')){
        KUIAPP.accordionClose(item);
    }else{
        KUIAPP.accordionOpen(item);
    };
};
/** 打开折叠面板
 * @alias accordionOpen
 * @param {Object} item:折叠面板对象
 */
KUIAPP.accordionOpen = function (item) {
    item = $$(item);
    var list = item.parents('.AccordionList').eq(0);
    var content = item.children('.AccordionItemCon');
    if(content.length === 0){
        content = item.find('.AccordionItemCon');
    };
    var expandedItem = list.length > 0 && item.parent().children('.AccordionItemExpanded');
    if(expandedItem.length > 0){
        KUIAPP.accordionClose(expandedItem);
    }
    content.css('height', content[0].scrollHeight + 'px').transitionEnd(function () {
        if(item.hasClass('AccordionItemExpanded')){
            content.transition(0);
            content.css('height', 'auto');
            //Relayout
            var clientLeft = item[0].clientLeft;
            content.transition('');
            item.trigger('opened');
        }else{
            content.css('height', '');
            item.trigger('closed');
        };
        KUIAPP.isAccordion = true;
    });
    item.trigger('open');
    item.addClass('AccordionItemExpanded');
};
/** 关闭折叠面板
 * @alias accordionClose
 * @param {Object} item:折叠面板对象
 */
KUIAPP.accordionClose = function (item) {
    item = $$(item);
    var content = item.children('.AccordionItemCon');
    if(content.length === 0){
        content = item.find('.AccordionItemCon');
    };
    item.removeClass('AccordionItemExpanded');
    content.transition(0);
    content.css('height', content[0].scrollHeight + 'px');
    //Relayout
    var clientLeft = content[0].clientLeft;
    //关闭
    content.transition('');
    content.css('height', '').transitionEnd(function(){
        if(item.hasClass('AccordionItemExpanded')){
            content.transition(0);
            content.css('height', 'auto');
            //Relayout
            var clientLeft = content[0].clientLeft;
            content.transition('');
            item.trigger('opened');
        }else{
            content.css('height', '');
            item.trigger('closed');
        }
        KUIAPP.isAccordion = true;
    });
    item.trigger('close');
};
/** 初始化折叠面板
 * @alias initAccordion
 * @param {Object} item:折叠面板对象
 */
KUIAPP.initAccordion = function(isAccordion){
    $$(document).on('click','.AccordionItemToggle,.ItemLink,.AccordionItem',function(){
        if(!KUIAPP.isAccordion){
            return
        };
        var clicked = $$(this);
        var accordionItem = clicked.parent('.AccordionItem');
        if(accordionItem.length === 0){
            accordionItem = clicked.parents('.AccordionItem');
        }
        if(accordionItem.length === 0){
            accordionItem = clicked.parents('li');
        };
        if(clicked.hasClass('ItemLink') && clicked.parent().hasClass('AccordionItem')){
            KUIAPP.accordionToggle(accordionItem);
            KUIAPP.isAccordion = isAccordion ? true : false;
        };
        
    })
};
window['kelat']['initAccordion'] = KUIAPP.initAccordion; 
window['kelat']['accordionOpen'] = KUIAPP.accordionOpen; 
window['kelat']['accordionClose'] = KUIAPP.accordionClose; 
window['kelat']['accordionToggle'] = KUIAPP.accordionToggle; 

/*======================================================
************   Tabbar   ************
======================================================*/
KUIAPP.materialTabbarSetHighlight = function (tabbar, activeLink) {
    tabbar = $$(tabbar);
    activeLink = activeLink || tabbar.find('.TabLink.active');

    var tabLinkWidth, highlightTranslate;
    if(tabbar.hasClass('TabBarScrollable')) {
        tabLinkWidth = activeLink[0].offsetWidth + 'px';
        highlightTranslate = (_KLT_.rtl ? - activeLink[0].offsetLeft: activeLink[0].offsetLeft) + 'px';
    }else{
        tabLinkWidth = 1 / tabbar.find('.TabLink').length * 100 + '%';
        highlightTranslate = (_KLT_.rtl ? - activeLink.index(): activeLink.index()) * 100 + '%';
    };

    tabbar.find('.TabLinkHighlight')
        .css({width: tabLinkWidth})
        .transform('translate3d(' + highlightTranslate + ',0,0)');
};
KUIAPP.initPageMaterialTabbar = function (pageContainer) {
    pageContainer = $$(pageContainer);
    var tabbar = $$(pageContainer).find('.TabBar');

    function tabbarSetHighlight() {
        KUIAPP.materialTabbarSetHighlight(tabbar);
    }
    if(tabbar.length > 0){
        if(tabbar.find('.TabLinkHighlight').length === 0){
            tabbar.find('.ToolBarInner').append('<span class="TabLinkHighlight"></span>');
        }

        tabbarSetHighlight();
        $$(window).on('resize', tabbarSetHighlight);
        pageContainer.once('pageBeforeRemove', function () {
            $(window).off('resize', tabbarSetHighlight);
        });
    }
};

/* ====================================================
************   Tabs   ************
=====================================================*/
KUIAPP.showTab = function(tab, tabLink, force){
    var newTab = $$(tab);
    if(arguments.length === 2){
        if(typeof tabLink === 'boolean'){
            force = tabLink;
        }
    };
    if(newTab.length === 0){
        return false;
    };
    if(newTab.hasClass('active')) {
        if(force){
            newTab.trigger('show');
        };
        return false;
    }
    var tabs = newTab.parent('.Tabs');
    if(tabs.length === 0){
        return false;
    };

    //在隐藏的选项卡中隐藏滑动操作
    KUIAPP.allowSwipeout = true;

    //动画 tabs
    var isAnimatedTabs = tabs.parent().hasClass('TabsAnimatedWrap');
    if(isAnimatedTabs){
        var tabTranslate = (_KLT_.rtl ? newTab.index() : -newTab.index()) * 100;
        tabs.transform('translate3d(' + tabTranslate + '%,0,0)');
    }

    //取下其他选项卡active类
    var oldTab = tabs.children('.Tab.active').removeClass('active');
    //添加active类到当前 tab
    newTab.addClass('active');
    // 触发 'show' 事件到当前 tab
    newTab.trigger('show');

    //更新 navbars 内 tab
    if(!isAnimatedTabs && newTab.find('.NavBar').length > 0){
        // Find tab's view
        var viewContainer;
        if(newTab.hasClass('view')){
            viewContainer = newTab[0];
        }else{
            viewContainer = newTab.parents('.view')[0];
        };
        KUIAPP.SizeNavbars(viewContainer);
    };

    // Find related link for new tab
    if(tabLink){
        tabLink = $$(tabLink);
    }else{
        // Search by id
        if(typeof tab === 'string'){
            tabLink = $$('.tab-link[href="' + tab + '"]');
        }else{
            tabLink = $$('.tab-link[href="#' + newTab.attr('id') + '"]');
        };
        // Search by data-tab
        if (!tabLink || tabLink && tabLink.length === 0) {
            $$('[data-tab]').each(function () {
                if(newTab.is($$(this).attr('data-tab'))){
                    tabLink = $$(this);
                };
            });
        }
    }
    if(tabLink.length === 0){
        return;
    };

    // Find related link for old tab
    var oldTabLink;
    if(oldTab && oldTab.length > 0){
        // Search by id
        var oldTabId = oldTab.attr('id');
        if(oldTabId){
            oldTabLink = $$('.TabLink[href="#' + oldTabId + '"]');
        };
        // Search by data-tab
        if(!oldTabLink || oldTabLink && oldTabLink.length === 0){
            $$('[data-tab]').each(function () {
                if(oldTab.is($$(this).attr('data-tab'))){
                    oldTabLink = $$(this);
                }
            });
        }
    }

    //更新链接 classes
    if(tabLink && tabLink.length > 0){
        tabLink.addClass('active');
        var tabbar = tabLink.parents('.TabBar');
        if(tabbar.length > 0){
            if(tabbar.find('.TabLinkHighlight').length === 0) {
                tabbar.find('.ToolBarInner').append('<span class="TabLinkHighlight"></span>');
            }
            KUIAPP.materialTabbarSetHighlight(tabbar, tabLink);
        }
    }
    if (oldTabLink && oldTabLink.length > 0) oldTabLink.removeClass('active');

    return true;
};
KUIAPP.initTab = function(tab, tabLink, force){
    $$(".TabLink").on('click', function(){
    //$$(document).on('click','.TabLink',function(){
        var clicked = $$(this);
        var clickedData = clicked.dataset();
        KUIAPP.showTab(clickedData.tab || clicked.attr('href'), clicked)
    });
    KUIAPP.initPageMaterialTabbar($$(tab))
};
window['kelat']['tabs'] = KUIAPP.initTab;
window['kelat']['showTab'] = KUIAPP.showTab;

/*======================================================
************   数字输入框   ************
======================================================*/
KUIAPP.NumberBox = function(){
    var Plus = ".NumBoxPlus";
    var Minus = ".NumBoxMinus";
    var Disabled = "disabled";
    var CheckValue = function(options){
        if(options.value === null || options.value === '' || isNaN(options.value)){
            options.input.val(options.min || 0);
        }else{
            if(options.max != null && !isNaN(options.max) && options.value >= parseInt(options.max)){
                options.value = options.max;
                options.parent.find(Plus).addClass(Disabled);
            }else{
                options.parent.find(Plus).removeClass(Disabled);
            };
            if(options.min != null && !isNaN(options.min) && options.value <= parseInt(options.min)){
                options.value = options.min;
                options.parent.find(Minus).addClass(Disabled);
            }else{
                options.parent.find(Minus).removeClass(Disabled);
            };
            options.input.val(options.value);
        };
    };
    $$(document).on(Local.support.onClick,Plus+','+Minus,function(){
        var $This  = $$(this);
        var $Parent= $This.parent('.NumBox');
        var $Input = $Parent.find('.NumBoxInput');
        var _Step  = parseInt($Parent[0].getAttribute('data-step') || 1);
        var _Min   = $Parent[0].getAttribute('data-min') ? parseInt($Parent[0].getAttribute('data-min')) : '';
        var _Max   = $Parent[0].getAttribute('data-max') ? parseInt($Parent[0].getAttribute('data-max')) : '';
        var _Val;
        if($This.is(Plus)){
            _Val = parseInt($Input.val()) + _Step;
        }else if($This.is(Minus)){
            _Val = parseInt($Input.val()) - _Step;
        };
        running ? CheckValue({
            'value':_Val,
            'min':_Min,
            'max':_Max,
            'parent':$Parent,
            'input':$Input
        }) : '';
    });
    return this
};
window['kelat']['numberBox'] = KUIAPP.NumberBox;

/*======================================================
************   进度条   ************
======================================================*/
/** 进度条 
 * @param {String} container:容器对象
 * @param {Integer} time:显示时间
 */
KUIAPP.Progressbar = function(container, time) {
    container = $$(container || 'body');
    if(container.length === 0 || !running){ return };
    var progressbar;
    if(container.hasClass('ProgressBar')){
        progressbar = container;
    }else{
        progressbar = container.children('.ProgressBar:not(.ProgressBarOut)');
        if(progressbar.length === 0){
            progressbar = $$('<span class="ProgressBar ProgressBarIn"></span>')
            container.append(progressbar);
        }
    };
    window.setTimeout(function(){
        progressbar.remove();
    },time?time:2000)
    return progressbar[0];
};
window['kelat']['progressbar'] = KUIAPP.Progressbar;

/*======================================================
************   点击波   ************
======================================================*/
KUIAPP.Ripple = function(){
    return $$(document).on("click", ".InkRipple", function(event){
        //event.preventDefault();
        if(running){
            /*if(Local.support.touch && !event.targetTouches){
                return;
            };*/
            var $$Th = $$(this), _Date = +(new Date());
            //使用父元素的最大宽高,创建一个覆盖元素的圆形。
            var _Diameter = Math.max($$Th.outerWidth(), $$Th.outerHeight());
            //得到点击坐标=点击坐标相对于页面 - 父元素的位置相对于页面 - 半自高度/宽度，使其从中心展示;
            //var _OffsetX = (Local.support.touch ? event.targetTouches[0].pageX : event.pageX) - $$Th.offset().left - _Diameter / 2;
            //var _OffsetY = (Local.support.touch ? event.targetTouches[0].pageY : event.pageY) - $$Th.offset().top - _Diameter / 2;
            var _OffsetX = event.pageX - $$Th.offset().left - _Diameter / 2;
            var _OffsetY = event.pageY - $$Th.offset().top - _Diameter / 2;
            //创建.ink元素，设置大小
            $$Th.prepend('<span class="ink" id="ink' + _Date + '" style="top:'+_OffsetY+'px;left:'+_OffsetX+'px;height:'+_Diameter+'px;width:'+_Diameter+'px"></span>');
            var $$Ink = $$("#ink" + _Date);
            //设置位置和动画样式.RippleAnimate
            $$Ink.addClass("RippleAnimate").animationEnd(function(){
                $$Ink.remove();
            });
        };
    });
};

/*======================================================
************   浮动菜单   ************
======================================================*/
KUIAPP.FloatButton = function(item) {
    var $item = $$(item);
    if($item.hasClass('FloatingButton') && $item.parent().hasClass('SpeedDial')){
    $item.on(Local.support.onClick, function(event){
        event.preventDefault();
        $$(this).parent(".SpeedDial").toggleClass("SpeedDialOpened");
    });
    }
    return this
};
window['kelat']['floatButton'] = KUIAPP.FloatButton;

/*======================================================
************   响应菜单   ************
======================================================*/
KUIAPP.PushMenu = function(){
    //获取屏幕尺寸
    var screenSizes = Local.screenSizes;
    //侧边栏切换
    $$(document).on('click', '.SidebarToggle',function(e){
        e.preventDefault();
        if($$(window).width() > (screenSizes.sm - 1)){
            if($$("body").hasClass('SidebarCollapse')){
                $$("body").removeClass('SidebarCollapse');
            }else{
                $$("body").addClass('SidebarCollapse');
            }
        }else{
            if($$("body").hasClass('SidebarOpen')) {
              $$("body").removeClass('SidebarOpen').removeClass('SidebarCollapse');
            }else{
              $$("body").addClass('SidebarOpen');
            }
        }
    });
    //在小屏幕上单击内容包装时启用“隐藏”菜单
    $$(".ContentWrapper").click(function () {
        if($$(window).width() <= (screenSizes.sm - 1) && $$("body").hasClass("SidebarOpen")) {
            $$("body").removeClass('SidebarOpen');
        };
    });
};

/*======================================================
************   图片处理   ************
======================================================*/
window['kelat']['extend']({
    /**图片头数据加载就绪事件 - 更快获取图片尺寸
    * @param {String} url:图片路径
    * @param {function}    ready:尺寸就绪
    * @param {function}    load:加载完毕 (可选)
    * @param {function}    error:加载错误 (可选)
    * @example imgReady('http://www.google.com.hk/intl/zh-CN/images/logo_cn.png', function () {
            alert('size ready: width=' + this.width + '; height=' + this.height);
        });
    */
    imgReady:(function(){
        var _list = [], intervalId = null,
        // 用来执行队列
        FnTick = function(){
            var i = 0;
            for(; i < _list.length; i++){
                _list[i].end ? _list.splice(i--, 1) : _list[i]();
            };
            !_list.length && FnStop();
        },        
        // 停止所有定时器队列
        FnStop = function(){
            clearInterval(intervalId);
            intervalId = null;
        };        
        return function(url, ready, load, error){
            var FnOnready, _Width, _Height, _NewWidth, _NewHeight,
                _Image = new Image();
            _Image.src = url;
            // 如果图片被缓存，则直接返回缓存数据
            if(_Image.complete){
                ready.call(_Image);
                load && load.call(_Image);
                return;
            };
            _Width = _Image.width;
            _Height = _Image.height;
            // 加载错误后的事件
            _Image.onerror = function(){
                error && error.call(_Image);
                FnOnready.end = true;
                _Image = _Image.onload = _Image.onerror = null;
            };
            // 图片尺寸就绪
            FnOnready = function(){
                _NewWidth = _Image.width;
                _NewHeight = _Image.height;
                if (_NewWidth !== _Width || _NewHeight !== _Height ||
                    // 如果图片已经在其他地方加载可使用面积检测
                    _NewWidth * _NewHeight > 1024
                ){
                    ready.call(_Image);
                    FnOnready.end = true;
                };
            };
            FnOnready();
            // 完全加载完毕的事件
            _Image.onload = function(){
                // onload在定时器时间差范围内可能比FnOnready快
                // 这里进行检查并保证FnOnready优先执行
                !FnOnready.end && FnOnready();
                load && load.call(_Image);
                // IE gif动画会循环执行onload，置空onload即可
                _Image = _Image.onload = _Image.onerror = null;
            };
            // 加入队列中定期执行
            if(!FnOnready.end){
                _list.push(FnOnready);
                //无论何时只允许出现一个定时器，减少浏览器性能损耗
                if(intervalId === null) intervalId = setInterval(FnTick, 40);
            };
        };
    })(),
    /**图片渲染
    * @param {Array} path:图片路径  width:图片宽度  
    * @param {function}    callback():回调
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
            kelat.alert(Local.ImgTips);
        });
    }
});
/*======================================================
************   图像延迟加载   ************
======================================================*/
var _isImagesLazyLoad = true;
KUIAPP.initImagesLazyLoad = function(Placeholder){
    var pageContainer = $$('#'+Local.WrapperArea);

    //延迟图像
    var lazyLoadImages;
    if(pageContainer.hasClass('Lazy')){
        lazyLoadImages = pageContainer;
        pageContainer = lazyLoadImages.parents('#'+Local.WrapperArea);
    }else{
        lazyLoadImages = pageContainer.find('.Lazy');
    };
    if(lazyLoadImages.length === 0){
        return;
    };

    //图片占位
    var placeholderSrc = Local.ImgPlaceholder;
    if(typeof Placeholder === 'string') {
        placeholderSrc = Placeholder;
    }
    if(Placeholder !== false){
        lazyLoadImages.each(function(){
            if($$(this).attr('data-src')){
                $$(this).attr('src', placeholderSrc);
            };
        });
    };

    // load image
    var imagesSequence = [];
    var imageIsLoading = false;
    function loadImage(el){
        el = $$(el);

        var bg = el.attr('data-background');
        var src = bg ? bg : el.attr('data-src');
        if(!src){
            return;
        };

        function onLoad(){
            el.removeClass('Lazy').addClass('LazyLoaded');
            if(bg){
                el.css('background-image', 'url(' + src + ')');
            }else{
                el.attr('src', src);
            };
            if (Local.ImgLazyLoadSequential) {
                imageIsLoading = false;
                if (imagesSequence.length > 0) {
                    loadImage(imagesSequence.shift());
                };
            };
        };
        if(Local.ImgLazyLoadSequential){
            if(imageIsLoading){
                if(imagesSequence.indexOf(el[0]) < 0){
                    imagesSequence.push(el[0]);
                };
                return;
            };
        }

        //图片加载标识
        imageIsLoading = true;
        
        var image = new Image();
        image.onload = onLoad;
        image.onerror = onLoad;
        image.src =src;
    };
    function lazyHandler(){
        lazyLoadImages = pageContainer.find('.Lazy');
        if(lazyLoadImages === 0){
            _isImagesLazyLoad = false;
            detachEvents()
        }else{
            _isImagesLazyLoad = true;
            attachEvents();
            lazyLoadImages.each(function(index, el) {
                el = $$(el);
                if(isElementInViewport(el[0])){
                    loadImage(el);
                };
            });
        };
    };

    function isElementInViewport (el) {
        var rect = el.getBoundingClientRect();
        var threshold = Local.ImgLazyLoadThreshold || 0;
        return(
            rect.top >= (0 - threshold) &&
            rect.left >= (0 - threshold) &&
            rect.top <= (window.innerHeight + threshold) &&
            rect.left <= (window.innerWidth + threshold)
        );
    }

    function attachEvents(destroy) {
        var method = destroy ? 'off' : 'on';
        lazyLoadImages[method]('lazy', lazyHandler);
        pageContainer[method]('lazy', lazyHandler);
        $$(window)[method]('scroll', lazyHandler);
        $$(window)[method]('resize', lazyHandler);
    };
    function detachEvents() {
        attachEvents(true);
    };
    //绑定事件
    attachEvents();
    //初始化
    lazyHandler();
};
window['kelat']['imagesLazyLoad'] = KUIAPP.initImagesLazyLoad;

//执行函数
window['kelat']['init'] = (function(){
    //初始化点击波
    if(KUIAPP.Ripple){
        KUIAPP.Ripple();
    };
    //初始化返回顶部 
    if(KUIAPP.BackToTop){
        KUIAPP.BackToTop()
    };
    //初始化返回顶部 
    if(KUIAPP.PushMenu){
        KUIAPP.PushMenu()
    };
})();

//登记为一个AMD的模块
if(typeof define === "function" && define.amd){
    define("kelat", function(){
        return window['kelat'];
    });
};
//创建全局对象
if(!noGlobal){
    window['kelat'] = window.$$ = kelat;
};
//提醒
if(!running){
    kelat.addNotify({
        title: Local.ModalTitle,
        message: Local.message
    });
};
//返回对象
return window['kelat'];
}));