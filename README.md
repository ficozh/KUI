# KUI

### 已集成库
- AngularJS v1.5.0
- RequireJS 2.1.15
- kelat 1.2.0

### H5框架需要以下的特点
- 为提高团队协作效率, 便于后台人员添加功能及前端后期优化维护。
- 输出高质量的文档,减少编写应用的代码冗余。
- 编写符合web标准, 语义化html。
- 结构表现行为分离, 兼容性优良的页面。
- 性能方面, 代码要求简洁明了有序, 尽可能的减小服务器负载, 保证最快的解析速度。
- 移动端的响应速度要求更快。

### 框架结构
![框架结构](http://git.oschina.net/uploads/images/2016/0603/125621_de2da41a_484141.jpeg "框架结构")

### 框架功能
- 可实现单页应用。
- 无刷新式页面变化。
- 每个页面包含不同数据，数据隔离。
- 路由功能是一个纯前端的解决方案，需要提前对指定的(ng-app)，定义路由规则 (routeProvider)，然后通过不同的URL，告诉(ng-app)加载哪个页面(HTML)，再渲染到(ng-app)视图(ng- view)中。
- Js 、Css 、Html 分离 ，页面上的 Js 和Css 可以实现动态载入、按需加载。
- 页面Js隔离，每个页面的Js只会在当前页面执行，不会影响到其他页面。
- URL错误导向，输入错误的URL地址时会重新指向特定页面。（需要在路由配置）。
- 数据的双向绑定，view层的数据和model层的数据是双向绑定的，其中之一发生更改，另一方会随之变化！
- 代码模块化，每个模块的代码独立拥有自己的作用域。
- 依赖注入，将这种后端语言的设计模式赋予前端代码，这意味着前端的代码可以提高重用性和灵活性，未来的模式可能将大量操作放在客户端，服务端只提供数据来源和其他客户端无法完成的操作。
- 模板功能强大丰富，并且是声明式的，自带了丰富的Angular指令。

### 文件结构
>`images`  为 图片资源 文件夹，存放项目中使用的各类图片文件。
>
>`pages` 为 页面文件夹，项目页面文件分类存放在这个文件夹(包括对应的样式、脚本、图片资源)。
>
>`script` 为 脚本文件夹，存放js库、扩展插件和执行脚本(包括路由配置、页面所需库文件)。	
>
>`style` 为 样式文件夹，存放页面展示UI样式文件。

# 使用
HTML:

```html
<head>
...
<link rel="stylesheet" href="style/kelat.css" media="all"/>
...
</head>
<body>
...
<script src="script/_lib/requireJS/require.js" data-main="script/main" defer async="true" ></script>
</body>
```
main.js:设置依赖关系，动态加载

app.js: 初始化应用路由和配置

## KUI提供以下功能


`grid(网格布局)` 提供了一套响应式、移动设备优先十分灵活的网格布局

  有间隔
```html
<div class="Row">
  <div class="Col50">.Col50</div>
  <div class="Col50">.Col50</div>
</div>
```
  无间隔
```html
<div class="Row NoGutter">
  <div class="Col50">.Col50</div>
  <div class="Col50">.Col50</div>
</div>
```
`button(按钮)`   使用下面列出的类可以快速创建一个带有预定义样式的按钮

```html
<ul class="ListBlock ListBase">
	<li class="ListItem"><a href="javascript:;" class="Btn InkRipple">默认按钮</a></li>
	<li class="ListItem"><a href="javascript:;" class="Btn BtnPrimary InkRipple">首选按钮</a></li>
	<li class="ListItem"><a href="javascript:;" class="Btn BtnSuccess InkRipple">成功按钮</a></li>
	<li class="ListItem"><span class="Btn BtnWarning InkRipple">警告按钮</span></li>
	<li class="ListItem"><b class="Btn BtnDanger InkRipple">危险按钮</b></li>
</ul>
```
  尺寸 : 需要让按钮具有不同尺寸吗？使用 `.BtnBig`、`.BtnSmall`就可以获得不同尺寸的按钮。
```html
<button type="button" class="Btn BtnPrimary BtnBig">（大按钮）Large button</button>
<button type="button" class="Btn BtnPrimary BtnSmall">（小按钮）Small button</button>
```
  通过给按钮添加 .BtnBlock 类可以将其拉伸至父元素100%的宽度，而且按钮也变为了块级（block）元素。
```html
<button type="button" class="Btn BtnPrimary BtnBlock">（块级元素）Block level button</button>
```
  无底色按钮（使用父元素的背景色）使用 `.BtnLine`
```html
<a href="javascript:;" class="Btn BtnLine">默认按钮</a>
```
  带图标/数字按钮
```html
<a href="javascript:;" class="Btn"><img class="BtnIconL" src="images/svg/iconfont-dianhua.svg" alt="电话" width="16"/>默认按钮</a>
<a href="javascript:;" class="Btn"><span class="Badge BadgeL">9</span>默认按钮</a>
```
  禁用状态
```html
<button type="button" class="Btn" disabled="disabled">默认按钮</button>
```

`floatbutton(浮动按钮)` 

```html
<div class="SpeedDial">
	<a href="javascript:;" class="FloatingButton">
		<i class="Icon IconPlus"></i>
		<i class="Icon IconClose"></i>
	</a>
	<div class="SpeedDialButtons">
		<a href="javascript:;"><i class="Icon IconEmail"></i></a>
		<a href="javascript:;"><i class="Icon IconCalendar"></i></a>
		<a href="javascript:;"><i class="Icon IconShare"></i></a>
	</div>
</div>
<script>
$$.floatButton();
</script>
```

`short(短标)`

```html
<div class="Short"><div class="ShortLabel">例子短标</div></div>
<div class="Short">
	<div class="ShortMedia BBlue"><i class="Icon IconCalendar"></i></div>
	<div class="ShortLabel">日期</div>
</div>
<div class="Short">
	<div class="ShortMedia BPurple"><i class="Icon IconEmail"></i></div>
	<div class="ShortLabel">邮箱</div>
	<a href="javascript:;" class="ShortDel"></a>
</div>
```
 
`badge(数字角标)`

```html
<div class="MTB MR">
	<span class="Badge">1</span>
	<span class="Badge BadgePrimary">123</span>
	<span class="Badge BadgeSuccess">3</span>
	<span class="Badge BadgeWarning">41</span>
	<span class="Badge BadgeDanger">99+</span>
</div>
```

`numberbox(数字输入框)` 

```html
<div class="NumBox">
	<button class="Btn NumBoxMinus" type="button">-</button>
	<input class="NumBoxInput" type="number" value="0"/>
	<button class="Btn NumBoxPlus" type="button">+</button>
</div>
```
  限定最小值和最大值(1~9)
```html
<div class="NumBox" data-min="1" data-max="9">
	<button class="Btn NumBoxMinus" type="button">-</button>
	<input class="NumBoxInput" type="number" value="5">
	<button class="Btn NumBoxPlus" type="button">+</button>
</div>
```
  设定步长值(步长 10)
```html
<div class="NumBox" data-step="10" data-min="10" data-max="90">
	<button class="Btn NumBoxMinus" type="button">-</button>
	<input class="NumBoxInput" type="number" value="10">
	<button class="Btn NumBoxPlus" type="button">+</button>
</div>
```

`form(表单)` 提供多种表单展示

```html
<ul class="ListBlock">
	<li class="ListItem">
		<div class="ItemCon">
			<div class="ItemMedia">
				<img class="Icon" src="images/svg/iconfont-user.svg" alt="用户">
			</div>
			<div class="ItemInner">
				<div class="ItemTitle Label">姓名</div>
				<div class="ItemInput">
					<input class="InputContr" type="text" placeholder="您的姓名">
				</div>
			</div>
		</div>
	</li>
	...
</ul>
```

`checkbox  radio(多选和单选)` 

复选框组  `.LabelCheckbox`
```html
<ul class="ListBlock">
	<li class="ListItem">
		<label class="ItemCon LabelCheckbox">
			<input type="checkbox" name="mycheckbox" value="Books">
			<div class="ItemMedia"><i class="Icon IconCheckbox"></i></div>
			<div class="ItemInner">
				<div class="ItemTitle">Books</div>
			</div>
		</label>
	</li>
	...
</ul>
```

单选框组  `.LabelRadio`
```html
<ul class="ListBlock">
	<li class="ListItem">
		<label class="ItemCon LabelRadio">
			<input type="radio" name="myradio" value="Books">
			<div class="ItemInner">
				<div class="ItemTitle">Books</div>
			</div>
		</label>
	</li>
	...
</ul>
```

`switch(开关)` 

```html
<div class="checkbox"></div>
<div class="checkbox"><span></span></div>
```

`icon(图标)` 提供常用的图标集合（格式.svg）

`list(列表)` 提供多种列表展示方式

```html
<ul class="ListBlock">
	<li class="ListItem">
		<div class="ItemCon InkRipple">
			<div class="ItemMedia">
				<img class="Icon" src="images/svg/iconfont-user.svg" alt="用户">
			</div>
			<div class="ItemInner">
				<div class="ItemTitle">
				Ivan Petrov
				</div>
				<div class="ItemAfter">
				CEO
				</div>
			</div>
		</div>
	</li>
</ul>
```

 
`text(文本)`  对常用的文本标题进行设置


`box(盒)` 提供多种展示卡片形式

```html
<div class="Box">
	<div class="BoxHeader">...</div>
	<div class="BoxContent">
		<div class="BoxContentInner">...</div>
	</div>
	<div class="BoxFooter">...</div>
</div>
```


`tab(选项卡)` 结合 angular 提供简单的Tab选项卡功能


`loading(加载)` 定义基本的加载图标

```htnl
<span class="Loading LoadingWhite"></span>
```

`stylebox(九宫格)`   提供九宫格展示方式，方便操作的界面集合

### 扩展功能

`chart(EChart图表)` 这是KMUI集成百度ECharts的图表示例，ECharts的详细用法及 API 请参考其官方网站: [http://echarts.baidu.com](http://echarts.baidu.com)

`timeline(时间轴)` 

`slide(轮播图)` 

## KUI事件及调用方法
=====
KUI提供实用用性更强的编写方式，提供多种常用功能和扩展，为了和jQuery进行区分，KUI的方法调用方式以 `$$.` 开始。下面介绍事件的使用方法：

`特性支持检测` 提供针对性的检测功能(事件类型/滚动条位置/页面位置及窗口大小)
support API

| 语法 | 返回值 |
| ------------- | ------------- |
| $$.fn.support.GetPageScroll | `number` 返回滚动条位置 `.X ` `.Y `|
| $$.fn.support.GetPageSize | `number` 页面位置及窗口大小 `.PageW`  `.PageH` `.WinW` `.WinH` |
| $$.fn.support.desktopEvents | `string` 桌面事件，对于PC设备是鼠标事件，移动设备是触摸事件 |
| $$.fn.support.touch | `boolean` 判断是否支持触摸事件 |

`删除前后空格 和 BOM`
```javascript
$$.fn.trim(text)
```

`JSON 序列`
```javascript
$$.fn.jsonArray(JSON)
```

`设备/操作系统探测` 主要针对移动端进行检测，它包含了关于设备和平台的有用信息
Device API

| 语法 | 返回值 |
| ------------- | ------------- |
| $$.fn.device.os | `string` 包含"android" (对于Android), "ios" (对于iOS), undefined (对于任意其他操作系统/平台) |
| $$.fn.device.osVersion | `string` 包含操作系统版本号，只在Android和iOS设备上可用。例如，如果是iOS设备，且其版本为7.1，则会显示“7.1” |
| $$.fn.device.android | `boolean` 对于Android设备，为true，对于其他设备，为false |
| $$.fn.device.ios | `boolean` 对于iOS设备，为true，对于其他设备，为false |
| $$.fn.device.ipad | `boolean` 对于iPad，为true，对于其他设备，为false |
| $$.fn.device.iphone | `boolean` 对于iPhone/iPod Touch，为true，对于其他设备，为false |
| $$.fn.device.pixelRatio | `number` 返回设备屏幕像素比，实际上，它就是window.devicePixelRatio的快捷方式 |
| $$.fn.device.webView | `boolean` 如果应用在UIWebView（安装在家用电脑或phone gap上的网络应用）中运行，为true |
| $$.fn.device.minimalUi | `boolean` 如果启用了minimal-ui模式，为true。所谓minimal-ui模式，即为：当网络应用运行在iOS 7.1+的iPhone/iPod上，并且添加了minimal-ui viewport这个meta标签 |
| $$.fn.device.statusBar | `boolean` 如果应用运行在全屏模式，并且需要状态栏遮罩，为true。只针对iOS |
| $$.fn.device.browse | `string` 返回浏览类型，包括（`ie` `Firefox` `Chrome` `Edge` `Opera` `Safari` `Netscape`） |


这个设备检测库也在<html>元素上加入了额外的类，以在不同的操作系统和平台上，具有不同的CSS样式。

所以，如果你用iOS 7.1的设备打开应用，你会拥有以下类：
```html
<html class="ios ios-7 ios-7-1 iosGt6 PixelRatio1">
...
```
如果你用具有retina屏的iOS 7.1设备来打开应用，并且运行在全屏模式下（$$.fn.device.statusBar = true）：
```html
<html class="ios ios-7 ios-7-1 iosGt6 Retina PixelRatio2 StatusbarOverlay">
...
```
如果你用iOS 8.0设备来打开应用，并且运行在全屏模式下（$$.fn.device.statusBar = true）：
```html
<html class="ios ios-8 ios-8-0 iosGt6 iosGt7 StatusbarOverlay">
...
```
如果你用iPhone6 Plus和您的应用程序打开的应用程序在全屏模式下运行 ($$.fn.device.statusBar = true):
```html
<html class="ios ios-8 ios-8-0 iosGt6 iosGt7 Retina PixelRatio3 StatusbarOverlay">
...
```
如果你用Android 4.4设备来打开应用，你会拥有以下类：
```html
<html class="android android-4 android-4-4">
...
```

`触摸事件` 对指定DOM元素的触摸事件返回相应的移动坐标数据，并提供回调。
```javascript
$$.fn.touches(document.getElementById("id"),function(Touches){
		$$.fn.log($$.fn.jsonArray(Touches))
	})
```

`验证` 提供常用的验证，包括手机、邮箱、电话、数字等。
validate API

| 语法 | 返回值 |
| ------------- | ------------- |
| $$.fn.validate(string, type) |  `string` 需要验证的数据体。`type` 数据类型或正则表达式。数据类型包括（`email` `phone` `mobile` `number` `integer` `english` `chinese` `date`）|

```javascript
$$.validate('13123456789','mobile')
```

`分解url参数` 例如：http://www.kui.com/kui.html?id=1 
```javascript
var Url = $$.getUrlParams();
alert(Url.id)
```

`动态加载` 动态加载JS（支持回调）和CSS
```javascript
$$.loadJC('paths/app.css','css');
$$.loadJC('paths/app.js','js',function(){callback});
```

### UI部分
-----

`返回顶部` 
```javascript
$$.backToTop();
```

`通知`  通知窗口 展示和关闭回调方法
```javascript
$$.addNotify({
	title: '我的应用标题',
	subtitle: '来自KUI的新消息',
	message: '你好！欢迎使用KUI，KUI给你带来意想不到的展示效果。',
	media: '<img src="images/02.jpg" width="44"/>',
	onClose: function () {
		$$.alert('通知关闭');
	}
});
```

`Indicator加载`  Indicator加载和卸载
```javascript
$$.indicator();
$$.unIndicator();
```

`loading加载`  loading加载（提供更改标题功能）和卸载
```javascript
$$.loading('自定义标题');
$$.unLoading();
```

`alert 框`  模拟原生alert，并提供回调方法。注：标题可不填
```javascript
$$.alert('内容','自定义标题',function(){callback});
```

`确认框 `  和alert相似，并提供取消按钮和回调方法。注：标题可不填
```javascript
$$.confirm("内容","确认消息标题",function(){callback});
```

`自动消失提示框 `  没有回调方法，只做提醒用，显示时间2000毫秒
```javascript
$$.prompt("内容");
```

`底部确认框 `  模拟APP确认框，和确认框相似，展示在底部，并提供取消按钮和回调方法。注：标题可不填
```javascript
$$.confirmModal("内容","底部确认消息标题",function(){callback});
```

`空白提示 `  当显示内容为空时展示，并提供回调方法。注：内容可不填
```javascript
$$.blankTips("标题","内容",function(){callback});
```


`显示操作表单 `  模拟苹果原生操作表单展示方式，提供回调和特定显示模式。注：回调可为空
```javascript
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
```

`数字输入框` 提供常用的数字加减显示。
```javascript
$$.numberBox();
```


`进度条` 提供一个在指定位置显示的进度条，并可设置时间。
```javascript
$$.progressbar("body",time);
```
## 自定义的DOM库

KUI不需要任何第三方的库，包括DOM操作。它有自己的 KDOM - 一个集成了大部分常用DOM操作的高性能库。你不需要学习任何新的东西，因为它的用法和大名鼎鼎的jQuery几乎是一样的，包括大部分常用的方法和jquery风格的链式调用。

现在有一个全局的KDom对象，为了防止和其他库冲突，我们使用 $$。

用法示例
```javascript
$$('.something').on('click', function (e) {
    $$(this).addClass('hello').attr('title', 'world').insertAfter('.something-else');
});
```

可用的方法

下面这些方法几乎都和 jQuery/Zepto 是一样的：
```javascript
$$(window).trigger('resize');
```

| Classes | 描述 |
| ------ | ------ |
| .addClass(className) | 给元素增加class `$$('p').addClass('intro');` |
| .removeClass(className) | 删除指定的class `$$('a.big').removeClass('big');` |
| .hasClass(className) | 元素上是否有指定的class:  `$$('p').hasClass('intro');` |
| .toggleClass(className) | 有则删除，无则添加:`$$('h1, h2').toggleClass('small');` |

| 属性 | 描述 |
| ------------- | ------------- |
| .prop(propName) | 获取一个属性值:`var isChecked = $$('input').prop('checked');` |
| .prop(propName, propValue) | 设置一个属性值:`$$('input[type="checkbox"]').prop('checked', true);` |
| .prop(propertiesObject) | 设置多个属性值:`$$('input').prop({checked:false,disabled:true})` |           
| .attr(attrName) | 获取一个属性值:`$$('a').attr('href');` |
| .attr(attrName, attrValue) | 设置一个属性值:`$$('a').attr('href', 'http://google.com');` |
| .attr(attributesObject) | 设置多个属性值:`$$('a').attr({id:'new-id',title:'Link to Google',href:'http://google.com'})` |
| .removeAttr(attrName) | 删除属性值:`$$('img').removeAttr('src');` |
| .val() | 获取选中的元素中的第一个元素的当前值`$$('#myInput').val();` |
| .val(newValue) | 给选中的元素的每一个都设置指定的值 `$$('input#myInput').val('New value here');` |

| 数据存储 | 描述 |
| ------------- | ------------- |
| .data(key, value) | 在选中的元素上存储任意数据`$$('a').data('user',{id:'123',name:'John',email:'john@doe.com'});` |  
| .data(key) | 如果只有一个参数，则读取指定的值，如果有两个参数 data(key, value) 则是设置值，也可以通过 HTML5 data-* 属性来设置。|
| .removeData(key) | 删除特定数据 `$$('a').removeData('user')`|

| 数据集 | 描述 |
| ------------- | ------------- |
| .dataset() | 返回元素的数据集（组数据 - 属性）为纯对象 |

| CSS transform, transitions | 描述 |
| ------------- | ------------- |
| .transform(CSSTransformString) | 添加带前缀的transform 样式:`$$('a').transform('rotate(90deg)')` |
| .transition(transitionDuration) | 设置css transition-duration 属性 `$$('p').transition(300)` |

| 事件 | 描述 |
| ------------- | ------------- |
| .on(eventName, handler, useCapture) | 在选中的元素上绑定事件`$$('a').on('click', function (e) {console.log('clicked'); });`|
|.on(eventName, delegatedTarget, handler, useCapture) | 通过代理绑定事件`$$(document).on('click','a',function (e) {console.log('link clicked');});`|
| .once(eventName, handler, useCapture) | 为每一个匹配元素的特定事件（像click）绑定一个一次性的事件处理函数。|
| .once(eventName, delegatedTarget, handler, useCapture) | 将只执行一次的事件委派处理。|
| .off(eventName, handler, useCapture) | 删除事件绑定 `$$('a').off('click', clickHandler);` |
| .off(eventName, delegatedTarget, handler, useCapture) | 删除通过代理绑定的事件 `$$(document).off('click', 'a', clickHandler);`|
| .trigger(eventName, eventData) | 触发选中元素上的事件，指定所有的事件回调函数 |
| .transitionEnd(callback, permanent) | 在选中的元素上增加 transitionEnd 事件回调 |
| .width() | 获取当前选中元素中的第一个元素的当前计算出来的宽度 `$$('div#box').width();`|
| .outerWidth([includeMargin]) | 获取当前选中元素中的第一个元素的当前计算出来的宽度，包括 padding ，border 和 margin(如果 includeMargin 设置为 true) |
| .height() | 获取当前选中玄素中的第一个元素的当前计算出来的高度 `$$('div#box').height();` |
| .outerHeight([includeMargin]) | 获取当前选中元素中的第一个元素的当前计算出来的高度，包括 padding ，border 和 margin(如果 includeMargin 设置为 true) |
| .offset() | 获取当前选中元素的第一个元素相对 document 的位置偏移 |
| .hide() | 对选中的元素设置 "display: none" |
| .show() | 对选中的元素设置 "display: block" |
| .css(property) | 获取选中元素中第一个元素的CSS属性值 |
| .css(property, value) | 设置全部选中元素中的CSS属性值 |
| .css(propertiesObject) | 设置全部选中元素中的多个CSS属性值 |

| Scroll | 描述 |
| ------------- | ------------- |
| .scrollTop() | 获取选中元素的 scrollTop 值 |
| .scrollTop(position, duration, callback) |	在指定时间（duration）内滚动到指定位置（position）。如果时间（duration没有定义），则立刻滚动到指定位置。如果你指定了回调函数，那么他会在滚动完成后执行。|
| .scrollLeft() | 获取选中元素的 scrollLeft 值 |
| .scrollLeft(position, duration, callback) | 在指定的时间（duration 毫秒)内滚动到指定的位置(scrollLeft)。如果没有指定时间则立刻滚动到指定位置。如果你指定了回调函数，那么他会在动画完成后执行。|
| .scrollTo(left, top, duration, callback) | 在指定的时间（duration 毫秒)内滚动到指定的位置(scrollLeft, scrollTop)。如果没有指定时间则立刻滚动到指定位置。如果你指定了回调函数，那么他会在动画完成后执行。|

