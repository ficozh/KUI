//根路径
define(['APP'],function(APP){
	'use strict';
	APP.controller('TransitController', 
		["title",'$scope','$state',
function( title , $scope , $state) {
		//声明
		$scope.Load = {
			bussiness: function() {
				//执行函数 
				$$('.WrapHeader').remove();
				$$('.Transit').addClass('TransitIn');
				setTimeout(function(){
					//$$('.Transit').removeClass('TransitIn').addClass('TransitOut');
				},2000);
				 
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

//transit.load('https://www.google.com.hk/webhp?hl=zh-CN'); 
function toggleClass(){ 
	actions.switch(); 
}