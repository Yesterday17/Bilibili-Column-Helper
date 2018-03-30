<template>
<div class="container-fluid">
    <button id="upcover" type="button" class="btn btn-primary">上传文件</button>
    <div class="row">
      <div class="col" style="min-width:50%">
        <div class="input-group">
          <code-mirror></code-mirror>
        </div>
      </div>
      <div class="col" style="max-width:50%">
        <div id="render-column">render-column</div>
      </div>
    </div>
  </div>
</template>

<script>
import CodeMirror from './Editor/Codemirror'

export default {
  components: { CodeMirror }
}
</script>


<style>
@import "~bootstrap/dist/css/bootstrap.min.css";
</style>