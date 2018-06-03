<template>
  <div>
    <div class="control">
      <el-button-group>
        <el-button type="primary" plain size="medium" @click="newColumn">
          <i class="el-icon-plus el-icon--left"></i>
          新建专栏
        </el-button>
      </el-button-group>
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
          <el-form-item label="文章标签：" label-width="220px">
            <el-select v-model="form.tags" multiple filterable allow-create default-first-option :multiple-limit=10 placeholder="请选择文章标签">
              <el-option v-for="item in this.$store.state.Config.config.favoriteTags" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible=false">取 消</el-button>
          <el-button type="primary" @click="newPassage('newColumn')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="passages" v-for="item in passages" :key="item.cid">
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
        image: '',
        pubdate: null,
        tags: []
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
  computed: {
    passages: function () {
      let t = [...this.$store.state.Passage.passages]
      return this.sort(t, 'time')
    }
  },
  methods: {
    newColumn: function () {
      // Reset Form
      this.form.name = ''
      this.form.category = ''
      this.form.subtype = ''
      this.form.image = ''
      this.form.pubdate = null
      this.form.tags.splice(0, this.form.tags.length)

      this.dialogFormVisible = true
    },
    newPassage: function (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          // Use now as pubdate.
          this.form.pubdate = Date.now()

          this.$store.commit('NEW_PASSAGE', this.form)
          this.$store.commit('SAVE_PASSAGES')
          this.i = 0
          this.dialogFormVisible = false
          return true
        } else {
          // TODO: Add some suggestion here.
          return false
        }
      })
    },
    changeSubtype: function (selected) {
      this.form.subtype = ''
      this.i = this.$store.state.Sync.categoryList.indexOf(selected)
    },
    sort (items, options) {
      return items.sort((a, b) => {
        return a.pubdate < b.pubdate
      })
    }
  }
}
</script>

<style>
.control {
  padding-top: 0;
  margin-top: 10px;
  margin-bottom: 15px;
}

.line {
  display: -webkit-flex;
  display: flex;
  justify-content: center;
}
</style>