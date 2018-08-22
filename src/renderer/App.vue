<template>
  <div>
    <b-navbar id="app-nav" toggleable="sm" fixed="top" sticky>
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand class="bili-nav-header">
        <img src="static/icon.png"> 哔哩哔哩专栏助手
      </b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav class="ml-auto">
          <b-button-group size="sm">
            <b-btn class="btn-window" variant="outline-secondary" @click="minimizeWindow"><img src="static/window/min-32.png"></b-btn>
            <b-btn class="btn-window" variant="outline-secondary" @click="reformWindow"><img :src="reformIcon"></b-btn>
            <b-btn class="btn-window" variant="outline-secondary  " @click="closeWindow"><img src="static/window/close-32.png"></b-btn>
          </b-button-group>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-container fluid id="app-body">
      <div id="sideButton" class="full-height">
        <ul>
          <li title="用户管理(Ctrl+Shift+U)" v-on:click="test('person')">
            <octicon name="person" scale=2 width=50></octicon>
          </li>
          <li title="专栏管理(Ctrl+Shift+E)" v-on:click="test('book')">
            <octicon name="book" scale=2 width=50></octicon>
          </li>
          <li title="创作中心(Ctrl+Shift+C)" v-on:click="test('pencil')">
            <octicon name="pencil" scale=2 width=50></octicon>
          </li>
          <li title="用户设置(Ctrl+Shift+P)" v-on:click="test('gear')">
            <octicon name="gear" scale=2 width=50></octicon>
          </li>
          <li title="关于我们(Ctrl+Shift+A)" v-on:click="test('question')">
            <octicon name="question" scale=2 width=50></octicon>
          </li>
        </ul>
      </div>
    </b-container>
  </div>
</template> 

<script>
import { remote } from 'electron'
const win = remote.getCurrentWindow()

export default {
  name: 'bilibili-column-helper',
  data () {
    return {
      reformIcon: ''
    }
  },
  computed: {},
  methods: {
    minimizeWindow () {
      win.minimize()
    },
    closeWindow () {
      win.close()
    },
    reformWindow () {
      if (win.isMaximized()) {
        win.unmaximize()
      } else {
        win.maximize()
      }
    },
    test (src) {
      alert(src)
    }
  },
  created () {
    win.on('resize', () => {
      this.reformIcon = win.isMaximized() ? 'static/window/back-32.png' : 'static/window/max-32.png'
    })
    this.reformIcon = win.isMaximized() ? 'static/window/back-32.png' : 'static/window/max-32.png'
  }
}
</script>

<style>
body {
  overflow: hidden;
}

/* Global */
.full-height {
  height: 100%;
}

#app-nav {
  -webkit-app-region: drag; /* Make navbar dragable */
  background-color: #666666;
  height: 58px; /* Specified height */
}

.bili-nav-header {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: 1.15rem !important;
  color: #eee;
}

.bili-nav-header img {
  padding-right: 1vw;
}

.btn-window {
  -webkit-app-region: no-drag; /* Make buttons clickable */
  color: transparent !important;
  border-color: transparent !important;
}

.btn-window:focus,
.btn-window:hover,
.btn-window:active {
  box-shadow: 0 0 0 0;
  background-color: #555555 !important;
  border-color: transparent !important;
}

#app-body {
  padding-left: 0px;
  height: calc(100vh - 58px); /* Calculate the proper height */
}

/* SideButton */
#sideButton {
  width: 50px;
  background-color: #404040;
}

#sideButton ul {
  padding-left: 0px;
}

#sideButton ul li {
  list-style-type: none;
  padding-top: 12px;
  padding-bottom: 6px;
}

#sideButton ul li svg {
  color: #bbbbbb;
  cursor: pointer;
}

#sideButton ul li svg:hover {
  color: #fff;
}
</style>
