<template>
  <el-tabs tab-position="right">
    <el-tab-pane label="登录设置" class="panel">
      <div class="login-setting-header">
        <h2 class="title">登录设置</h2>
        <el-button type="text" @click="logout" class="logout">登出</el-button>
      </div>
      <transition name="fade" mode="out-in">
        <userinfo v-if="loginStatus === 'true'"></userinfo>
        <login v-else-if="loginStatus === 'false'" v-on:login="login"></login>
        <pending v-else-if="loginStatus === 'pending'" content="正在检查登录状态……"></pending>
      </transition>
    </el-tab-pane>
    <el-tab-pane label="专栏设置">
      <h2 class="title">专栏设置</h2>
      <div class="content">
        <div>
          渲染器：
          <el-select v-model="value_renderer" placeholder="请选择">
            <el-option v-for="item in renderer" :key="item.value" :label="item.prefix + item.label + item.append" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          推送器：
          <el-select v-model="value_poster" placeholder="请选择">
            <el-option v-for="item in poster" :key="item.value" :label="item.prefix + item.label + item.append" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="同步设置">
      <h2 class="title">同步设置</h2>
    </el-tab-pane>
    <el-tab-pane label="其他设置">
      <h2 class="title">其他设置</h2>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import pending from './subcomponents/Pending'
import userinfo from './subcomponents/UserInfo'
import login from './subcomponents/Login'
import * as network from '../utils/network'

export default {
  components: {
    userinfo,
    login,
    pending
  },
  data () {
    return {
      // Page 1
      /**
       * Login status.
       *   pending | true | false
       */
      loginStatus: this.$store.state.Running.loginStatus,

      // Page 2
      value_renderer: this.$store.state.Config.config.renderer,
      renderer: [
        {
          prefix: '',
          value: 'default',
          label: '默认',
          append: ''
        },
        {
          prefix: '',
          value: 'biliZhuanlanMarkdownTool',
          label: 'Bilibili zhuanlan Markdown-Tool',
          append: ''
        }
      ],
      value_poster: this.$store.state.Config.config.poster,
      poster: [
        {
          prefix: '',
          value: 'default',
          label: '默认',
          append: ''
        },
        {
          prefix: '',
          value: 'biliZhuanlanMarkdownTool',
          label: 'Bilibili zhuanlan Markdown-Tool',
          append: ''
        }
      ]
    }
  },
  methods: {
    login () {
      this.$store.commit('UPDATE_LOGIN_STATUS', 'true')
      this.loginStatus = 'true'
    },
    logout () {
      this.$store.commit('RESET_COOKIES')
      this.$store.commit('UPDATE_LOGIN_STATUS', 'pending')
      this.loginStatus = 'false'
    }
  },
  created () {
    network.getBilibili('https://member.bilibili.com/x/web/article/pre', this.$store.state.Config.config.cookie)
      .then((result) => {
        if (this.loginStatus !== (result['code'] === 0).toString()) {
          this.$store.commit('UPDATE_LOGIN_STATUS', (result['code'] === 0).toString())
          this.loginStatus = (result['code'] === 0).toString()
        }
      })
  }
}
</script>

<style>
.el-tabs,
.el-tab-pane {
  height: 100%;
}

.login-setting-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.title {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: 18px;
}

.logout {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: 14px;
  display: flex;
  align-content: center;
  justify-content: center;
}

.panel {
  margin-right: 12px;
}

.content {
  margin-top: 1rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>