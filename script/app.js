define(['angular','uiRouter','angularIOS'],function(angular){
'use strict';
return angular.module('MyApp', ['ngIOS9UIWebViewPatch'
	//,'me-pageloading'
	]).config([
		'$stateProvider','$locationProvider','$urlRouterProvider',
		//"mePageLoadingProvider",
		function( $stateProvider,$locationProvider,$urlRouterProvider
		//,mePageLoadingProvider
		){
		
		// 设置头部菜单路由
		var Header={
			templateUrl :"pages/header/header.html",
			controller : "HeaderController",
			resolve : {
				load : loadDeps([
					"../pages/header/header",
					"css!../style/me-pageloading.min.css" // 依赖的 css 可以写在这里
				])
			}
		};
		// 设置底部菜单路由
		var Footer={
			templateUrl :"pages/footer/footer.html",
			controller : "FooterController",
			resolve : {
				load : loadDeps([
					"../pages/footer/footer"
				])
			}
		};
			
		
		// 设置路由 WrapContent
		$stateProvider.state("parent",{//主页
			url:"/",
			views:{
				'Header': Header,
				'WrapContent':{
					templateUrl :"pages/home/index.html",
					controller : "MYWalletController",					
					resolve : {
						title:function(){							
							return "主页";
						},
						load : loadDeps([
							"../pages/home/index"
						])
					}	
				}
			}
		})
		.state("about",{//about KMUI(关于KMUI)
			url:"/about",
			views:{
				'Header': Header,
				'WrapContent':{
					templateUrl :"pages/about/about.html",
					controller : "AboutController",
					resolve : {
						title:function(){
							return "about KMUI(关于KMUI)";
						},
						load : loadDeps([
							"../pages/about/about"
						])
					}	
				}
			}
			
		})
		.state("parent.badge",{//badge(数字角标)
			parent: 'parent',
			url:"badge",
			views:{
				'WrapContent@':{
					templateUrl :"pages/badge/badge.html",
					controller : "BadgeController",
					resolve : {
						title:function(){
							return "badge(数字角标)";
						},
						load : loadDeps([
							"../pages/badge/badge"
						])
					}	
				}
			}
			
		})
		.state("numberbox",{//numberbox(数字输入框)
			url:"/numberbox",
			views:{
				'Header': Header,
				'WrapContent':{
					templateUrl :"pages/numberbox/numberbox.html",
					controller : "NumberBoxController",
					resolve : {
						title:function(){
							return "numberbox(数字输入框)";
						},
						load : loadDeps([
							"../pages/numberbox/numberbox"
						])
					}	
				}
			}
			
		})
		.state("notify",{//notify(通知)
			url:"/notify",
			views:{
				'Header': Header,
				'WrapContent':{
					templateUrl :"pages/notify/notify.html",
					controller : "NotifyController",
					resolve : {
						title:function(){
							return "notify(通知)";
						},
						load : loadDeps([
							"../pages/notify/notify"
						])
					}	
				}
			}
			
		})
		.state("parent.button",{//button(按钮)
			parent: 'parent',
			url:"button",
			views:{
				'WrapContent@':{
					//templateUrl :"http://www.reg007.com/",
					templateUrl :"pages/button/button.html",
					controller : "ButtonController",
					resolve : {
						title:function(){
							return "button(按钮)";
						},
						load : loadDeps([
							"../pages/button/button"
						])
					}	
				}
			}
			
		})
		.state("checkbox",{//checkbox&radio(多选和单选)
			url:"/checkbox",
			views:{
				'Header': Header,
				'WrapContent':{
					templateUrl :"pages/checkbox/checkbox.html",
					controller : "CheckboxController",
					resolve : {
						title:function(){
							return "checkbox&radio(多选和单选)";
						},
						load : loadDeps([
							"../pages/checkbox/checkbox"
						])
					}	
				}
			}
			
		})
		.state("dialog",{//dialog(消息框)
			url:"/dialog",
			views:{
				'Header': Header,
				'WrapContent':{
					templateUrl :"pages/dialog/dialog.html",
					controller : "DialogController",
					resolve : {
						title:function(){
							return "dialog(消息框)";
						},
						load : loadDeps([
							"../pages/dialog/dialog"
						])
					}	
				}
			}
			
		})
		.state("stylebox",{//stylebox(九宫格)
			url:"/stylebox",
			views:{
				'Header': Header,
				'WrapContent':{
					templateUrl :"pages/stylebox/stylebox.html",
					controller : "StyleBoxController",
					resolve : {
						title:function(){
							return "stylebox(九宫格)";
						},
						load : loadDeps([
							"../pages/stylebox/stylebox"
						])
					}	
				}
			}
			
		})
		.state("switch",{//switch(开关)
			url:"/switch",
			views:{
				'Header': Header,
				'WrapContent':{
					templateUrl :"pages/switch/switch.html",
					controller : "SwitchController",
					resolve : {
						title:function(){
							return "switch(开关)";
						},
						load : loadDeps([
							"../pages/switch/switch"
						])
					}	
				}
			}
			
		})
		.state("list",{//list(列表)
			url:"/list",
			views:{
				'Header': Header,
				'WrapContent':{
					templateUrl :"pages/list/list.html",
					controller : "ListController",
					resolve : {
						title:function(){
							return "list(列表)";
						},
						load : loadDeps([
							"../pages/list/list"
						])
					}	
				}
			}
			
		})
		.state("mediaLists",{//mediaLists(媒体列表)
			url:"/mediaLists",
			views:{
				'Header': Header,
				'WrapContent':{
					templateUrl :"pages/mediaLists/mediaLists.html",
					controller : "MediaListsController",
					resolve : {
						title:function(){
							return "mediaLists(媒体列表)";
						},
						load : loadDeps([
							"../pages/mediaLists/mediaLists"
						])
					}	
				}
			}
			
		})
		.state("icon",{//icon(图标)
			url:"/icon",
			views:{
				'Header': Header,
				'WrapContent':{
					templateUrl :"pages/icon/icon.html",
					controller : "IconController",
					resolve : {
						title:function(){
							return "icon(图标)";
						},
						load : loadDeps([
							"../pages/icon/icon"
						])
					}	
				}
			}
			
		})
		.state("grid",{//grid(网格布局)
			url:"/grid",
			views:{
				'Header': Header,
				'WrapContent':{
					templateUrl :"pages/grid/grid.html",
					controller : "GridController",
					resolve : {
						title:function(){
							return "grid(网格布局)";
						},
						load : loadDeps([
							"../pages/grid/grid"
						])
					}	
				}
			}
			
		})
		.state("text",{//text(文本)
			url:"/text",
			views:{
				'Header': Header,
				'WrapContent':{
					templateUrl :"pages/text/text.html",
					controller : "TextController",
					resolve : {
						title:function(){
							return "text(文本)";
						},
						load : loadDeps([
							"../pages/text/text"
						])
					}	
				}
			}
			
		})
		.state("box",{//box(盒)
			url:"/box",
			views:{
				'Header': Header,
				'WrapContent':{
					templateUrl :"pages/box/box.html",
					controller : "BoxController",
					resolve : {
						title:function(){
							return "box(盒)";
						},
						load : loadDeps([
							"../pages/box/box"
						])
					}	
				}
			}
			
		})
		.state("form",{//form(表单)
			url:"/form",
			views:{
				'Header': Header,
				'WrapContent':{
					templateUrl :"pages/form/form.html",
					controller : "FormController",
					resolve : {
						title:function(){
							return "form(表单)";
						},
						load : loadDeps([
							"../pages/form/form"
						])
					}	
				}
			}
			
		})
		.state("loading",{//loading(加载)
			url:"/loading",
			views:{
				'Header': Header,
				'WrapContent':{
					templateUrl :"pages/loading/loading.html",
					controller : "LoadingController",
					resolve : {
						title:function(){
							return "loading(加载)";
						},
						load : loadDeps([
							"../pages/loading/loading"
						])
					}	
				}
			}
			
		})		
		.state("short",{//short(短标)
			url:"/short",
			views:{
				'Header': Header,
				'WrapContent':{
					templateUrl :"pages/short/short.html",
					controller : "ShortController",
					resolve : {
						title:function(){
							return "short(短标)";
						},
						load : loadDeps([
							"../pages/short/short",
							// .css 后缀需要带上，否则 gulp-rev-all 不会更新引用
							"css!../style/icon.css" // 依赖的 css 可以写在这里
						])
					}	
				}
			}
		})
		.state("floatbutton",{//floatbutton(浮动按钮)
			url:"/floatbutton",
			views:{
				'Header': Header,
				'WrapContent':{
					templateUrl :"pages/floatbutton/floatbutton.html",
					controller : "FloatButtonController",
					resolve : {
						title:function(){
							return "floatbutton(浮动按钮)";
						},
						load : loadDeps([
							"../pages/floatbutton/floatbutton",
							// .css 后缀需要带上，否则 gulp-rev-all 不会更新引用
							"css!../style/icon.css" // 依赖的 css 可以写在这里
						])
					}	
				}
			}
		})
		.state("tab",{//tab(选项卡)
			url:"/tab",
			views:{
				'Header': Header,
				'WrapContent':{
					templateUrl :"pages/tab/tab.html",
					controller : "TabController",
					resolve : {
						title:function(){
							return "tab(选项卡)";
						},
						load : loadDeps([
							"../pages/tab/tab"
						])
					}	
				}
			}
		})
		.state("pull",{//pull to refresh(下拉刷新)
			url:"/pull",
			views:{
				'Header': Header,
				'WrapContent':{
					templateUrl :"pages/pull/pull.html",
					controller : "PullController",
					resolve : {
						title:function(){
							return "pull to refresh(下拉刷新)";
						},
						load : loadDeps([
							"../pages/pull/pull"
						])
					}	
				}
			}
		})
		.state("infiniteScroll",{//infinite scroll(无限滚动)
			url:"/infiniteScroll",
			views:{
				'Header': Header,
				'WrapContent':{
					templateUrl :"pages/infinite/infinite.html",
					controller : "InfiniteScrollController",
					resolve : {
						title:function(){
							return "infinite scroll(无限滚动)";
						},
						load : loadDeps([
							"../pages/infinite/infinite"
						])
					}	
				}
			}
		})
		.state("picker",{//picker(选择器)
			url:"/picker",
			views:{
				'Header': Header,
				'WrapContent':{
					templateUrl :"pages/picker/picker.html",
					controller : "PickerController",
					resolve : {
						title:function(){
							return "picker(选择器)";
						},
						load : loadDeps([
							"../pages/picker/picker"
						])
					}	
				}
			}
		});
		
		
		//附加功能
		$stateProvider.state("timeline",{//timeline(时间轴)
			url:"/timeline",
			views:{
				'Header': Header,
				'WrapContent':{
					templateUrl :"pages/timeline/timeline.html",
					controller : "TimeLineController",
					resolve : {
						title:function(){
							return "timeline(时间轴)";
						},
						load : loadDeps([
							"../pages/timeline/timeline"
							// .css 后缀需要带上，否则 gulp-rev-all 不会更新引用
							//"css!../pages/timeline/timeline.css" // 依赖的 css 可以写在这里
						])
					}	
				}
			}
		})
		.state("slide",{//slide(轮播图)
			url:"/slide",
			views:{
				'Header': Header,
				'WrapContent':{
					templateUrl :"pages/slide/slide.html",
					controller : "SlideController",
					resolve : {
						title:function(){
							return "slide(轮播图)";
						},
						load : loadDeps([
							"../pages/slide/swipe",
							"../pages/slide/slide",
							// .css 后缀需要带上，否则 gulp-rev-all 不会更新引用
							"css!../pages/slide/swiper.min.css" // 依赖的 css 可以写在这里
						])
					}	
				}
			}
		})
		.state("chart",{//chart(EChart图表)
			url:"/chart",
			views:{
				'Header': Header,
				'WrapContent':{
					templateUrl :"pages/chart/chart.html",
					controller : "EChartController",
					resolve : {
						title:function(){
							return "chart(EChart图表)";
						},
						load : loadDeps([
							"../pages/chart/chart"							
						])
					}	
				}
			}
		});
		

		


		// 不能使用下面这句代码：
		//$urlRouterProvider.otherwise('/');
		// 见 http://stackoverflow.com/questions/25065699/why-does-angularjs-with-ui-router-keep-firing-the-statechangestart-event
		// 另外，这段代码必须放在最后一个路由，否则直接在链接中到 #/路由 会无效
		$stateProvider.state("otherwise", {
			url : "*path",
			views:{
				'Header': Header,
				'WrapContent':{
					template : "" ,
					controller : ['$state',
						function ( $state ) {
							$state.go( "parent" );
						}
					]
				}
			}
		});
		
		//另外还可以用这个api让路径的前面加个叹号，跟Twitter一样
		//$locationProvider.hashPrefix('?');
		
		//AngularJS中的友好URL：移除URL中的#		
		//$locationProvider.html5Mode(true);
		/*$locationProvider.html5Mode({
			enabled: true,
			requireBase: false
		});*/
		/**
		* 加载依赖的辅助函数
		* @param deps
		* @returns {*[]}
		*/
		function loadDeps( deps ) {
			return ['$q', function ( $q ) {
					var def = $q.defer();
						
						require( deps , function () {
							//setTimeout(function(){
							def.resolve();
							//window.scrollY(0)
							//console.log(window);
							//},1500);
						});
					
					
					return def.promise;
				}
			];
		}
		

	}]);
});

