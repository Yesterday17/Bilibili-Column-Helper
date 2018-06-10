<template>
  <el-row class="user">
    <el-col :span=8>
      <span class="icon-eye sub-title">阅读量</span>
    </el-col>
    <el-col :span=4 class="l-border">
      <span class="icon-chat sub-title">评论</span>
    </el-col>
    <el-col :span=4 class="l-border">
      <span class="icon-like sub-title">喜欢</span>
    </el-col>
    <el-col :span=4 class="l-border">
      000
    </el-col>
    <el-col :span=4 class="l-border">
      001
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
  padding: 10px;
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
  font-size: 16px;
}
</style>
