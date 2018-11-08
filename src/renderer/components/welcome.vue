<template>
  <div class="h-100 w-100 d-flex justify-content-center align-items-center">
    <h5 id="login">欢迎使用哔哩哔哩专栏助手！请
      <b-link @click="login">登录</b-link>！
    </h5>
  </div>
</template>
<script>
import { ipcRenderer } from 'electron'

export default {
  data () {
    return {}
  },
  methods: {
    login () {
      ipcRenderer.send('show-login-view')
    }
  }
}
</script>

<style lang="scss">
@import "../styles/colors.scss";

#login {
  margin: 0px;
  a {
    color: mix($base-color, grey, 70);
    &:hover {
      color: mix($base-color, grey, 10);
      text-decoration: none;
    }
  }
}
</style>
