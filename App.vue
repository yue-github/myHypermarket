<script>
	//仅供学习交流，如作它用所承受的法律责任一概与作者无关 !!!!
	//----------------------------------------------------------------------
	import _tool from '@/utils/tools.js';
	export default {
		onLaunch: function() {
			_tool.yue_log("2.6.11.20200409");
			//console.log('App Launch')
		},
		onShow: function() {
			//console.log('App Show')
		},
		onHide: function() {
			//console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	//H5端引用。玄学问题，我这边在这里引入的css，在APP上无效。前面加/也一样。原因未知...
	//可自行测试在APP上是否有效，如果有效，可在vue里删除css引入的代码。
	/* #ifndef APP-PLUS */
		@import "static/colorui/main.css";
		@import "static/colorui/icon.css";
		@import "static/zaiui/style/app.scss";
	/* #endif */
</style>
