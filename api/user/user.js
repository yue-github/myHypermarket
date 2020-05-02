import { axios } from '@/utils/request.js';

// 微信登录
export function loginWx (data,callBack) {
	 return axios('wx/wx_login','POST',data,callBack);
}

// 普通登录
export function login (data,callBack) {
	 return axios('login','POST',data,callBack);
}