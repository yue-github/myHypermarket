(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-my-login"],{"2a3a":function(t,a,i){"use strict";var e=i("3517"),n=i.n(e);n.a},"2f68":function(t,a,i){"use strict";var e,n=function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("v-uni-view",{staticClass:"zaiui-bar-title-box"},[i("v-uni-view",{staticClass:"cu-bar",class:[t.fixed?"fixed":"",t.shadow?"":"no-shadow",t.bgColor]},[t.isBack?i("v-uni-view",{staticClass:"action",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.BackPage.apply(void 0,arguments)}}},[i("v-uni-text",{staticClass:"cuIcon-back"}),i("v-uni-text",[t._v(t._s(t.backText))])],1):t._e(),t.isBack?t._e():i("v-uni-view",{staticClass:"action",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.leftTap.apply(void 0,arguments)}}},[t._t("left")],2),i("v-uni-view",{staticClass:"content",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.contentTap.apply(void 0,arguments)}}},[t._t("content")],2),i("v-uni-view",{staticClass:"action",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.rightTap.apply(void 0,arguments)}}},[t._t("right")],2)],1),t.fixed?i("v-uni-view",{staticClass:"zaiui-seat-height"}):t._e()],1)},r=[];i.d(a,"b",(function(){return n})),i.d(a,"c",(function(){return r})),i.d(a,"a",(function(){return e}))},3517:function(t,a,i){var e=i("62f9");"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var n=i("4f06").default;n("ca3d5368",e,!0,{sourceMap:!1,shadowMode:!1})},"35f4":function(t,a,i){"use strict";var e=i("5d84"),n=i.n(e);n.a},"3e36":function(t,a,i){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var e={name:"bar-title",props:{bgColor:{type:String,default:""},isBack:{type:Boolean,default:!0},backText:{type:String,default:""},fixed:{type:Boolean,default:!0},shadow:{type:Boolean,default:!1}},methods:{BackPage:function(){uni.navigateBack()},leftTap:function(){this.$emit("leftTap")},contentTap:function(){this.$emit("contentTap")},rightTap:function(){this.$emit("rightTap")}}};a.default=e},"538e":function(t,a,i){"use strict";i.r(a);var e=i("d1de"),n=i("e5bd");for(var r in n)"default"!==r&&function(t){i.d(a,t,(function(){return n[t]}))}(r);i("35f4");var o,c=i("f0c5"),s=Object(c["a"])(n["default"],e["b"],e["c"],!1,null,"1ea15742",null,!1,e["a"],o);a["default"]=s.exports},"5d84":function(t,a,i){var e=i("8d1a");"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var n=i("4f06").default;n("9e839816",e,!0,{sourceMap:!1,shadowMode:!1})},"62f9":function(t,a,i){var e=i("24fb");a=e(!1),a.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.zaiui-bar-title-box .cu-bar[data-v-343f2f6d]{padding-top:0;min-height:calc(0px + %?101?%)}.zaiui-bar-title-box .cu-bar .content[data-v-343f2f6d]{top:0}.zaiui-bar-title-box .cu-bar .content .cu-tag[data-v-343f2f6d]{position:relative;top:%?-2.72?%;padding:0 %?5.45?%}.zaiui-bar-title-box .cu-bar .content .cu-tag uni-text[data-v-343f2f6d]{position:relative;top:%?2?%}.zaiui-bar-title-box .cu-bar.fixed.no-shadow[data-v-343f2f6d]{-webkit-box-shadow:inherit;box-shadow:inherit}.zaiui-bar-title-box .cu-bar.bg-white[data-v-343f2f6d]{color:#333}.zaiui-bar-title-box .zaiui-seat-height[data-v-343f2f6d]{width:100%;height:calc(0px + %?101?%)}',""]),t.exports=a},"7b6b":function(t,a,i){"use strict";i.r(a);var e=i("3e36"),n=i.n(e);for(var r in e)"default"!==r&&function(t){i.d(a,t,(function(){return e[t]}))}(r);a["default"]=n.a},"8d1a":function(t,a,i){var e=i("24fb");a=e(!1),a.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.zaiui-user-login-avatar-view[data-v-1ea15742]{position:relative;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;margin-top:%?218.18?%}.zaiui-user-login-avatar-view .cu-avatar[data-v-1ea15742]{width:%?181.81?%;height:%?181.81?%}.zaiui-btn-view[data-v-1ea15742]{position:relative;margin-top:%?72.72?%;padding:0 %?45.45?%}.zaiui-btn-view .cu-btn .icon[data-v-1ea15742]{position:relative;font-size:%?47.27?%;right:%?9.09?%;top:%?-3.63?%}.zaiui-agreement-checked-view[data-v-1ea15742]{position:relative;padding:%?27.27?% %?45.45?%}.zaiui-agreement-checked-view .zaiui-checked[data-v-1ea15742]{position:absolute;-webkit-transform:scale(.7);transform:scale(.7)}.zaiui-agreement-checked-view .text-black-view[data-v-1ea15742]{padding-left:%?54.54?%;line-height:%?47.27?%}.zaiui-foot-ad-view[data-v-1ea15742]{position:fixed;text-align:center;bottom:%?72.72?%;width:100%}',""]),t.exports=a},ceff:function(t,a,i){"use strict";i.r(a);var e=i("2f68"),n=i("7b6b");for(var r in n)"default"!==r&&function(t){i.d(a,t,(function(){return n[t]}))}(r);i("2a3a");var o,c=i("f0c5"),s=Object(c["a"])(n["default"],e["b"],e["c"],!1,null,"343f2f6d",null,!1,e["a"],o);a["default"]=s.exports},d1de:function(t,a,i){"use strict";var e,n=function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("v-uni-view",[i("bar-title",{attrs:{bgColor:"bg-white",isBack:!0},on:{rightTap:function(a){arguments[0]=a=t.$handleEvent(a),t.rightTap.apply(void 0,arguments)}}},[i("template",{attrs:{slot:"content"},slot:"content"},[t._v("登录")])],2),i("v-uni-view",{staticClass:"zaiui-user-login-avatar-view"},[i("v-uni-view",{staticClass:"cu-avatar round lg",staticStyle:{"background-image":"url(/static/images/avatar/1.jpg)"}})],1),i("v-uni-view",{staticClass:"flex flex-direction zaiui-btn-view"},[i("v-uni-button",{staticClass:"cu-btn bg-red"},[i("v-uni-text",{staticClass:"cuIcon-weixin icon"}),i("v-uni-text",[t._v("登录开启转转世界")])],1)],1),i("v-uni-view",{staticClass:"zaiui-agreement-checked-view"},[i("v-uni-checkbox",{staticClass:"round red sm zaiui-checked checked"}),i("v-uni-view",{staticClass:"text-sm text-black-view"},[i("v-uni-view",{staticClass:"text-gray"},[t._v("已阅读并同意以下协议")]),i("v-uni-view",{staticClass:"text-red"},[t._v("《转转用户服务协议》《转转隐私政策》")])],1)],1),i("v-uni-view",{staticClass:"text-sm text-gray zaiui-foot-ad-view"},[t._v("腾讯投资-更专业的闲置二手交易平台")])],1)},r=[];i.d(a,"b",(function(){return n})),i.d(a,"c",(function(){return r})),i.d(a,"a",(function(){return e}))},daa7:function(t,a,i){"use strict";var e=i("ee27");Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n=e(i("ceff")),r=e(i("cd0f")),o={components:{barTitle:n.default},data:function(){return{}},onLoad:function(){},onReady:function(){r.default.setBarColor(!0),uni.pageScrollTo({scrollTop:0,duration:0})},methods:{}};a.default=o},e5bd:function(t,a,i){"use strict";i.r(a);var e=i("daa7"),n=i.n(e);for(var r in e)"default"!==r&&function(t){i.d(a,t,(function(){return e[t]}))}(r);a["default"]=n.a}}]);