<template>
  <el-row>
    <el-col :span="12">
      <div class="preview-wrap">
        <codemirror v-model="code" :options="cmOption" @input="onCmCodeChange"></codemirror>
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
// Theme
import 'codemirror/theme/material'

export default {
  components: {
    codemirror
  },
  data () {
    return {
      code: '',
      cmOption: {
        mode: 'markdown',
        theme: 'material',
        lineNumbers: true,
        line: true,
        styleActiveLine: true,
        wrapLine: true
      },
      rendered: '',
      win: {}
    }
  },
  methods: {
    onCmCodeChange: function (newCode) {
      this.rendered = newCode
      console.log(newCode)
    }
  }
}
</script>

<style>

</style>