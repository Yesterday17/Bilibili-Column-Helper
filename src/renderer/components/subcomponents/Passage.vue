<template>
  <el-card :body-style="{ padding: '0px' }">
    <div class="passage">
      <el-row>
        <el-col :span="6">
          <div class="passage-cover">
            <img class="cover" v-bind:src="props.image" />
          </div>
        </el-col>
        <el-col :span="16">
          <div class="passage-info ">
            <span class="typename">{{props.typename}}</span>
            <a class="name">{{props.name}}</a>
          </div>
          <div class="passage-status">
            <span class="">{{props.pubdate}}</span>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="passage-manage">
            <div class="close">
              <el-button icon="el-icon-close" circle @click="del(props)"></el-button>
            </div>
            <div class="more">
              <el-button icon="el-icon-more" circle></el-button>
            </div>
            <div class="edit">
              <el-button icon="el-icon-edit-outline" circle></el-button>
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
    }
  }
}
</script>

<style>
.el-card {
  margin-bottom: 10px;
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

.passage-info {
  display: inline;
  line-height: 24px;
  max-width: 460px;
  font-size: 18px;
  color: #212121;
}

.typename {
  display: inline-block;
  padding: 0 8px;
  border: 1px solid #e5e9ef;
  color: #666;
  border-radius: 12px;
  vertical-align: top;
  line-height: 22px;
  margin-right: 10px;
}

.name {
  display: inline-block;
  max-width: 460px;
  font-size: 18px;
  color: #212121;
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
.edit {
  padding-bottom: 15px;
}
</style>