| Dom 操作 | 描述 |
| ------------- | ------------- |
| .add(elements) | 创建一个新的KDOM元素与HTML元素的加入到匹配元素的节点中：`$$('div').add('p').addClass('blue');` |
| .each(callback) | 遍历集合，对其中每一个元素执行回调。|
| .html() | 获得选中的第一个元素的HTML内容 |
| .html(newInnerHTML) | 给全部选中元素设置HTML内容 |
| .text() | 获得选中的第一个元素的文本内容 |
| .text(newTextContent) | 给全部选中元素设置文本内容 |
| .is(CSSSelector) | 选中的元素是否符合指定的CSS选择器 |
| .is(HTMLElement) | 选中的元素是否是给定的 DOM 元素或者 KDom 集合 |
| .index() | 当前选中的第一个元素在他的所有兄弟节点中的排序 |
| .eq(index) | 返回当前选中的元素中的指定序号的元素 |
| .append(HTMLString) | 在当前选中元素的每一个后面插入指定内容 |
| .append(HTMLElement) | 在当前选中元素的每一个后面插入指定元素 |
| .prepend(newHTML) | 在当前选中元素的每一个前面插入指定内容 |
| .prepend(HTMLElement) | 在当前选中元素的每一个前面插入指定元素 |
| .insertBefore(target) | 把当前选中的每一个元素插入到指定的目标之前。目标（target）应该是一个 CSS 选择器或者 HTML 元素 或者 KDom集合 |
| .insertAfter(target) | 把当前选中的每一个元素插入到指定的目标之后。目标（target）应该是一个 CSS 选择器或者 HTML 元素 或者 KDom集合 |
| .next([selector])	 | 获得当前选中的每一个元素的下一个直接兄弟元素。如果提供了一个选择器（selector），那么会用这个选择器来过滤这些兄弟元素。|
| .nextAll([selector])	 | 获得当前选中的每一个元素之后的全部兄弟元素。如果提供了一个选择器（selector），那么会用这个选择器来过滤这些兄弟元素。|
| .prev([selector])	 | 获得当前选中的每一个元素的上一个直接兄弟元素。如果提供了一个选择器（selector），那么会用这个选择器来过滤这些兄弟元素。|
| .prevAll([selector])	 | 获得当前选中的每一个元素之前的全部兄弟元素。如果提供了一个选择器（selector），那么会用这个选择器来过滤这些兄弟元素。|
| .parent([selector]) | 获取选中的每一个元素的父元素。如果提供了一个选择器（selector），那么会用这个选择器来过滤这些父元素。|
| .parents([selector]) | 获取选中的每一个元素的祖先元素。如果提供了一个选择器（selector），那么会用这个选择器来过滤这些祖先元素。|
| .find(selector) | 在选中的每一个元素的后代中查找指定的元素。|
| .children(selector) | 在选中的每一个元素的直接孩子中查找指定的元素。|
| .filter(callback) | 筛选出与指定表达式匹配的元素集合。|
| .remove() | 从DOM中删除选中的元素 |

