//根路径
define(['APP'],function(APP){
	'use strict';
	APP.controller('MYWalletController',
		["title",'$scope','$state','$window',
function( title , $scope , $state , $window) {

		//声明
		$scope.Load = {
			bussiness: function() {
				//执行函数 
				//$scope.HeaderTitle ="eeeeee";
				//alert($$().trim(' mmm '));
				//alert($$.validate('18000000000',/^1[34578]\d{9}$/));
				var names=[{
								"amount" : "1649.0",
								"cOrderNo" : "WD160217973763",
								"cOrderStatus" : "",
								"cOrderStatusValue" : "",
								"goodsNo" : "10973763",
								"goodsType" : "",
								"goodsUrl" : "/mobile/item/10973763.html",
								"imageLink" : "http://cdn21.ehaier.com/file/541ae71b58e1baa3afc81eb9.png",
								"num" : 1,
								"orderNo" : "D16021715064402605",
								"orderProductId" : 10973763,
								"outerSkuId" : "",
								"product" : "BCD-206STPA"
							},
							{
								"amount" : "1649.0",
								"cOrderNo" : "WD160217973763",
								"cOrderStatus" : "",
								"cOrderStatusValue" : "",
								"goodsNo" : "10973763",
								"goodsType" : "",
								"goodsUrl" : "/mobile/item/10973763.html",
								"imageLink" : "http://cdn21.ehaier.com/file/541ae71b58e1baa3afc81eb9.png",
								"num" : 1,
								"orderNo" : "D16021715064402605",
								"orderProductId" : 10973763,
								"outerSkuId" : "",
								"product" : "BCD-206STPA"
							}
						];
					//$$(document.body).constructor.alert("12112")；
					$scope.download=function(event){
						$$.bubbles('a div img span',function(event){
							alert(1)
						})
					};
				$$.imgRender({
					path:'images/02.jpg',
					width:300
				},function(imgBase64){
					//var pic = document.getElementById("imhheight"); 
					//pic.src = Local.ImgPlaceholder;		
				   // pic.src = imgBase64;
				})
				$$.fn.ls.names = $$.fn.jsonArray(names)
				var storedNames=localStorage['names']?JSON.parse(localStorage['names']):'';
				$$.fn.log(window)
				$$.fn.extend({
					/**箭头左*/
					AL:function(){alert(1);},
					/**箭头右*/
					AR:function(){return this.removeClass("ArrowL").addClass("ArrowR");},
					/**箭头下*/
					AD:function(){return this.removeClass("ArrowU").addClass("ArrowD");},
					/**箭头上*/
					AU:function(){return this.removeClass("ArrowD").addClass("ArrowU");},
				})
				//alert($$.fn.jsonArray($$.getUrlParams()))
				
				$$.fn.touches($$("#about"),function(Touches){
					$$.fn.log($$.fn.jsonArray(Touches),'S')
				},function(Touches){
					$$.fn.log($$.fn.jsonArray(Touches),'M')
				},function(Touches){
					$$.fn.log($$.fn.jsonArray(Touches),'E')
				});
				//$$.fn.layerBorder();
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