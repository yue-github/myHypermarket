<template>
	
	<view id="QSGradientSwiper" class="QSGradientSwiper" :style="{
		'height': height + 'px','width': width + ''
	}">
		<!-- #ifndef APP-PLUS || H5 || MP-WEIXIN || MP-QQ -->
		<view class="background" :animation="animationData" :style="{
					'height': getHeight*Number(backgroundHeightScale) + 'px',
					'border-bottom-left-radius': borderBottomRadius,
					'border-bottom-right-radius': borderBottomRadius
				}"> </view>
		<!-- #endif -->
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN || MP-QQ -->
		<view class="background" id="background" :style="{
					'height': getHeight*Number(backgroundHeightScale) + 'px',
					'border-bottom-left-radius': borderBottomRadius,
					'border-bottom-right-radius': borderBottomRadius,
					'background': 'transparent'
				}"> </view>
		<!-- #endif -->

		<!-- #ifndef APP-PLUS || H5 || MP-WEIXIN || MP-QQ -->
		<swiper 
		:indicator-dots="indicatorDots"
		:indicator-color="indicatorColor"
		:indicator-active-color="indicatorActiveColor"
		:autoplay="autoplay"
		:interval="interval"
		:duration="duration"
		
		:circular="isCircular" 
		:current="swiperCurrent" 
		@transition="swiperAction"
		@animationfinish="swiperAction" 
		:style="{ 'height': height + 'px' }">
			<swiper-item v-for="(item, index) in list" :key="index">
				<view class="swiper-item">
					<QSGradientSwiperItem :item="item" :index="index"></QSGradientSwiperItem>
				</view>
			</swiper-item>
		</swiper>
		<!-- #endif -->
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN || MP-QQ -->
		<swiper 
		id="swiper" 
		class="square-dot"
		:indicator-dots="indicatorDots"
		:indicator-color="indicatorColor"
		:indicator-active-color="indicatorActiveColor"
		:autoplay="autoplay"
		:interval="interval"
		:duration="duration"
		@change="bannerChange"
		:previous-margin="previousMargin"
		:next-margin="nextMargin"
		:circular="isCircular" 
		:current="swiperCurrent" 
		@transition="QSGradientSwiperWXS.transition" 
		@animationfinish="QSGradientSwiperWXS.animationfinish" 
		:circularGradient_wxs="circularGradient_wxs"
		:gradientList_wxs="gradientList_wxs"
		:itemMoveDistance="itemMoveDistance"
		:change:circularGradient_wxs="QSGradientSwiperWXS.circularGradient_wxs_Change"
		:change:gradientList_wxs="QSGradientSwiperWXS.gradientList_wxs_Change"
		:change:itemMoveDistance="QSGradientSwiperWXS.itemMoveDistance_Change"
		:data-swipercurrent="swiperCurrent" 
		:data-iscircular="isCircular"
		:style="{ 'height': height + 'px' }">
			<swiper-item v-for="(item, index) in list" :key="index">
				<view class="swiper-item">
					<QSGradientSwiperItem :item="item" :index="index"></QSGradientSwiperItem>
				</view>
			</swiper-item>
		</swiper>
		<!-- #endif -->
	</view>
</template>

