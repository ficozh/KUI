//根路径
define(['APP'],function(APP){
	'use strict';
	APP.controller('TextController', 
		["title",'$scope','$state',
function( title , $scope , $state) {
			//更改页面标题
			document.title = title
			
			
		}
	]);
	
});