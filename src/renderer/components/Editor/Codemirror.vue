<template>
  <div>
    <textarea v-model="message" id="markdown-input" class="form-control" aria-label="With textarea"></textarea>
  </div>
</template>

<script>
import CodeMirror from 'codemirror/lib/codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'

import marked from 'marked'
import renderer from '../../utils/renderer'

let codeMirror = CodeMirror.fromTextArea(
  document.getElementById('markdown-input'),
  {
    lineNumbers: true,
    lineWrapping: true,
    styleActiveLine: true
  }
)

codeMirror.setSize('100%', '100%')
codeMirror.on('change', function (instance, obj) {
  let text = instance.getValue()
  let md = marked(text, {
    renderer: renderer.getLocalRenderer(),
    gfm: true,
    breaks: true,
    table: true
  })
  console.log(md)
  // $('#render-column').replaceWith('<div id="render-column">' + md + '</div>')
})

export default {
  el: '#markdown-input',
  data: {
    message: ''
  },
  watch: {
    message: function (newMessage, oldMessage) {
      //
    }
  }
}
</script>
