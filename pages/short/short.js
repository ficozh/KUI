//根路径
define(['APP'],function(APP){
	'use strict';
	APP.controller('ShortController', 
		["title",'$scope','$state',
function( title , $scope , $state) {
		//声明
		$scope.Load = {
			bussiness: function() {
				//执行函数 
				$$(document).on('click',".ShortDel",function(e){
					e.preventDefault();
					var Short = $$(this).parents('.Short');
					$$.confirm("你想删除这个短标吗？",function(){
						Short.remove()
					});
				});
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