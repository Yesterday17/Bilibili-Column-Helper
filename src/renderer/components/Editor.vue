<template>
  <el-row class="full">
    <el-col class="full" :span="12">
      <div class="editor-wrap">
        <codemirror class="editor" v-model="code" :options="cmOption" @input="onCmCodeChange">{{code}}</codemirror>
      </div>
    </el-col>
    <el-col class="full" :span="12">
      <div class="preview-wrap">
        <div class="markdown-render" v-html="rendered"></div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { codemirror } from 'vue-codemirror'
import marked from 'marked'
// import biliZhuanLanMarkdown from 'bilibili-zhuanlan-markdown-tool'
import renderer from '../utils/renderer'

import 'codemirror/mode/markdown/markdown'
import 'codemirror/addon/selection/active-line'
import 'codemirror/addon/scroll/simplescrollbars.js'

// Theme
import 'codemirror/theme/mdn-like'

export default {
  components: {
    codemirror
  },
  data () {
    return {
      code: '',
      cmOption: {
        mode: 'markdown',
        theme: 'men-like',
        lineNumbers: true,
        line: true,
        styleActiveLine: true,
        lineWrapping: true,
        scrollbarStyle: 'overlay',
        viewportMargin: Infinity
      }
    }
  },
  methods: {
    onCmCodeChange: function (text) {
      this.$store.commit('SET_CONTENT', text)
    }
  },
  computed: {
    rendered: function () {
      marked.setOptions({
        renderer: renderer.getLocalRenderer()
      })
      return marked(this.code)
      // return biliZhuanLanMarkdown.md2Html(this.code, renderer.getRemoteRenderer())
    }
  },
  created () {
    this.code = this.$store.state.Passage.passage.text
    renderer.initialize()
  }
}
</script>

<style>
@import "~codemirror/addon/scroll/simplescrollbars.css";
@import "~codemirror/lib/codemirror.css";

.full {
  height: 100%;
}

.editor-wrap {
  margin-top: 1%;
  margin-bottom: 1%;
  height: 100%;
  width: 100%;
}

.preview-wrap {
  margin-top: 1%;
  margin-bottom: 1%;
  height: 100%;

  border: 1px solid #ccc;
  margin-left: 5px;

  max-height: 100%;
  overflow-x: hidden;
  word-break: break-all;
}

.editor {
  border: 1px solid #ccc;
  height: 100%;
}

.CodeMirror {
  height: 100%;
}

.CodeMirror-scroll {
  overflow-y: hidden;
  overflow-x: auto;
}

</style>