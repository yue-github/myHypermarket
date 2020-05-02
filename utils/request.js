import baseUrl from '@/configs/request.js';
import { showLoading, hideLoading } from './animation.js';

// post请求，不支持异步.then操作
export function post (url,data,callBack,f) {
	showLoading();
    let token=uni.getStorageSync('token')||this.$store.getters.TOKEN;
	// 假定有token
	token = token?token:true;
	// TOKEN拦截判断有无处理
	if (token) {
		token='Bearer '+token;
	}else{
		// 跳转登录页面
		return false;
	}
	if(typeof(data)=='function'){
		f = callBack;
		callBack = data;
	}
	uni.request({
		url: url.includes('http')||url.includes('yue')?url:baseUrl+url, //仅为示例，并非真实接口地址。
		data:typeof(data)=='object'?data:{},
		method:'POST',
		header: {
			'Authorization': token, //自定义请求头信息
			'content-type':'application/x-www-form-urlencoded'
		},
		success: (res) => {
			if(callBack){
				callBack(res.data);
			}
			hideLoading();
		},
		fail(res) {
			hideLoading();
			if(f)
				f(res);
		}
	});
}

// get请求，不支持异步.then操作
export function get (url,data,callBack,f) {
	showLoading();
    let token=uni.getStorageSync('token')||this.$store.getters.TOKEN;
	// 假定有token
	token=true;
	// TOKEN拦截判断有无处理
	if (token) {
		token='Bearer '+token;
	}else{
		// 跳转登录页面
		return false;
	}
	if(typeof(data)=='function'){
		f = callBack;
		callBack=data;
	}
	uni.request({
		url: url.includes('http')||url.includes('yue')?url:baseUrl+url, //仅为示例，并非真实接口地址。
		data:typeof(data)=='object'?data:{},
		method:'GET',
		header: {
			'Authorization': token //自定义请求头信息
		},
		success: (res) => {
			if(callBack){
				callBack(res.data);
			}
		},
		fail(res) {
			if(f)
				f(res);
		},
		complete() {
			hideLoading();
		}
	});
}

// 支持异步
export function axios (url,type,data,callBack) {
	showLoading();
	let token;
	
	try{
		token=uni.getStorageSync('token')||this.$store.getters.TOKEN;
	}catch(e){
		hideLoading();
		token = "";
		//TODO handle the exception
	}
	
	// TOKEN拦截判断有无处理
	if (token) {
		token='Bearer '+token;
	}else{
		// 跳转登录页面
		// return false;
	}
	let promise=new Promise((resolve,reject)=>{
		uni.request({
			url: (url.includes('yue')||url.includes('http'))?url:baseUrl+url, //仅为示例，并非真实接口地址。
			data:data?data:{},
			method:type,
			header: {
				'Authorization': token, //自定义请求头信息
				'content-type':'application/x-www-form-urlencoded'
			},
			success: res => {
				if(url == 'login') {
					try {
						uni.setStorageSync('token', res.data.token);
					} catch (e) {
						// error
					}
				}
				if(callBack){
					callBack(res.data);
				}
				resolve(res.data);
			},
			fail() {
				reject('fail');
			},
			complete() {
				hideLoading();
			}
		});
	});
	return promise;
}
/**author:吴同岳
 * 时间:2019-10-12
 * contact:18814137320
 * 微信:wty1079051908
 * qq:1079051908
 */ 