<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN || MP-QQ -->
<script lang="wxs" module="QSGradientSwiperWXS">
	var gradientList_wxs = [];
	var circularGradient_wxs = [];
	var itemMoveDistance = 0;
	var char1 = "|";
	var char2 = ",";
	var swiperId = "#swiper";
	var backgroundId = "#background";
	
	function gradientList_wxs_Change(n, o, ins){
		var newArr = [];
		var data = n.split(char1);
		for(var i = 0; i < data.length; i++) {
			newArr.push(data[i].split(char2));
		}
		gradientList_wxs = newArr;
		
		var swiper = ins.selectComponent(swiperId);
		var dataset = swiper.getDataset();
		var swiperCurrent = dataset.swipercurrent;
		changeBackgroundColor(ins, gradientList_wxs[swiperCurrent][0]);
	}
	
	function circularGradient_wxs_Change(n, o, ins) {
		circularGradient_wxs = n.split(char2);
	}
	
	function itemMoveDistance_Change(n) {
		itemMoveDistance = parseFloat(n);
	}
	
	function transition(e, ins) {
		var DX = e.detail.dx;
		var swiper = ins.selectComponent(swiperId);
		var dataset = swiper.getDataset();
		var swiperCurrent = parseInt(dataset.swipercurrent);
		var isCircular = ((''+dataset.iscircular)==='true');
		var gradientItem;
		var itemCurrent;
		var addC = Math.floor(Math.abs(DX)/itemMoveDistance);
		addC = addC - (Math.floor(addC/(gradientList_wxs.length))*(gradientList_wxs.length));
		var addDistance = (addC*itemMoveDistance);
		swiperCurrent += addC;
		if (DX >= 0) {
			DX -= addDistance;
			itemCurrent = Math.round(DX);
			var abl = swiperCurrent == (gradientList_wxs.length - 1);
			if (abl && (abl || isCircular)) {
				// console.log('DX大于零， 选择circularGradient_wxs')
				gradientItem = circularGradient_wxs;
			} else {
				// console.log('DX大于零， 选择gradientList_wxs')
				gradientItem = gradientList_wxs[swiperCurrent] || gradientList_wxs[gradientList_wxs.length -1];
			}
		} else {
			DX += addDistance;
			itemCurrent = Math.round(itemMoveDistance + DX);
			var bbl_s = swiperCurrent == 0;
			if (bbl_s && (bbl_s || isCircular)) {
				// console.log(' bbl_s DX小于零， 选择circularGradient_wxs, swiperCurrent:' + swiperCurrent)
				gradientItem = circularGradient_wxs;
			} else {
				if(swiperCurrent == (gradientList_wxs.length)) {
					// console.log(' bbl_e DX小于零， 选择circularGradient_wxs, swiperCurrent:' + swiperCurrent)
					gradientItem = circularGradient_wxs;
				}else{
					// console.log('DX小于零， 选择gradientList_wxs, swiperCurrent:' + swiperCurrent)
					gradientItem = gradientList_wxs[swiperCurrent - 1] || gradientList_wxs[0];
				}
			}
		}
		itemCurrent = itemCurrent>(gradientItem.length-1)?(gradientItem.length-1):itemCurrent<0?0:itemCurrent;
		var color = gradientItem[itemCurrent];
		changeBackgroundColor(ins, color);
	}
	
	function animationfinish(e, ins) {
		ins.callMethod('animationfinish_wxs', e.detail);
		changeBackgroundColor(ins, gradientList_wxs[e.detail.current][0]);
	}
	
	function changeBackgroundColor(ins, color) {
		var background = ins.selectComponent(backgroundId);
		background.setStyle({
			'background-color': 'transparent'
		})
	}

	module.exports = {
		transition: transition,
		animationfinish: animationfinish,
		circularGradient_wxs_Change: circularGradient_wxs_Change,
		gradientList_wxs_Change: gradientList_wxs_Change,
		itemMoveDistance_Change: itemMoveDistance_Change
	}
</script>
<!-- #endif -->

