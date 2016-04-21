//根路径
define(['APP'],function(APP){
	'use strict';
	APP.controller('GridController', 
		["title",'$scope','$state',
function( title , $scope , $state) {
			//更改页面标题
			document.title = title
			
			
		}
	]);
	
	
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