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
            <div class="close-icon">
              <el-button icon="el-icon-close" circle @click="del"></el-button>
            </div>
            <div class="upload-icon">
              <el-button icon="el-icon-upload2" circle @click="upload"></el-button>
            </div>
            <!--
            <div class="more-icon">
              <el-button icon="el-icon-more" circle></el-button>
            </div>
            -->
            <div class="edit-icon">
              <el-button icon="el-icon-edit-outline" circle @click="edit"></el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import * as renderer from '../../utils/RendererFactory'
import * as poster from '../../utils/PosterFactory'
export default {
  name: 'column-passsage',
  props: [
    'props'
  ],
  methods: {
    del: function () {
      this.$confirm('此操作将在本地永久删除该专栏, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$store.commit('DEL_PASSAGE', this.props)
        this.$store.commit('RESET_PASSAGE')
        this.$emit('update')
        this.$message.success('删除成功')
      }).catch(() => {
        if (e === 'cancel') {
          this.$message.info('已取消删除')
        } else {
          this.$message.error(e)
        }
      })
    },
    upload () {
      switch (this.$store.state.Running.loginStatus) {
        case 'true':
          poster.getPoster({module: this.$store.state.Config.config.poster, renderer: renderer.getRenderer({module: this.$store.state.Config.config.renderer})})({
            data: this.$store.state.Passage.passageData.get(this.props.name),
            content: this.$store.state.Passage.passageContent.get(this.props.name)
          }, this.$store.state.Config.config.cookie)
          this.$message.success('上传成功！请前往草稿箱查看！')
          break
        case 'false':
          this.$message.error('账号未登录！请前往设置页面登录！')
          break
        case 'pending':
          this.$message.error('账号登录状况判定中！请前往设置页面判定！')
          break
      }
    },
    edit () {
      // 覆盖原有内容
      this.$store.commit('RESET_PASSAGE')
      this.$store.commit('SET_PASSAGE', this.props)

      // 跳转路由
      this.$router.push('/editor')

      // 更改父组件Tab信息
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

.close-icon,
.more-icon,
.upload-icon,
.edit-icon {
  padding-bottom: 15px;
}
</style>