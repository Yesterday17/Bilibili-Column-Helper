<template>
  <div id="edit-preview-html" v-html="html"></div>
</template>

<script>
import * as renderer from '../../utils/RendererFactory'

export default {
  name: 'preview',
  props: ['text'],
  data () {
    return {
    }
  },
  methods: {
    render (text) {
      return renderer.getRenderer({ module: this.$store.state.Config.config.renderer })(text)
    }
  },
  computed: {
    html () {
      return this.render(this.$route.matched[1].components.default.name === 'double-editor' ? this.text : this.$store.state.Passage.passageContent.get(this.$route.params.name).local)
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
