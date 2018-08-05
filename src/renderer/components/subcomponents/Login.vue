<template>
  <div class="login">您现在还没有登录！请
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
      const loginURL = 'https://account.bilibili.com/ajax/miniLogin/minilogin'
      let _this = this

      let loginWindow = new remote.BrowserWindow({
        parent: remote.BrowserWindow.getFocusedWindow(),
        height: 470,
        width: 434,
        maximizable: false,
        frame: true,
        modal: true
      })

      loginWindow.loadURL(loginURL)

      loginWindow.on('closed', function () {
        loginWindow = null
      })

      loginWindow.webContents.on('will-navigate', function (event, url) {
        loginWindow.webContents.session.cookies.get({}, function (err, cookies) {
          if (err) return

          let result = []
          for (let cookie of cookies) {
            if (cookie.domain === '.bilibili.com') {
              result.push({
                name: cookie.name,
                value: cookie.value
              })
            }
          }
          _this.$store.commit('UPDATE_COOKIES', result)
          _this.$store.commit('SAVE_CONFIG')
          _this.$emit('login')
          loginWindow.hide()
          loginWindow.destroy()
        })
      })

      loginWindow.show()
    }
  }
}
</script>

<style>
.login {
  padding-top: 20px;
  padding-bottom: 20px;
  margin-top: 8px;
  box-shadow: inset 0 0 2px 0px #454545;
  border-radius: 5px;
  text-align: center;
}
</style>
