import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nickName: '', // 用户名
    cartCount: 0 // 购物车数量
  },
  mutations: { // 更改状态
    // 更新用户信息
    updateUserInfo(state, nickName) {
      state.nickName = nickName
    },
    // 更新购物车数量
    updateCartCount(state, cartCount) {
      state.cartCount += cartCount
    },
    // 初始化购物出数量
    initCartCount(state, cartCount) {
      state.cartCount = cartCount
    }
  }
})
