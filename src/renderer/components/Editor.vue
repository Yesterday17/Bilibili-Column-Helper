<template>
  <div class="full">
    <el-row class="title" :v-if="this.$store.state.Passage.passage.name == ''">
      正在编辑： {{this.$store.state.Passage.passage.name}}
    </el-row>
    <el-row class="content">
      <el-col class="full" :span="12">
        <div class="editor-wrap">
          <codemirror class="editor" v-model="code" :options="cmOption" @input="onCmCodeChange">{{code}}</codemirror>
        </div>
      </el-col>
      <el-col class="full" :span="12">
        <div class="preview-wrap">
          <div class="markdown-render" v-html="rendered"></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { codemirror } from 'vue-codemirror'
import { clipboard } from 'electron'
import marked from 'marked'
// import biliZhuanLanMarkdown from 'bilibili-zhuanlan-markdown-tool'
import renderer from '../utils/renderer'
import * as biliNetwork from '../utils/biliNetwork'

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
      cookies: undefined,
      cmOption: {
        mode: 'markdown',
        theme: 'men-like',
        lineNumbers: true,
        line: true,
        styleActiveLine: true,
        lineWrapping: true,
        scrollbarStyle: 'overlay',
        viewportMargin: Infinity,
        extraKeys: {
          'Ctrl-V': async (cm) => {
            let paste, doc = cm.getDoc(), cursor = doc.getCursor()
            const isImage = clipboard.readImage().getBitmap().byteLength !== 0

            if (isImage) {
              paste = 'data:image/png;base64,' + clipboard.readImage().toPNG().toString('base64')
              const result = await biliNetwork.upcover(paste, this.cookies)
              if (result['code'] !== 0) {
                paste = ''
              } else {
                paste = `![](${result['data']['url']})\n`
              }
            } else {
              paste = clipboard.readText()
            }
            doc.replaceRange(paste, cursor)
          }
        }
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
      marked.setOptions({
        renderer: renderer.getLocalRenderer()
      })
      return marked(this.code)
      // return biliZhuanLanMarkdown.md2Html(this.code, renderer.getRemoteRenderer())
    }
  },
  created () {
    this.code = this.$store.state.Passage.passage.text
    this.cookies = this.$store.state.Config.config.cookie
    renderer.initialize()
  }
}
</script>

<style>
@import "~codemirror/addon/scroll/simplescrollbars.css";
@import "~codemirror/lib/codemirror.css";

.full {
  height: 100%;
}

.title {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: 14px;
  height: 3%;
}

.content {
  height: 97%;
}

.editor-wrap {
  margin-top: 1%;
  margin-bottom: 1%;
  height: 100%;
  width: 100%;
}

.preview-wrap {
  margin-top: 1%;
  margin-bottom: 1%;
  height: 100%;

  border: 1px solid #ccc;
  margin-left: 5px;

  max-height: 100%;
  overflow-x: hidden;
  word-break: break-all;
}

.editor {
  border: 1px solid #ccc;
  height: 100%;
}

.CodeMirror {
  height: 100%;
}

.CodeMirror-scroll {
  overflow-y: hidden;
  overflow-x: auto;
}
</style>