| Dom 快捷方式 | 描述 |
| ------------- | ------------- |
| .click() | 触发 "click" 事件 |
| .click(handler) | 添加 "click" 事件到句柄 |
| .blur() | 触发 "blur" 事件 |
| .blur(handler) | 添加 "blur" 事件到句柄 |
| .focus() | 触发 "focus" 事件 |
| .focus(handler) | 添加 "focus" 事件到句柄 |
| .focusin() | 触发 "focusin" 事件 |
| .focusin(handler) | 添加 "focusin" 事件到句柄 |
| .focusout() | 触发 "focusout" 事件 |
| .focusout(handler) | 添加 "focusout" 事件到句柄 |
| .keyup() | 触发 "keyup" 事件 |
| .keyup(handler) | 添加 "keyup" 事件到句柄 |
| .keydown() | 触发 "keydown" 事件 |
| .keydown(handler) | 添加 "keydown" 事件到句柄 |
| .keypress() | 触发 "keypress" 事件 |
| .keypress(handler) | 添加 "keypress" 事件到句柄 |
| .submit() | 触发 "submit" 事件 |
| .submit(handler) | 添加 "submit" 事件到句柄 |
| .change() | 触发 "change" 事件 |
| .change(handler) | 添加 "change" 事件到句柄 |
| .mousedown() | 触发 "mousedown" 事件 |
| .mousedown(handler) | 添加 "mousedown" 事件到句柄 |
| .mousemove() | 触发 "mousemove" 事件 |
| .mousemove(handler) | 添加 "mousemove" 事件到句柄 |
| .mouseup() | 触发 "mouseup" 事件 |
| .mouseup(handler) | 添加 "mouseup" 事件到句柄 |
| .mouseenter() | 触发 "mouseenter" 事件 |
| .mouseenter(handler) | 添加 "mouseenter" 事件到句柄 |
| .mouseleave() | 触发 "mouseleave" 事件 |
| .mouseleave(handler) | 添加 "mouseleave" 事件到句柄 |
| .mouseout() | 触发 "mouseout" 事件 |
| .mouseout(handler) | 添加 "mouseout" 事件到句柄 |
| .mouseover() | 触发 "mouseover" 事件 |
| .mouseover(handler) | 添加 "mouseover" 事件到句柄 |
| .touchstart() | 触发 "touchstart" 事件 |
| .touchstart(handler) | 添加 "touchstart" 事件到句柄 |
| .touchend() | 触发 "touchend" 事件 |
| .touchend(handler) | 添加 "touchend" 事件到句柄 |
| .touchmove() | 触发 "touchmove" 事件 |
| .touchmove(handler) | 添加 "touchmove" 事件到句柄 |
| .resize(handler) | 添加 "resize" 事件到句柄 |
| .scroll(handler) | 添加 "scroll" 事件到句柄 |

