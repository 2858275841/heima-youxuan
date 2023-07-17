<template>
  <view class="login-container">
    <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
    <button type="primary" class="btn-login" @click="getUserProfile">
      一键登录
    </button>
    <view class="tips-text">登录后尽享更多权益</view>
  </view>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {}
  },
  computed: {
    ...mapState('m_address', ['redirectInfo'])
  },
  methods: {
    ...mapMutations('m_address', [
      'upDateUserInfo',
      'updateToken',
      'updateRedirectInfo',
      'updateRedirectInfo'
    ]),
    getUserProfile() {
      uni.getUserProfile({
        desc: '用于完善会员资料',
        success: res => {
          this.upDateUserInfo(res.userInfo)
          this.getToken(res)
        },
        fail: res => {
          return uni.$showMsg('您取消了登录授权')
        }
      })
    },
    async getToken(info) {
      const [err, res] = await uni.login().catch(err => err)
      if (err || res.errMsg !== 'login:ok') return uni.$showMsg('登录失败')
      const query = {
        code: res.code,
        encryptedData: info.encryptedData,
        iv: info.iv,
        rawData: info.rawData,
        signature: info.signature
      }
      const result = await uni.request({
        url: 'https://www.fastmock.site/mock/1479b8ee7fbb761269662b23b8f933fa/ssy/login',
        method: 'post',
        data: query
      })
      if (result[1].data.meta.status !== 200) return uni.$showMsg('登录失败')
      this.updateToken(result[1].data.message.token)
      
      uni.$showMsg('登录成功')
      this.navigateBack()
    },
    navigateBack() {
      if (this.redirectInfo && this.redirectInfo.openType === 'switchTab') {
        uni.switchTab({
          url: this.redirectInfo.from,
          complete: () => {
            this.updateRedirectInfo(null)
          }
        })
      }
    }
  }
}
</script>

<style lang="scss">
.login-container {
  display: flex;
  height: 750rpx;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f8f8f8;

  button {
    width: 90%;
    border-radius: 100px;
    background-color: #c00000;
    margin: 15px 0;
  }
  .tips-text {
    font-size: 12px;
    color: gray;
  }
}
</style>
