//根路径
define(['APP'],function(APP){
	
var appModule= angular.module('MyApp', ['ngIOS9UIWebViewPatch']);
appModule.config([
		'$stateProvider','$locationProvider','$urlRouterProvider','$httpProvider',
		//"mePageLoadingProvider",
		function( $stateProvider,$locationProvider,$urlRouterProvider,$httpProvider
		//,mePageLoadingProvider
		){
		
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
		.state("about1",{//about KMUI(关于KMUI)
			url:"/about1",
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
		

	}])
	'use strict';
	APP.controller('TabController', 
		["title",'$scope','$state',
function( title , $scope , $state) {
		//声明
		$scope.Load = {
			bussiness: function() {
				//执行函数 
				//设置选项卡
				$scope.tabs = [
					{name:'选项卡1'},
					{name:'选项卡2'},
					{name:'选项卡3'},
					{name:'选项卡4'},
					{name:'选项卡5'}
				];
				// 当前tab 默认选中第一个
				$scope.currentTab = $scope.tabs[0];
				var that = $scope;
				$scope.handC = function(tab) {
					if (tab === that.currentTab) return;
					that.currentTab = tab; // 当然的tab 赋值为点击tab
					handlerClick(that.currentTab);
				};

				var handlerClick = function() {
					
				};

				//Tabs
				$$(".Tabs li:first-child").addClass("active");
				$$(document).on("click",".Tabs li",function(){
					var _index = $$(this).index();
					var Tabs = $$(this).parents('.Tabs');
					Tabs.find('li').removeClass("active");
					$$(this).addClass("active");
					Tabs.next(".TabsCon").find(".TabsConItme").hide().eq(_index).show();
				});
			},
			init : function(){
				//更改页面标题
				document.title = $scope.$$prevSibling.HeaderTitle = title;
				//执行方法
				$scope.Load.bussiness()
			}
		};
		//运行
		$scope.Load.init();
	}]);
});