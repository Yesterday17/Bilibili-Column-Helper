<template>
  <b-button :variant="varient">{{contentText}}</b-button>
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
    },
    varient: {
      type: String,
      required: false,
      default: 'primary'
    }
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss">
</style>
