<template>
  <div>
    <textarea id="markdown-input" class="form-control" aria-label="With textarea"></textarea>
  </div>
</template>

<script>
import CodeMirror from 'codemirror'
import marked from 'marked'
import renderer from '../utils/renderer';

let codeMirror = CodeMirror.fromTextArea(
  document.getElementById('markdown-input'),
  {
    lineNumbers: true,
    lineWrapping: true,
    styleActiveLine: true
  }
);

codeMirror.setSize('100%', '100%');
codeMirror.on('change', function (instance, obj) {
  let text = instance.getValue();
  let md = marked(text, {
      renderer: renderer.getLocalRenderer(),
      gfm: true,
      breaks: true,
      table: true
    });
  $('#render-column').replaceWith("<div id='render-column'>' + md + '</div>");
});

export default {};
</script>
