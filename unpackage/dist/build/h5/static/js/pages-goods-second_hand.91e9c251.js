(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-goods-second_hand"],{"2a3a":function(i,t,a){"use strict";var e=a("3517"),s=a.n(e);s.a},"2f68":function(i,t,a){"use strict";var e,s=function(){var i=this,t=i.$createElement,a=i._self._c||t;return a("v-uni-view",{staticClass:"zaiui-bar-title-box"},[a("v-uni-view",{staticClass:"cu-bar",class:[i.fixed?"fixed":"",i.shadow?"":"no-shadow",i.bgColor]},[i.isBack?a("v-uni-view",{staticClass:"action",on:{click:function(t){arguments[0]=t=i.$handleEvent(t),i.BackPage.apply(void 0,arguments)}}},[a("v-uni-text",{staticClass:"cuIcon-back"}),a("v-uni-text",[i._v(i._s(i.backText))])],1):i._e(),i.isBack?i._e():a("v-uni-view",{staticClass:"action",on:{click:function(t){arguments[0]=t=i.$handleEvent(t),i.leftTap.apply(void 0,arguments)}}},[i._t("left")],2),a("v-uni-view",{staticClass:"content",on:{click:function(t){arguments[0]=t=i.$handleEvent(t),i.contentTap.apply(void 0,arguments)}}},[i._t("content")],2),a("v-uni-view",{staticClass:"action",on:{click:function(t){arguments[0]=t=i.$handleEvent(t),i.rightTap.apply(void 0,arguments)}}},[i._t("right")],2)],1),i.fixed?a("v-uni-view",{staticClass:"zaiui-seat-height"}):i._e()],1)},v=[];a.d(t,"b",(function(){return s})),a.d(t,"c",(function(){return v})),a.d(t,"a",(function(){return e}))},3126:function(i,t,a){"use strict";var e=a("ee27");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=e(a("ceff")),v=e(a("a1e9")),n=e(a("cd0f")),o={components:{barTitle:s.default},data:function(){return{bannerCur:0,bannerList:[],bottomModal:!1,modalTitle:"",modalType:"promotion",selectType:"",goodsList:[],interaction:!0,barShow:!0,TabCur:0,tabListData:["宝贝","卖家","互动","推荐"]}},onLoad:function(){this.goodsList=v.default.goodsList()},onReady:function(){n.default.setBarColor(!0),uni.pageScrollTo({scrollTop:0,duration:0})},methods:{getttImgUrl:function(i){return n.default.getttImgUrl(i)},serviceTap:function(){this.modalTitle="服务",this.modalType="service",this.showModal()},showModal:function(){this.bottomModal=!0},hideModal:function(i){this.bottomModal=!1,this.modalTitle="",this.modalType=""},setSwiperItem:function(i,t){var a=4*(t+1),e=a-4,s=i+1;return s>e&&s<=a},tabSelect:function(i){var t=i.currentTarget.dataset.id;this.TabCur=t,0==t&&uni.pageScrollTo({scrollTop:300,duration:200}),1==t&&uni.pageScrollTo({scrollTop:1418,duration:200}),2==t&&uni.pageScrollTo({scrollTop:1723,duration:200}),3==t&&uni.pageScrollTo({scrollTop:2413,duration:200})}},onPageScroll:function(i){this.scrollY=i.scrollTop}};t.default=o},3517:function(i,t,a){var e=a("62f9");"string"===typeof e&&(e=[[i.i,e,""]]),e.locals&&(i.exports=e.locals);var s=a("4f06").default;s("ca3d5368",e,!0,{sourceMap:!1,shadowMode:!1})},"3e36":function(i,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var e={name:"bar-title",props:{bgColor:{type:String,default:""},isBack:{type:Boolean,default:!0},backText:{type:String,default:""},fixed:{type:Boolean,default:!0},shadow:{type:Boolean,default:!1}},methods:{BackPage:function(){uni.navigateBack()},leftTap:function(){this.$emit("leftTap")},contentTap:function(){this.$emit("contentTap")},rightTap:function(){this.$emit("rightTap")}}};t.default=e},"62f9":function(i,t,a){var e=a("24fb");t=e(!1),t.push([i.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.zaiui-bar-title-box .cu-bar[data-v-343f2f6d]{padding-top:0;min-height:calc(0px + %?101?%)}.zaiui-bar-title-box .cu-bar .content[data-v-343f2f6d]{top:0}.zaiui-bar-title-box .cu-bar .content .cu-tag[data-v-343f2f6d]{position:relative;top:%?-2.72?%;padding:0 %?5.45?%}.zaiui-bar-title-box .cu-bar .content .cu-tag uni-text[data-v-343f2f6d]{position:relative;top:%?2?%}.zaiui-bar-title-box .cu-bar.fixed.no-shadow[data-v-343f2f6d]{-webkit-box-shadow:inherit;box-shadow:inherit}.zaiui-bar-title-box .cu-bar.bg-white[data-v-343f2f6d]{color:#333}.zaiui-bar-title-box .zaiui-seat-height[data-v-343f2f6d]{width:100%;height:calc(0px + %?101?%)}',""]),i.exports=t},"72a8":function(i,t,a){"use strict";a.r(t);var e=a("9366"),s=a("d121");for(var v in s)"default"!==v&&function(i){a.d(t,i,(function(){return s[i]}))}(v);a("eb8d");var n,o=a("f0c5"),u=Object(o["a"])(s["default"],e["b"],e["c"],!1,null,"2f6b1255",null,!1,e["a"],n);t["default"]=u.exports},"7b6b":function(i,t,a){"use strict";a.r(t);var e=a("3e36"),s=a.n(e);for(var v in e)"default"!==v&&function(i){a.d(t,i,(function(){return e[i]}))}(v);t["default"]=s.a},9366:function(i,t,a){"use strict";var e,s=function(){var i=this,t=i.$createElement,a=i._self._c||t;return a("v-uni-view",[a("bar-title",{attrs:{bgColor:"bg-white"}},[i.barShow?a("template",{attrs:{slot:"content"},slot:"content"},[i._v("商品详情")]):a("template",{attrs:{slot:"content"},slot:"content"},[a("v-uni-text",{staticClass:"text-price text-red text-xxl"},[i._v("3999")])],1),a("template",{attrs:{slot:"right"},slot:"right"},[a("v-uni-text",{staticClass:"cuIcon-forward"}),a("v-uni-text",{staticClass:"cuIcon-more"})],1)],2),i.barShow?i._e():a("v-uni-view",{staticClass:"bg-white zaiui-scroll-tab-view"},[a("v-uni-scroll-view",{staticClass:"nav z text-center",attrs:{"scroll-x":!0}},[i._l(i.tabListData,(function(t,e){return[a("v-uni-view",{key:e+"_0",staticClass:"cu-item",class:e==i.TabCur?"text-black select":"",attrs:{"data-id":e},on:{click:function(t){arguments[0]=t=i.$handleEvent(t),i.tabSelect.apply(void 0,arguments)}}},[a("v-uni-view",[i._v(i._s(t))]),a("v-uni-view",{staticClass:"tab-dot bg-red"})],1)]}))],2)],1),i.barShow?i._e():a("v-uni-view",{staticClass:"zaiui-scroll-height-view"}),a("v-uni-view",{staticClass:"bg-white padding zaiui-goods-synopsis-view"},[a("v-uni-view",{staticClass:"user-view"},[a("v-uni-view",{staticClass:"cu-avatar sm round",staticStyle:{"background-image":"url(/static/images/avatar/1.jpg)"}}),a("v-uni-view",{staticClass:"text-black text-name"},[i._v("仔仔11")]),a("v-uni-text",{staticClass:"text-gray text-sm text-right-view"},[i._v("当前在线")])],1),a("v-uni-view",{staticClass:"margin-tb-lg price-view"},[a("v-uni-text",{staticClass:"text-price text-red text-xxl"},[i._v("3899")]),a("v-uni-text",{staticClass:"text-through text-gray text-sm"},[i._v("原件￥9899")]),a("v-uni-text",{staticClass:"text-gray text-sm"},[i._v("包邮")])],1),a("v-uni-view",{staticClass:"text-xl text-black"},[i._v("iPhoneX苹果银色256G其他版本9成新无拆修有发票有配")]),a("v-uni-view",{staticClass:"text-sm margin-top-sm zaiui-map-view"},[a("v-uni-view",{staticClass:"text-cut cut-view"},[i._v("重庆 渝北区")]),a("v-uni-view",{staticClass:"text-right-view"},[a("v-uni-text",{staticClass:"text-view"},[i._v("查看宝贝位置")]),a("v-uni-text",{staticClass:"cuIcon-right"})],1)],1)],1),a("v-uni-view",{staticClass:"margin-top padding bg-white zaiui-service-view-box"},[a("v-uni-view",{staticClass:"flex flex-wrap"},[a("v-uni-view",{staticClass:"basis-1"},[a("v-uni-text",{staticClass:"text-gray"},[i._v("服务")])],1),a("v-uni-view",{staticClass:"basis-7"},[a("v-uni-view",{staticClass:"tag-view-box"},[a("v-uni-text",{staticClass:"tag-view"},[a("v-uni-text",{staticClass:"cuIcon-title text-red"}),a("v-uni-text",[i._v("支持验机")])],1)],1)],1),a("v-uni-view",{staticClass:"basis-2"},[a("v-uni-view",{staticClass:"text-gray text-right icon-view"},[a("v-uni-text",{staticClass:"cuIcon-right icon"})],1)],1)],1)],1),a("v-uni-view",{staticClass:"margin-top padding bg-white zaiui-details-view-box"},[a("v-uni-view",{staticClass:"text-black text-xl title-view"},[i._v("商品详情")]),a("v-uni-view",{staticClass:"grid col-2"},[a("v-uni-view",{staticClass:"col-item"},[a("v-uni-text",{staticClass:"text-gray"},[i._v("颜色：")]),a("v-uni-text",{staticClass:"text-black"},[i._v("银色")])],1),a("v-uni-view",{staticClass:"col-item"},[a("v-uni-text",{staticClass:"text-gray"},[i._v("容量：")]),a("v-uni-text",{staticClass:"text-black"},[i._v("256G")])],1),a("v-uni-view",{staticClass:"col-item"},[a("v-uni-text",{staticClass:"text-gray"},[i._v("购买渠道：")]),a("v-uni-text",{staticClass:"text-black"},[i._v("其他版本")])],1),a("v-uni-view",{staticClass:"col-item"},[a("v-uni-text",{staticClass:"text-gray"},[i._v("成色：")]),a("v-uni-text",{staticClass:"text-black"},[i._v("9成新")])],1),a("v-uni-view",{staticClass:"col-item"},[a("v-uni-text",{staticClass:"text-gray"},[i._v("拆修情况：")]),a("v-uni-text",{staticClass:"text-black"},[i._v("无拆修")])],1)],1),a("v-uni-view",{staticClass:"text-cut col-item"},[a("v-uni-text",{staticClass:"text-gray"},[i._v("详细信息：")]),a("v-uni-text",{staticClass:"text-black"},[i._v("有发票，有配件，有包装")])],1),a("v-uni-view",{staticClass:"text-black zaiui-text-content-view"},[i._v("iphoneX,美版256G,原装正品，无拆修，配件齐全，功能正常使用")]),a("v-uni-view",{staticClass:"zaiui-img-box"},[a("v-uni-image",{attrs:{src:"/static/images/home/goods/11.png",mode:"widthFix"}}),a("v-uni-image",{attrs:{src:"/static/images/home/goods/12.png",mode:"widthFix"}})],1),a("v-uni-view",{staticClass:"zaiui-border-view"}),a("v-uni-view",{staticClass:"title-view"},[a("v-uni-text",{staticClass:"text-black"},[i._v("支持平台验机")]),a("v-uni-text",{staticClass:"text-gray text-sm margin-left"},[i._v("平台担保交易")])],1),a("v-uni-view",{staticClass:"bg-white zaiui-steps-view"},[a("v-uni-view",{staticClass:"cu-steps steps-arrow"},[a("v-uni-view",{staticClass:"cu-item"},[a("v-uni-text",{staticClass:"cuIcon-send text-blue"}),a("v-uni-text",{staticClass:"text-black"},[i._v("卖家邮寄")]),a("v-uni-view",{staticClass:"text-gray text-sm"},[i._v("至验机中心")])],1),a("v-uni-view",{staticClass:"cu-item"},[a("v-uni-text",{staticClass:"cuIcon-same text-blue"}),a("v-uni-text",{staticClass:"text-black"},[i._v("平台验机")]),a("v-uni-view",{staticClass:"text-gray text-sm"},[i._v("出具验机报告")])],1),a("v-uni-view",{staticClass:"cu-item"},[a("v-uni-text",{staticClass:"cuIcon-deliver text-blue"}),a("v-uni-text",{staticClass:"text-black"},[i._v("买家确认")]),a("v-uni-view",{staticClass:"text-gray text-sm"},[i._v("平台顺丰邮寄")])],1)],1)],1),a("v-uni-view",{staticClass:"text-right text-gray margin-top text-sm"},[a("v-uni-text",[i._v("1人想要")]),a("v-uni-text",{staticClass:"cuIcon-titles margin-lr-xs"}),a("v-uni-text",[i._v("106次浏览")])],1)],1),a("v-uni-view",{staticClass:"margin-top bg-white zaiui-selll-user-view-box"},[a("v-uni-view",{staticClass:"padding text-black text-lg"},[i._v("关于卖家")]),a("v-uni-view",{staticClass:"cu-list menu-avatar "},[a("v-uni-view",{staticClass:"cu-item"},[a("v-uni-view",{staticClass:"cu-avatar round",staticStyle:{"background-image":"url(/static/images/avatar/1.jpg)"}}),a("v-uni-view",{staticClass:"content"},[a("v-uni-view",{staticClass:"text-black"},[a("v-uni-view",{staticClass:"text-cut"},[i._v("仔仔")]),a("v-uni-view",{staticClass:"cu-tag radius bg-blue sm"},[a("v-uni-text",{staticClass:"cuIcon-myfill"})],1)],1),a("v-uni-view",{staticClass:"flex"},[a("v-uni-text",{staticClass:"text-sm text-gray"},[i._v("90后 白羊座 女生 当前在线")])],1)],1),a("v-uni-view",{staticClass:"action"},[a("v-uni-view",{staticClass:"cuIcon-right text-gray"})],1)],1)],1),a("v-uni-view",{staticClass:"padding zaiui-grid-tab-view"},[a("v-uni-view",{staticClass:"grid text-center col-3 bg-gray"},[a("v-uni-view",{staticClass:"item-view"},[a("v-uni-view",{staticClass:"text-lg"},[i._v("1")]),a("v-uni-view",{staticClass:"text-gray text-sm"},[i._v("在售宝贝")])],1),a("v-uni-view",{staticClass:"item-view"},[a("v-uni-view",{staticClass:"text-lg"},[i._v("55")]),a("v-uni-view",{staticClass:"text-gray text-sm"},[i._v("累计交易")])],1),a("v-uni-view",{staticClass:"item-view"},[a("v-uni-view",{staticClass:"text-lg"},[i._v("80%")]),a("v-uni-view",{staticClass:"text-gray text-sm"},[i._v("回复率")])],1)],1)],1),a("v-uni-view",{staticClass:"zaiui-goods-swiper-view"},[a("v-uni-swiper",{staticClass:"screen-swiper square-dot",attrs:{"indicator-dots":!0,circular:!0,autoplay:!1}},i._l(i.goodsList.length/4,(function(t,e){return a("v-uni-swiper-item",{key:e},[a("v-uni-view",{staticClass:"grid col-4"},[i._l(i.goodsList,(function(t,s){return i.setSwiperItem(s,e)?[a("v-uni-view",{key:s+"_0",staticClass:"goods-item"},[a("v-uni-view",{staticClass:"cu-avatar radius xl",style:[{backgroundImage:"url("+t.img+")"}]}),a("v-uni-text",{staticClass:"text-sm text-price-view"},[i._v("￥"+i._s(t.price))])],1)]:i._e()}))],2)],1)})),1)],1)],1),a("v-uni-view",{staticClass:"margin-top padding bg-white zaiui-interaction-view-box"},[i.interaction?a("v-uni-view",{staticClass:"padding-bottom text-black text-lg"},[i._v("互动")]):a("v-uni-view",{staticClass:"padding-bottom text-black text-lg"},[i._v("互动（ 3 ）")]),i.interaction?a("v-uni-view",{staticClass:"zaiui-null-view"},[a("v-uni-view",{staticClass:"text-view-box"},[i._v("「问卖家」想知道更多宝贝细节")]),a("v-uni-button",{staticClass:"cu-btn bg-red round",on:{click:function(t){arguments[0]=t=i.$handleEvent(t),i.interaction=!1}}},[i._v("点击提问")])],1):a("v-uni-view",{staticClass:"zaiui-interaction-view"},[a("v-uni-view",{staticClass:"padding-tb-sm user-input-view"},[a("v-uni-view",{staticClass:"cu-avatar round",staticStyle:{"background-image":"url(/static/images/avatar/1.jpg)"}}),a("v-uni-view",{staticClass:"input-view-box"},[a("v-uni-view",{staticClass:"arrow-view"}),a("v-uni-input",{staticClass:"input-view",attrs:{placeholder:"问问更多细节吧~"}}),a("v-uni-button",{staticClass:"cu-btn bg-red"},[i._v("留言")])],1)],1),a("v-uni-view",{staticClass:"zaiui-interaction-list-view"},[a("v-uni-view",{staticClass:"list-itme"},[a("v-uni-view",{staticClass:"cu-avatar round",staticStyle:{"background-image":"url(/static/images/avatar/2.jpg)"}}),a("v-uni-view",{staticClass:"view-box"},[a("v-uni-view",{staticClass:"title-box"},[a("v-uni-text",{staticClass:"margin-right-xs"},[i._v("仔仔")]),a("v-uni-text",{staticClass:"text-sm"},[i._v("6小时前")])],1),a("v-uni-view",{staticClass:"text-black content-box"},[i._v("特别提示:请千万不要脱离平台进行交易，避免财物损失。谨防通过微信、支付宝加好友进行商品支付、转账、付押金等欺诈行为!")]),a("v-uni-view",{staticClass:"padding-sm radius zaiui-comment-view"},[a("v-uni-view",{staticClass:"text-sm user-name-box"},[a("v-uni-text",[i._v("仔仔111")]),a("v-uni-text",{staticClass:"cu-tag light bg-red sm radius"},[i._v("楼主")]),a("v-uni-text",[i._v("5小时前")])],1),a("v-uni-view",{staticClass:"zaiui-reply-view"},[a("v-uni-text",{staticClass:"text-black"},[i._v("回复")]),a("v-uni-text",{staticClass:"text-blue"},[i._v("@仔仔")]),a("v-uni-text",{staticClass:"text-black"},[i._v("： 是的，都写的很清楚了")])],1)],1)],1)],1),a("v-uni-view",{staticClass:"list-itme"},[a("v-uni-view",{staticClass:"cu-avatar round",staticStyle:{"background-image":"url(/static/images/avatar/3.jpg)"}}),a("v-uni-view",{staticClass:"view-box"},[a("v-uni-view",{staticClass:"title-box"},[a("v-uni-text",{staticClass:"margin-right-xs"},[i._v("仔仔33")]),a("v-uni-text",{staticClass:"text-sm"},[i._v("2小时前")])],1),a("v-uni-view",{staticClass:"text-black content-box"},[i._v("测试的。")])],1)],1),a("v-uni-view",{staticClass:"list-itme"},[a("v-uni-view",{staticClass:"cu-avatar round",staticStyle:{"background-image":"url(/static/images/avatar/4.jpg)"}}),a("v-uni-view",{staticClass:"view-box"},[a("v-uni-view",{staticClass:"title-box"},[a("v-uni-text",{staticClass:"margin-right-xs"},[i._v("仔仔444")]),a("v-uni-text",{staticClass:"text-sm"},[i._v("1小时前")])],1),a("v-uni-view",{staticClass:"text-black content-box"},[i._v("测试的以下效果")])],1)],1),a("v-uni-view",{staticClass:"padding-top text-center text-blue"},[i._v("展开更多")])],1)],1),a("v-uni-view",{staticClass:"zaiui-border-view"}),a("v-uni-view",{staticClass:"padding-bottom text-black text-lg"},[i._v("大家都想问")]),a("v-uni-view",{staticClass:"zaiui-tag-view-box"},[a("v-uni-view",{staticClass:"cu-tag light bg-red round"},[a("v-uni-text",{staticClass:"margin-right-xs"},[i._v("有发票吗？")]),a("v-uni-text",{staticClass:"cuIcon-creativefill"})],1),a("v-uni-view",{staticClass:"cu-tag light bg-red round"},[a("v-uni-text",{staticClass:"margin-right-xs"},[i._v("是否包邮？")]),a("v-uni-text",{staticClass:"cuIcon-creativefill"})],1),a("v-uni-view",{staticClass:"cu-tag light bg-red round"},[a("v-uni-text",{staticClass:"margin-right-xs"},[i._v("包装小票还在吗？")]),a("v-uni-text",{staticClass:"cuIcon-creativefill"})],1),a("v-uni-view",{staticClass:"cu-tag light bg-red round"},[a("v-uni-text",{staticClass:"margin-right-xs"},[i._v("宝贝是全新的吗？")]),a("v-uni-text",{staticClass:"cuIcon-creativefill"})],1)],1),a("v-uni-view",{staticClass:"zaiui-tag-text-view-box"},[a("v-uni-view",{staticClass:"text-cut"},[a("v-uni-text",{staticClass:"cu-tag line-red radius sm"},[i._v("问")]),a("v-uni-text",{staticClass:"text-black margin-lr-xs"},[i._v("能便宜点吗？")]),a("v-uni-text",{staticClass:"text-gray text-sm"},[i._v("答：可以小刀")])],1),a("v-uni-view",{staticClass:"text-cut"},[a("v-uni-text",{staticClass:"cu-tag line-red radius sm"},[i._v("问")]),a("v-uni-text",{staticClass:"text-black margin-lr-xs"},[i._v("走平台，支持转转验机吗？")]),a("v-uni-text",{staticClass:"text-gray text-sm"},[i._v("答：可以小刀")])],1)],1),a("v-uni-view",{staticClass:"zaiui-border-view"}),a("v-uni-view",{staticClass:"text-center text-blue"},[i._v("查看更多问答")])],1),a("v-uni-view",{staticClass:"margin-top padding bg-white zaiui-recommend-goods-box"},[a("v-uni-view",{staticClass:"text-black"},[i._v("为您推荐同型号已验机商品")]),a("v-uni-view",{staticClass:"margin-top zaiui-goods-info-box"},[a("v-uni-view",{staticClass:"goods-img-view"},[a("v-uni-view",{staticClass:"cu-avatar radius lg",staticStyle:{"background-image":"url(/static/images/home/goods/1.png)"}}),a("v-uni-view",{staticClass:"cu-tag bg-cyan sm radius"},[i._v("已出报告")])],1),a("v-uni-view",{staticClass:"goods-info-view"},[a("v-uni-view",{staticClass:"text-cut text-black"},[i._v("8新以下苹果iPhoneX 64G银色")]),a("v-uni-view",{staticClass:"tag-view-box"},[a("v-uni-view",{staticClass:"cu-tag sm radius"},[i._v("顺丰发货")]),a("v-uni-view",{staticClass:"cu-tag sm radius"},[i._v("30天质保")]),a("v-uni-view",{staticClass:"cu-tag sm radius"},[i._v("分期付款")])],1),a("v-uni-view",{staticClass:"text-price-view"},[a("v-uni-text",{staticClass:"text-price text-red text-xxl"},[i._v("3999")]),a("v-uni-text",{staticClass:"text-red text-sm"},[i._v("起")])],1),a("v-uni-view",{staticClass:"text-cut text-sm text-gray"},[i._v("立即查看验机报告")])],1)],1)],1),a("v-uni-view",{staticClass:"margin-tb zaiui-resemble-goods-box"},[a("v-uni-view",{staticClass:"padding bg-white text-black text-lg text-title-view"},[i._v("相似商品")]),a("v-uni-view",{staticClass:"grid col-2"},[a("v-uni-view",{staticClass:"grid-item-box"},[a("v-uni-view",{staticClass:"bg-white item-view"},[a("v-uni-view",{staticClass:"cu-avatar radius lg",staticStyle:{"background-image":"url(/static/images/home/goods/1.png)"}}),a("v-uni-view",{staticClass:"padding-sm zaiui-text-view"},[a("v-uni-view",{staticClass:"text-cut text-black text-sm"},[i._v("99新 苹果 iPhoneX 256G 银色")]),a("v-uni-view",{staticClass:"text-sm text-gray text-cut tag-view-box"},[a("v-uni-text",[i._v("银色")]),a("v-uni-text",[i._v("256G")]),a("v-uni-text",[i._v("苹果")]),a("v-uni-text",[i._v("99")])],1),a("v-uni-view",{staticClass:"text-price-view"},[a("v-uni-text",{staticClass:"text-price text-lg text-red"},[i._v("2280")]),a("v-uni-text",{staticClass:"cu-tag light bg-red sm radius"},[i._v("已验机")])],1),a("v-uni-view",{staticClass:"gps-right-view"},[a("v-uni-text",{staticClass:"text-sm text-gray"},[i._v("重庆 渝北区")]),a("v-uni-text",{staticClass:"text-sm text-gray text-right"},[i._v("当前在线")])],1)],1)],1)],1),a("v-uni-view",{staticClass:"grid-item-box"},[a("v-uni-view",{staticClass:"bg-white item-view"},[a("v-uni-view",{staticClass:"cu-avatar radius lg",staticStyle:{"background-image":"url(/static/images/home/goods/4.png)"}}),a("v-uni-view",{staticClass:"padding-sm zaiui-text-view"},[a("v-uni-view",{staticClass:"text-cut text-black text-sm"},[i._v("99新 苹果 iPhoneX 256G 银色")]),a("v-uni-view",{staticClass:"text-sm text-gray text-cut tag-view-box"},[a("v-uni-text",[i._v("银色")]),a("v-uni-text",[i._v("256G")]),a("v-uni-text",[i._v("苹果")]),a("v-uni-text",[i._v("99")])],1),a("v-uni-view",{staticClass:"text-price-view"},[a("v-uni-text",{staticClass:"text-price text-lg text-red"},[i._v("2280")]),a("v-uni-text",{staticClass:"cu-tag line-blue sm radius"},[i._v("支持验机")])],1),a("v-uni-view",{staticClass:"gps-right-view"},[a("v-uni-text",{staticClass:"text-sm text-gray"},[i._v("正品保障 7天无理由")])],1)],1)],1)],1),a("v-uni-view",{staticClass:"grid-item-box"},[a("v-uni-view",{staticClass:"bg-white item-view"},[a("v-uni-view",{staticClass:"cu-avatar radius lg",staticStyle:{"background-image":"url(/static/images/home/goods/11.png)"}}),a("v-uni-view",{staticClass:"padding-sm zaiui-text-view"},[a("v-uni-view",{staticClass:"text-cut text-black text-sm"},[i._v("99新 苹果 iPhoneX 256G 银色")]),a("v-uni-view",{staticClass:"text-sm text-gray text-cut tag-view-box"},[a("v-uni-text",[i._v("银色")]),a("v-uni-text",[i._v("256G")]),a("v-uni-text",[i._v("苹果")]),a("v-uni-text",[i._v("99")])],1),a("v-uni-view",{staticClass:"text-price-view"},[a("v-uni-text",{staticClass:"text-price text-lg text-red"},[i._v("2280")]),a("v-uni-text",{staticClass:"cu-tag light bg-red sm radius"},[i._v("已验机")])],1),a("v-uni-view",{staticClass:"gps-right-view"},[a("v-uni-text",{staticClass:"text-sm text-gray"},[i._v("重庆 渝北区")]),a("v-uni-text",{staticClass:"text-sm text-gray text-right"},[i._v("当前在线")])],1)],1)],1)],1),a("v-uni-view",{staticClass:"grid-item-box"},[a("v-uni-view",{staticClass:"bg-white item-view"},[a("v-uni-view",{staticClass:"cu-avatar radius lg",staticStyle:{"background-image":"url(/static/images/home/goods/10.png)"}}),a("v-uni-view",{staticClass:"padding-sm zaiui-text-view"},[a("v-uni-view",{staticClass:"text-cut text-black text-sm"},[i._v("99新 苹果 iPhoneX 256G 银色")]),a("v-uni-view",{staticClass:"text-sm text-gray text-cut tag-view-box"},[a("v-uni-text",[i._v("银色")]),a("v-uni-text",[i._v("256G")]),a("v-uni-text",[i._v("苹果")]),a("v-uni-text",[i._v("99")])],1),a("v-uni-view",{staticClass:"text-price-view"},[a("v-uni-text",{staticClass:"text-price text-lg text-red"},[i._v("2280")]),a("v-uni-text",{staticClass:"cu-tag light bg-red sm radius"},[i._v("已验机")])],1),a("v-uni-view",{staticClass:"gps-right-view"},[a("v-uni-text",{staticClass:"text-sm text-gray"},[i._v("重庆 渝北区")]),a("v-uni-text",{staticClass:"text-sm text-gray text-right"},[i._v("当前在线")])],1)],1)],1)],1)],1)],1),a("v-uni-view",{staticClass:"cu-tabbar-height"}),a("v-uni-view",{staticClass:"bg-white zaiui-footer-fixed zaiui-foot-padding-bottom"},[a("v-uni-view",{staticClass:"cu-bar"},[a("v-uni-view",{staticClass:"flex flex-wrap"},[a("v-uni-view",{staticClass:"basis-xs"},[a("v-uni-view",{staticClass:"text-center"},[a("v-uni-view",{staticClass:"cuIcon-like"}),a("v-uni-view",{staticClass:"text-sm"},[i._v("想要")])],1)],1),a("v-uni-view",{staticClass:"basis-sm"},[a("v-uni-view",{staticClass:"btn-view"},[a("v-uni-button",{staticClass:"cu-btn bg-orange radius shadow-blur"},[i._v("聊一聊")])],1)],1),a("v-uni-view",{staticClass:"basis-sm"},[a("v-uni-view",{staticClass:"btn-view"},[a("v-uni-button",{staticClass:"cu-btn bg-red radius shadow-blur"},[i._v("马上买")])],1)],1)],1)],1)],1)],1)},v=[];a.d(t,"b",(function(){return s})),a.d(t,"c",(function(){return v})),a.d(t,"a",(function(){return e}))},a1e9:function(i,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var e={bannerListData:function(){return[{url:"/static/images/home/goods/1.png"},{url:"/static/images/home/goods/4.png"},{url:"/static/images/home/goods/5.png"},{url:"/static/images/home/goods/6.png"},{url:"/static/images/home/goods/9.png"},{url:"/static/images/home/goods/10.png"},{url:"/static/images/home/goods/11.png"}]},goodsList:function(){return[{mold:!0,price:"2280",title:"商品标题，商品标题，商品标题，商品标题，商品标题，商品标题，商品标题，商品标题，商品标题，商品标题",img:"/static/images/home/goods/1.png"},{mold:!1,price:"5049",title:"商品标题，商品标题，商品标题，商品标题，商品标题，商品标题，商品标题，商品标题，商品标题，商品标题",img:"/static/images/home/goods/2.png"},{mold:!0,price:"2980",title:"商品标题，商品标题，商品标题，商品标题，商品标题，商品标题，商品标题，商品标题，商品标题，商品标题",img:"/static/images/home/goods/3.png"},{mold:!0,price:"2280",title:"商品标题，商品标题，商品标题，商品标题，商品标题，商品标题，商品标题，商品标题，商品标题，商品标题",img:"/static/images/home/goods/4.png"},{mold:!0,price:"5049",title:"商品标题，商品标题，商品标题，商品标题，商品标题，商品标题，商品标题，商品标题，商品标题，商品标题",img:"/static/images/home/goods/5.png"},{mold:!0,price:"2980",title:"商品标题，商品标题，商品标题，商品标题，商品标题，商品标题，商品标题，商品标题，商品标题，商品标题",img:"/static/images/home/goods/6.png"},{mold:!0,price:"2280",title:"商品标题，商品标题，商品标题，商品标题，商品标题，商品标题，商品标题，商品标题，商品标题，商品标题",img:"/static/images/home/goods/7.png"},{mold:!0,price:"5049",title:"商品标题，商品标题，商品标题，商品标题，商品标题，商品标题，商品标题，商品标题，商品标题，商品标题",img:"/static/images/home/goods/8.png"}]}},s=e;t.default=s},ceff:function(i,t,a){"use strict";a.r(t);var e=a("2f68"),s=a("7b6b");for(var v in s)"default"!==v&&function(i){a.d(t,i,(function(){return s[i]}))}(v);a("2a3a");var n,o=a("f0c5"),u=Object(o["a"])(s["default"],e["b"],e["c"],!1,null,"343f2f6d",null,!1,e["a"],n);t["default"]=u.exports},d121:function(i,t,a){"use strict";a.r(t);var e=a("3126"),s=a.n(e);for(var v in e)"default"!==v&&function(i){a.d(t,i,(function(){return e[i]}))}(v);t["default"]=s.a},e4dd:function(i,t,a){var e=a("24fb");t=e(!1),t.push([i.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.zaiui-goods-synopsis-view .user-view[data-v-2f6b1255]{position:relative;width:100%}.zaiui-goods-synopsis-view .user-view .cu-avatar[data-v-2f6b1255]{position:absolute}.zaiui-goods-synopsis-view .user-view .text-name[data-v-2f6b1255]{position:relative;padding:0 %?181.81?% 0 %?61.81?%;line-height:%?47.27?%;height:%?47.27?%}.zaiui-goods-synopsis-view .user-view .text-right-view[data-v-2f6b1255]{position:absolute;right:0;top:%?7.27?%}.zaiui-goods-synopsis-view .price-view[data-v-2f6b1255]{position:relative}.zaiui-goods-synopsis-view .price-view uni-text[data-v-2f6b1255]{margin-right:%?9.09?%}.zaiui-goods-synopsis-view .zaiui-map-view[data-v-2f6b1255]{position:relative;background-image:url(/static/images/home/sundry/map.png);background-size:cover;background-position:50%;padding:%?10.9?% %?27.27?%;border-radius:%?90.9?%;opacity:.8}.zaiui-goods-synopsis-view .zaiui-map-view .cut-view[data-v-2f6b1255]{padding-right:%?218.18?%}.zaiui-goods-synopsis-view .zaiui-map-view .text-right-view[data-v-2f6b1255]{position:absolute;right:%?27.27?%;top:%?10.9?%}.zaiui-service-view-box[data-v-2f6b1255]{position:relative}.zaiui-service-view-box .flex .basis-1[data-v-2f6b1255]{-webkit-flex-basis:10%;flex-basis:10%}.zaiui-service-view-box .flex .basis-7[data-v-2f6b1255]{-webkit-flex-basis:70%;flex-basis:70%}.zaiui-service-view-box .flex .basis-2[data-v-2f6b1255]{-webkit-flex-basis:20%;flex-basis:20%}.zaiui-service-view-box .tag-view-box .tag-view[data-v-2f6b1255]{margin-right:%?9.09?%}.zaiui-service-view-box .icon-view[data-v-2f6b1255]{height:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.zaiui-service-view-box .icon-view .icon[data-v-2f6b1255]{position:absolute;right:15px}.zaiui-details-view-box[data-v-2f6b1255]{position:relative}.zaiui-details-view-box .title-view[data-v-2f6b1255]{padding:%?9.09?% 0 %?18.18?%}.zaiui-details-view-box .col-item[data-v-2f6b1255]{margin:%?9.09?% 0}.zaiui-details-view-box .zaiui-text-content-view[data-v-2f6b1255]{margin:%?27.27?% 0}.zaiui-details-view-box .zaiui-img-box[data-v-2f6b1255]{position:relative;width:100%}.zaiui-details-view-box .zaiui-img-box uni-image[data-v-2f6b1255]{width:100%;border-radius:%?18.18?%}.zaiui-details-view-box .zaiui-img-box uni-image + uni-image[data-v-2f6b1255]{margin-top:%?18.18?%}.zaiui-footer-fixed[data-v-2f6b1255]{-webkit-box-shadow:0 %?-2?% %?9.09?% 0 #ececec;box-shadow:0 %?-2?% %?9.09?% 0 #ececec}.zaiui-footer-fixed .cu-bar[data-v-2f6b1255], .zaiui-footer-fixed .flex-wrap[data-v-2f6b1255]{width:100%}.zaiui-footer-fixed .cu-bar[data-v-2f6b1255]{padding-right:%?18.18?%}.zaiui-footer-fixed .cu-bar .basis-xs[data-v-2f6b1255]{-webkit-flex-basis:15%;flex-basis:15%}.zaiui-footer-fixed .cu-bar .basis-sm[data-v-2f6b1255]{-webkit-flex-basis:42.5%;flex-basis:42.5%}.zaiui-footer-fixed .cu-bar .btn-view[data-v-2f6b1255]{padding:0 %?18.18?%}.zaiui-footer-fixed .cu-bar .btn-view .cu-btn[data-v-2f6b1255]{width:100%}.zaiui-border-view[data-v-2f6b1255]{position:relative;background:#efebeb;margin:%?36.36?% 0;height:%?2?%;width:100%}.zaiui-steps-view[data-v-2f6b1255]{-webkit-box-shadow:0 0 %?14.54?% rgba(26,26,26,.2);box-shadow:0 0 %?14.54?% rgba(26,26,26,.2);margin:%?9.09?% 0 %?29.09?% 0;--ShadowSize:0 %?1?% %?6?%;border-radius:%?9.09?%;padding:%?29.09?%}.zaiui-steps-view .cu-steps.steps-arrow .cu-item[data-v-2f6b1255]::before, .zaiui-steps-view .cu-steps.steps-arrow .cu-item[data-v-2f6b1255]::after{content:"\\E7F6";border-bottom-width:0;font-family:cuIcon;font-size:%?36.36?%;height:%?29.09?%;color:#d0e0fa;line-height:0;top:%?-30.9?%;margin:auto;bottom:0}.zaiui-selll-user-view-box .cu-list.menu-avatar > .cu-item[data-v-2f6b1255]{height:%?99.99?%}.zaiui-selll-user-view-box .cu-list.menu-avatar > .cu-item .content[data-v-2f6b1255]{left:%?127.27?%;width:calc(100% - %?94.54?% - %?127.27?%)}.zaiui-selll-user-view-box .cu-list.menu-avatar > .cu-item .content .cu-tag.sm[data-v-2f6b1255]{padding:0;width:%?27.27?%;height:%?27.27?%;text-align:center;line-height:%?27.27?%}.zaiui-selll-user-view-box .cu-list.menu-avatar > .cu-item[data-v-2f6b1255]:after{width:0;height:0;border-bottom:0}.zaiui-selll-user-view-box .cu-list.menu-avatar > .cu-item > .cu-avatar[data-v-2f6b1255]{width:%?72.72?%;height:%?72.72?%}.zaiui-selll-user-view-box .zaiui-grid-tab-view[data-v-2f6b1255]{position:relative;width:100%}.zaiui-selll-user-view-box .zaiui-grid-tab-view .grid[data-v-2f6b1255]{border-radius:%?9.09?%}.zaiui-selll-user-view-box .zaiui-grid-tab-view .grid .item-view[data-v-2f6b1255]{position:relative;padding:%?14.54?% 0}.zaiui-selll-user-view-box .zaiui-grid-tab-view .grid .item-view + .item-view[data-v-2f6b1255]:before{content:"";position:absolute;background:#e2e2e2;height:%?45.45?%;top:%?27.27?%;width:%?2?%;z-index:0;left:0}.zaiui-selll-user-view-box .zaiui-goods-swiper-view .goods-item[data-v-2f6b1255]{position:relative;text-align:center}.zaiui-selll-user-view-box .zaiui-goods-swiper-view .goods-item .text-price-view[data-v-2f6b1255]{position:absolute;bottom:%?3.63?%;left:%?36.36?%;color:#fff}.zaiui-selll-user-view-box .zaiui-goods-swiper-view .screen-swiper[data-v-2f6b1255]{min-height:%?145.45?%;height:%?172.72?%}.zaiui-interaction-view-box .zaiui-null-view[data-v-2f6b1255]{position:relative;text-align:center;height:%?218.18?%;width:100%}.zaiui-interaction-view-box .zaiui-null-view .text-view-box[data-v-2f6b1255]{padding:%?45.45?% 0 %?36.36?% 0}.zaiui-interaction-view-box .zaiui-null-view .cu-btn[data-v-2f6b1255]{height:%?61.81?%;font-size:%?23.63?%;padding:0 %?45.45?%}.zaiui-interaction-view-box .zaiui-interaction-view[data-v-2f6b1255]{position:relative;width:100%}.zaiui-interaction-view-box .zaiui-interaction-view .user-input-view[data-v-2f6b1255]{position:relative;width:100%}.zaiui-interaction-view-box .zaiui-interaction-view .user-input-view .cu-avatar[data-v-2f6b1255]{position:absolute}.zaiui-interaction-view-box .zaiui-interaction-view .user-input-view .input-view-box[data-v-2f6b1255]{position:relative;padding-left:%?99.99?%}.zaiui-interaction-view-box .zaiui-interaction-view .user-input-view .input-view-box .arrow-view[data-v-2f6b1255]{border-top:%?18.18?% solid transparent;border-bottom:%?18.18?% solid transparent;border-right:%?18.18?% solid #f8f8f8;position:absolute;left:%?83.63?%;top:%?13.63?%;height:0;width:0}.zaiui-interaction-view-box .zaiui-interaction-view .user-input-view .input-view-box .input-view[data-v-2f6b1255]{margin-right:%?141.81?%;background:#f8f8f8;font-size:%?25.45?%;padding:0 %?27.27?%;height:%?63.63?%}.zaiui-interaction-view-box .zaiui-interaction-view .user-input-view .input-view-box .cu-btn[data-v-2f6b1255]{border-radius:0 %?72.72?% %?72.72?% 0;position:absolute;padding:0 %?45.45?%;font-size:%?25.45?%;right:0;top:0}.zaiui-interaction-view-box .zaiui-interaction-list-view[data-v-2f6b1255]{position:relative;width:100%}.zaiui-interaction-view-box .zaiui-interaction-list-view .list-itme[data-v-2f6b1255]{position:relative;width:100%;padding:%?27.27?% 0;border-bottom:%?2?% solid #efebeb}.zaiui-interaction-view-box .zaiui-interaction-list-view .list-itme .cu-avatar[data-v-2f6b1255]{position:absolute}.zaiui-interaction-view-box .zaiui-interaction-list-view .list-itme .view-box[data-v-2f6b1255]{position:relative;padding-left:%?99.99?%}.zaiui-interaction-view-box .zaiui-interaction-list-view .list-itme .view-box .content-box[data-v-2f6b1255]{line-height:1.6;margin-top:%?9.09?%}.zaiui-interaction-view-box .zaiui-interaction-list-view .list-itme .zaiui-comment-view[data-v-2f6b1255]{background:#f8f8f8;margin-top:%?27.27?%}.zaiui-interaction-view-box .zaiui-interaction-list-view .list-itme .zaiui-comment-view .user-name-box .cu-tag[data-v-2f6b1255]{position:relative;top:%?-2?%;margin:0 %?9.09?%}.zaiui-interaction-view-box .zaiui-interaction-list-view .list-itme .zaiui-comment-view .zaiui-reply-view[data-v-2f6b1255]{margin-top:%?9.09?%}.zaiui-interaction-view-box .zaiui-interaction-list-view .list-itme .zaiui-comment-view .zaiui-reply-view uni-text[data-v-2f6b1255]{margin-right:%?9.09?%}.zaiui-interaction-view-box .zaiui-tag-view-box[data-v-2f6b1255]{position:relative}.zaiui-interaction-view-box .zaiui-tag-view-box .cu-tag[data-v-2f6b1255]{margin-bottom:%?18.18?%;margin-right:%?36.36?%}.zaiui-interaction-view-box .zaiui-tag-view-box .cu-tag + .cu-tag[data-v-2f6b1255]{margin-left:0}.zaiui-interaction-view-box .zaiui-tag-text-view-box[data-v-2f6b1255]{position:relative;padding:%?18.18?% 0}.zaiui-interaction-view-box .zaiui-tag-text-view-box .text-cut[data-v-2f6b1255]{padding:%?9.09?% 0}.zaiui-interaction-view-box .zaiui-tag-text-view-box .text-cut .cu-tag[data-v-2f6b1255]{position:relative;top:%?-3.63?%}.zaiui-recommend-goods-box .zaiui-goods-info-box[data-v-2f6b1255]{position:relative}.zaiui-recommend-goods-box .zaiui-goods-info-box .goods-img-view[data-v-2f6b1255]{position:absolute}.zaiui-recommend-goods-box .zaiui-goods-info-box .goods-img-view .cu-avatar[data-v-2f6b1255]{width:%?181.81?%;height:%?181.81?%;border-radius:%?14.54?%}.zaiui-recommend-goods-box .zaiui-goods-info-box .goods-img-view .cu-tag[data-v-2f6b1255]{position:absolute;left:%?14.54?%;top:%?14.54?%}.zaiui-recommend-goods-box .zaiui-goods-info-box .goods-info-view[data-v-2f6b1255]{position:relative;padding-left:%?209.09?%;height:%?181.81?%;line-height:1.55}.zaiui-recommend-goods-box .zaiui-goods-info-box .goods-info-view .tag-view-box .cu-tag[data-v-2f6b1255]{margin-right:%?9.09?%}.zaiui-recommend-goods-box .zaiui-goods-info-box .goods-info-view .tag-view-box .cu-tag + .cu-tag[data-v-2f6b1255]{margin-left:0}.zaiui-resemble-goods-box[data-v-2f6b1255]{position:relative}.zaiui-resemble-goods-box .text-title-view[data-v-2f6b1255]{background-image:-webkit-gradient(linear,left bottom,left top,from(#fafafa),to(#fff));background-image:-webkit-linear-gradient(bottom,#fafafa,#fff);background-image:linear-gradient(0deg,#fafafa,#fff)}.zaiui-resemble-goods-box .grid[data-v-2f6b1255]{padding:0 %?18.18?%}.zaiui-resemble-goods-box .grid .grid-item-box[data-v-2f6b1255]{padding:%?9.09?%}.zaiui-resemble-goods-box .grid .grid-item-box .item-view[data-v-2f6b1255]{border-radius:%?10.9?%}.zaiui-resemble-goods-box .grid .grid-item-box .item-view .cu-avatar[data-v-2f6b1255]{width:100%;height:%?309.09?%;border-radius:%?10.9?% %?10.9?% 0 0}.zaiui-resemble-goods-box .grid .grid-item-box .item-view .zaiui-text-view[data-v-2f6b1255]{line-height:1.6}.zaiui-resemble-goods-box .grid .grid-item-box .item-view .zaiui-text-view .tag-view-box uni-text[data-v-2f6b1255]{margin-right:%?9.09?%}.zaiui-resemble-goods-box .grid .grid-item-box .item-view .zaiui-text-view .text-price-view[data-v-2f6b1255]{position:relative}.zaiui-resemble-goods-box .grid .grid-item-box .item-view .zaiui-text-view .text-price-view .cu-tag[data-v-2f6b1255]{position:absolute;top:%?9.09?%;right:0}.zaiui-resemble-goods-box .grid .grid-item-box .item-view .zaiui-text-view .gps-right-view[data-v-2f6b1255]{position:relative}.zaiui-resemble-goods-box .grid .grid-item-box .item-view .zaiui-text-view .gps-right-view .text-right[data-v-2f6b1255]{position:absolute;right:0;top:%?7.27?%}.zaiui-scroll-tab-view[data-v-2f6b1255]{-webkit-box-shadow:0 %?2?% %?21.81?% 0 hsla(0,0%,53.3%,.29);box-shadow:0 %?2?% %?21.81?% 0 hsla(0,0%,53.3%,.29);position:fixed;width:100%;z-index:99}.zaiui-scroll-height-view[data-v-2f6b1255]{position:relative;height:%?63.63?%;width:100%}',""]),i.exports=t},eb8d:function(i,t,a){"use strict";var e=a("f884"),s=a.n(e);s.a},f884:function(i,t,a){var e=a("e4dd");"string"===typeof e&&(e=[[i.i,e,""]]),e.locals&&(i.exports=e.locals);var s=a("4f06").default;s("a02f8a54",e,!0,{sourceMap:!1,shadowMode:!1})}}]);