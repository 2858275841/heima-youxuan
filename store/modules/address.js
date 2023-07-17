export default {
  namespaced: true,

  state: () => ({
    address: JSON.parse(uni.getStorageSync('address') || '{}'),
    token: uni.getStorageSync('token') || '',
    userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}'),
    // 重定向的 object 对象 { openType, from }
    redirectInfo: null
  }),

  mutations: {
    async updateAddress(state) {
      const [err, succ] = await uni.chooseAddress().catch(err => err)
      if (err === null && succ.errMsg === 'chooseAddress:ok') {
        state.address = succ
        this.commit('m_address/saveAddress')
      }
      if (err.errMsg === 'chooseAddress:cancel') {
        uni.$showMsg('取消选择地址')
      }
    },
    saveAddress(state) {
      uni.setStorageSync('address', JSON.stringify(state.address))
    },
    upDateUserInfo(state, userinfo) {
      state.userinfo = userinfo
      this.commit('m_address/saveUserInfo')
    },
    saveUserInfo(state) {
      uni.setStorageSync('userinfo', JSON.stringify(state.userinfo))
    },
    updateToken(state, token) {
      state.token = token
      this.commit('m_address/saveToken')
    },
    saveToken(state) {
      uni.setStorageSync('token', state.token)
    },
    // 更新重定向的信息对象
    updateRedirectInfo(state, info) {
      state.redirectInfo = info
    }
  },

  getters: {
    addressInfo(state) {
      return (
        state.address.provinceName +
        state.address.cityName +
        state.address.countyName +
        state.address.detailInfo
      )
    },
    addressNameAndPhone(state) {
      return [state.address.userName, state.address.telNumber]
    }
  }
}
