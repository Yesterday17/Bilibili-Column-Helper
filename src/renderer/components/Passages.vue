<template>
  <div>
    <div class="control">
      <el-button type="primary" @click="dialogFormVisible = true">
        <i class="el-icon-edit el-icon--left"></i>
        新建专栏
      </el-button>
      <el-dialog title="新建专栏" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="专栏标题（建议30字以内）：" label-width="220px">
            <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="专栏分类：" label-width="220px">
            <el-select v-model="form.typename" placeholder="请选择专栏分类">
              <el-option label="动画" value="动画"></el-option>
              <el-option label="游戏" value="游戏"></el-option>
              <el-option label="影视" value="影视"></el-option>
              <el-option label="生活" value="生活"></el-option>
              <el-option label="兴趣" value="兴趣"></el-option>
              <el-option label="轻小说" value="轻小说"></el-option>
              <el-option label="科技" value="科技"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false;form = form_blank;">取 消</el-button>
          <el-button type="primary" @click="newPassage(form)">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="passages" v-for="item in this.$store.state.Passage.passages" :key="item.cid">
      <column-passsage :props="item"></column-passsage>
    </div>
  </div>
</template>

<script>
import passage from './subcomponents/Passage'

export default {
  components: {
    'column-passsage': passage
  },
  data () {
    return {
      passages: [],
      dialogFormVisible: false,

      form: {
        name: '',
        typename: '',
        image: ''
      },

      form_blank: {
        name: '',
        typename: '',
        image: ''
      }
    }
  },
  methods: {
    newPassage: function (form) {
      this.$store.commit('NEW_PASSAGE', form)
      this.dialogFormVisible = false
      this.form = {...this.form_blank}
    }
  },
  created () {
    this.passages = this.$store.state.Passage.passages
  }
}
</script>

<style>
.control {
  padding-top: 0;
  margin-bottom: 15px;
}
</style>