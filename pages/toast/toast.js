define(['APP'],function(APP){
	'use strict';
	APP.controller('ToastController',
		["title",'$scope','$state',
function( title , $scope , $state ) {
	
		//声明
		$scope.Load = {
			bussiness: function() {
				//执行函数 
				$$.defaults.shift = 0;
				$$(".ToastBtn").on('click',function(){
					$$.toast({
						title:'默认Toast样式'
					});
				});
				$$(".CustomBtn").on('click',function(){
					$$.toast({
						title:'自定义显示位置',
						site:[10,10],
						time:1000,
					});
				});
				$$(".PicBtn").on('click',function(){
					$$.toast({
						content:'<img src="images/svg/iconfont-check.svg" width="32" />',
						title:'操作成功',
						site:['30']
					});
				});
				$$(".ClassBtn").on('click',function(){
					$$.toast({
						content:'<img src="images/svg/iconfont-check.svg" width="32" />',
						title:'操作成功',
						site:['30%'],
						className:'BNavy'
					});
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