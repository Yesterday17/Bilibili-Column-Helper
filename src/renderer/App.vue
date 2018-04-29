<template>
  <el-container>
    <el-header style="-webkit-app-region: drag">
      <el-row>
        <el-col :span="8">
          <img src="./assets/icon.png" />
        </el-col>
        <el-col :span="8">
          <el-button @click="windowMinimize" type="primary" icon="el-icon-minus"></el-button>
          <el-button @click="windowMaximize" type="primary" icon="el-icon-rank"></el-button>
          <el-button @click="windowClose" type="primary" icon="el-icon-close"></el-button>
        </el-col>
      </el-row>
    </el-header>

    <el-container>
      <el-aside width="20%">
        <el-menu default-active="2">
          <el-menu-item index="1" @click="tab(1)">
            <i class="el-icon-document"></i>
            <span slot="title">专栏管理</span>
          </el-menu-item>
          <el-menu-item index="2" @click="tab(2)">
            <i class="el-icon-edit"></i>
            <span slot="title">Markdown 编辑器</span>
          </el-menu-item>
          <el-menu-item index="3" @click="tab(3)">
            <i class="el-icon-setting"></i>
            <span slot="title">设置</span>
          </el-menu-item>
          <el-menu-item index="4" @click="tab(4)">
            <i class="el-icon-info"></i>
            <span slot="title">关于</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
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
      page: 2,
      pages: [
        'passages',
        'editor',
        'setting',
        'about'
      ]
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
    },
    tab: function (i) {
      if (i !== this.page) {
        this.$router.push(`/${this.pages[i - 1]}`)
        this.page = i
      }
    }
  }
}
</script>

<style>
html {
  height: 100%;
  width: 100%;
  overflow: hidden;
}

body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

.el-container {
  height: 100%;
  width: 100%;
}

.el-main {
  height: 100%;
  width: 100%;
  padding-top: 5px;
}

.el-header {
  background-color: #409eff;
  height: 50px;
  margin-bottom: 10px;
  display: flex;
  display: -webkit-flex;
  align-items: center;
}

.el-header .el-row {
  display: flex;
  display: -webkit-flex;
  align-items: center;
}

.el-header .el-row .el-col {
  display: flex;
  display: -webkit-flex;
  align-items: center;
}

.el-aside {
  max-width: 250px;
  min-width: 150px;
  border-right: 1px grey;
}

button {
  -webkit-app-region: no-drag;
}
</style>
