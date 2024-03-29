//根路径
define(['APP'],function(APP){
	'use strict';
	APP.controller('SortableController', 
		["title",'$scope','$state',
function( title , $scope , $state) {
		//声明
		$scope.Load = {
			bussiness: function() {
				//执行函数 
				$$.initSortable();
				$$('.ListBlock.Sortable').on('open', function () {
					$$('.ToggleSortable').text('完成');
				});
				$$('.ListBlock.Sortable').on('close', function () {
					$$('.ToggleSortable').text('编辑');
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