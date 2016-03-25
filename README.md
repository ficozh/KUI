#KUI
----
### 已集成库
----
- jQuery v2.2.1
- AngularJS v1.5.0
- RequireJS 2.1.15
- kelat 1.0.0

### H5框架需要以下的特点
----
- 为提高团队协作效率, 便于后台人员添加功能及前端后期优化维护。
- 输出高质量的文档,减少编写应用的代码冗余。
- 编写符合web标准, 语义化html。
- 结构表现行为分离, 兼容性优良的页面。
- 性能方面, 代码要求简洁明了有序, 尽可能的减小服务器负载, 保证最快的解析速度。
- 移动端的响应速度要求更快。

### 框架功能
----
- 可实现单页应用。
- 无刷新式页面变化。
- 每个页面包含不同数据，数据隔离。
- 路由功能是一个纯前端的解决方案，需要提前对指定的(ng-app)，定义路由规则 (routeProvider)，然后通过不同的URL，告诉(ng-app)加载哪个页面(HTML)，再渲染到(ng-app)视图(ng- view)中。
- Js 、Css 、Html 分离 ，页面上的 Js 和Css 可以实现动态载入、按需加载。
- 页面Js隔离，每个页面的Js只会在当前页面执行，不会影响到其他页面。
- URL错误导向，输入错误的URL地址时会重新指向特定页面。（需要在路由配置）。
- 数据的双向绑定，view层的数据和model层的数据是双向绑定的，其中之一发生更改，另一方会随之变化！
- 代码模块化，每个模块的代码独立拥有自己的作用域。
- 依赖注入，将这种后端语言的设计模式赋予前端代码，这意味着前端的代码可以提高重用性和灵活性，未来的模式可能将大量操作放在客户端，服务端只提供数据来源和其他客户端无法完成的操作。
- 模板功能强大丰富，并且是声明式的，自带了丰富的Angular指令。

### 文件结构
----
>`images`  为 图片资源 文件夹，存放项目中使用的各类图片文件。
>
>`pages` 为 页面文件夹，项目页面文件分类存放在这个文件夹(包括对应的样式、脚本、图片资源)。
>
>`script` 为 脚本文件夹，存放js库、扩展插件和执行脚本(包括路由配置、页面所需库文件)。	
>
>`style` 为 样式文件夹，存放页面展示UI样式文件。

# 使用
----
HTML:

```html
<head>
...
<link rel="stylesheet" href="style/kelat.css" media="all"/>
...
</head>
<body>
...
<script src="script/_lib/requireJS/require.js" data-main="script/main" defer async="true" ></script>
</body>
```
main.js:
```javascript
require.config({
	//默认情况下模块所在目录为
	baseUrl: 'script',
	paths:{
		//库文件
		jquery			: "_lib/jQuery/jquery.min3",
		jqueryMobile	: "_lib/jquery.mobile/jquery.mobile.custom.min",
		angular			: "_lib/angular/angular.min",
		uiRouter		: "_lib/angular/angular-ui-router",
		angularIOS		: "_lib/angular/angular-ios9-uiwebview.patch",
		//滑动组件
		Swipe			: "_lib/swipe",
		//公共组件
		kelat			: "kelat",		
		//angular 依赖 app 模块
		APP				: "app"
	},
	shim:{
		"jquery"		: {exports:"$"},
		"jqueryMobile"	: {deps:["jquery"]},
		"angular"		: {exports:"angular",init: function(){...}},
		"uiRouter"		: {deps:["angular"]},
		"angularIOS"	: {deps:["angular"]},
		"kelat"			: {exports:"$$",deps:["jqueryMobile"]},
		"APP"			: {deps:["uiRouter"]}
	},
	map:{
		"*":{
			css		: "_lib/requireJS/css" ,
			text	: "_lib/requireJS/text"
		}
	},
	deps:["angular","uiRouter","angularIOS","jquery","jqueryMobile",'kelat'],
	waitSeconds:0
	//,urlArgs: "bust=" + (new Date()).getTime()//防止读取缓存，调试用
});
require([
	"APP"
],function(){
	var $html = angular.element(document.getElementsByTagName('html')[0]);
	angular.element().ready(function(){
		//手动设置应用
		angular.bootstrap($html, ["ui.router","MyApp"]); //注意：MyApp 模块只能放在最后一个，因为它依赖前面的第三方模块！
	});
});
```
app.js:
```javascript
define([
'angular','uiRouter','angularIOS'
],function(angular){
'use strict';
return  angular.module('myApp', ['ngIOS9UIWebViewPatch']).config(['$stateProvider',function( $stateProvider ){
		// 设置路由
		$stateProvider.state("parent",{
			url:"/",
			templateUrl :"pages/news/index/index.html",
			controller : "NewsController",
			resolve : {
				load : loadDeps([
					"../pages/news/index/index"
				])
			}	
		});
		$stateProvider.state("otherwise", {
			url : "*path",
			template : "" ,
			controller : ['$state',
				function ( $state ) {
					$state.go( 'parent' );
				}
			]
		});
		function loadDeps( deps ) {
			return ['$q', function ( $q ) {
					var def = $q.defer();
					require( deps , function () {
						def.resolve();
					});
					return def.promise;
				}
			];
		}

	}]);
});
```
# KUI提供以下功能
----
`grid(网格布局)` 提供了一套响应式、移动设备优先十分灵活的网格布局
有间隔
```html
<div class="Row">
  <div class="Col50">.Col50</div>
  <div class="Col50">.Col50</div>
</div>
```
无间隔
```html
<div class="Row NoGutter">
  <div class="Col50">.Col50</div>
  <div class="Col50">.Col50</div>
</div>
```
`button(按钮)`   提供了、移动设备优先十分灵活的网格布局



































 