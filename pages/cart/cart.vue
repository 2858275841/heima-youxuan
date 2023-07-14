<template>
  <view>
    <view style="padding-bottom: 70rpx" v-if="cart.length !== 0">
      <my-address></my-address>
      <!-- 购物车商品列表的标题区域 -->
      <view class="cart-title">
        <!-- 左侧的图标 -->
        <uni-icons type="shop" size="18"></uni-icons>
        <!-- 描述文本 -->
        <text class="cart-title-text">购物车</text>
      </view>
      <uni-swipe-action>
        <uni-swipe-action-item
          v-for="(item, index) in cart"
          :key="index"
          :right-options="options2"
          @click="delCart(item)">
          <my-goods ref="myGoods" :goods="item" radio showNum></my-goods>
        </uni-swipe-action-item>
      </uni-swipe-action>
      <my-settle></my-settle>
    </view>
    <!-- 空白购物车区域 -->
    <view class="empty-cart" v-else>
      <image src="../../static/cart_empty@2x.png" class="empty-img"></image>
      <text class="tip-text">空空如也~</text>
    </view>
  </view>
</template>

<script>
import badgeMix from '../../mixins/tabbar-badge.js'
import { mapState } from 'vuex'

export default {
  mixins: [badgeMix],
  data() {
    return {
      options2: [
        {
          text: '删除',
          style: {
            backgroundColor: '#c00000'
          }
        }
      ]
    }
  },
  computed: {
    ...mapState('m_cart', ['cart'])
  },
  methods: {
    delCart(goods) {
      this.$refs.myGoods[0].delCart(goods)
    }
  }
}
</script>

<style lang="scss">
.cart-title {
  height: 40px;
  display: flex;
  align-items: center;
  font-size: 14px;
  padding-left: 5px;
  border-bottom: 1px solid #efefef;
  .cart-title-text {
    margin-left: 10px;
  }
}
.uni-swipe_button-group {
  height: 110px;
}
.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;

  .empty-img {
    width: 90px;
    height: 90px;
  }

  .tip-text {
    font-size: 12px;
    color: gray;
    margin-top: 15px;
  }
}
</style>
