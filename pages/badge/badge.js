//根路径
define(['APP'],function(APP){
	'use strict';
	APP.controller('BadgeController', 
		["title",'$scope','$state',
function( title , $scope , $state) {
		//更改页面标题
		document.title = $scope.$$prevSibling.HeaderTitle = title;
		//alert(1)
		//$scope.HeaderTitle=title
		//$state.current.views.Header.title=title
			//console.log(title)
			//console.log($state.current.views.WrapContent)
			
			
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