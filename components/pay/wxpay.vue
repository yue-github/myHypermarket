<template>
	<view>
		<uni-tag text="微信支付" type="primary" @click="wxpay" style="margin-top:10upx"></uni-tag>
		<view class="param_err">
			{{data}}
		</view>
	</view>
</template>

<script>
	import uniTag from "@/components/uni-tag/uni-tag.vue";
	import ApiFunList from '@/api';
	
	export default {
		data() {
			return {
				data:'13'
			}
		},
		methods: {
			unipay(params){
				uni.getProvider({
					service:'payment',
					success(res){
						console.log(res);
						uni.requestPayment({
							 provider:res.provider[0],
							 orderInfo:(new Date()).valueOf()+'',
							 timeStamp: params.timeStamp,
							 nonceStr: params.nonceStr,
							 package: params.package,
							 signType: params.signType,
							 paySign: params.paySign,
							 success(res){
								 this.data=JSON.stringify(res);
							 }
						})
					}
				})
				
			},
			// 微信支付
			wxpay(){
				let globalData=getApp().globalData;
				ApiFunList.wxpay({
					openid:globalData.token,
					uname: 'wutongyue',
					title:'测试标题',
					price: 1,
					code:globalData.code
				})
				.then(res=>{
					let params=res;
					 this.data=JSON.stringify(res);
					 console.log(this.data);
					this.unipay(res);
				})
			},
		},
		components: {
			uniTag
		},
	}
</script>

<style>
.param_err{
	width:100%;
	background:red;
	white-space: normal;
	word-break: break-word;
}
</style>
