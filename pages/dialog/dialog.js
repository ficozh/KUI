define(['APP'],function(APP){
	'use strict';
	APP.controller('DialogController',
		["title",'$scope','$state',
function( title , $scope , $state ) {
		//更改页面标题
		document.title = $scope.$$prevSibling.HeaderTitle = title;
		//Public.test1()
		//console.log( t.test1)
		$(".AlertBtn").on("tap",function(){
			$$.alert("alert警告消息框",function(){
				$$.alert("第二个alert警告消息框","alert标题");
			});
		});
		$(".ConfirmBtn").on("tap",function(){
			$$.confirm("确认消息框","确认消息标题",function(){
				$$.alert("alert警告消息框",function(){
					$$.prompt("欢迎体验KMUI")
				});
			},function(){
				
			});
		});
		
		$(".PromptBtn").on("tap",function(){
			$$.prompt("欢迎体验KMUI")
		});
		
		
		
		$(".PickerBtn").on("tap",function(){
			$$.picker("确认消息框","确认消息标题",function(){
				$$.alert("alert警告消息框",function(){
					
				});
			},function(){});
		});
		
		$(".MenuBtn").on("tap",function(){
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
			$$.actions(actionSheetButtons);
		});
	}]);
});	