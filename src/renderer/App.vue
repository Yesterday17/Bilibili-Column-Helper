<template>
  <div>
    <b-navbar id="app-nav" toggleable="sm" fixed="top" sticky variant="primary" type="dark">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand class="bili-nav-header">
        <img src="static/icon.png">哔哩哔哩专栏助手
      </b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav class="ml-auto">
          <b-button-group size="sm">
            <b-btn class="btn-window" variant="outline-primary" @click="minimizeWindow">
              <img src="static/window/min-32.png">
            </b-btn>
            <b-btn class="btn-window" variant="outline-primary" @click="reformWindow">
              <img :src="reformIcon">
            </b-btn>
            <b-btn class="btn-window" variant="outline-primary" @click="closeWindow">
              <img src="static/window/close-32.png">
            </b-btn>
          </b-button-group>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-container fluid id="app-body">
      <div id="sideBar" class="full-height">
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
        <div id="manage" v-if="activePanel==='book'">
          <b-list-group>
            <!--TODO: Support column list-->
            <b-list-group-item variant="dark" button>文集</b-list-group-item>
          </b-list-group>
        </div>
        <div id="write" v-else-if="activePanel==='pencil'">
          <b-button-group id="pencil-toolbar" size="sm">
            <b-button variant="primary-l1" @click="showNewPassage = !showNewPassage">New</b-button>
            <b-button variant="primary-l1">Delete</b-button>
          </b-button-group>
          <b-list-group>
            <b-list-group-item
              v-if="this.$store.state.Passage.passages.length == 0"
              button
              active
              class="flex-column align-items-start"
            >
              <h5>无本地专栏！</h5>
            </b-list-group-item>
            <b-list-group-item
              :id="'list-group-item' + item.name"
              v-for="item in this.$store.state.Passage.passages"
              v-bind:key="item.name"
              class="flex-column align-items-start list-group-item-action list-group-item-column"
            >
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1 column-list-item-name">{{item.name}}</h5>
                <octicon name="three-bars" :id="'column-list-item-badge-' + item.name"></octicon>
                <b-popover
                  :target="'column-list-item-badge-' + item.name"
                  :container="'list-group-item' + item.name"
                  triggers="click"
                  placement="rightbottom"
                >
                  <b-button-group vertical>
                    <b-button>
                      <octicon name="link-external" scale="1" width="16"></octicon>
                    </b-button>
                    <b-button>
                      <octicon name="eye" scale="1" width="16"></octicon>
                    </b-button>
                    <b-button>
                      <octicon name="cloud-upload" scale="1" width="16"></octicon>
                    </b-button>
                    <b-button>
                      <octicon name="trashcan" scale="1" width="16"></octicon>
                    </b-button>
                  </b-button-group>
                </b-popover>
              </div>
              <p class="mb-1 column-list-item-content">{{item.passage.substr(0, 10)}}</p>
            </b-list-group-item>
          </b-list-group>
        </div>
      </div>
      <div id="sideBody" class="full-height"></div>
    </b-container>
    <new-column :show="this.showNewPassage" :hidden="hide_new_passage"></new-column>
  </div>
</template> 

<script>
import { remote } from 'electron'
import newColumn from './components/new-column'

const win = remote.getCurrentWindow()

export default {
  name: 'bilibili-column-helper',
  components: {
    newColumn
  },
  data () {
    return {
      reformIcon: 'static/window/max-32.png',
      activePanel: '',
      showNewPassage: false,
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
    },
    hide_new_passage () {
      this.showNewPassage = !this.showNewPassage
    }
  },
  created () {
    // Resize
    win.on('resize', () => {
      this.reformIcon = win.isMaximized() ? 'static/window/back-32.png' : 'static/window/max-32.png'
    })

    // Load config
    this.$store.commit('LOAD_CONFIG')
    this.$store.commit('LOAD_SYNC_CONFIG')
    this.$store.commit('LOAD_PASSAGES')
    console.log(this.$store.state.Passage.passages)
  }
}
</script>

<style lang="scss">
@import "./styles/colors.scss";

// Use Yahei by default
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

// Global
.full-height {
  height: 100%;
}

#app-nav {
  -webkit-app-region: drag; // Make navbar dragable
  height: 58px; // Specified height
}

.bili-nav-header {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: 1.15rem !important;
  img {
    padding-right: 1vw;
  }
}

.btn-window {
  -webkit-app-region: no-drag; // Make buttons clickable
}

#app-body {
  padding-left: 0px;
  padding-right: 0px;
  height: calc(100vh - 58px); // Calculate the proper height
  display: inline-flex;
}

// sideBar
#sideBar {
  width: 50px;
  margin: 0px;
  background-color: $inactive-color;
  ul {
    padding-left: 0px;
    li {
      list-style-type: none;
      padding-top: 12px;
      padding-bottom: 6px;
      svg {
        color: $svg-inactive;
        cursor: pointer;
        &:hover {
          color: $active-color;
        }
      }
    }
  }
}

#sidePanel {
  &.full-panel {
    width: 250px;
    opacity: 100;
  }
  &.hide-panel {
    width: 0px;
    opacity: 0;
  }
  background-color: $base-color-d1;

  #pencil-toolbar {
    margin-left: 5px;
    margin-top: 6px;
    margin-bottom: 6px;
    button {
      border-radius: 2;
      padding: 2px;
    }
  }

  #write {
    border-bottom: 1px solid $base-color-l1;

    .list-group-item {
      width: auto;
      margin: 0px;
      border: 1px solid transparent;
      border-top: 1px solid $base-color-l1;
      border-radius: 0px;
      padding: 12px;
    }
  }
}

#sideBody {
  flex: 1;
  background-color: $base-color-d2;
}

.list-group-item-column {
  background-color: $base-color !important;

  .column-list-item-name {
    color: #fff;
  }

  .column-list-item-content {
    color: $svg-inactive;
  }

  svg {
    color: $svg-inactive;
    cursor: pointer;
    &:hover {
      color: $active-color;
    }
  }

  .popover-body {
    margin: -1px;
    padding: 0px;

    button {
      font-size: 0.9rem;
      padding: 0.375rem 0.6rem;
    }
  }

  .popover .arrow {
    &::before {
      border-right-color: transparent;
    }

    &::after {
      border-right-color: $secondary;
    }
  }
}
</style>
