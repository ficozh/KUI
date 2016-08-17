/*!
 * kelat JavaScript Library v1.0.0-beta
 * http://git.oschina.net/ficozhe/K-UI
 *
 * Date: 2016-08-08
 */
(function(Global, doc, factory){
	if(typeof define === "function" && define.amd ) {
		//AMD. Register as an anonymous module.
		define(["kelat"], function ($$) {
			factory($$,Global,doc);
		});
	}else{
		// Browser globals
		factory( Global.jQuery, Global, doc );
	}
}(this,document,function(kelat, window, document) {
'use strict';
var $$ = kelat;
// 版本
var version = "1.0.0";
//创建生成器对象
var KUIBuilder = KUIBuilder || {};
KUIBuilder.Template = {
	//
};


}));
