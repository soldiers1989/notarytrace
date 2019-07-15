import Vue from 'vue'
import App from './App.vue'
import iView from 'iview'
import BaiduMap from 'vue-baidu-map'
import store from './store/store'
import router from './router'

import {addCookie, getCookie, delCookie} from './libs/cookie';

Vue.use(iView);
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'yS9pI9MiyR3u7EOKdxuZQQLln5N0DTuy'
})

Vue.config.productionTip = false;

Vue.prototype.$cookieStore = {
  addCookie,
  getCookie,
  delCookie
}



router.beforeEach((to, from, next) => {
	iView.LoadingBar.start();
	if (to.meta.title) {
	    document.title = to.meta.title;
	}
 	if (to.meta.requiresAuth) { 
 		console.log(store.getters.validate)
 		console.log(store.getters.validate.isLogin)
	  	if(store.getters.validate.isLogin) {
	  		console.log('token 有效')
	  		if(to.name == 'company' || to.name == 'authorization'){
	  			if(to.name == 'company') {
		  			if(Vue.prototype.$cookieStore.getCookie( 'isadmin') == 'true'){
		  				next()
		  			}else {
		  				iView.LoadingBar.finish();  
		  				next('/personal');
		  			}
	  			}

	  			if(to.name == 'authorization') {
		  			if(Vue.prototype.$cookieStore.getCookie( 'isLegal') == 'true'){
		  				next()
		  			}else {
		  				iView.LoadingBar.finish();  
		  				next('/personal');
		  			}
	  			}

	  		}else {
	      		next()
	  		}
	    } else {      
	    	console.log('token 无效或不存在')
	    	iView.LoadingBar.finish();     
	      	next('/index');    
	    }
  	} else {
    	next()
  	}
})

router.afterEach(route => {
	document.documentElement.scrollTop = 0;
    iView.LoadingBar.finish();
});

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
