<template>
  <div class="variable-view">
    {{variable.toString()}}
  </div>
</template>

<script>
export default {
  props: ['variable'],
  data() {
    return {}
  },
  methods: {},
  mounted() {
    console.log(this.$d3)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.variable-view {
  min-height: 240px;
}
</style>
