<template>
  <view>
    <view class="search-box">
      <my-search @click="goSearch"></my-search>
    </view>
    <!-- 轮播图 -->
    <swiper
      class="swiper"
      :indicator-dots="true"
      :autoplay="true"
      :circular="true">
      <swiper-item v-for="item in swiperList" :key="item.goods_id">
        <navigator
          class=".swiper-item"
          :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id"
          :open-type="item.open_type">
          <image :src="item.image_src" mode="widthFix" />
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 分类导航 -->
    <view class="nav">
      <view
        class="nav-item"
        v-for="(item, index) in navList"
        :key="index"
        @click="navClickHandler(item)">
        <image :src="item.image_src" mode="widthFix" />
      </view>
    </view>
    <!-- 楼层 -->
    <view class="floor" v-for="(item, index) in floorList" :key="index">
      <view class="floor-title">{{ item.floor_title.name }}</view>
      <view class="floor-img-box">
        <navigator
          :url="
            '/subpkg/goods_list/goods_list?' +
            item.product_list[0].navigator_url
          "
          class="lt-img-box">
          <image :src="item.product_list[0].image_src" />
        </navigator>

        <view class="rt-img-box">
          <navigator
            :url="'/subpkg/goods_list/goods_list?' + i.navigator_url"
            class="rg-img-item"
            v-for="(i, index) in item.product_list"
            :key="index"
            v-show="index !== 0">
            <image :src="i.image_src" />
          </navigator>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import badgeMix from '../../mixins/tabbar-badge.js'

export default {
  mixins: [badgeMix],
  data() {
    return {
      swiperList: [],
      navList: [],
      floorList: []
    }
  },
  onLoad(options) {
    this.getSwiperList()
    this.getNavList()
    this.getFloorList()
  },
  methods: {
    async getSwiperList() {
      const { data: res } = await uni.$http.get(
        '/api/public/v1/home/swiperdata'
      )
      if (res.meta.status === !200) return uni.$showMsg()
      this.swiperList = res.message
    },
    async getNavList() {
      const { data: res } = await uni.$http.get('/api/public/v1/home/catitems')
      if (res.meta.status === !200) return uni.$showMsg()
      this.navList = res.message
    },
    navClickHandler(item) {
      if (item.name === '分类') {
        uni.switchTab({
          url: '/pages/cate/cate'
        })
      }
    },
    async getFloorList() {
      const { data: res } = await uni.$http.get('/api/public/v1/home/floordata')
      if (res.meta.status !== 200) return uni.$showMsg()
      res.message.forEach(item => {
        item.product_list.forEach(i => {
          i.navigator_url = i.navigator_url.split('?')[1]
        })
      })
      this.floorList = res.message
    },
    goSearch() {
      uni.navigateTo({
        url: '/subpkg/search/search'
      })
    }
  }
}
</script>

<style lang="scss">
.swiper {
  height: 330rpx;
  .swiper-item {
    image {
      width: 100%;
      height: 100%;
    }
  }
}
.nav {
  display: flex;
  justify-content: space-around;
  margin-top: 10rpx;
  .nav-item {
    width: 20%;
    height: 200rpx;
    image {
      width: 100%;
    }
  }
}
.floor {
  .floor-title {
    margin-left: 20rpx;
  }
  .floor-img-box {
    display: flex;
    justify-content: space-around;
    .lt-img-box {
      width: 380rpx;
      height: 420rpx;
      margin-left: 20rpx;
      image {
        width: 100%;
        height: 100%;
      }
    }
    .rt-img-box {
      display: flex;
      flex-wrap: wrap;
      .rg-img-item {
        width: 240rpx;
        margin-left: 20rpx;
        margin-bottom: 10rpx;
        image {
          width: 100%;
          height: 200rpx;
        }
      }
    }
  }
}
.search-box {
  position: sticky;
  top: 0;
  z-index: 999;
}
</style>
