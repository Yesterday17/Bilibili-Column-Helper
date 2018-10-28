<template>
  <div id="edit-body">
    <div id="edit-no-passage" v-if="this.passage === undefined">2333</div>
    <div id="edit-editor" v-else>{{this.passage}}</div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      passage: undefined
    }
  },
  watch: {
    '$route' (to, from) {
      this.passage = to.params.name
    }
  }
}
</script>

<style lang="scss">
#edit-body {
  #edit-no-passage {
    margin: 0 auto;
    text-align: center;
  }
}
</style>
