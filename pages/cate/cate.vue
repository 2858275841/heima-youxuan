<template>
  <view>
    <my-search @click="handerSearch"></my-search>
    <view class="scroll-view-container">
      <scroll-view class="lt-view-scroll" scroll-y style="height: 100vh">
        <view
          class="lt-view-scroll-item"
          :class="{ active: index == active }"
          v-for="(item, index) in cateList"
          :key="item.id"
          @click="handerActive(index)">
          {{ item.cat_name }}
        </view>
      </scroll-view>
      <scroll-view
        class="rt-view-scroll"
        scroll-y
        style="height: 100vh"
        :scroll-top="scrollTop">
        <view v-for="item in cateLevel2" :key="item.cat_id">
          <view class="cate-lv2-title">/ {{ item.cat_name }} /</view>
          <view class="cate-lv2-box">
            <view
              class="cate-lv2-item"
              v-for="level3 in item.children"
              :key="level3.cat_id"
              @click="goToGoodsList(level3)">
              <image :src="level3.cat_icon" />
              <text>{{ level3.cat_name }}</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      cateList: [],
      // 二级分类列表
      cateLevel2: [],
      // 滚动条距离顶部的距离
      scrollTop: 0
    }
  },
  onLoad() {
    this.getCateList()
  },
  methods: {
    async getCateList() {
      const { data: res } = await uni.$http.get('/api/public/v1/categories')
      if (res.meta.status !== 200) return uni.$showMsg()
      this.cateList = res.message
      this.cateLevel2 = res.message[0].children
    },
    handerActive(index) {
      this.active = index
      this.cateLevel2 = this.cateList[index].children
      this.scrollTop = this.scrollTop ? 0 : 1
    },
    goToGoodsList(item) {
      uni.navigateTo({
        url: '/subpkg/goods_list/goods_list?cid=' + item.cat_id
      })
    },
    handerSearch() {
      uni.navigateTo({
        url: '/subpkg/search/search'
      })
    }
  }
}
</script>

<style lang="scss">
.scroll-view-container {
  display: flex;

  .lt-view-scroll {
    width: 120px;

    .lt-view-scroll-item {
      background-color: #f7f7f7;
      line-height: 60px;
      text-align: center;
      font-size: 14px;
      border-bottom: 1px solid #efefef;
      position: relative;

      &.active {
        background-color: #ffffff;

        &::before {
          content: '';
          width: 3px;
          height: 30px;
          background-color: #c00000;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
  .rt-view-scroll {
    background-color: #ffffff;

    .cate-lv2-title {
      text-align: center;
      font-size: 14px;
      font-weight: 600;
      margin-top: 10px;
    }

    .cate-lv2-box {
      display: flex;
      flex-wrap: wrap;
      text-align: center;
      margin-top: 10px;

      .cate-lv2-item {
        width: 33.33%;
        margin-bottom: 10px;

        image {
          width: 90%;
          height: 90px;
        }
      }
    }
  }
}
</style>
