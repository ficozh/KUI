define(['APP','_lib/echarts.min'],function(APP,echarts){
	'use strict';
	APP.controller('EChartController', 
		["title",'$scope','$state',
function( title , $scope , $state) {
	
		//声明
		$scope.Load = {
			bussiness: function() {
				//执行函数 
				//柱状图
				var barChart = echarts.init(document.getElementById('barChart'));
				var baroption = {
					title : {
						text: '人口总量',
						subtext: ''
					},
					tooltip : {
						trigger: 'axis'
					},
					legend: {
						data:['2011年', '2012年']
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					xAxis : [
						{
							type : 'value',
							boundaryGap : [0, 0.01]
						}
					],
					yAxis : [
						{
							type : 'category',
							data : ['巴西','印尼','美国','印度','中国','世界人口(万)']
						}
					],
					series : [
						{
							name:'2011年',
							type:'bar',
							data:[18203, 23489, 29034, 104970, 131744, 630230]
						},
						{
							name:'2012年',
							type:'bar',
							data:[19325, 23438, 31000, 121594, 134141, 681807]
						}
					]
				};
				barChart.setOption(baroption);
				
				//线图
				var lineChart = echarts.init(document.getElementById('lineChart'));

				var lineoption = {
					tooltip : {
						trigger: 'axis'
					},
					legend: {
						data:['邮件营销','联盟广告','视频广告']
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					xAxis : [
						{
							type : 'category',
							boundaryGap : false,
							data : ['周一','周二','周三','周四','周五','周六','周日']
						}
					],
					yAxis : [
						{
							type : 'value'
						}
					],
					series : [
						{
							name:'邮件营销',
							type:'line',
							stack: '总量',
							data:[120, 132, 101, 134, 90, 230, 210]
						},
						{
							name:'联盟广告',
							type:'line',
							stack: '总量',
							data:[220, 182, 191, 234, 290, 330, 310]
						},
						{
							name:'视频广告',
							type:'line',
							stack: '总量',
							data:[150, 232, 201, 154, 190, 330, 410]
						}
					]
				};
				
				lineChart.setOption(lineoption);
				
				//饼图
				var pieChart = echarts.init(document.getElementById('pieChart'));
				var PieoPtion = {
					title : {
						text: '用户访问来源',
						subtext: '纯属虚构',
						x:'center'
					},
					tooltip : {
						trigger: 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					legend: {
						orient: 'vertical',
						left: 'left',
						data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
					},
					series : [
						{
							name: '访问来源',
							type: 'pie',
							radius : '55%',
							center: ['50%', '60%'],
							data:[
								{value:335, name:'直接访问'},
								{value:310, name:'邮件营销'},
								{value:234, name:'联盟广告'},
								{value:135, name:'视频广告'},
								{value:1548, name:'搜索引擎'}
							],
							itemStyle: {
								emphasis: {
									shadowBlur: 10,
									shadowOffsetX: 0,
									shadowColor: 'rgba(0, 0, 0, 0.5)'
								}
							}
						}
					]
				};
				
				pieChart.setOption(PieoPtion);
				
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