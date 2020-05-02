import user from '@/api/user'
export default {
	state: {
		token:''
	},
	mutations: {
		SETTOKEN(state,data){
			state.token = data.token;
		}
	},
	actions: {
		LOGIN(context,data){
			return user.login(data).then(res=>{
				if(res.token){
					context.commit('SETTOKEN',{token:res.token});
				}
				return res;
			});
		},
		LOGINWX(){
			return user.loginWx();
		}
	},
	getters: {
		 
	}
	
}