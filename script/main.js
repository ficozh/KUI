//文件根目录
require.config({
	//默认情况下模块所在目录为
	baseUrl: 'script',
	paths:{
		//库文件
		//jquery			: "_lib/jQuery/jquery.min3",
		//jqueryMobile	: "_lib/jquery.mobile/jquery.mobile.custom.min",
		angular			: "_lib/angular/angular.min",
		uiRouter		: "_lib/angular/angular-ui-router",
		//ngRoute			: "_lib/angular/angular-route.min",
		//angularSanitize	: "_lib/angular/angular-sanitize.min",
		//angularTouch	: "_lib/angular/angular-touch.min",
		//动画
		//mePageloading	: "me-pageloading.min",
		svg				: "_lib/snap.svg-min",
		angularIOS		: "_lib/angular/angular-ios9-uiwebview.patch",
		//滑动组件
		Swipe			: "_lib/swipe",
		//公共组件
		kelat			: "kelat.min",		
		Config			: "config",		
		//angular 依赖 app 模块
		APP				: "app"
	},
	shim:{
		//"jquery"		: {exports:"$"},
		//"jqueryMobile"	: {deps:["jquery"]},
		"angular"		: {exports:"angular",init: function(){
                // ---------------------重要代码段！------------------------------
                // 应用启动后不能直接用 module.controller 等方法，否则会报控制器未定义的错误，
                // 见 http://stackoverflow.com/questions/20909525/load-controller-dynamically-based-on-route-group
                var _module = angular.module;
                angular.module = function () {
                    var newModule = _module.apply( angular , arguments );
                    if ( arguments.length >= 2 ) {
                        newModule.config( [
                            '$controllerProvider' ,
                            '$compileProvider' ,
                            '$filterProvider' ,
                            '$provide' ,
                            function ( $controllerProvider , $compileProvider , $filterProvider , $provide ) {
                                newModule.controller = function () {
                                    $controllerProvider.register.apply( this , arguments );
                                    return this;
                                };
                                newModule.directive = function () {
                                    $compileProvider.directive.apply( this , arguments );
                                    return this;
                                };
                                newModule.filter = function () {
                                    $filterProvider.register.apply( this , arguments );
                                    return this;
                                };
                                newModule.factory = function () {
                                    $provide.factory.apply( this , arguments );
                                    return this;
                                };
                                newModule.service = function () {
                                    $provide.service.apply( this , arguments );
                                    return this;
                                };
                                newModule.provider = function () {
                                    $provide.provider.apply( this , arguments );
                                    return this;
                                };
                                newModule.value = function () {
                                    $provide.value.apply( this , arguments );
                                    return this;
                                };
                                newModule.constant = function () {
                                    $provide.constant.apply( this , arguments );
                                    return this;
                                };
                                newModule.decorator = function () {
                                    $provide.decorator.apply( this , arguments );
                                    return this;
                                };
                            }
                        ]);
                    }
                    return newModule;
                };
            }},
		"uiRouter"		: {deps:["angular"]},
		//"ngRoute"		: {deps:["angular"]},
		//"angularSanitize": {deps:["angular"]},
		//"angularTouch"	: {deps:["angular"]},
		"angularIOS"	: {deps:["angular"]},
		//动画
		//"mePageloading"		: {deps:["angular"]},
		"kelat"			: {exports:"$$"},
		"APP"			: {deps:["uiRouter"]}
	},
	map:{
		"*":{
			css		: "_lib/requireJS/css" ,
			text	: "_lib/requireJS/text"
		}
	},
	deps:["angular","uiRouter","angularIOS",'kelat'
	//动画
	//,'svg','mePageloading'
	],
	waitSeconds:0
	//,urlArgs: "bust=" + (new Date()).getTime()//防止读取缓存，调试用
});
require([
	"APP"
],function(){
	var $html = angular.element(document.getElementsByTagName('html')[0]);
	angular.element().ready(function(){
		//手动设置应用
		angular.bootstrap($html, ["ui.router","MyApp"]);
		//angular.module("all",["ui.router","MyApp"] ); // 注意：app 模块只能放在最后一个，因为它依赖前面的第三方模块！
		//angular.module($html,["all"]);
	});
});