| tap事件 | 描述 |
| ------------- | ------------- |
| .tap() | 触发元素tap事件 |
| .singleTap() | 触发元素上的单击事件 |
| .doubleTap() | 触发元素上的双击事件 |
| .longTap() | 当一个元素被按住超过750ms触发 |
| .swipe() | 事件在用户在某个元素上水平滑动超过 30px 时被触发 |
| .swipeLeft() |  事件在用户在某个元素上从左滑动超过 30px 时被触发 |
| .swipeRight() |  事件在用户在某个元素上从右滑动超过 30px 时被触发 |
| .swipeUp() |  事件在用户在某个元素上从上滑动超过 30px 时被触发 |
| .swipeDown() |  事件在用户在某个元素上从下滑动超过 30px 时被触发 |


####Ajax 

| 参数 | 类型 | 默认值 | 描述 |
| ------------- | ------------- | ------------- | ------------- |
| async | boolean | true | 如果您需要同步请求，请将此选项设置为false |
| method | string | 'GET' | 请求方法 ("POST", "GET", "PUT") |
| cache | boolean | true | 如果设置为false，将不被浏览器缓存。|
| contentType | string | 'application/x-www-form-urlencoded' | 发送信息至服务器时内容编码类型。|
| crossDomain | boolean | undefined | 默认： 同域请求为false，跨域请求为true如果你想强制跨域请求（如JSONP形式）同一域，设置crossDomain为true。这使得例如，服务器端重定向到另一个域 |
| data | Object or String or Array |  | 发送到服务器的数据。将自动转换为请求字符串格式。GET 请求中将附加在 URL 后。查看 processData 选项说明以禁止此自动转换。必须为 Key/Value 格式。如果为数组，jQuery 将自动为不同值对应同一个名称。如 {foo:["bar1", "bar2"]} 转换为 "&foo=bar1&foo=bar2"。 |
| processData | boolean | true | (默认: true) 默认情况下，通过data选项传递进来的数据，如果是一个对象(技术上讲只要不是字符串)，都会处理转化成一个查询字符串，以配合默认内容类型 "application/x-www-form-urlencoded"。如果要发送 DOM 树信息或其它不希望转换的信息，请设置为 false。|
| dataType | string | 'text' | 数据类型，你期望从服务器返回的数据。可以是'text'或'JSON' |
| headers | object |  | 一个额外的"{键:值}"对映射到请求一起发送。此设置被设置之前beforeSend函数被调用;因此，消息头中的值设置可以在覆盖beforeSend函数范围内的任何设置。|
| xhrFields | object |  | 一对“文件名-文件值”在本机设置XHR对象。例如，如果需要的话，你可以用它来设置withCredentials为true的跨域请求。|
| username | string |  | 用于响应HTTP访问认证请求的用户名 |
| password | string |  | 用于响应HTTP访问认证请求的用密码 |
| timeout | number | 0 | 设置请求超时时间（毫秒）。此设置将覆盖全局设置。|


