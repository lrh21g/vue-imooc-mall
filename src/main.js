import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'

import '@/assets/stylus/index.styl'

Vue.config.productionTip = false
Vue.prototype.$baseUrl = process.env.BASE_URL

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
