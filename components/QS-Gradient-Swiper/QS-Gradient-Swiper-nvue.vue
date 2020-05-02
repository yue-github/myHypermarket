<template>
	<view 
	id="QSGradientSwiper"
	class="QSGradientSwiper" 
	:style="{
		'height': height + 'px'
	}">
		<!-- #ifdef APP-NVUE -->
		<view class="background" ref="background" :style="{
			'height': getHeight*Number(backgroundHeightScale) + 'px',
			'width': componentWidth + 'px',
			'border-bottom-left-radius': borderBottomRadius,
			'border-bottom-right-radius': borderBottomRadius
		}">
		</view>
		<!-- #endif -->
		<!-- #ifndef APP-NVUE -->
		<view class="background" :animation="animationData" :style="{
					'height': getHeight*Number(backgroundHeightScale) + 'px',
					'border-bottom-left-radius': borderBottomRadius,
					'border-bottom-right-radius': borderBottomRadius
				}">
		</view>
		<!-- #endif -->
		<!-- #ifdef APP-NVUE -->
		<swiper 
		class="swiperBox"
		:circular="isCircular"
		:current="swiperCurrent"
		@transition="swiperAction" 
		@change="swiperAction" 
		@animationfinish="swiperAction" 
		v-if="readyShow">
			<swiper-item class="swiper-item" v-for="(item, index) in list" :key="index">
				<QSGradientSwiperItem :item="item" :index="index" :height="getHeight" :width="componentWidth"></QSGradientSwiperItem>
			</swiper-item>
		</swiper>
		<!-- #endif -->
		<!-- #ifndef APP-NVUE -->
		<swiper class="swiperBox" :circular="isCircular" :current="swiperCurrent" @transition="swiperAction" @animationfinish="swiperAction">
			<swiper-item class="swiper-item" v-for="(item, index) in list" :key="index">
				<QSGradientSwiperItem :item="item" :index="index" :height="getHeight" :width="componentWidth"></QSGradientSwiperItem>
			</swiper-item>
		</swiper>
		<!-- #endif -->
	</view>
</template>

