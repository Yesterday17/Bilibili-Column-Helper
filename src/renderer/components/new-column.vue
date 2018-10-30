<template>
  <b-modal
    id="new_column"
    title="新建专栏"
    v-model="showModel"
    @hidden="hidden"
    variant="dark"
    busy
  >
    <div>
      <b-form>
        <b-container>
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
              <b-form-group
                label="专栏分类"
                :state="category_state"
                :invalid-feedback="category_invalid"
              >
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
              <b-form-group
                label="　"
                :state="category_state"
                :invalid-feedback="sub_category_invalid"
              >
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
        </b-container>
      </b-form>
    </div>
    <div slot="modal-footer">
      <!--<colorful-button contentText="提交"></colorful-button>-->
    </div>
  </b-modal>
</template>

<script>
export default {
  name: 'new-column',
  props: ['show', 'hidden'],
  data () {
    return {
      form: {
        title: '',
        category: null,
        sub_category: null
      },
      showModel: false
    }
  },
  watch: {
    show (val) {
      this.showModel = val
    }
  },
  methods: {
    category_change () {
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
