<template>
	<view>
		<!--标题栏-->
		<bar-title bgColor="bg-red">
			<block slot="content">活动</block>
		</bar-title>
		
		<view class="padding bg-white">
			<block v-for="(item,index) in [1,2,3]">
				<image src="/static/images/reward/duanwu.jpg" mode="widthFix" @click="goHome"/>
			</block>
			
		</view>
		
	</view>
</template>

<script>
	import barTitle from '@/components/zaiui-common/basics/bar-title';
	import _tool from '@/utils/tools.js';	//工具函数
	export default {
		components: {
			barTitle, 
		},
		data() {
			return {
				
			}
		},
		onReady() {
			_tool.setBarColor(false);
			uni.pageScrollTo({
			    scrollTop: 0,
			    duration: 0
			});
		},
		methods:{
			goHome(){
				uni.reLaunch({
					url:'/pages/app/index'
				})
			}
			
		}
	}
</script>

<style lang="scss">
	/* #ifdef APP-PLUS */
		@import "../../static/colorui/main.css";
		@import "../../static/colorui/icon.css";
		@import "../../static/zaiui/style/app.scss";
	/* #endif */
	
	image {
		width: 100%;
	}
</style>

