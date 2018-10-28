<template>
  <div v-html="previewHTML"></div>
</template>

<script>
export default {
  data () {
    return {
      previewHTML: ''
    }
  },
  created () {
    this.previewHTML = this.$store.state.Passage.passageContent.get(this.$route.params.name).local
  },
  watch: {
    '$route' (to, from) {
      this.previewHTML = this.$store.state.Passage.passageContent.get(to.params.name).local
    }
  }
}
</script>

<style lang="scss">
</style>
