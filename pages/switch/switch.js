//根路径
define(['APP'],function(APP){
	'use strict';
	APP.controller('SwitchController', 
		["title",'$scope','$state',
function( title , $scope , $state) {
		//声明
		$scope.Load = {
			bussiness: function() {
				//执行函数 
				$scope.StateA=$scope.StateC=$scope.StateE=$scope.StateG=true;
				$scope.StateB=$scope.StateD=$scope.StateF=$scope.StateH=false;
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