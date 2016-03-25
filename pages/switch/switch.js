//根路径
define(['APP'],function(APP){
	'use strict';
	APP.controller('SwitchController', 
		["title",'$scope','$state',
function( title , $scope , $state) {
			//更改页面标题
			document.title = $scope.$$prevSibling.HeaderTitle = title;
			$scope.StateA=$scope.StateC=$scope.StateE=$scope.StateG=true;
			$scope.StateB=$scope.StateD=$scope.StateF=$scope.StateH=false;
		}
	]);
	
});	