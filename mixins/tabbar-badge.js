import { mapGetters } from 'vuex'

export default {
  data() {
    return {}
  },
  watch: {
    total() {
      this.setBadge()
    }
  },
  onShow() {
    this.setBadge()
  },
  computed: {
    ...mapGetters('m_cart', ['total'])
  },
  methods: {
    setBadge() {
      if (this.total <= 0) return
      uni.setTabBarBadge({
        index: 2,
        text: this.total + ''
      })
    }
  }
}
