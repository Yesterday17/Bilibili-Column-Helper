<template>
  <div id="edit-preview-html" v-html="previewHTML"></div>
</template>

<script>
import * as renderer from '../../utils/RendererFactory'

export default {
  name: 'preview',
  data () {
    return {
      previewHTML: ''
    }
  },
  methods: {
    render (passage) {
      return renderer.getRenderer({ module: this.$store.state.Config.config.renderer })(this.$store.state.Passage.passageContent.get(passage).local)
    }
  },
  created () {
    this.previewHTML = this.render(this.$route.params.name)
  },
  watch: {
    '$route' (to, from) {
      this.previewHTML = this.render(to.params.name)
    }
  }
}
</script>

<style lang="scss">
@import "../../styles/colors.scss";

#edit-preview-html {
  width: 100%;
  margin: 10px 0 0 10px;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  &::-webkit-scrollbar-track {
    background: $base-color-d1;
  }

  &::-webkit-scrollbar-thumb {
    background: $base-color-l1;
  }
}
</style>
