import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// 导入状态管理分支
import user from './user';
import test from './test';
import pay from './pay';
/**
 * 注意：vuex只在uni的vue文件互通
 */
const store = new Vuex.Store({
    state: {
		...user.state,
		...test.state,
		...pay.state,
		getter:'这是测试getters'
	},
    mutations: {
		// 测试
		doMutations(state,data){
			state.getter = "hello world!";
		},
		...user.mutations,
		...test.mutations,
		...pay.mutations,
	},
    actions: {
		// 测试
		DOACTIONS(context,data){
			context.commit('doMutations');
			console.log(context.getters.TOKEN);
		},
		...user.actions,
		...test.actions,
		...pay.actions,
	},
	getters:{
		GETTER:state=>state.getter,
		TOKEN:state=>state.token
	}
})

export default store