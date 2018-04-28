<template>
  <!--
  <div>
    <button id="upcover" type="button" class="btn btn-primary">上传文件</button>
  </div>
-->

  <el-container>
    <el-header style="-webkit-app-region: drag">
      <!-- 注意这里float的反向绘制 -->
      <el-button @click="windowClose" type="primary" icon="el-icon-close"></el-button>
      <el-button @click="windowMaximize" type="primary" icon="el-icon-rank"></el-button>
      <el-button @click="windowMinimize" type="primary" icon="el-icon-minus"></el-button>
    </el-header>
    <el-container>
      <el-aside width="20%">
        <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
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
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// Codemirror
import { codemirror } from 'vue-codemirror'
// Mode & Plugins
import 'codemirror/mode/markdown/markdown'
import 'codemirror/addon/selection/active-line'
// Theme
import 'codemirror/theme/material'
// Electron
import { remote } from 'electron'

let win = remote.getCurrentWindow()

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
    },
    windowMinimize: function () {
      win.minimize()
    },
    windowMaximize: function () {
      if (win.isMaximized()) {
        win.unmaximize()
      } else {
        win.maximize()
      }
    },
    windowClose: function () {
      win.close()
    }
  }
}
</script>


<style>
@import "~bootstrap/dist/css/bootstrap.min.css";

.el-header {
  background-color: #409eff;
  height: 50px;
  position: relative;
}
.el-header .el-button {
  float: right;
  size: "mini";
}

button {
  -webkit-app-region: no-drag;
}
</style>