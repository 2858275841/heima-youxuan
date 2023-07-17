<template>
  <view>
    <view class="settle-box">
      <view class="settle-item">
        <radio color="#C00000" :checked="isAllCheck" @click="handerAllCheck">
          全选
        </radio>
        <text>
          合计:¥
          <text style="color: #c00000">{{ cartSum }}.00</text>
        </text>
        <view class="settle-button">
          <button @click="settlement">结算({{ isCheckCart }})</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  data() {
    return {
      // 倒计时的秒数
      seconds: 3,
      // 定时器的 Id
      timer: null
    }
  },
  computed: {
    ...mapState('m_cart', ['cart']),
    ...mapState('m_address', ['token']),
    ...mapGetters('m_cart', ['cartSum', 'isAllCheck', 'isCheckCart'])
  },
  methods: {
    ...mapMutations('m_cart', ['allCheck']),
    ...mapMutations('m_address', ['updateRedirectInfo']),
    handerAllCheck() {
      this.allCheck()
    },
    settlement() {
      if (!this.isAllCheck) return uni.$showMsg('请选择商品')
      if (!uni.getStorageSync('address')) return uni.$showMsg('请选择收货地址')
      if (!this.token) return this.delayNavigate()
    },
    showTips(n) {
      uni.showToast({
        title: '请登录后再结算！' + n + ' 秒后自动跳转到登录页',
        icon: 'none',
        mask: true,
        duration: 1500
      })
    },
    delayNavigate() {
      this.seconds = 3

      this.showTips(this.seconds)
      this.timer = setInterval(() => {
        this.seconds--
        if (this.seconds <= 0) {
          clearInterval(this.timer)
          uni.switchTab({
            url: '/pages/my/my',
            success: () => {
              this.updateRedirectInfo({
                openType: 'switchTab',
                from: '/pages/cart/cart'
              })
            }
          })
          return
        }
        this.showTips(this.seconds)
      }, 1000)
    }
  }
}
</script>

<style lang="scss">
.settle-box {
  width: 100%;
  height: 100rpx;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  z-index: 999;

  .settle-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;

    radio {
      margin-left: 10rpx;
    }

    .settle-button {
      width: 200rpx;

      button {
        color: white;
        background-color: #c00000;
        font-size: 28rpx;
        margin-right: 10rpx;
      }
    }
  }
}
</style>
