//根路径
define(['APP'],function(APP){
	'use strict';
	APP.controller('NumberBoxController', 
		["title",'$scope','$state',
function( title , $scope , $state) {
		//var MyPublic = new Public();
		//更改页面标题
		document.title = $scope.$$prevSibling.HeaderTitle = title;
		$$.numberBox();
		
		
		
		document.getElementById("btn").addEventListener('click', function(event) {
			$$.alert('当前值: ' + document.getElementById("box").value);
		});
		
		
		
		
		
		
		
		//alert(1)
		//$scope.HeaderTitle=title
		//$state.current.views.Header.title=title
			//console.log(title)
			//console.log($state.current.views.WrapContent)
	}]);
	
	//console.log(Public.Common.WEBSITE_URL);
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