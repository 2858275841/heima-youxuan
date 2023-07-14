export default {
  namespaced: 'true',

  state: () => ({
    cart: JSON.parse(uni.getStorageSync('cart') || '[]')
  }),

  mutations: {
    addCart(state, goods) {
      const res = state.cart.find(item => item.goods_id === goods.goods_id)
      if (res) {
        res.goods_count += 1
      } else {
        state.cart.push(goods)
      }
      this.commit('m_cart/saveCart')
    },
    saveCart(state) {
      wx.setStorageSync('cart', JSON.stringify(state.cart))
    },
    updateRadio(state, goods) {
      const res = state.cart.find(item => item.goods_id === goods.goods_id)
      res.goods_state = !goods.goods_state
      this.commit('m_cart/saveCart')
    },
    upDataNum(state, goods) {
      const res = state.cart.find(item => item.goods_id === goods.goods_id)
      res.goods_count = goods.goods_count
      this.commit('m_cart/saveCart')
    },
    delCartShop(state, goods) {
      state.cart = state.cart.filter(item => item.goods_id !== goods.goods_id)
      this.commit('m_cart/saveCart')
    },
    allCheck(state) {
      const res = state.cart.every(item => item.goods_state === true)
      state.cart.forEach(item => {
        res ? (item.goods_state = false) : (item.goods_state = true)
      })
      this.commit('m_cart/saveCart')
    }
  },

  getters: {
    total(state) {
      return state.cart.reduce((sum, item) => {
        return sum + item.goods_count
      }, 0)
    },
    cartSum(state) {
      return state.cart
        .filter(item => item.goods_state === true)
        .reduce((sum, item) => {
          return (sum += item.goods_count * item.goods_price)
        }, 0)
    },
    isAllCheck(state) {
      return state.cart.every(item => item.goods_state === true)
    },
    isCheckCart(state) {
      return state.cart.filter(item => item.goods_state === true).length
    }
  }
}
