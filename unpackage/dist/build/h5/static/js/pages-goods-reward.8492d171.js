(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-goods-reward"],{"16b6":function(t,n,a){"use strict";var e=a("16ee"),i=a.n(e);i.a},"16ee":function(t,n,a){var e=a("b788");"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var i=a("4f06").default;i("081f6f4f",e,!0,{sourceMap:!1,shadowMode:!1})},"2a3a":function(t,n,a){"use strict";var e=a("3517"),i=a.n(e);i.a},"2ab6":function(t,n,a){"use strict";a.r(n);var e=a("3c31"),i=a("ccf6");for(var r in i)"default"!==r&&function(t){a.d(n,t,(function(){return i[t]}))}(r);a("16b6");var o,c=a("f0c5"),u=Object(c["a"])(i["default"],e["b"],e["c"],!1,null,"36091797",null,!1,e["a"],o);n["default"]=u.exports},"2f68":function(t,n,a){"use strict";var e,i=function(){var t=this,n=t.$createElement,a=t._self._c||n;return a("v-uni-view",{staticClass:"zaiui-bar-title-box"},[a("v-uni-view",{staticClass:"cu-bar",class:[t.fixed?"fixed":"",t.shadow?"":"no-shadow",t.bgColor]},[t.isBack?a("v-uni-view",{staticClass:"action",on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.BackPage.apply(void 0,arguments)}}},[a("v-uni-text",{staticClass:"cuIcon-back"}),a("v-uni-text",[t._v(t._s(t.backText))])],1):t._e(),t.isBack?t._e():a("v-uni-view",{staticClass:"action",on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.leftTap.apply(void 0,arguments)}}},[t._t("left")],2),a("v-uni-view",{staticClass:"content",on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.contentTap.apply(void 0,arguments)}}},[t._t("content")],2),a("v-uni-view",{staticClass:"action",on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.rightTap.apply(void 0,arguments)}}},[t._t("right")],2)],1),t.fixed?a("v-uni-view",{staticClass:"zaiui-seat-height"}):t._e()],1)},r=[];a.d(n,"b",(function(){return i})),a.d(n,"c",(function(){return r})),a.d(n,"a",(function(){return e}))},3517:function(t,n,a){var e=a("62f9");"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var i=a("4f06").default;i("ca3d5368",e,!0,{sourceMap:!1,shadowMode:!1})},"3c31":function(t,n,a){"use strict";var e,i=function(){var t=this,n=t.$createElement,a=t._self._c||n;return a("v-uni-view",[a("bar-title",{attrs:{bgColor:"bg-red"}},[a("template",{attrs:{slot:"content"},slot:"content"},[t._v("活动")])],2),a("v-uni-view",{staticClass:"padding bg-white"},[t._l([1,2,3],(function(n,e){return[a("v-uni-image",{attrs:{src:"/static/images/reward/duanwu.jpg",mode:"widthFix"},on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.goHome.apply(void 0,arguments)}}})]}))],2)],1)},r=[];a.d(n,"b",(function(){return i})),a.d(n,"c",(function(){return r})),a.d(n,"a",(function(){return e}))},"3e36":function(t,n,a){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={name:"bar-title",props:{bgColor:{type:String,default:""},isBack:{type:Boolean,default:!0},backText:{type:String,default:""},fixed:{type:Boolean,default:!0},shadow:{type:Boolean,default:!1}},methods:{BackPage:function(){uni.navigateBack()},leftTap:function(){this.$emit("leftTap")},contentTap:function(){this.$emit("contentTap")},rightTap:function(){this.$emit("rightTap")}}};n.default=e},"42ae":function(t,n,a){"use strict";var e=a("ee27");Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=e(a("ceff")),r=e(a("cd0f")),o={components:{barTitle:i.default},data:function(){return{}},onReady:function(){r.default.setBarColor(!1),uni.pageScrollTo({scrollTop:0,duration:0})},methods:{goHome:function(){uni.reLaunch({url:"/pages/app/index"})}}};n.default=o},"62f9":function(t,n,a){var e=a("24fb");n=e(!1),n.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.zaiui-bar-title-box .cu-bar[data-v-343f2f6d]{padding-top:0;min-height:calc(0px + %?101?%)}.zaiui-bar-title-box .cu-bar .content[data-v-343f2f6d]{top:0}.zaiui-bar-title-box .cu-bar .content .cu-tag[data-v-343f2f6d]{position:relative;top:%?-2.72?%;padding:0 %?5.45?%}.zaiui-bar-title-box .cu-bar .content .cu-tag uni-text[data-v-343f2f6d]{position:relative;top:%?2?%}.zaiui-bar-title-box .cu-bar.fixed.no-shadow[data-v-343f2f6d]{-webkit-box-shadow:inherit;box-shadow:inherit}.zaiui-bar-title-box .cu-bar.bg-white[data-v-343f2f6d]{color:#333}.zaiui-bar-title-box .zaiui-seat-height[data-v-343f2f6d]{width:100%;height:calc(0px + %?101?%)}',""]),t.exports=n},"7b6b":function(t,n,a){"use strict";a.r(n);var e=a("3e36"),i=a.n(e);for(var r in e)"default"!==r&&function(t){a.d(n,t,(function(){return e[t]}))}(r);n["default"]=i.a},b788:function(t,n,a){var e=a("24fb");n=e(!1),n.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */uni-image[data-v-36091797]{width:100%}',""]),t.exports=n},ccf6:function(t,n,a){"use strict";a.r(n);var e=a("42ae"),i=a.n(e);for(var r in e)"default"!==r&&function(t){a.d(n,t,(function(){return e[t]}))}(r);n["default"]=i.a},ceff:function(t,n,a){"use strict";a.r(n);var e=a("2f68"),i=a("7b6b");for(var r in i)"default"!==r&&function(t){a.d(n,t,(function(){return i[t]}))}(r);a("2a3a");var o,c=a("f0c5"),u=Object(c["a"])(i["default"],e["b"],e["c"],!1,null,"343f2f6d",null,!1,e["a"],o);n["default"]=u.exports}}]);