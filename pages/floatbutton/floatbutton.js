//根路径
define(['APP'],function(APP){
	'use strict';
	APP.controller('FloatButtonController', 
		["title",'$scope','$state',
function( title , $scope , $state ) {
		//更改页面标题
		document.title = $scope.$$prevSibling.HeaderTitle = title;
		
		$$.floatButton();

	


	}]);
	
});	