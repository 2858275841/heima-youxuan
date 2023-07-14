export default {
  namespaced: true,

  state: () => ({
    address: JSON.parse(uni.getStorageSync('address') || '{}')
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
