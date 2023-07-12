<template>
  <view class="goods-list">
    <view v-for="item in goodsList" :key="item.goods_id">
      <my-goods
        ref="myGoods"
        :goods="item"
        :total="total"
        :queryObj="queryObj"
        @_onReachBottom="isPullDownAndPullUp"
        @_onPullDownRefresh="isPullDownAndPullUp"
        @click.native="gotoDetail(item)"></my-goods>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      queryObj: { query: '', cid: '', pagenum: 1, pagesize: 10 },
      goodsList: [],
      total: 11,
      isFlag: false
    }
  },
  onLoad(options) {
    this.queryObj.query = options.query || ''
    this.queryObj.cid = options.cid || ''
    this.getGoodsList()
  },
  onReachBottom() {
    // 0是上拉刷新
    this.$refs.myGoods[0].goodsPullDownAndPullUp(0)
  },
  onPullDownRefresh() {
    // 1是是下拉刷新
    this.$refs.myGoods[0].goodsPullDownAndPullUp(1)
  },
  methods: {
    async getGoodsList(downAndUp) {
      this.isFlag = true

      if ((this.queryObj.pagenum - 1) * this.queryObj.pagesize >= this.total) {
        this.isFlag = false
        return uni.$showMsg('没有更多数据了')
      }

      const { data: res } = await uni.$http.get(
        '/api/public/v1/goods/search',
        this.queryObj
      )
      if (res.meta.status !== 200) return uni.$showMsg()

      // downAndUp 1是下拉刷新 0是上拉刷新
      this.pullDownAndPullUp(res, downAndUp)
    },
    isPullDownAndPullUp(val, downAndUp) {
      this.queryObj = val
      if (this.isFlag) return
      // downAndUp 1是下拉刷新 0是上拉刷新
      downAndUp ? this.getGoodsList(1) : this.getGoodsList(0)
    },
    pullDownAndPullUp(res, downAndUp) {
      // downAndUp 1是下拉刷新 0是上拉刷新
      downAndUp
        ? (this.goodsList = [...res.message.goods, ...this.goodsList])
        : (this.goodsList = [...this.goodsList, ...res.message.goods])
      this.total = res.message.total
      uni.stopPullDownRefresh()
      this.isFlag = false
    },
    gotoDetail(item){
      uni.navigateTo({
        url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
      })
    }
  }
}
</script>

<style lang="scss"></style>
