import pay from '@/api/pay'
export default {
	state: {
	},
	mutations: {
	},
	actions: {
	  WXPAY(context,data){
		  return pay.wxpay(data);
	  },
	  WXAPPPAY(context,data){
	  	  return pay.wxAppPay(data);
	  },
	  ALIAPPAY(context,data){
	  	  return pay.aliAppPay(data);
	  },
	  WXMINIPAY(context,data){
	  	  return pay.wxMiniPay(data);
	  },
	},
	getters: {
		 
	}
	
}