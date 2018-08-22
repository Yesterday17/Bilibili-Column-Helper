<template>
  <div>
    <b-navbar id="app-nav" toggleable="sm" type="light" fixed="top" sticky>
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand href="#">
        <img src="static/logo.png">
      </b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav class="ml-auto">
          <b-button-group size="sm">
            <b-btn class="btn-window" variant="outline-primary" @click="minimizeWindow"><img src="static/window/min-32.png"></b-btn>
            <b-btn class="btn-window" variant="outline-primary" @click="reformWindow"><img :src="reformIcon"></b-btn>
            <b-btn class="btn-window" variant="outline-primary" @click="closeWindow"><img src="static/window/close-32.png"></b-btn>
          </b-button-group>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-container fluid id="app-body">
      <div id="sidebar">
        <div id="sidebar-header">
          <h3>Header</h3>
        </div>

        <ul class="sidebar-list">
          <li>
            <a href="#">欢迎</a>
          </li>
          <li>
            <a href="#">专栏管理</a>
          </li>
          <li>
            <a href="#">创作中心</a>
          </li>
          <li>
            <a href="#">用户设置</a>
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
      this.reformIcon = win.isMaximized() ? 'static/window/back-32.png' : 'static/window/max-32.png'
    }
  },
  created () {
    this.reformIcon = win.isMaximized() ? 'static/window/back-32.png' : 'static/window/max-32.png'
  }
}
</script>

<style>
#app-nav {
  -webkit-app-region: drag;
  background-color: #409eff; /* Bilibili bule */
}

.btn-window {
  -webkit-app-region: no-drag;
}

#app-body {
  margin-top: calc(100% - 50.8px);
}

#sidebar {
  width: 250px;
  position: fixed;
  top: 52px;
  left: 0;
  height: 100vh;
  z-index: 999;
  transition: all 0.3s;
}

#sidebar-header {
  margin: 20px 30px;
}

#sidebar ul li {
  list-style-type: none;
  margin-left: -40px;
}

#sidebar ul li a {
  display: block;
  padding: 10px;
  color: black;
}

#sidebar ul li a:hover {
  background: lightgrey;
}
</style>
