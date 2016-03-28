//根路径
define(['APP'],function(APP){
	'use strict';
	APP.controller('TabController', 
		["title",'$scope','$state',
function( title , $scope , $state) {
			//更改页面标题
			document.title = title;
			
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
			$(".Tabs li:first-child").addClass("active");
			$(document).on("tap",".Tabs li",function(){
				var _index = $(this).index();
				$(this).addClass("active").siblings().removeClass("active");
				$(this).parents(".Tabs").next(".TabsCon").find(">div").eq(_index).stop(!0,!1).fadeIn().siblings().hide();
			});
	}]);
});