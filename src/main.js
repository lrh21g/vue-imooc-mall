import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'

import infiniteScroll from 'vue-infinite-scroll'
import VueLazyLoad from 'vue-lazyload'

import './assets/stylus/index.styl'

Vue.use(infiniteScroll)
Vue.use(VueLazyLoad, {
  loading: '/images/loading-svg/loading-bars.svg'
})

Vue.config.productionTip = false
// Vue.prototype.$baseUrl = process.env.BASE_URL

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
