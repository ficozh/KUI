//根路径
define(['APP'],function(APP){
	'use strict';
	APP.controller('InfiniteScrollController', 
		["title",'$scope','$state',
function( title , $scope , $state) {
		//声明
		$scope.Load = {
			bussiness: function() {
				
				$$(".PullToRefresh").on('refresh',function(){
					setTimeout(function () {
						var song = songs[Math.floor(Math.random() * songs.length)];
						var author = authors[Math.floor(Math.random() * authors.length)];
						var linkHTML = '<li class="ListItem">'+
											'<div href="javascript:;" class="ItemCon InkRipple">'+
												'<div class="ItemMedia"><img src="images/01.jpg" width="44"/></div>'+
												'<div class="ItemInner">'+
													'<div class="ItemTitleRow">'+
														'<div class="ItemTitle">'+song+'</div>'+
													'</div>'+
													'<div class="ItemSubtitle">' + author + '</div>'+
												'</div>'+
											'</div>'+
										'</li>';
						ptrContent.prepend(linkHTML);						
						
						$$.pullToRefreshDone()
					},1000)
				})
				$$.initPullToRefresh($$(".PullToRefresh"));
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