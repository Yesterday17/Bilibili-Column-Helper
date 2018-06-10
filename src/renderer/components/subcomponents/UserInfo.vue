<template>
  <el-row class="user">
    <el-col :span=8>
      <span class="icon-eye sub-title">阅读量</span>
      <div class="number">{{$store.state.Sync.count.read}}</div>
    </el-col>
    <el-col :span=4 class="l-border">
      <span class="icon-chat sub-title">评论</span>
      <div class="number">{{$store.state.Sync.count.comment}}</div>
    </el-col>
    <el-col :span=4 class="l-border">
      <span class="icon-heart sub-title">喜欢</span>
      <div class="number">{{$store.state.Sync.count.like}}</div>
    </el-col>
    <el-col :span=4 class="l-border">
      <span class="icon-star-full sub-title">收藏</span>
      <div class="number">{{$store.state.Sync.count.favorite}}</div>
    </el-col>
    <el-col :span=4 class="l-border">
      <span class="icon-coin-yen sub-title">投币</span>
      <div class="number">{{$store.state.Sync.count.coin}}</div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style>
.user {
  padding-top: 20px;
  padding-bottom: 20px;
  margin-top: 8px;
  box-shadow: inset 0 0 2px 0px #454545;
  border-radius: 5px;
  text-align: center;
}

.l-border {
  border-left: 1px solid #454545;
}

.sub-title {
  color: #454545;
  font-size: 14px;
}

.number {
  margin: 10px auto 8px auto;

  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  font-size: 20px;
}
</style>