| 回调 |  |  描述 |
| ------------- | ------------- | ------------- |
| beforeSend | function (xhr) | 可用于在发送前修改XHR对象的请求前回调函数。使用此设置自定义页眉等 |
| error | function (xhr, status) | 请求失败时调用此函数 |
| success | function (data, status, xhr) | 请求成功时调用此函数 |
| complete | function (xhr, status) | 当请求完成之后调用这个函数，无论成功或失败。|
| statusCode | object | 一组数值的HTTP代码和函数对象，当响应时调用了相应的代码。例如，如果响应状态是404，将触发以下警报 |

####AJAX事件

| 事件 | 对象 | 描述 |
| ------------- | ------------- | ------------- |
| ajaxStart | document | AJAX 请求开始时执行函数。|
| ajaxError | document | AJAX 请求发生错误时执行函数。 |
| ajaxSuccess | document | AJAX 请求成功时执行函数。|
| ajaxComplete | document | AJAX 请求完成时执行函数。|



## 运行KUI
=====
使用 Chrome 或者 Firefox 进行浏览，注：KUI 需要进行跨域请求，请将浏览器设置允许跨域。

Chrome 设置步骤：
- `1.` 首先谷歌快捷方式上右击，在下拉列表中选择属性。
- `2.` 打开属性窗口，切换到快捷方式选项卡下面，默认是常规选项卡。
- `3.` 在目标路径的后面添加【 --allow-file-access-from-files --disable-web-security 】，格式如下：C:\Users\Administrator\AppData\Local\Google\Chrome\Application\chrome.exe --allow-file-access-from-files --disable-web-security,其中chrome.exe与--disable之间有一个空格。
- `4.` 点击应用，然后点击确定关闭窗口。
- `5.` 如果目标中的路径含有双引号，则在双引号的外面添加。
- `6.` 关闭浏览器重新通过桌面快捷方式的形式打开浏览器，浏览器提示"您使用的是不受支持的命令行标记： --disable-web-security。稳定性和安全性会有所下降"，说明设置成功。
 
## KUI 作用域
=====
- 在合适的DOM上增加 id='WrapperArea',这是显示的根元素id

## License
=====
- Apache v2 License
- MIT License






 