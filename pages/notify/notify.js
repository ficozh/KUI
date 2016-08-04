//根路径
define(['APP'],function(APP){
	'use strict';
	APP.controller('NotifyController', 
		["title",'$scope','$state',
function( title , $scope , $state) {
		//声明
		$scope.Load = {
			bussiness: function() {
				//执行函数 
				$$('.simpleBtn').on('click', function () {
					$$.addNotify({
						closeOnClick:true,
						title: 'KMUI',
						message: '这是一个带有标题和消息的简单通知消息'
					});
				});
				$$('.fullBtn').on('click', function () {
					$$.addNotify({
						title: 'KMUI',
						subtitle: '通知副标题',
						message: '这是一个带有自定义图标和字幕的简单通知消息',
						media: '<img class="Icon" src="images/svg/iconfont-user.svg" alt="用户"/>'
					});
				});
				$$('.customBtn').on('click', function () {
					$$.addNotify({
						title: '我的应用标题',
						subtitle: '来自KMUI的新消息',
						message: '你好！欢迎使用KMUI，KMUI给你带来意想不到的展示效果。',
						media: '<img src="images/02.jpg" width="44"/>'
					});
				});
				$$('.callbackBtn').on('click', function () {
					$$.addNotify({
						title: '我的应用标题',
						subtitle: '来自KMUI的新消息',
						message: '你好！欢迎使用KMUI，KMUI给你带来意想不到的展示效果。',
						media: '<img src="images/02.jpg" width="44"/>',
						onClose: function () {
							$$.alert('通知关闭');
						}
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