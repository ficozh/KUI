//根路径
define(['APP'],function(APP){
	'use strict';
	APP.controller('TimeLineController', 
		["title",'$scope','$state',
function( title , $scope , $state) {
			//更改页面标题
			document.title = title
			
			$$.loadJC("pages/timeline/timeline.css",'css');

	}]);
	
});