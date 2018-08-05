<template>
  <el-card :body-style="{ padding: '0px' }">
    <div class="passage">
      <el-row>
        <el-col :span="6">
          <div class="passage-cover">
            <img class="cover" v-bind:src="props.image" />
          </div>
        </el-col>
        <el-col class="passage-details" :span="16">
          <div class="passage-info">
            <span class="category font-passage font-tag">{{$store.state.Sync.categoryMap.get(props.category)}}</span>
            <a class="font-passage font-title">{{props.name}}</a>
          </div>
          <div class="passage-fotter">
            <div>
              <a class="font-passage font-label">文章标签：</a>
              <el-tag class="tags" v-for="item in props.tags" :key="item" :label="item" :value="item" size="medium">{{item}}</el-tag>
            </div>
            <span class="font-passage font-label">最后修改时间: {{new Date(props.pubdate).toLocaleString("zh-CN", {hour12: false})}}</span>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="passage-manage">
            <div class="close">
              <el-button icon="el-icon-close" circle @click="del(props)"></el-button>
            </div>
            <div class="upload">
              <el-button icon="el-icon-upload2" circle @click="upload(props)"></el-button>
            </div>
            <!--
            <div class="more">
              <el-button icon="el-icon-more" circle></el-button>
            </div>
            -->
            <div class="edit">
              <el-button icon="el-icon-edit-outline" circle @click="edit(props)"></el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'column-passsage',
  props: [
    'props'
  ],
  methods: {
    del: function (props) {
      this.$confirm('此操作将在本地永久删除该专栏, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$store.commit('DEL_PASSAGE', props)
        this.$store.commit('SAVE_PASSAGES')
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch((e) => {
        if (e === 'cancel') {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        } else {
          console.error(e)
          this.$message({
            type: 'error',
            message: e
          })
        }
      })
    },
    upload (props) {
      switch (this.$store.state.Running.loginStatus) {
        case 'true':
          this.$message.success('TODO: Upload passage here.')
          break
        case 'false':
          this.$message.error('账号未登录！请前往设置页面登录！')
          break
        case 'pending':
          this.$message.error('账号登录状况判定中！请前往设置页面判定！')
          break
      }
    },
    edit (props) {
      // TODO: 保存原有内容

      // 覆盖原有内容
      this.$store.commit('SET_PASSAGE', this.props)

      // 跳转路由
      this.$router.push('/editor')

      // 更改父组件Tab信息
      // 使用Vuex
      this.$store.commit('SET_PAGE', 2)
    }
  }
}
</script>

<style>
.el-card {
  margin-bottom: 10px;
  height: 208px;
}

.passage {
  padding: 20px;
}

.passage-cover {
  height: 100%;
  position: relative;
  border-radius: 4px;
  max-width: 480px;
  overflow: hidden;
}

.cover {
  width: 90%;
}

.passage-details {
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  height: 165px;
}

.passage-fotter {
  display: -webkit-inline-flex;
  display: inline-flex;
  width: 100%;
  justify-content: space-between;
}

.passage-info {
  display: inline;
  line-height: 24px;
  max-width: 460px;
  font-size: 18px;
  color: #212121;
}

.category {
  display: inline-block;
  padding: 0 8px;
  border: 1px solid #e5e9ef;
  color: #666;
  border-radius: 12px;
  vertical-align: top;
  line-height: 22px;
  margin-right: 10px;
}

.tags {
  display: -webkit-inline-flex;
  display: inline-flex;
  align-items: center;
  height: 20px;
}

/* Font */
.font-passage {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

.font-title {
  font-size: 18px;
  color: #212121;
}

.font-tag {
  font-size: 16px;
}

.font-label {
  font-size: 14px;
}

/* Passage Management */
.passage-manage {
  height: 100%;
  display: flex;
  display: -webkit-flex;
  align-items: flex-end;
  flex-flow: column;
  padding-right: 15px;
}

.close,
.more,
.upload,
.edit {
  padding-bottom: 15px;
}
</style>