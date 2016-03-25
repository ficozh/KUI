//根路径
define(['APP'],function(APP){
	'use strict';
	APP.controller('MYWalletController',
		["title",'$scope','$state','$window',
function( title , $scope , $state , $window) {
		//更改页面标题
		document.title =$scope.$$prevSibling.HeaderTitle= title;
		//$scope.HeaderTitle ="eeeeee";
		alert($$().trim(' mmm '));
		alert($$.validate('18049000492','mobile'));
		$$().log($$().device)
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
		//alert($$().jsonView($$.getUrlParams()))
		
		$$().touches(document.getElementById("about"),function(Touches){
			$$.fn.log($$().jsonView(Touches))
		});
	}]);
	
	
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