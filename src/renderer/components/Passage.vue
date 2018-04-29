<template>
  <el-card :body-style="{ padding: '0px' }">
    <div class="passage">
      <el-row>
        <el-col :span="6">
          <div class="passage-cover">
            <img class="cover" v-bind:src="imageUrl" />
          </div>
        </el-col>
        <el-col :span="18">
          <div class="passage-info ">
            <span class="typename">{{typename}}</span>
            <a class="name">{{name}}</a>
            <!--<el-button type="text " class="button ">操作按钮</el-button>-->
          </div>
          <div class="passage-status">
            <span class="">{{pubdate}}</span>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      imageUrl: 'static/test.png',
      name: '【某昨】对Minecraft Mod本地化现状的评价及未来的展望',
      typename: '游戏',
      pubdate: '2017-10-15 16:29:30'
    }
  },
  methods: {
  }
}
</script>

<style>
.passage {
  padding: 20px;
}

.passage-cover {
  height: 100%;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}

.cover {
  width: 90%;
}

.passage-info {
  background: white;
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
</style>