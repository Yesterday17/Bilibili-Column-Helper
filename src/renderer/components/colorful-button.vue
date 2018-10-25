<template>
  <b-button variant="primary-lighter">{{contentText}}</b-button>
</template>

<script>
export default {
  name: 'colorful-button',
  props: {
    largeButton: {
      type: Boolean,
      required: false,
      default: true
    },
    contentText: {
      type: String,
      required: false,
      default: 'OK'
    }
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss">
</style>
