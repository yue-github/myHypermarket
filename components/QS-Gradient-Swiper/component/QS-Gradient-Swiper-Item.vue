<template>
	<view class="QS-Gradient-Swiper-Item">
	<!-- #ifdef APP-NVUE -->
	<view 
	class="QS-Gradient-Swiper-Item"
	:style="{
		'height': height + 'px',
		'width': width + 'px'
	}">
		<image 
		class="QS-Gradient-Swiper-Item-image" 
		:style="{
			'height': Number(height)*0.7 + 'px',
			'width': Number(width)*0.7 + 'px',
			'left': (Number(width)/2 - Number(width)*0.7/2) + 'px',
			'bottom': '0px'
		}"
		:src="item.path" mode="aspectFill"></image>
	</view>
	<!-- #endif -->
	<!-- #ifndef APP-NVUE -->
	<view class="QS-Gradient-Swiper-Item">
		<image class="QS-Gradient-Swiper-Item-image" :src="item.path" mode="widthFix"></image>
	</view>
	<!-- #endif -->
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				default() {
					return {};
				}
			},
			index: {
				type: Number,
				default: -1
			},
			// #ifdef APP-NVUE
			height: {
				type: [String, Number],
				default: 0
			},
			width: {
				type: [String, Number],
				default: 0
			},
			// #endif
		},
		created() {
			// #ifdef APP-NVUE
			console.log('height:' + this.height);
			console.log('width:' + this.width);
			// #endif
		}
	}
</script>

<style scoped>
	.QS-Gradient-Swiper-Item{
		/* #ifndef APP-NVUE */
		height: 100%;
		width: 100%;
		/* #endif */
		position: relative;
	}
	.QS-Gradient-Swiper-Item-image{
		position: absolute;
		/* #ifndef APP-NVUE */
		left: 25upx;
		top: 0;
		width: 700upx;
		/* #endif */
		border-radius: 13px;
	}
</style>
