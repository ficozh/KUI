# KUI

### 已集成库
- jQuery v2.2.1
- AngularJS v1.5.0
- RequireJS 2.1.15
- kelat 1.0.0

### H5框架需要以下的特点
- 为提高团队协作效率, 便于后台人员添加功能及前端后期优化维护。
- 输出高质量的文档,减少编写应用的代码冗余。
- 编写符合web标准, 语义化html。
- 结构表现行为分离, 兼容性优良的页面。
- 性能方面, 代码要求简洁明了有序, 尽可能的减小服务器负载, 保证最快的解析速度。
- 移动端的响应速度要求更快。

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


>`grid(网格布局)` 提供了一套响应式、移动设备优先十分灵活的网格布局

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
>`button(按钮)`   使用下面列出的类可以快速创建一个带有预定义样式的按钮

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

>`floatbutton(浮动按钮)` 

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

>`short(短标)`

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
 
>`badge(数字角标)` 
```html
<div class="MTB MR">
	<span class="Badge">1</span>
	<span class="Badge BadgePrimary">123</span>
	<span class="Badge BadgeSuccess">3</span>
	<span class="Badge BadgeWarning">41</span>
	<span class="Badge BadgeDanger">99+</span>
</div>
```

>`numberbox(数字输入框)` 
>`form(表单)` 
>`checkbox  radio(多选和单选)` 
>`switch(开关)` 
>`icon(图标)` 
>`dialog(消息框)` 
>`notify(通知)` 
>`list(列表)` 
>`mediaLists(媒体列表)` 
>`text(文本)` 
>`box(盒)` 
>`tab(选项卡)` 
>`loading(加载)` 
>`stylebox(九宫格)` 

### 扩展功能

>`chart(EChart图表)` 
>`timeline(时间轴)` 
>`slide(轮播图)` 

























 