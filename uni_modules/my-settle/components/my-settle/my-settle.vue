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
          <button>结算({{ isCheckCart }})</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  data() {
    return {}
  },
  computed: {
    ...mapState('m_cart', ['cart']),
    ...mapGetters('m_cart', ['cartSum', 'isAllCheck', 'isCheckCart'])
  },
  methods: {
    ...mapMutations('m_cart', ['allCheck']),
    handerAllCheck() {
      this.allCheck()
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

    radio{
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
