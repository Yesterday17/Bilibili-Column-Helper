<template>
  <el-tabs tab-position="right">
    <el-tab-pane label="登录设置">
      <a class="title">登录设置</a>
      <userinfo></userinfo>
      <!--
      <el-popover ref="popoverlogin" trigger="click" v-on:show="login">
        <webview ref="webview" :src="src"></webview>
      </el-popover>
      <el-button type="primary" v-popover:popoverlogin>主要按钮</el-button>
      -->
    </el-tab-pane>
    <el-tab-pane label="配置管理 ">配置管理</el-tab-pane>
    <el-tab-pane label="角色管理">角色管理</el-tab-pane>
    <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
  </el-tabs>
</template>

<script>
import userinfo from './subcomponents/UserInfo'

export default {
  components: {
    'userinfo': userinfo
  },
  data () {
    return {
      src: 'http://passport.bilibili.com/ajax/miniLogin/minilogin'
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
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  font-size: 18px;
}

webview {
  float: top;
  height: 598px;
  width: 430px;
}
</style>