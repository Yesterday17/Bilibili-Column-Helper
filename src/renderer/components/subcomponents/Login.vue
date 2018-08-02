<template>
  <div>您现在还没有登录！请
    <el-button type="text" @click="login">登录</el-button>！
  </div>
</template>
<script>
import { remote } from 'electron'

export default {
  data () {
    return {}
  },
  methods: {
    login: function () {
      const loginURL = 'http://passport.bilibili.com/ajax/miniLogin/minilogin'

      let loginWindow = new remote.BrowserWindow({
        height: 470,
        width: 434,
        maximizable: false,
        frame: true
      })

      loginWindow.loadURL(loginURL)

      loginWindow.on('closed', function () {
        loginWindow = null
      })
    }
  }
}
</script>

<style>
</style>
