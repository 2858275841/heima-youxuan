<template>
  <view class="detail-box">
    <swiper class="swiper" indicator-dots autoplay circular>
      <swiper-item v-for="item in goodsDetailList.pics" :key="item.pics_id">
        <image :src="item.pics_big" @click="preview(goodsDetailList.pics)" />
      </swiper-item>
    </swiper>
    <view class="detail-info">
      <view class="detail-price" v-if="goodsDetailList.goods_price">
        <text>￥{{ goodsDetailList.goods_price }}.00</text>
      </view>
      <view class="detail-info-item">
        <view class="detail-title">{{ goodsDetailList.goods_name }}</view>
        <view class="detail-enshrine">
          <uni-icons type="star" size="28"></uni-icons>
          <view>收藏</view>
        </view>
      </view>
      <view class="detail-subtitle">快递:免运费</view>
      <view>
        <rich-text :nodes="goodsDetailList.goods_introduce"></rich-text>
      </view>
    </view>
    <view class="goods-carts">
      <uni-goods-nav
        :options="options"
        :fill="true"
        :button-group="buttonGroup"
        @click="onClick"
        @buttonClick="buttonClick" />
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      goods_id: '',
      goodsDetailList: {},
      options: [
        {
          icon: 'chat',
          text: '客服'
        },
        {
          icon: 'shop',
          text: '店铺',
          info: 2,
          infoBackgroundColor: '#007aff',
          infoColor: '#f5f5f5'
        },
        {
          icon: 'cart',
          text: '购物车',
          info: 2
        }
      ],
      buttonGroup: [
        {
          text: '加入购物车',
          backgroundColor: 'linear-gradient(90deg, #FFCD1E, #FF8A18)',
          color: '#fff'
        },
        {
          text: '立即购买',
          backgroundColor: 'linear-gradient(90deg, #FE6035, #EF1224)',
          color: '#fff'
        }
      ]
    }
  },
  onLoad(options) {
    this.goods_id = options.goods_id
    this.getGoodsDetailList()
  },
  methods: {
    async getGoodsDetailList() {
      const { data: res } = await uni.$http.get('/api/public/v1/goods/detail', {
        goods_id: this.goods_id
      })
      if (res.meta.status !== 200) return uni.$showMsg()
      res.message.goods_introduce = res.message.goods_introduce.replace(
        /<img /g,
        '<img style="display: block;"'
      )
      this.goodsDetailList = res.message
    },
    preview(img) {
      uni.previewImage({
        urls: img.map(item => item.pics_big)
      })
    },
    onClick(e) {
      if (e.content.text === '购物车') uni.switchTab({ url: '/pages/cart/cart' })
    }
  }
}
</script>

<style lang="scss">
.detail-box {
  padding-bottom: 50px;

  .swiper {
    width: 100%;
    height: 600rpx;

    swiper-item {
      image {
        width: 100%;
        height: 100%;
      }
    }
  }
  .detail-price {
    margin: 15px 0;

    text {
      color: red;
      font-size: 20px;
    }
  }
  .detail-info-item {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 10px;

    .detail-title {
      flex: 0.9;
      font-size: 13.5px;
      font-weight: 600;
      border-right: 1px solid #888;
      padding-right: 5px;

      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }

    .detail-enshrine {
      font-size: 13px;
    }
  }
  .detail-subtitle {
    font-size: 13px;
    color: #888;
    margin-left: 10px;
    margin-bottom: 15px;
  }
}
.goods-carts {
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  right: 0;
  left: var(--window-left);
  right: var(--window-right);
  bottom: 0;
}
</style>
