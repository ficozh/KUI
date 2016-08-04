define(['APP'],function(APP){
	'use strict';
	APP.controller('DialogController',
		["title",'$scope','$state',
function( title , $scope , $state ) {
	
		//声明
		$scope.Load = {
			a:function(){alert()},
			bussiness: function() {
				//执行函数 
				console.log($$(".AlertBtn"))
				$$(".AlertBtn").tap(function(){
					$$.alert("alert警告消息框",function(){
						$$.alert("第二个alert警告消息框","alert标题");
					});
				});
				$$(".ConfirmBtn").on("click",function(){
					$$.confirm("确认消息框",function(){
						$$.alert("alert警告消息框",function(){
							$$.prompt("欢迎体验KMUI")
						});
					});
				});
				
				$$(".PromptBtn").on("click",function(){
					$$.prompt("欢迎体验KMUI")
				});
				
				
				$$(".PopoverBtn").on("click",function(){
					$$.popover($$('.SettingModeMenu'),$$(this))
				});
				
				$$(".PopupBtn").on("click",function(){
					$$.popup($$('.demo-popup'))
				});
				
				
				
				$$(".PickerBtn").on("click",function(){
					$$.confirmModal("确认消息框",function(){
						$$.alert("alert警告消息框",function(){
							
						});
					},function(){});
				});
				
				$$(".MenuBtn").on("click",function(){
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
							bold:true,
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