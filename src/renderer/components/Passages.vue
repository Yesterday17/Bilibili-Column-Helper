<template>
  <div>
    <div class="control">
      <el-button type="primary" @click="dialogFormVisible = true">
        <i class="el-icon-edit el-icon--left"></i>
        新建专栏
      </el-button>
      <el-dialog title="新建专栏" :visible.sync="dialogFormVisible">
        <el-form :model="form" :rules="rules" ref="newColumn">
          <el-form-item label="专栏标题（建议30字以内）：" label-width="220px" prop="name">
            <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="专栏分类：" label-width="220px" prop="typename">
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
          <el-button @click="dialogFormVisible = false;resetForm('newColumn');">取 消</el-button>
          <el-button type="primary" @click="newPassage('newColumn');">确 定</el-button>
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

      rules: {
        name: [
          { required: true, message: '请输入标题（建议30字以内）', trigger: 'blur' },
          { min: 1, max: 100, message: '长度在 1 到 100 个字符之间', trigger: 'blur' }
        ],
        typename: [
          { required: true, message: '请选择专栏分类', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    newPassage: function (form) {
      console.log(this.$refs[form])
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$store.commit('NEW_PASSAGE', this.form)
          this.resetForm(form)
          this.dialogFormVisible = false
          return true
        } else {
          // TODO: Add some suggestion here.
          return false
        }
      })
    },
    resetForm: function (form) {
      this.$refs[form].resetFields()
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