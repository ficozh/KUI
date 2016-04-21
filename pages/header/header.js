//根路径
define(['APP'],function(APP){
	'use strict';
	APP.controller('HeaderController', 
		['$scope','$state',
function( $scope , $state) {
		console.log( $state)
		//document.title = $scope.$$prevSibling.HeaderTitle = title;
		setTimeout(function(){
			$scope.HeaderTitle = document.title;
		},0)
				
    }]);
	
	//console.log($);
	/*$(function(){
		
	console.log( $ )
		
	
	console.log(Public.GetPageScroll().X);
	console.log(Public.WEBSITE_URL);
	
	Public.Point({
					mode:"",
					content: "<div class='TC F14'><div>抱歉！</div>该活动已结束</div>"
				})
				
	
	});*/
});	