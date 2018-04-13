<template>
  <div>
    <button id="upcover" type="button" class="btn btn-primary">上传文件</button>
    <div class="codemirror">
      <codemirror v-model="code" :options="cmOption"></codemirror>
    </div>
  </div>
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
        styleActiveLine: true
      }
    }
  },
  mounted () {
    // Add code here.
  }
}
</script>


<style>
@import "~bootstrap/dist/css/bootstrap.min.css";
</style>