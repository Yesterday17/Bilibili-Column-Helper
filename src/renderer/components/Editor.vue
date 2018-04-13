<template>
  <div>
    <button id="upcover" type="button" class="btn btn-primary">上传文件</button>
    <div class="codemirror">
      <codemirror v-model="code" :options="cmOption"></codemirror>
    </div>
  </div>
</template>

<script>
import { codemirror } from 'vue-codemirror'
import 'codemirror/theme/material'
import 'codemirror/mode/markdown/markdown'
import 'codemirror/addon/selection/active-line'

export default {
  components: {
    codemirror
  },
  data () {
    return {
      code: '',
      cmOption: {
        lineNumbers: true,
        lineWrapping: true,
        line: true,
        styleActiveLine: true,
        mode: 'markdown',
        theme: 'material'
      }
    }
  }
}
</script>


<style>
@import "~bootstrap/dist/css/bootstrap.min.css";
</style>