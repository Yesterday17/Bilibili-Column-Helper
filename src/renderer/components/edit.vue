<template>
  <div id="edit-body" class="h-100">
    <div id="edit-no-passage" class="h-100" v-if="this.passage === undefined">
      <h5>请于侧边栏选择要编辑的专栏或新建专栏！</h5>
    </div>
    <div id="edit-editor" class="h-100 w-100" v-else>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      passage: undefined
    }
  },
  watch: {
    '$route' (to, from) {
      this.passage = to.params.name
    }
  }
}
</script>

<style lang="scss">
@import "../styles/colors.scss";

#edit-body {
  #edit-no-passage {
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }

  #edit-editor {
    display: flex;
  }
}
</style>
