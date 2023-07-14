<template>
  <view>
    <template v-if="JSON.stringify(address) === '{}'">
      <view class="address-choose-box">
        <view class="address-choose-title" @click="chooseAddress">
          请选择收货地址+
        </view>
      </view>
    </template>

    <template v-else>
      <view class="address-info-box" @click="chooseAddress">
        <view class="info-1">
          <text>收货人: {{ addressNameAndPhone[0] }}</text>
          <text>电话: {{ addressNameAndPhone[1] }} ></text>
        </view>
        <view class="info-2">
          <text>收货地址: {{ addressInfo }}</text>
        </view>
      </view>
    </template>

    <image
      class="address-border"
      src="../../../../static/cart_border@2x.png"
      mode="widthFix" />
  </view>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
  data() {
    return {
      addressList: {}
    }
  },
  computed: {
    ...mapState('m_address', ['address']),
    ...mapGetters('m_address', ['addressInfo', 'addressNameAndPhone'])
  },
  methods: {
    ...mapMutations('m_address', ['updateAddress']),
    chooseAddress() {
      this.updateAddress()
    }
  }
}
</script>

<style lang="scss">
.address-border {
  width: 100%;
}
.address-choose-box {
  width: 100%;
  height: 160rpx;
  display: flex;
  justify-content: center;
  align-items: center;

  .address-choose-title {
    width: 330rpx;
    height: 80rpx;
    background-color: green;
    text-align: center;
    color: white;
    line-height: 80rpx;
    border-radius: 20rpx;
    font-size: 14px;
  }
}
.address-info-box {
  width: 95%;
  height: 100%;
  margin: auto;
  font-size: 28rpx;

  .info-1 {
    display: flex;
    justify-content: space-between;
    margin-top: 20rpx;
  }
  .info-2 {
    margin: 20rpx 0;
  }
}
</style>
