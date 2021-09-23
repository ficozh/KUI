//根路径
define(['APP'],function(APP){
	'use strict';
	APP.controller('SwipeoutActionsController', 
		["title",'$scope','$state',
function( title , $scope , $state) {
	
		//声明
		$scope.Load = {
			bussiness: function() {
				//执行函数 
				$$.initSwipeout();
				
				var actionSheetButtons = [
					[{
						text: '这里可以描述下面的操作这里可以描述下面的操作这里可以描述下面的操作这里可以描述下面的操作',
						label: true
					},{
						text: 'alert警告消息框',
						onClick: function () {
							$$.alert('alert警告消息框!');
						}
					},{
						text: '红色按钮',
						color: 'CR',
						onClick: function () {
							$$.alert('你点击的是红色按钮!');
						}
					}],
					[
						{
							text: '取消',
							color: 'CW',
							bg: 'BBlue'
						}
					]
				];
				$$('.DemoActions').on('click', function (e) {
					$$.actions(actionSheetButtons);
				});
				
				//删除回调
				$$('.DemoRemoveCallback').on('deleted', function () {
					$$.alert('谢谢，项中移除!');
				});
				//回复
				$$('.DemoReply').on('click', function () {
					$$.alert('回复');
				});
				//标记
				$$('.DemoMark').on('click', function () {
					$$.alert('标记');
				});
				//转发
				$$('.DemoForwarding').on('click', function () {
					$$.alert('转发');
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
