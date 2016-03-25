//根路径
define(['APP'],function(APP){
	'use strict';
	APP.controller('ShortController', 
		["title",'$scope','$state',
function( title , $scope , $state) {
			//更改页面标题
			document.title = title
			
			$(document).on('tap',".ShortDel",function(e){
				e.preventDefault();
				var Short = $(this).parents('.Short');
				$$.confirm("你想删除这个短标吗？",function(){
					Short.remove()
				});
			});
        


		}
	]);
	
});	