import { axios } from '@/utils/request.js';

// 测试接口
export function apiTest (data,callBack) {
	 return axios('test','POST',data,callBack);
}
// 需要token才可以访问的测试接口
export function needToken (data,callBack) {
	 return axios('needToken','POST',data,callBack);
}