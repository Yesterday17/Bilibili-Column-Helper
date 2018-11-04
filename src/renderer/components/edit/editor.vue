<template>
  <div id="edit-editor-codemirror" class="h-100 w-100">
    <codemirror v-model="code" :options="editorOptions" @changes="saveChange"></codemirror>
  </div>
</template>

<script>
import 'codemirror/mode/markdown/markdown.js'
import 'codemirror/addon/scroll/simplescrollbars.js'
import 'codemirror/theme/lesser-dark.css'

export default {
  name: 'editor',
  props: ['text'],
  data () {
    return {
      code: '',
      editorOptions: {
        tabSize: 4,
        styleActiveLine: true,
        lineNumbers: true,
        lineWrapping: true,
        autofocus: true,
        line: true,
        workTime: 100,
        workDelay: 100,
        mode: 'text/x-markdown',
        theme: 'lesser-dark',
        scrollbarStyle: 'simple'
      }
    }
  },
  methods: {
    saveChange (instance, changes) {
      this.$emit('update-text', this.code)
      this.$store.commit('SAVE_COLUMN', {
        name: this.$route.params.name,
        text: this.code
      })
    }
  },
  created () {
    this.code = this.text
  },
  watch: {
    'text' (to, from) {
      this.code = this.text
    }
  }
}
</script>

<style lang="scss">
@import "../../styles/colors.scss";
@import "../../styles/editor-scrollbar.scss";
@import "~codemirror/lib/codemirror.css";

#edit-editor-codemirror {
  padding: 5px 10px 5px 5px;

  .vue-codemirror {
    width: 100%;
    height: 100%;
  }

  .CodeMirror {
    min-width: 100%;
    min-height: 100%;
  }

  .codeArea {
    height: 100%;
  }
}
</style>
