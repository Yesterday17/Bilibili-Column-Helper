<template>
  <el-tabs tab-position="right">
    <el-tab-pane label="登录设置 ">登录设置
      <el-popover ref="popoverlogin" trigger="click" v-on:show="login">
        <webview ref="webview" :src="src"></webview>
      </el-popover>
      <el-button type="primary" v-popover:popoverlogin>主要按钮</el-button>

    </el-tab-pane>
    <el-tab-pane label="配置管理 ">配置管理</el-tab-pane>
    <el-tab-pane label="角色管理 ">角色管理</el-tab-pane>
    <el-tab-pane label="定时任务补偿 ">定时任务补偿</el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      src: 'http://passport.bilibili.com/ajax/miniLogin/minilogin'
    }
  },
  methods: {
    login: function () {
      this.$nextTick(() => {
        console.log(this.$refs)
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

webview {
  float: top;
  height: 598px;
  width: 430px;
}
</style>