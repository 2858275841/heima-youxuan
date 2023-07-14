import Vue from 'vue'
import Vuex from 'vuex'
import cart from './modules/cart.js'
import address from './modules/address.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    m_cart: cart,
    m_address: address
  }
})

export default store
