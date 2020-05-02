<template>
    <view>
        <view class="uni-padding-wrap">
            <view style="background:#FFF; padding:50upx 0;">
                <view class="uni-hello-text uni-center">支付金额</text></view>
                <view class="uni-h1 uni-center uni-common-mt">
                    <text class="rmbLogo">￥</text>
                    <input class="price" type="digit" :value="price" maxlength="4" @input="priceChange" />
                </view>
            </view>
            <view class="uni-btn-v uni-common-mt">
                <!-- #ifdef APP-PLUS -->
                <template v-if="providerList.length > 0">
                    <button v-for="(item,index) in providerList" :key="index" @click="requestPayment(item,index)"
                        :loading="item.loading">{{item.name}}支付</button>
                </template>
                <!-- #endif -->
            </view>
        </view>
    </view>
    </view>
</template>
<script>
    export default {
        data() {
            return {
                title: 'request-payment',
                loading: false,
                price: 1,
                providerList: [
					{
						name:'支付类型'
					}
				]
            }
        },
        mounted() {
            // #ifdef APP-PLUS
            uni.getProvider({
                service: "payment",
                success: (e) => {
                    console.log("payment success:" + JSON.stringify(e));
                    let providerList = [];
                    e.provider.map((value) => {
                        switch (value) {
                            case 'alipay':
                                providerList.push({
                                    name: '支付宝',
                                    id: value,
                                    loading: false
                                });
                                break;
                            case 'wxpay':
                                providerList.push({
                                    name: '微信',
                                    id: value,
                                    loading: false
                                });
                                break;
                            default:
                                break;
                        }
                    })
					
                    this.providerList = providerList;
                },
                fail: (e) => {
                    console.log("获取支付通道失败：", e);
                }
            });
            // #endif
        },
        methods: {
            async requestPayment(e, index) {
                this.providerList[index].loading = true;
                let orderInfo = await this.getOrderInfo(e.id);
                console.log("得到订单信息", orderInfo);
                if (orderInfo.msg !== 'success') {
                    console.log("获得订单信息失败", orderInfo);
                    uni.showModal({
                        content: "获得订单信息失败",
                        showCancel: false
                    })
					this.providerList[index].loading = false;
                    return;
                }
				console.log(JSON.stringify(orderInfo.data))
				let isString = typeof(orderInfo.data);
				let oi = isString == "string" ? orderInfo.data : JSON.stringify(orderInfo.data);
                uni.requestPayment({
                    provider: e.id,
					orderInfo: oi,
					success: (e) => {
                        console.log("success", e);
                        uni.showToast({
                            title: "感谢您的赞助!"
                        })
                    },
                    fail: (e) => {
                        console.log("fail", e);
                        uni.showModal({
                            content: "支付失败,原因为: " + e.errMsg,
                            showCancel: false
                        })
                    },
                    complete: () => {
                        this.providerList[index].loading = false;
                    }
                })
            },
            getOrderInfo(payId) {
				if(payId == 'alipay'){
					 return this.$store.dispatch("ALIAPPAY",{
								"orderNo":"120200105000065509",
								"amount":0.5,
								"body":"very good!"
							}).then(res=>{
								return res;
							});
				}
				if(payId == 'wxpay'){
					 return this.$store.dispatch("WXAPPPAY",{
								"orderNo":"120200105000065509",
								"amount":0.5,
								"body":"very good!"
							}).then(res=>{
								return res;
							});
				}else{
					return {
						err:'err'
					}
				}
				
            },
            priceChange(e) {
                console.log(e.detail.value)
                this.price = e.detail.value;
            }
        }
    }
</script>

<style>
    .rmbLogo {
        font-size: 40upx;
    }

    button {
        background-color: #007aff;
        color: #ffffff;
    }

    .uni-h1.uni-center {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: flex-end;
    }

    .price {
        border-bottom: 1px solid #eee;
        width: 200upx;
        height: 80upx;
        padding-bottom: 4upx;
    }

    .ipaPayBtn {
        margin-top: 30upx;
    }
</style>

