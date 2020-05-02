import { axios } from '@/utils/request.js';

// 微信支付接口
export function wxpay (data,callBack) {
	 return axios('wxpay','POST',data,callBack);
}
// 微信app支付接口
export function wxAppPay (data,callBack) {
	 return axios('https://springboot.coral3.com/unifiedOrder','POST',data,callBack);
}

// 微信小程序支付接口
export function wxMiniPay (data,callBack) {
	 return axios('http://localhost/coral3/createMiniProgramTradePay','POST',data,callBack);
}