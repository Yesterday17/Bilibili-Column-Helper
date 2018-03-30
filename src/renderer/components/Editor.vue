<template>
  <div class="container-fluid">
    <button id="upcover" type="button" class="btn btn-primary">上传文件</button>
    <div class="row">
      <div class="col" style="min-width:50%">
        <div class="input-group">
          <codemirror v-model="code" :options="cmOption"></codemirror>
        </div>
      </div>
      <div class="col" style="max-width:50%">
        <div id="render-column">render-column</div>
      </div>
    </div>
  </div>
</template>

<script>
import { codemirror } from 'vue-codemirror'
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
        styleActiveLine: true,
        mode: 'markdown'
      }
    }
  }
}
</script>


<style>
@import "~bootstrap/dist/css/bootstrap.min.css";
</style>