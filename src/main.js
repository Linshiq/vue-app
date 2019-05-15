import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
//import './assets/theme/theme-green/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
//import NProgress from 'nprogress'
//import 'nprogress/nprogress.css'
import routes from './routes'
// import Mock from './mock' // 这里与axios冲突,要用只能选其一
// Mock.bootstrap();
import 'font-awesome/css/font-awesome.min.css'

import axios from 'axios'

axios.defaults.withCredentials=true;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


var instance = axios.create({
  baseURL:'',
  timeout:5000,
  headers:{"Content-Type":"multipart/form-data"}
});
Vue.prototype.$axios = axios; // 配置axios
Vue.prototype.$instance=instance;

Vue.prototype.$serviceIpAddr = 'http://127.0.0.1:8012/spring-boot-vue'; // 配置axios
Vue.prototype.$selfIpAddr = 'http://127.0.0.1:8080/'; // vue自身IP地址
axios.defaults.baseURL = 'https://localhost:8012/spring-boot-vue';
Vue.prototype.$toSelfIpAddr = 'http://localhost:8080/'; // vue跳转自身IP地址
// 将API方法绑定到全局
Vue.config.productionTip = false

//设置全局翻页每页页数大小
Vue.prototype.$pageSize = 3; 

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)

//NProgress.configure({ showSpinner: false });

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  //NProgress.start();
// 	if (to.path == '/') {
// 	 next({ path: '/table' })
// 	}
// 	
		next();
//   if (to.path == '/login') {
//     sessionStorage.removeItem('user');
//   }
// 	//next({ path: '/table' })
// 	// 先移除登录校验
//   let user = JSON.parse(sessionStorage.getItem('user'));
//   if (!user && to.path != '/login') {
//     next({ path: '/login' })
//   } else {
//     next()
//   }
})

//router.afterEach(transition => {
//NProgress.done();
//});

new Vue({
  //el: '#app',
  //template: '<App/>',
  router,
  store,
  //components: { App }
  render: h => h(App)
}).$mount('#app')

