<template>
  <view class="search-box">
    <uni-search-bar
      :radius="100"
      cancelButton="none"
      placeholder="搜索"
      focus
      @input="input"></uni-search-bar>
    <view
      class="list-box"
      v-for="item in searchResults"
      :key="item.goods_id"
      @click="toDetail(item)">
      {{ item.goods_name }}
      <uni-icons type="arrowright" size="16"></uni-icons>
    </view>

    <view class="text-box" v-for="(item, index) in saveKeyWord" :key="index">
      <text @click="toDetail(item)">{{ item }}</text>
    </view>
    <button @click="cancelKeyWord" v-show="saveKeyWord.length > 0">
      清除搜索记录
    </button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      timer: null,
      keyword: '',
      searchResults: [],
      saveKeyWord: []
    }
  },
  onLoad(options) {
    this.saveKeyWord = JSON.parse(uni.getStorageSync('kw') || '[]')
  },
  methods: {
    input(e) {
      clearTimeout(this.timer)
      if (e.trim() === '') return (this.searchResults = [])
      this.timer = setTimeout(() => {
        this.keyword = e
        this.getSearchResultsList()
      }, 500)
    },
    async getSearchResultsList() {
      const { data: res } = await uni.$http.get(
        '/api/public/v1/goods/qsearch',
        { query: this.keyword }
      )
      if (res.meta.status !== 200) return uni.$showMsg()
      this.searchResults = res.message

      // 判断是否已经存在并且保存到本地
      if (this.saveKeyWord.indexOf(this.keyword) === -1) {
        this.saveKeyWord.push(this.keyword)
        this.saveKeyWord.reverse()
        uni.setStorageSync('kw', JSON.stringify(this.saveKeyWord))
      } else {
        return
      }
    },
    toDetail(item) {
      if (typeof item === 'object') {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
        })
      } else {
        uni.navigateTo({
          url: '/subpkg/goods_list/goods_list?cid=' + item
        })
      }
    },
    cancelKeyWord() {
      this.saveKeyWord = []
    }
  }
}
</script>

<style lang="scss">
.search-box {
  position: sticky;
  top: 0;
  z-index: 9999;
}
.list-box {
  padding: 10px;
  background-color: #fff;
  margin-bottom: 10px;
  border-radius: 10px;
  font-size: 14px;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: space-between;

  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all; //只对英文起作用，以字母作为换行依据
  word-wrap: break-word; //只对英文起作用，以单词作为换行依据
  overflow-wrap: break-word; //仅在无法将整个单词放在自己的行而不会溢出的情况下才会产生中断。
  white-space: pre-wrap; //对中英文作用，强制换行；
}
.text-box {
  margin: 5px;
  height: 30px;
  background-color: #c999;
  display: inline-block;
  text-align: center;
  line-height: 30px;
}
</style>