<script>
	import QSGradientSwiperItem from './component/QS-Gradient-Swiper-Item.vue';
	
	function checkNumber(theObj) {
	  var reg = /^[0-9]+.?[0-9]*$/;
	  if (reg.test(theObj)) {
	    return true;
	  }
	  return false;
	}
	const {
		windowWidth
	} = uni.getSystemInfoSync();
	export default {
		components:{QSGradientSwiperItem},
		props: {
			height: {
				type: [String, Number],
				default: 200
			},
			width: {
				type: [String, Number],
				default: '100%'
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
			},
			previousMargin: {
				type: String,
				default: '0px'
			},
			nextMargin: {
				type: String,
				default: '0px'
			},
			indicatorDots: {
				type: [String, Boolean],
				default: true
			},
			indicatorColor: {
				type: String,
				default: 'rgba(255, 255, 255, .7)'
			},
			indicatorActiveColor: {
				type: String,
				default: 'white'
			},
			autoplay: {
				type: [String, Boolean],
				default: true
			},
			interval: {
				type: [String, Number],
				default: 3000
			},
			duration: {
				type: [String, Number],
				default: 200
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
				itemMoveDistance: 0,
				onceAnimationfinish: false,
				// #ifndef APP-PLUS || H5 || MP-WEIXIN || MP-QQ
				Ani: null,
				animationData: {},
				// #endif
				// #ifdef APP-PLUS || H5 || MP-WEIXIN || MP-QQ
				gradientList_wxs: '',
				circularGradient_wxs: '',
				// #endif
			}
		},
		computed: {
			getHeight() {
				return Number(this.height);
			},
			isCircular() {
				return String(this.circular) === 'true';
			},
			getListLength() {
				return this.list.length;
			}
		},
		created() {
			// #ifndef APP-PLUS || H5 || MP-WEIXIN || MP-QQ
			this.Ani = uni.createAnimation({
				duration: 0
			});
			// #endif
		},
		methods: {
			bannerChange(e){
				this.$emit('bannerChange',e);
			},
			getItemMoveDistance() {
				const previousMargin = this.formatItemMoveDistance(this.previousMargin);
				const nextMargin = this.formatItemMoveDistance(this.nextMargin);
				
				if(previousMargin !== false && nextMargin !== false) {
					this.itemMoveDistance = (this.componentWidth - Number(previousMargin) - Number(nextMargin));
				}else{
					console.log('previousMargin或nextMargin格式错误， 请输入正确的数字， 单位为px或rpx');
				}
			},
			formatItemMoveDistance(data) {
				const str = String(data);
				const arr_rpx = str.split('rpx');
				let num;
				let isRpx = false;
				if(arr_rpx.length > 1) {
					num = arr_rpx[0];
					isRpx = true;
				}else{
					const arr_px = str.split('px');
					if(arr_px.length > 1) {
						num = arr_px[0];
					}else{
						num = str;
					}
				}
				
				if(checkNumber(num)) {
					num = Number(num);
					if(isRpx) {
						return uni.upx2px(num);
					}
					return num;
				}else{
					return false;
				}
			},
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
				this.getItemMoveDistance();
				this.readyShow = false;
				setTimeout(() => {
					this.list = data;
					this.countGradientColor();
					setTimeout(() => {
						this.readyShow = true;
						setTimeout(() => {
							this.init(this.defCurrent);
						})
					}, 100)
				}, 100)
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
							this.itemMoveDistance + 1)));
					} else {
						gradientList.push([list_copy[i][this.backgroundColorName]]);
					}
				}
				this.gradientList = gradientList;
				// #ifndef APP-PLUS || H5 || MP-WEIXIN || MP-QQ
				this.circularGradient = gradient(list_copy[list_copy.length - 1][this.backgroundColorName], list_copy[0][this.backgroundColorName],
					(this.itemMoveDistance + 1));
				// #endif
				// #ifdef APP-PLUS || H5 || MP-WEIXIN || MP-QQ
				let gradientList_wxs = gradientList.map(item=>item.join(','));
				gradientList_wxs = gradientList_wxs.join('|');
				this.gradientList_wxs = gradientList_wxs;
				this.circularGradient_wxs = gradient(list_copy[list_copy.length - 1][this.backgroundColorName], list_copy[0][this.backgroundColorName],
					(this.itemMoveDistance + 1)).join(',');
				// #endif
			},
			animationfinish_wxs(detail) {
				this.swiperCurrent = Number(detail.current);
				if (this.isCircular && !this.onceAnimationfinish) {
					this.onceAnimationfinish = true;
				}
			},
			swiperAction(e) {
				switch (e.type) {
					case 'transition':
						if (this.isCircular && !this.onceAnimationfinish) return;
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
							itemCurrent = Math.round(this.itemMoveDistance + DX);
						}
						const color = gradientItem[itemCurrent];
						// if (color) this.changeBackgroundColor(color);
						break;
					case 'animationfinish':
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
				// #ifndef APP-PLUS || H5 || MP-WEIXIN || MP-QQ
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

	.background {
		position: absolute;
		top: 0;
		left: 0;
		width: 750rpx;
	}
	
	.swiper-item{
		height: 100%;
		width: 100%;
		position: relative;
	}
	 
</style>
