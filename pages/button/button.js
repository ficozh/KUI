//根路径
define(['APP'],function(APP){
	'use strict';
	APP.controller('ButtonController',
		["title",'$scope','$state',
function( title , $scope , $state) {
		//更改页面标题
		document.title = $scope.$$prevSibling.HeaderTitle = title;
			
		//声明
		$scope.Load = {
			bussiness: function() {
				
			},
			init : function(){
				//更改页面标题
				//UserInfo.setTitle(title);
				
				//获取用户信息回调
				//$scope.Load.bussiness()
				//业务执行方法
				//UserInfo.getUserInfo($scope.Load.bussiness);
			}
		};
		$scope.Load.init();	
		
	}]);	
});	