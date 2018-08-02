<template>
  <el-tabs tab-position="right">
    <el-tab-pane label="登录设置" class="panel">
      <h2 class="title">登录设置</h2>
      <userinfo v-if="logined === true"></userinfo>
      <login v-else></login>
    </el-tab-pane>
    <el-tab-pane label="配置管理 ">配置管理</el-tab-pane>
    <el-tab-pane label="角色管理">角色管理</el-tab-pane>
    <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
  </el-tabs>
</template>

<script>
import userinfo from './subcomponents/UserInfo'
import login from './subcomponents/Login'
import * as network from '../utils/network'

export default {
  components: {
    'userinfo': userinfo,
    'login': login
  },
  data () {
    return {
      src: 'http://passport.bilibili.com/ajax/miniLogin/minilogin'
    }
  },
  computed: {
    logined: async function () {
      if (JSON.parse(await network.gets('https://member.bilibili.com/x/web/article/pre'))['code'] === -101) {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    login: function () {
      this.$nextTick(() => {
        this.$refs.webview.addEventListener('will-navigate', () => {
          this.$refs.webview.getWebContents().session.cookies.get({url: 'http://www.bilibili.com'}, (err, cookies) => {
            if (err) {
              console.error(err)
              return
            }
            console.log(cookies)
            this.$store.commit('UPDATE_COOKIES', cookies)
            this.$store.commit('SAVE_CONFIG')
          })
        })
      })
    }
  },
  created () {
    console.log(this.$store.state.Config.config)
  }
}
</script>

<style>
.el-tabs,
.el-tab-pane {
  height: 100%;
}

.title {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: 18px;
}

.panel {
  margin-right: 12px;
}

webview {
  float: top;
  height: 598px;
  width: 430px;
}
</style>