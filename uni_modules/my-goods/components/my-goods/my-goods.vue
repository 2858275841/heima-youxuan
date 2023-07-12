<template>
  <view class="goods-list-box">
    <view class="goods-list-item">
      <view class="goods-img">
        <image :src="goods.goods_big_logo || defaultImg" />
      </view>
      <view class="goods-info">
        <view class="goods-text">{{ goods.goods_name }}</view>
        <view class="goods-price">￥{{ goods.goods_price }}.00</view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  props: {
    queryObj: {
      type: Object,
      default: { query: '', cid: '', pagenum: 1, pagesize: 10 }
    },
    goods: {
      type: Object,
      default: {}
    },
    total: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      defaultImg:
        'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
    }
  },
  methods: {
    // 上拉刷新或下拉刷新
    goodsPullDownAndPullUp(downAndUp) {
      this.queryObj.pagenum++
      // downAndUp 1是下拉刷新 0是上拉刷新
      downAndUp
        ? this.$emit('_onPullDownRefresh', this.queryObj, 1)
        : this.$emit('_onReachBottom', this.queryObj, 0)
    }
  }
}
</script>
<style lang="scss">
.goods-list-box {
  display: flex;
  flex-wrap: wrap;

  .goods-list-item {
    width: 100%;
    display: flex;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;

    .goods-img {
      flex: 1;
      margin-right: 10px;
      image {
        width: 110px;
        height: 110px;
      }
    }
    .goods-info {
      font-size: 15px;
      position: relative;

      .goods-text {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      .goods-price {
        position: absolute;
        bottom: 20px;
        color: red;
      }
    }
  }
}
</style>
