<template>
  <el-container class="main-container">
    <el-header>
      <el-row class="title-row">
        <el-col :span="15" class="program-logo">
          <div class="program-icon">
            <img v-bind:src="icon" />
          </div>
          <div class="program-title">
            <a>哔哩哔哩专栏助手</a>
          </div>
        </el-col>
        <el-col class="program-control" :span="9">
          <el-button class="btncontrol" @click="windowMinimize" type="primary" icon="el-icon-minus"></el-button>
          <el-button class="btncontrol" @click="windowMaximize" type="primary" icon="el-icon-rank"></el-button>
          <el-button class="btncontrol" @click="windowClose" type="primary" icon="el-icon-close"></el-button>
        </el-col>
      </el-row>
    </el-header>

    <el-container class="main-container">
      <el-aside width="20%" class="main-aside">
        <el-menu class="main-container" :default-active="page.toString()">
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
      <el-container class="main-container">
        <el-main class="main-container">
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
      pages: [
        'passages',
        'editor',
        'setting',
        'about'
      ],
      icon: 'static/logo.png'
    }
  },
  computed: {
    page: {
      set (value) {
        this.$store.commit('SET_PAGE', value)
      },
      get () {
        return this.$store.state.Running.page
      }
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
  },
  created () {
    this.$store.commit('LOAD_CONFIG')
    this.$store.commit('SAVE_CONFIG')

    this.$store.commit('LOAD_SYNC_CONFIG')
    this.$store.commit('SAVE_SYNC_CONFIG')

    this.$store.commit('LOAD_PASSAGES')
    this.$store.commit('SAVE_PASSAGES')
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

.main-container {
  height: 100%;
}

.main-aside {
  height: 100%;
}

.el-main {
  height: 100%;
  width: 100%;
  padding-top: 5px;
}

.el-header {
  -webkit-app-region: drag;
  background-color: #409eff;
  height: 40px;
  display: -webkit-flex;
  display: flex;
  align-items: center;
  padding-right: 0px !important;
}

.title-row {
  display: -webkit-flex;
  display: flex;
  width: 100%;
}

.program-logo {
  display: -webkit-flex;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
}

.program-icon {
  padding-right: 15px;
}

.program-title {
  display: -webkit-flex;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;

  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: 18px;
  color: #f0f1f8;
}

.program-control {
  display: -webkit-flex;
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: flex-end;
  margin-right: 15px;
}

.el-aside {
  max-width: 250px;
  min-width: 150px;
  border-right: 1px grey;
}

.btncontrol {
  -webkit-app-region: no-drag;
  padding: 10px !important;
}
</style>
