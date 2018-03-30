<template>
  <div class="codemirror">
        <!-- codemirror -->
        <codemirror v-model="code" :options="cmOption"></codemirror>
      </div>
</template>


<script>
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/markdown/markdown'
import 'codemirror/addon/selection/active-line'

export default {
  data () {
    return {
      code: '1233',
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
