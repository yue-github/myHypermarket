export function reLaunch(url,data){
	// 关闭所有页面，打开到应用内的某个页面
	let str = '';
	for (let key in data) {
		str += `${key}=${data.key}&`
	}
	data = str.substr(0,str.length-1);
	uni.reLaunch({
		 url:url+'?'+data
	});
}
export function navigateTo(url,data) {
	let str = '';
	for (let key in data) {
		str += `${key}=${data.key}&`
	}
	data = str.substr(0,str.length-1);
	uni.navigateTo({
		url:url+'?'+data
	})
}