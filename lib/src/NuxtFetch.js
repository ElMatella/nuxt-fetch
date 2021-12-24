module.exports = {
  props: {
    fetchFn: {
      required: true,
      type: Function
    },
    fetchKey: {
      required: false,
      type: String,
      default: undefined
    }
  },
  data () {
    return {
      result: null,
      error: null
    }
  },
  async fetch () {
    this.error = null
    try {
      this.result = await this.fetchFn()
    } catch (error) {
      if (error instanceof Error) {
        this.error = JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(err)))
      } else {
        this.error = error
      }
    }
  },
  fetchKey () {
    return this.fetchKey
  },
  render (h) {
    if (this.result === null && this.$fetchState.pending) {
      return this.$slots.fetching
    } else if (this.result === null && this.error) {
      return this.$scopedSlots.error({
        error: this.error
      })
    } else if (this.$scopedSlots.default) {
      return this.$scopedSlots.default({
        data: this.result,
        fetching: this.$fetchState.pending,
        error: this.error
      })
    } else if (this.$slots.refetching) {
      return this.$slots.refetching
    }
    return h('')
  }
}
