<template>
  <el-tabs tab-position="right">
    <el-tab-pane label="登录设置" class="panel">
      <h2 class="title">登录设置</h2>
      <userinfo v-if="logined"></userinfo>
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
  asyncComputed: {
    async logined () {
      const result = await network.getBilibili('https://member.bilibili.com/x/web/article/pre', this.$store.state.Config.config.cookie)
      console.log(result)
      return result['code'] === 0
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
  margin-right: 12pxc;
}

webview {
  float: top;
  height: 598px;
  width: 430px;
}
</style>