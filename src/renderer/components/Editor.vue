<template>
  <el-row>
    <el-col :span="12">
      <div class="editor-wrap">
        <codemirror v-model="code" :options="cmOption" @input="onCmCodeChange">{{code}}</codemirror>
      </div>
    </el-col>
    <el-col :span="12">
      <div class="preview-wrap">
        <div class="markdown-render" v-html="rendered"></div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { codemirror } from 'vue-codemirror'
// import marked from 'marked'
import biliZhuanLanMarkdown from 'bilibili-zhuanlan-markdown-tool'

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
      // return marked(this.code)
      return biliZhuanLanMarkdown.md2Html(this.code)
    }
  },
  created () {
    this.code = this.$store.state.Passage.passage.text
  }
}
</script>

<style>
@import "~codemirror/addon/scroll/simplescrollbars.css";
@import "~codemirror/lib/codemirror.css";

.editor-wrap {
  margin-top: 20px;
  height: 100%;
  width: 100%;
}

.preview-wrap {
  margin-left: 30px;
  margin-right: 15px;
  height: 100%;
  word-break: break-all;
}
.CodeMirror {
  border: 1px solid #ccc;
  height: auto;
  max-height: 100%;
}
.CodeMirror-scroll {
  height: auto;
  overflow-y: hidden;
  overflow-x: auto;
}
</style>