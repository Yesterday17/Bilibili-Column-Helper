<template>
  <b-modal
    id="new_column"
    ref="newColumnModal"
    title="新建专栏"
    ok-title="新建专栏"
    cancel-title="取消"
    v-model="showModel"
    @ok="submitForm"
    @cancel="resetForm"
  >
    <form>
      <b-row>
        <b-col>
          <b-form-group
            label="专栏标题"
            label-for="form-column-title"
            description="长度在 1 到 100 个字符之间。"
            :state="title_state"
            :invalid-feedback="title_invalid"
          >
            <b-form-input
              id="form-column-title"
              v-model="form.title"
              placeholder="请输入标题（建议30字以内）"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group label="专栏分类" :state="category_state" :invalid-feedback="category_invalid">
            <b-form-select
              v-model="form.category"
              :options="category"
              @input="category_change"
              class="mb-3"
              required
            >
              <option value="null" disabled hidden>请选择专栏分类</option>
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="　" :state="category_state" :invalid-feedback="sub_category_invalid">
            <b-form-select
              v-model="form.sub_category"
              :options="sub_category"
              class="mb-3"
              required
            >
              <option value="null" disabled hidden>请选择专栏子类</option>
            </b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group label="专栏头图（选填）">
            <b-button variant="outline-primary" block v-b-toggle.collapse1>选择专栏头图</b-button>
            <b-collapse id="collapse1" class="mt-2">
              <b-card>
                <!-- min: 640*360; recommend: > 960*540 -->
                <cropper ref="cropper" img="https://i0.hdslb.com/bfs/archive/04db8cc2f0305c7f34314680d866f02f20b1a4ab.png"></cropper>
              </b-card>
            </b-collapse>
          </b-form-group>
        </b-col>
      </b-row>
    </form>
  </b-modal>
</template>

<script>
import cropper from './utils/cropper'

export default {
  name: 'new-column',
  components: {
    cropper
  },
  data () {
    return {
      form: {
        title: '',
        category: null,
        sub_category: null
      }
    }
  },
  methods: {
    show () {
      this.$refs.newColumnModal.show()
    },
    hide () {
      this.$refs.newColumnModal.hide()
    },
    category_change () {
      this.form.sub_category = null
    },
    submitForm (event) {
      event.preventDefault()
      if (this.title_state && this.category_state) {
        // TODO: Add column to column list
        alert('专栏新建成功！')

        // clear form
        this.clearForm()
        this.hide()
      }
    },
    resetForm () {
      // TODO: Add user config to judge whether to clear form when it's cancelled
      // TODO: replace the condition with this.$store.state.config.xxxxx
      if (arguments.length === 0) clearForm()
    },
    clearForm () {
      this.form.title = ''
      this.form.category = null
      this.form.sub_category = null
    }
  },
  computed: {
    category () {
      const options = []
      for (let ca of this.$store.state.remote.category) {
        options.push({
          value: ca.id,
          text: ca.name
        })
      }
      return options
    },
    sub_category () {
      const options = []
      if (this.form.category !== null) {
        const sub = this.$store.state.remote.categoryMap.get(this.form.category)

        for (let ca of sub.children) {
          options.push({
            value: ca.id,
            text: ca.name
          })
        }
      }
      return options
    },
    title_state () {
      return (this.form.title.length > 0 && this.form.title.length < 101)
    },
    title_invalid () {
      if (this.title_state) return ''
      else if (this.form.title.length === 0) return '请输入标题！'
      else return '标题长度过长！'
    },
    category_state () {
      return this.form.category !== null && this.form.sub_category !== null
    },
    category_invalid () {
      if (this.form.category !== null) return ''
      else return '请选择专栏分类！'
    },
    sub_category_invalid () {
      if (this.form.sub_category !== null) return ''
      else return '请选择专栏子类！'
    }
  }
}
</script>

<style lang="scss">
// Select
select[required="required"] {
  margin-bottom: 4px !important;
}
</style>
