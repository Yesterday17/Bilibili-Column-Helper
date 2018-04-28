<template>
  <el-container>
    <el-header style="-webkit-app-region: drag">
      <el-button @click="windowMinimize" type="primary" icon="el-icon-minus"></el-button>
      <el-button @click="windowMaximize" type="primary" icon="el-icon-rank"></el-button>
      <el-button @click="windowClose" type="primary" icon="el-icon-close"></el-button>
    </el-header>

    <el-container>
      <el-aside width="20%">
        <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
          <el-menu-item index="1">
            <i class="el-icon-edit"></i>
            <span slot="title">Markdown 编辑器</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-setting"></i>
            <span slot="title">设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// Electron
import { remote } from 'electron'

let win = remote.getCurrentWindow()

export default {
  name: 'bilibili-column-helper',
  data () {
    return {
      // TODO: Add data here.
    }
  },
  methods: {
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
body {
  margin: 0;
}

.el-header {
  background-color: #409eff;
  height: 50px;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  justify-content: flex-end;
}
.el-header .el-button {
  size: "mini";
}

.el-aside {
  max-width: 250px;
  min-width: 150px;
}

button {
  -webkit-app-region: no-drag;
}
</style>
