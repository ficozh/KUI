//登陆验证
define([], function() {
//正式
var USER_INFO = {},
	APP_INFO  = {};
 	/**截取url 指定key value
	* @param {Object} name
	*/
var getQueryString = function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) {
			return unescape(r[2]);
		}
		return null;
	},
	Assign = function(UserInfoData){
		//APP信息
		APP_INFO.appId 		= UserInfoData.data.appId;
		APP_INFO.appKey		= UserInfoData.data.appKey;
		APP_INFO.accessToken= UserInfoData.data.accessToken;
		APP_INFO.appVersion = UserInfoData.data.appVersion;
		APP_INFO.clientId 	= UserInfoData.data.clientId;
		APP_INFO.appName 	= UserInfoData.data.appName;
		//用户信息		
		USER_INFO.SdToken	  = UserInfoData.data.sdToken;
		USER_INFO.CoSessionId = UserInfoData.data.coSessionId;
		USER_INFO.PhoneNumber = UserInfoData.data.phoneNumber;
		USER_INFO.IsLogin	  = UserInfoData.data.isLogin;
		USER_INFO.UserId 	  = UserInfoData.data.userId;
		USER_INFO.UserName 	  = UserInfoData.data.username;
		USER_INFO.OffUserId	  = UserInfoData.data.offUserId;
	};

return {
	USER_INFO  : USER_INFO,
	APP_INFO   : APP_INFO,
	setTitle   : function(title){
		document.title = title;
		if (window.jsBridgeIsReady === true) {
			window.WebViewJavascriptBridge.callHandler('setTitle',{"title":title});
		};
	},
	getUserInfo: function(CallBackFn) {
		//测试：回调
		//CallBackFn();
		//正式：判断jsbridge注入对象
		if (window.jsBridgeIsReady === true) {
			var UserInfoData;
			var serverURL = window.location.href;
			var _Updata = (new Function("return " + getQueryString("updata")))();
			if (_Updata) {
				//解密
				var keyHex = CryptoJS.enc.Utf8.parse('Uplus!@#>H5>auth');
				var decrypted = CryptoJS.DES.decrypt({
					ciphertext: CryptoJS.enc.Base64.parse(_Updata.data)
				}, keyHex, {
					mode: CryptoJS.mode.ECB,
					padding: CryptoJS.pad.Pkcs7
				});
				//解密后的数据
				var decryptedData = decrypted.toString(CryptoJS.enc.Utf8);
				//console.log("解密后的数据decryptedData=" + decrypted.toString(CryptoJS.enc.Utf8));
				//json转化
				UserInfoData = (new Function("return " + decryptedData))();
				Assign(UserInfoData);
			} else {
				window.WebViewJavascriptBridge.callHandler('getUserInfo', {}, function(_UserData) {
					var UserData = (new Function("return " + _UserData))();
					if (UserData.retCode == "00000") {
						if (UserData.data.isLogin) {
							UserInfoData = UserData;
							Assign(UserInfoData);
							//回调
							CallBackFn();
						}else{
							window.WebViewJavascriptBridge.callHandler('gotoLogin',{"url":serverURL},function(responseData){});
						};
					}else{
						console.log("UserData.retCode="+UserData.retCode);
					}
				});
			}
		}else{console.log("window.jsBridgeIsReady false!");}
	}
}});