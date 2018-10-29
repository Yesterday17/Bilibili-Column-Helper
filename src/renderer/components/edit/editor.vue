<template>
  <div id="edit-editor-codemirror" class="full-height">
    <codemirror :v-model="code" :options="editorOptions"></codemirror>
  </div>
</template>

<script>
import 'codemirror/mode/markdown/markdown.js'
import 'codemirror/addon/scroll/simplescrollbars.js'
import 'codemirror/theme/lesser-dark.css'

export default {
  name: 'editor',
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
  }
}
</script>

<style lang="scss">
@import "../../styles/colors.scss";
@import "../../styles/editor-scrollbar.scss";
@import "~codemirror/lib/codemirror.css";

#edit-editor-codemirror {
  padding: 5px 10px 5px 5px;
  width: 100%;
  height: 100%;

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
