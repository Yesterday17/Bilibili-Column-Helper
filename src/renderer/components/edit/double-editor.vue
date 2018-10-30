<template>
  <div id="edit-double-body">
    <div id="edit-double-editor">
      <editor v-bind:text="text" v-on:update-text="updateText"></editor>
    </div>
    <div id="edit-double-preview">
      <preview v-bind:text="text"></preview>
    </div>
  </div>
</template>

<script>
import editor from './editor'
import preview from './preview'

export default {
  name: 'double-editor',
  components: {
    editor, preview
  },
  data () {
    return {
      text: ''
    }
  },
  methods: {
    updateText (src) {
      this.text = src
    },
    refreshText (name) {
      this.text = this.$store.state.columns.columnContent.get(name).local
    }
  },
  created () {
    this.refreshText(this.$route.params.name)
  },
  watch: {
    '$route' (to, from) {
      this.refreshText(to.params.name)
    }
  }
}
</script>

<style lang="scss">
@import "../../styles/colors.scss";

#edit-double-body {
  width: 100%;
  display: flex;
  padding: 20px;

  #edit-double-editor,
  #edit-double-preview {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    width: 50%;
    flex: 1;
  }

  #edit-double-editor {
    border-right: 1px solid $base-color;
  }

  #edit-double-preview {
    #edit-preview-html {
      margin: 0px;
    }
    border-left: 1px solid $base-color;
    padding: 5px 5px 5px 10px;
  }
}
</style>
