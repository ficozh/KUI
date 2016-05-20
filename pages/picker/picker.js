//根路径
define(['APP'],function(APP){
	'use strict';
	APP.controller('PickerController', 
		["title",'$scope','$state',
function( title , $scope , $state) {
	
	
		//声明
		$scope.Load = {
			bussiness: function() {
				//执行函数 
				$$.fn.log(window)
				var today = new Date();
				//默认
				$$.picker({
					input: '#ks-picker-device',
					cols: [
						{
							textAlign: 'center',
							values: ['iPhone 4', 'iPhone 4S', 'iPhone 5', 'iPhone 5S', 'iPhone 6', 'iPhone 6 Plus', 'iPad 2', 'iPad Retina', 'iPad Air', 'iPad mini', 'iPad mini 2', 'iPad mini 3']
						}
					]
				});

				//3D选择器
				var pickerDescribe = $$.picker({
					input: '#ks-picker-describe',
					rotateEffect: true,
					cols: [
						{
							textAlign: 'left',
							values: ('漂亮 丑陋 大方 滑稽 惊人 快乐 爱哭 冷静 很酷').split(' ')
						},
						{
							values: ('男人 女人 男孩 女孩 老人 学生').split(' ')
						},
					]
				});

				//关联
				var carVendors = {
					'日系' : ['本田', '雷克萨斯', '马自达', '日产', '丰田'],
					'德系' : ['奥迪', '宝马', '奔驰', '大众', '沃尔沃'],
					'美系' : ['凯迪拉克', '克莱斯勒', '道奇', '福特']
				};
				var pickerDependent = $$.picker({
					input: '#ks-picker-dependent',
					rotateEffect: true,
					formatValue: function (picker, values) {
						return values[1];
					},
					cols: [
						{
							textAlign: 'left',
							values: ['日系', '德系', '美系'],
							onChange: function (picker, country) {
								if(picker.cols[1].replaceValues){
									picker.cols[1].replaceValues(carVendors[country]);
								}
							}
						},
						{
							values: carVendors['日系'],
							width: 160,
						},
					]
				});

				//自定义工具栏
				var pickerCustomToolbar = $$.picker({
					input: '#ks-picker-custom-toolbar',
					rotateEffect: true,
					toolbarTemplate:
						'<div class="ToolBar">' +
							'<div class="ToolBarInner">' +
								'<div class="Left">' +
									'<a href="javascript:;" class="Link ToolBarRandomizeLink">随机</a>' +
								'</div>' +
								'<div class="Right">' +
									'<a href="javascript:;" class="Link ClosePicker">就是我</a>' +
								'</div>' +
							'</div>' +
						'</div>',
					cols: [
						{
							values: ['先生', '女士'],
						},
						{
							textAlign: 'left',
							values: ('漂亮 丑陋 大方 滑稽 惊人 快乐 爱哭 冷静 很酷').split(' ')
						},
						{
							values: ('男人 女人 男孩 女孩 老人 学生').split(' ')
						},
					],
					onOpen: function (picker) {
						picker.container.find('.ToolBarRandomizeLink').on('click', function () {
							var col0Values = picker.cols[0].values;
							var col0Random = col0Values[Math.floor(Math.random() * col0Values.length)];

							var col1Values = picker.cols[1].values;
							var col1Random = col1Values[Math.floor(Math.random() * col1Values.length)];

							var col2Values = picker.cols[2].values;
							var col2Random = col2Values[Math.floor(Math.random() * col2Values.length)];

							picker.setValue([col0Random, col1Random, col2Random]);
						});
					}
				});

				//内嵌日期时间
				var pickerInline = $$.picker({
					input: '#ks-picker-date',
					container: '#ks-picker-date-container',
					toolbar: false,
					rotateEffect: true,
					value: [today.getMonth(), today.getDate(), today.getFullYear(), today.getHours(), (today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes())],
					onChange: function (picker, values, displayValues) {
						var daysInMonth = new Date(picker.value[2], picker.value[0]*1 + 1, 0).getDate();
						if (values[1] > daysInMonth) {
							picker.cols[1].setValue(daysInMonth);
						}
					},
					formatValue: function (p, values, displayValues) {
						return displayValues[0] + ' ' + values[1] + ', ' + values[2] + ' ' + values[3] + ':' + values[4];
					},
					cols: [
						// Months
						{
							values: ('0 1 2 3 4 5 6 7 8 9 10 11').split(' '),
							displayValues: ('一月 二月 三月 四月 五月 六月 七月 八月 九月 十月 十一月 十二月').split(' '),
							textAlign: 'left'
						},
						// Days
						{
							values: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
						},
						// Years
						{
							values: (function () {
								var arr = [];
								for (var i = 1950; i <= 2030; i++) { arr.push(i); }
								return arr;
							})(),
						},
						// Space divider
						{
							divider: true,
							content: '&nbsp;&nbsp;'
						},
						// Hours
						{
							values: (function () {
								var arr = [];
								for (var i = 0; i <= 23; i++) { arr.push(i); }
								return arr;
							})(),
						},
						// Divider
						{
							divider: true,
							content: ':'
						},
						// Minutes
						{
							values: (function () {
								var arr = [];
								for (var i = 0; i <= 59; i++) { arr.push(i < 10 ? '0' + i : i); }
								return arr;
							})(),
						}
					]
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
