//根路径
define(['APP'],function(APP){
	'use strict';
	APP.controller('HeaderController', 
		['$scope','$state',
function( $scope , $state) {
		//声明
		$scope.Load = {
			bussiness: function() {
				//执行函数 
				setTimeout(function(){
					$scope.HeaderTitle = document.title;
				},0)
			},
			init : function(){
				//更改页面标题
				//document.title = $scope.$$prevSibling.HeaderTitle = title;
				//执行方法
				$scope.Load.bussiness()
			}
		};
		//运行
		$scope.Load.init();
    }]);
});	