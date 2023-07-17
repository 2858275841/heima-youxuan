<template>
  <view class="my-container">
    <template v-if="!token">
      <my-login></my-login>
    </template>
    <template v-else>
      <my-userinfo></my-userinfo>
    </template>
  </view>
</template>

<script>
import badgeMix from '../../mixins/tabbar-badge.js'
import { mapState } from 'vuex'

export default {
  mixins: [badgeMix],
  data() {
    return {}
  },
  computed: {
    ...mapState('m_address', ['token'])
  }
}
</script>

<style lang="scss">
.my-container {
  height: 100%;
}
</style>
