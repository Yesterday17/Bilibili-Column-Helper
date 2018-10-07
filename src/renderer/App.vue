<template>
  <div>
    <b-navbar id="app-nav" toggleable="sm" fixed="top" sticky>
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand class="bili-nav-header">
        <img src="static/icon.png">哔哩哔哩专栏助手
      </b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav class="ml-auto">
          <b-button-group size="sm">
            <b-btn class="btn-window" variant="outline-secondary" @click="minimizeWindow">
              <img src="static/window/min-32.png">
            </b-btn>
            <b-btn class="btn-window" variant="outline-secondary" @click="reformWindow">
              <img :src="reformIcon">
            </b-btn>
            <b-btn class="btn-window" variant="outline-secondary" @click="closeWindow">
              <img src="static/window/close-32.png">
            </b-btn>
          </b-button-group>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-container fluid id="app-body">
      <div id="sideButton" class="full-height">
        <ul>
          <li
            v-for="side in sideSelection"
            :key="side.name"
            :title="`${side.title}(${side.shortCut})`"
            v-on:click="panel(side)"
          >
            <octicon :name="side.name" scale="2" width="50"></octicon>
          </li>
        </ul>
      </div>
      <div id="sidePanel" class="full-height hide-panel">
        <div v-if="activePanel==='book'">
          <b-list-group>
            <!--TODO: Support column list-->
            <b-list-group-item variant="dark" button>文集</b-list-group-item>
          </b-list-group>
        </div>
        <div v-else-if="activePanel==='pencil'">
          <b-list-group>
            <b-list-group-item variant="dark" button v-b-modal.new_column>创作内容选择</b-list-group-item>
          </b-list-group>
        </div>
      </div>
      <div id="sideBody" class="full-height"></div>
      <b-modal id="new_column" title="新建专栏">
        <new-column></new-column>
      </b-modal>
    </b-container>
  </div>
</template> 

<script>
import { remote } from 'electron'
import newColumn from './components/newColumn'

const win = remote.getCurrentWindow()

export default {
  name: 'bilibili-column-helper',
  components: {
    'newColumn': newColumn
  },
  data () {
    return {
      reformIcon: 'static/window/max-32.png',
      activePanel: '',
      sideSelection: [
        {
          name: 'person',
          title: '用户管理',
          shortCut: 'Ctrl+Shift+U',
          panel: {
            available: false
          }
        },
        {
          name: 'book',
          title: '专栏管理',
          shortCut: 'Ctrl+Shift+U',
          panel: {
            available: true
          }
        },
        {
          name: 'pencil',
          title: '创作中心',
          shortCut: 'Ctrl+Shift+C',
          panel: {
            available: true
          }
        },
        {
          name: 'gear',
          title: '用户设置',
          shortCut: 'Ctrl+Shift+P',
          panel: {
            available: false
          }
        },
        {
          name: 'question',
          title: '关于我们',
          shortCut: 'Ctrl+Shift+A',
          panel: {
            available: false
          }
        }
      ]
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
    panel (side) {
      const panel = document.querySelector('#sidePanel')
      const hidden = this.activePanel === ''

      if (side.panel.available) {
        if (hidden) {
          panel.classList.remove('hide-panel')
          panel.classList.add('full-panel')
        }
        this.activePanel = side.name
      } else {
        panel.classList.remove('full-panel')
        panel.classList.add('hide-panel')
        this.activePanel = ''
      }
    }
  },
  created () {
    // Resize
    win.on('resize', () => {
      this.reformIcon = win.isMaximized() ? 'static/window/back-32.png' : 'static/window/max-32.png'
    })

    // Load config
    this.$store.commit('LOAD_SYNC_CONFIG')
  }
}
</script>

<style lang="scss">
$base-color: #555555;

body {
  overflow: hidden;
}

/* Use Yahei by default */
body,
button,
input,
select,
textarea,
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Arial", "Microsoft YaHei", "黑体", "宋体", sans-serif !important;
}

/* Global */
.full-height {
  height: 100%;
}

#app-nav {
  -webkit-app-region: drag; /* Make navbar dragable */
  background-color: lighten($base-color, 1%);
  height: 58px; /* Specified height */
}

.bili-nav-header {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: 1.15rem !important;
  color: #eee !important;
  img {
    padding-right: 1vw;
  }
}

.btn-window {
  -webkit-app-region: no-drag; /* Make buttons clickable */
  color: transparent !important;
  border-color: transparent !important;
  &:focus,
  &:hover,
  &:active {
    box-shadow: 0 0 0 0;
    background-color: $base-color !important;
    border-color: transparent !important;
  }
}

#app-body {
  padding-left: 0px;
  padding-right: 0px;
  height: calc(100vh - 58px); /* Calculate the proper height */
  display: inline-flex;
}

/* SideButton */
#sideButton {
  width: 50px;
  margin: 0px;
  background-color: #515151;
  ul {
    padding-left: 0px;
    li {
      list-style-type: none;
      padding-top: 12px;
      padding-bottom: 6px;
      svg {
        color: #bbbbbb;
        cursor: pointer;
        &:hover {
          color: #fff;
        }
      }
    }
  }
}

#sidePanel {
  &.full-panel {
    width: 220px;
    opacity: 100;
  }
  &.hide-panel {
    width: 0px;
    opacity: 0;
  }
  background-color: #252526;
}

#sideBody {
  flex: 1;
  background-color: #1e1e1e;
}
</style>
