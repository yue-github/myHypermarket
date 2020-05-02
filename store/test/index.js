import test from '@/api/test'
export default {
	state: {
	},
	mutations: {
	},
	actions: {
	  APITEST(context,data){
		  return test.apiTest(data);
	  },
	  NEEDTOKEN(context,data){
		  return test.needToken(data);
	  }
	},
	getters: {
		 
	}
	
}