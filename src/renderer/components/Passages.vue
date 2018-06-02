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
            <el-input v-model="form.name" auto-complete="off" placeholder="请输入标题（建议30字以内）"></el-input>
          </el-form-item>
          <el-form-item label="专栏分类：" label-width="220px" required>
            <el-col :span="11">
              <el-form-item prop="category">
                <el-select v-model="form.category" placeholder="专栏分类" @change="changeSubtype">
                  <el-option v-for="item in this.$store.state.Sync.category" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item prop="subtype">
                <el-select v-model="form.subtype" placeholder="子分类" :label="label">
                  <el-option v-for="item in this.$store.state.Sync.category[i].children" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
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
      dialogFormVisible: false,
      label: '',
      i: 0,

      form: {
        name: '',
        category: '',
        subtype: '',
        image: ''
      },

      rules: {
        name: [
          { required: true, message: '请输入标题（建议30字以内）', trigger: 'blur' },
          { min: 1, max: 100, message: '长度在 1 到 100 个字符之间', trigger: 'blur' }
        ],
        category: [
          { required: true, message: '请选择专栏分类', trigger: 'blur' }
        ],
        subtype: [
          { required: true, message: '请选择专栏子分类', trigger: 'blur' }
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
          this.i = 0
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
    },
    changeSubtype: function (selected) {
      this.form.subtype = ''
      for (let c in this.$store.state.Sync.category) {
        if (selected === this.$store.state.Sync.category[c].id) {
          this.i = c
          break
        }
      }
    }
  }
}
</script>

<style>
.control {
  padding-top: 0;
  margin-bottom: 15px;
}

.line {
  display: -webkit-flex;
  display: flex;
  justify-content: center;
}
</style>