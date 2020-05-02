export function showLoading(){
	uni.showLoading({
		title: '加载中...',
		mask: true
	});
}
export function hideLoading(){
	uni.hideLoading();
}
export function showToast(title,type){
	uni.showToast({
		title: title,
		icon: type
	})
}