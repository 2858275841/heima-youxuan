<template>
  <view
    @click="handerClick"
    class="my-search-container"
    :style="{ backgroundColor: background }">
    <view class="my-search-box" :style="{ borderRadius: radius }">
      <uni-icons type="search" size="17"></uni-icons>
      <text class="placeholder">搜索</text>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {}
  },
  props: {
    background: {
      type: String,
      default: '#c00000'
    },
    radius: {
      type: String,
      default: '60rpx'
    }
  },
  methods: {
    handerClick() {
      this.$emit('click')
    }
  }
}
</script>
<style lang="scss">
.my-search-container {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-around;

  .my-search-box {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    width: 95%;
    height: 30px;

    uni-icons {
      margin-right: 5px;
    }
  }
}
</style>
