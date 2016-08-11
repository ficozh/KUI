//根路径
define(['APP'],function(APP){
	'use strict';
	APP.controller('LoadingController',
		["title",'$scope','$state',
function( title , $scope , $state ) {
		//声明
		$scope.Load = {
			bussiness: function() {
				//执行函数 
				$scope.Progress=function(time){
					$$.progressbar("body",time)
				}
				
				$scope.Indicator=function(){
					$$.indicator()
					setTimeout(function () {
						$$.unIndicator();
					}, 2000);
				};
				
				$scope.Loading=function(){
					$$.loading()
					setTimeout(function () {
						$$.unLoading();
					}, 2000);
				};
				
				$scope.Loadings=function(){
					$$.loading("自定义标题")
					setTimeout(function () {
						$$.unLoading();
					}, 2000);
				};
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