//根路径
define(['APP'],function(APP){
	'use strict';
	APP.controller('SlideController', 
		["title",'$scope','$state',
function( title , $scope , $state) {
		//声明
		$scope.Load = {
			bussiness: function() {
				//执行函数 
				var swiper1 = new Swiper('.Slide1', {
					pagination: '.pagination1',
					paginationClickable: true,
					autoplay: 3600,
					spaceBetween: 30
				});
				var swiper2 = new Swiper('.Slide2', {
					pagination: '.pagination2',
					paginationClickable: true,
					direction: 'vertical'
				});
				var swiper3 = new Swiper('.Slide3', {
					pagination: '.pagination3',
					slidesPerView: 3,
					paginationClickable: true,
					spaceBetween: 10
				});
				var swiper4 = new Swiper('.Slide4', {
					pagination: '.pagination4',
					slidesPerView: 'auto',
					centeredSlides: true,
					paginationClickable: true,
					spaceBetween: 10
				});
				var swiper5 = new Swiper('.Slide5', {
					slidesPerView: 3,
					paginationClickable: true,
					spaceBetween: 30,
					freeMode: true
				});
				var swiper6 = new Swiper('.Slide6', {
					pagination: '.pagination6',
					paginationClickable: '.swiper-pagination',
					nextButton: '.swiper-button-next',
					prevButton: '.swiper-button-prev',
					spaceBetween: 30
				});
				var swiper7 = new Swiper('.Slide7', {
					pagination: '.pagination7',
					effect: 'cube',
					grabCursor: true,
					cube: {
						shadow: true,
						slideShadows: true,
						shadowOffset: 20,
						shadowScale: 0.94
					}
				});
				var swiper8 = new Swiper('.Slide8', {
					pagination: '.pagination8',
					effect: 'coverflow',
					grabCursor: true,
					centeredSlides: true,
					slidesPerView: 'auto',
					coverflow: {
						rotate: 50,
						stretch: 0,
						depth: 100,
						modifier: 1,
						slideShadows : true
					}
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