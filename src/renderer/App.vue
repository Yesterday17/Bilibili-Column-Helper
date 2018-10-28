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
            @click="panel(side)"
          >
            <router-link :to="'/' + side.route">
              <octicon :name="side.icon" scale="2" width="50"></octicon>
            </router-link>
          </li>
        </ul>
      </div>
      <div id="sidePanel" class="full-height hide-panel">
        <div id="manage" class="full-height" v-if="activePanel==='manage'">
          <b-list-group>
            <!--TODO: Support column list-->
            <b-list-group-item variant="dark" button>文集</b-list-group-item>
          </b-list-group>
        </div>
        <div id="edit" class="full-height" v-else-if="activePanel==='edit'">
          <div id="edit-toolbar">
            <b-button variant="primary-l1" @click="showNewPassage = !showNewPassage">新建专栏</b-button>
          </div>
          <b-list-group id="edit-column-list" class="full-height">
            <b-list-group-item
              v-if="this.$store.state.Passage.passages.length == 0"
              button
              active
              class="flex-column align-items-start"
            >
              <h5>无本地专栏！</h5>
            </b-list-group-item>
            <b-list-group-item
              :id="'list-group-item-' + item.name"
              v-for="item in this.$store.state.Passage.passages"
              v-bind:key="item.name"
              class="flex-column align-items-start list-group-item-action"
            >
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1 column-list-item-name">{{item.name}}</h5>
                <octicon name="three-bars" :id="'column-list-item-badge-' + item.name"></octicon>
                <b-popover
                  :target="'column-list-item-badge-' + item.name"
                  :container="'list-group-item-' + item.name"
                  triggers="focus"
                  placement="leftbottom"
                >
                  <b-button-group vertical>
                    <b-button @click="share_passage(item.name)">
                      <octicon name="link-external" scale="1" width="16"></octicon>
                    </b-button>
                    <b-button @click="preview_passage(item.name)">
                      <octicon name="eye" scale="1" width="16"></octicon>
                    </b-button>
                    <b-button @click="upload_passage(item.name)">
                      <octicon name="cloud-upload" scale="1" width="16"></octicon>
                    </b-button>
                    <b-button @click="delete_passage(item.name)">
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
      <div id="sideBody" class="full-height">
        <router-view></router-view>
      </div>
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
          name: 'user',
          icon: 'person',
          title: '用户管理',
          route: 'welcome',
          shortCut: 'Ctrl+Shift+U',
          hasPanel: false
        },
        {
          name: 'manage',
          icon: 'book',
          title: '专栏管理',
          route: 'list',
          shortCut: 'Ctrl+Shift+U',
          hasPanel: true
        },
        {
          name: 'edit',
          icon: 'pencil',
          title: '创作中心',
          route: 'edit',
          shortCut: 'Ctrl+Shift+C',
          hasPanel: true
        },
        {
          name: 'options',
          icon: 'gear',
          title: '用户设置',
          route: 'options',
          shortCut: 'Ctrl+Shift+P',
          hasPanel: false
        },
        {
          name: 'about',
          icon: 'question',
          title: '关于我们',
          route: 'about',
          shortCut: 'Ctrl+Shift+A',
          hasPanel: false
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

      if (side.hasPanel) {
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
    },
    share_passage (name) {
      alert(name)
    },
    preview_passage (name) {
      alert(name)
    },
    upload_passage (name) {
      alert(name)
    },
    delete_passage (name) {
      alert(name)
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

    // Save config
    this.$store.commit('SAVE_CONFIG')
    this.$store.commit('SAVE_SYNC_CONFIG')
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
  background-color: $base-color-d1;

  overflow: hidden;
  display: flex;
  flex-direction: column;

  &.full-panel {
    width: 250px;
    opacity: 100;
  }

  &.hide-panel {
    width: 0px;
    opacity: 0;
  }

  #edit {
    overflow: hidden;
    display: flex;
    flex-direction: column;

    #edit-toolbar {
      position: -webkit-sticky;
      position: sticky;
      top: 0px;
      z-index: 2;
      text-align: center;

      background-color: $base-color-d1;
      padding: 6px 0 6px 0;
      border-bottom: 1px solid $base-color-l1;

      button {
        padding: 3px 50px 3px 50px;
        border-radius: 0px;
        font-size: 0.8rem;
      }
    }

    #edit-column-list {
      display: block;
      overflow: auto;

      &::-webkit-scrollbar {
        width: 5px;
      }

      &::-webkit-scrollbar-track {
        background: $base-color-d1;
      }

      &::-webkit-scrollbar-thumb {
        background: $base-color-l1;
      }

      .list-group-item {
        width: auto;
        margin: 0px;
        border: 1px solid transparent;
        border-bottom: 1px solid $base-color-l1;
        border-radius: 0px;
        padding: 12px;
        background-color: $base-color;

        &:hover {
          background-color: $base-color-l1;
        }

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
      }
    }
  }
}

#sideBody {
  flex: 1;
  background-color: $base-color-d2;
  color: white;
}
</style>
