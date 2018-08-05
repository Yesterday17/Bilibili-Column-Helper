<template>
  <el-row class="pending">
    {{content}}
  </el-row>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: [
    'content'
  ],
  created () {}
}
</script>

<style>
.pending {
  padding-top: 20px;
  padding-bottom: 20px;
  margin-top: 8px;
  box-shadow: inset 0 0 2px 0px #454545;
  border-radius: 5px;
  text-align: center;
}
</style>