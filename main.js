import Vue from 'vue'
import App from './App'
import store from './store'
import { axios } from '@/utils/request.js';
Vue.prototype.$store = store
Vue.prototype.$axios = axios
 
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