<script>
	import QSGradientSwiperItem from './components/QS-Gradient-Swiper-Item.vue';
	const {
		windowWidth
	} = uni.getSystemInfoSync();
	// #ifdef APP-NVUE
	const animation = weex.requireModule('animation');
	// #endif
	export default {
		components: {
			QSGradientSwiperItem
		},
		props: {
			height: {
				type: [String, Number],
				default: 200
			},
			backgroundHeightScale: {
				type: [String, Number],
				default: 0.8
			},
			backgroundColorName: {
				type: String,
				default: 'backgroundColor'
			},
			borderBottomRadius: {
				type: [String, Number],
				default: 0
			},
			circular: {
				type: [String, Boolean],
				default: false
			},
			defCurrent: {
				type: [String, Number],
				default: 0
			}
		},
		data() {
			return {
				list: [],
				gradientList: [],
				circularGradient: [],
				readyShow: false,
				swiperCurrent: 0,
				componentWidth: 0,
				onceAnimationfinish: false,
				// #ifndef APP-NVUE
				Ani: null,
				animationData: {},
				// #endif
			}
		},
		computed: {
			getHeight() {
				return Number(this.height);
			},
			isCircular() {
				return String(this.circular) === 'true';
			}
		},
		created() {
			// #ifndef APP-NVUE
			this.Ani = uni.createAnimation({
				duration: 0
			});
			// #endif
		},
		methods: {
			getComponentWidth() {
				return new Promise((rs, rj) => {
					try {
						let view = uni.createSelectorQuery().in(this);
						view.select('#QSGradientSwiper').fields({
							size: true
						})
						view.exec(res => {
							try {
								this.componentWidth = res[0].width;
								rs();
							} catch (e) {
								//TODO handle the exception
								this.componentWidth = windowWidth;
								rs();
							}
						});
					} catch (e) {
						//TODO handle the exception
						this.componentWidth = windowWidth;
						rs();
					}
				})
			},
			async setData(data) {
				await this.getComponentWidth();
				if (this.readyShow) this.readyShow = false;
				setTimeout(() => {
					if (data) this.list = data;
					this.countGradientColor();
					setTimeout(() => {
						this.readyShow = true;
						setTimeout(() => {
							this.init(this.defCurrent);
						}, 0)
					}, 0)
				}, 0)
			},
			init(current) {
				this.swiperCurrent = current;
				this.defTransition();
			},
			countGradientColor() {
				const list_copy = this.list;
				const gradientList = [];
				for (let i = 0; i < list_copy.length; i++) {
					if (list_copy[i + 1]) {
						gradientList.push(gradient(list_copy[i][this.backgroundColorName], list_copy[i + 1][this.backgroundColorName], (
							this.componentWidth + 1)));
					} else {
						gradientList.push([list_copy[i][this.backgroundColorName]]);
					}
				}
				this.circularGradient = gradient(list_copy[list_copy.length - 1][this.backgroundColorName], list_copy[0][this.backgroundColorName],
					(this.componentWidth + 1));
				// console.log(JSON.stringify(gradientList));
				this.gradientList = gradientList;
			},
			swiperAction(e) {
				switch (e.type) {
					case 'transition':
						// #ifndef MP-WEIXIN
						if (this.isCircular && !this.onceAnimationfinish) return;
						// #endif
						const DX = e.detail.dx;
						let swiperCurrent = this.swiperCurrent;
						let gradientList = this.gradientList;
						let gradientItem;
						let itemCurrent;
						if (DX >= 0) {
							if (swiperCurrent === (this.list.length - 1) && this.isCircular) {
								gradientItem = this.circularGradient;
							} else {
								gradientItem = gradientList[swiperCurrent];
							}
							itemCurrent = Math.round(DX);
						} else {
							if (swiperCurrent === 0 && this.isCircular) {
								gradientItem = this.circularGradient;
							} else {
								gradientItem = gradientList[swiperCurrent - 1];
							}
							itemCurrent = Math.round(this.componentWidth + DX);
						}
						const color = gradientItem[itemCurrent];
						if (color) this.changeBackgroundColor(color);
						break;
					case 'animationfinish':
						console.log('nvue animationfinish: ' + JSON.stringify(e));
						this.swiperCurrent = e.detail.current;
						if (this.isCircular && !this.onceAnimationfinish) {
							this.onceAnimationfinish = true;
						}
						this.defTransition();
						break;
					default:
						break;
				}
			},
			defTransition() {
				this.swiperAction({
					type: 'transition',
					detail: {
						dx: 0
					}
				});
			},
			changeBackgroundColor(backgroundColor) {
				// console.log('设置了颜色:' + backgroundColor);
				// #ifdef APP-NVUE
				animation.transition(this.$refs.background, {
					styles: {
						backgroundColor
					},
					duration: 0, //ms
					needLayout: false,
					delay: 0 //ms
				})
				// #endif
				// #ifndef APP-NVUE
				this.Ani.backgroundColor(backgroundColor).step();
				this.animationData = this.Ani.export();
				// #endif
			}
		}
	}
	
	function rgbToHex(r, g, b) {
		var hex = ((r << 16) | (g << 8) | b).toString(16);
		return "#" + new Array(Math.abs(hex.length - 7)).join("0") + hex;
	}
	
	// hex to rgb
	function hexToRgb(hex) {
		var rgb = [];
		for (var i = 1; i < 7; i += 2) {
			rgb.push(parseInt("0x" + hex.slice(i, i + 2)));
		}
		return rgb;
	}
	
	// 计算渐变过渡色
	function gradient(startColor, endColor, step) {
		// 将 hex 转换为rgb
		var sColor = hexToRgb(startColor),
			eColor = hexToRgb(endColor);
	
		// 计算R\G\B每一步的差值
		var rStep = (eColor[0] - sColor[0]) / step,
			gStep = (eColor[1] - sColor[1]) / step,
			bStep = (eColor[2] - sColor[2]) / step;
	
		var gradientColorArr = [];
		for (var i = 0; i < step; i++) {
			// 计算每一步的hex值
			gradientColorArr.push(rgbToHex(parseInt(rStep * i + sColor[0]), parseInt(gStep * i + sColor[1]), parseInt(bStep * i +
				sColor[2])));
		}
		return gradientColorArr;
	}
</script>

<style scoped>
	.QSGradientSwiper {
		position: relative;
	}
	
	.swiperBox{
		flex: 1;
	}

	.background {
		position: absolute;
		top: 0;
		left: 0;
		width: 750rpx;
	}
	
	.swiper-item {
		flex: 1;
		position: relative;
	}
</style>
