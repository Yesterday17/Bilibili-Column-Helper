<template>
  <el-row>
    <el-col :span="12">
      <div class="editor-wrap">
        <codemirror v-model="code" :options="cmOption" @input="onCmCodeChange">{{code}}</codemirror>
      </div>
    </el-col>
    <el-col :span="12">
      <div class="preview-wrap">
        <div class="markdown-render">{{ rendered }}</div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
// Codemirror
import { codemirror } from 'vue-codemirror'
// Mode & Plugins
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
      this.$store.commit('SET_PASSAGE', {passage: text})
    }
  },
  computed: {
    rendered: function () {
      return this.code
    }
  },
  created () {
    this.code = this.$store.state.Passage.passage
  }
}
</script>

<style>
@import "~codemirror/addon/scroll/simplescrollbars.css";
@import "~codemirror/lib/codemirror.css";

.editor-wrap {
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