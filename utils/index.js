import { $http } from '@escook/request-miniprogram'

uni.$http = $http
$http.baseUrl = 'https://api-hmugo-web.itheima.net'
$http.beforeRequest = function (options) {
  uni.showLoading({
    title: '加载中...'
  })
}
$http.afterRequest = function () {
  uni.hideLoading()
}
uni.$showMsg = function (title = '数据加载失败！', duration = 1500) {
  uni.showToast({
    title,
    duration,
    icon: 'none'
  })
}
export default uni