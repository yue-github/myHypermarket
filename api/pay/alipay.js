import { axios } from '@/utils/request.js';

// 支付宝app支付接口
export function aliAppPay (data,callBack) {
	 return axios('https://springboot.coral3.com/createOrder','POST',data,callBack);
}