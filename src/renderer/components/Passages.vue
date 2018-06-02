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
              <el-select v-model="form.typename" placeholder="专栏分类" @change="changeSubtype" prop="typename">
                <el-option label="动画" value="动画"></el-option>
                <el-option label="游戏" value="游戏"></el-option>
                <el-option label="影视" value="影视"></el-option>
                <el-option label="生活" value="生活"></el-option>
                <el-option label="兴趣" value="兴趣"></el-option>
                <el-option label="轻小说" value="轻小说"></el-option>
                <el-option label="科技" value="科技"></el-option>
              </el-select>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-select v-model="form.subtype" placeholder="子分类" prop="subtype" @change="syncLabel" :label="label">
                <el-option v-for="item in this.subtypeOptions" :key="item.value" :label="item.value" :value="item.value" :disabled="item.disabled"></el-option>
              </el-select>
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
      passages: [],
      dialogFormVisible: false,
      label: '',

      form: {
        name: '',
        typename: '',
        subtyppe: '',
        image: ''
      },

      rules: {
        name: [
          { required: true, message: '请输入标题（建议30字以内）', trigger: 'blur' },
          { min: 1, max: 100, message: '长度在 1 到 100 个字符之间', trigger: 'blur' }
        ],
        typename: [
          { required: true, message: '请选择专栏分类', trigger: 'blur' }
        ],
        subtype: [
          { required: true, message: '请选择专栏子分类', trigger: 'blur' }
        ]
      },

      subtypeOptions: [
        {
          value: '请选择专栏分类',
          label: '请选择专栏分类',
          disabled: true
        }
      ]
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
    },
    changeSubtype: function (selected) {
      // Constants
      const anime = [
        {
          label: '动漫杂谈',
          value: '动漫杂谈',
          disabled: false
        },
        {
          label: '动漫资讯',
          value: '动漫资讯',
          disabled: false
        },
        {
          label: '动画技术',
          value: '动画技术',
          disabled: false
        }
      ]
      const game = [
        {
          label: '单机游戏',
          value: '单机游戏',
          disabled: false
        },
        {
          label: '电子竞技',
          value: '电子竞技',
          disabled: false
        },
        {
          label: '手机游戏',
          value: '手机游戏',
          disabled: false
        },
        {
          label: '网络游戏',
          value: '网络游戏',
          disabled: false
        },
        {
          label: '桌游棋牌',
          value: '桌游棋牌',
          disabled: false
        }
      ]
      const film = [
        {
          label: '电影',
          value: '电影',
          disabled: false
        },
        {
          label: '电视剧',
          value: '电视剧',
          disabled: false
        },
        {
          label: '纪录片',
          value: '纪录片',
          disabled: false
        },
        {
          label: '综艺',
          value: '综艺',
          disabled: false
        }
      ]

      this.form.subtype = ''
      this.subtypeOptions.splice(0, this.subtypeOptions.length)

      switch (selected) {
        case '动画':
          this.subtypeOptions.push(...anime)
          break
        case '游戏':
          this.subtypeOptions.push(...game)
          break
        case '影视':
          this.subtypeOptions.push(...film)
          break
      }
    },
    syncLabel: function (selected) {
      this.label = selected
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

.line {
  display: -webkit-flex;
  display: flex;
  justify-content: center;
}
</style>