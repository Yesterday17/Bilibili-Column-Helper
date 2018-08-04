<template>
  <el-row class="user">
    <el-col :span=8>
      <span class="icon-eye sub-title">阅读量</span>
      <div class="number">{{$store.state.Sync.count.view}}
        <div class="sub-sub-title">昨日&nbsp;
          <a class="increase-text" v-if="$store.state.Sync.count.incr_view > 0">+{{$store.state.Sync.count.incr_view}}</a>
          <a v-else>0</a>
        </div>
      </div>
    </el-col>
    <el-col :span=4 class="l-border">
      <span class="icon-chat sub-title">评论</span>
      <div class="number">{{$store.state.Sync.count.reply}}
        <div class="sub-sub-title">昨日&nbsp;
          <a class="increase-text" v-if="$store.state.Sync.count.incr_reply > 0">+{{$store.state.Sync.count.incr_reply}}</a>
          <a v-else>0</a>
        </div>
      </div>
    </el-col>
    <el-col :span=4 class="l-border">
      <span class="icon-heart sub-title">喜欢</span>
      <div class="number">{{$store.state.Sync.count.like}}
        <div class="sub-sub-title">昨日&nbsp;
          <a class="increase-text" v-if="$store.state.Sync.count.incr_like > 0">+{{$store.state.Sync.count.incr_like}}</a>
          <a v-else>0</a>
        </div>
      </div>
    </el-col>
    <el-col :span=4 class="l-border">
      <span class="icon-star-full sub-title">收藏</span>
      <div class="number">{{$store.state.Sync.count.fav}}
        <div class="sub-sub-title">昨日&nbsp;
          <a class="increase-text" v-if="$store.state.Sync.count.incr_fav > 0">+{{$store.state.Sync.count.incr_fav}}</a>
          <a v-else>0</a>
        </div>
      </div>
    </el-col>
    <el-col :span=4 class="l-border">
      <span class="icon-coin-yen sub-title">投币</span>
      <div class="number">{{$store.state.Sync.count.coin}}
        <div class="sub-sub-title">昨日&nbsp;
          <a class="increase-text" v-if="$store.state.Sync.count.incr_coin > 0">+{{$store.state.Sync.count.incr_coin}}</a>
          <a v-else>0</a>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {}
  },
  created () {
    // Get UserInfo
    this.$store.dispatch('SYNC_CONFIG', this.$store.state.Config.config.cookie)
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

.sub-sub-title {
  margin-top: 1rem;
  color: #99a2aa;
  font-size: 12px;
}

.increase-text {
  color: #37c8f7;
  font-weight: 700;
}

.number {
  margin: 10px auto 8px auto;

  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: 20px;
}
</style>
