//根路径
define(['APP'],function(APP){
	'use strict';
	APP.controller('InfiniteScrollController', 
		["title",'$scope','$state',
function( title , $scope , $state) {
		//声明
		$scope.Load = {
			bussiness: function() {
				$$.infiniteScroll(true,function(){
					var loading = false;
					 $$('.InfiniteScroll').on('infinite', function () {
						//如果加载正在进行中，退出
						if(loading){
							return;
						};
						$$.indicator()
						//设置加载触发器
						loading = true;
						//请求文件数据
						$$.get('pages/Infinite/Infinite.json', function (data) {
							setTimeout(function(){
								
								loading = false;
								if (data === '') {
									//没有更多的负载，停止滚动事件，以防止不必要的负荷
									$$.detachInfiniteScroll();
								}else {
									var html = '<li class="ListItem">\
											<div href="javascript:;" class="ItemCon InkRipple">\
												<div class="ItemMedia"><img src="images/02.jpg" width="44"></div>\
												<div class="ItemInner">\
													<div class="ItemTitleRow">\
														<div class="ItemTitle">不要阻222止我</div>\
													</div>\
													<div class="ItemSubtitle">111女王</div>\
												</div>\
											</div>\
										</li>'
									//将加载的元素添加到列表块
									$$('.InfiniteScroll .ListBlock').append(html);
								}
								
								$$.unIndicator()
							},0)
						});
					});
				})
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