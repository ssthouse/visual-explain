<template>
  <div class="visual-prototype">
    <div class="variable-view-container">
      <variable-view :variable="variable"></variable-view>
    </div>
    <div>code editor</div>
  </div>
</template>

<script>
import VariableView from './VariableView'

export default {
  name: 'VisualPrototype',
  components: { 'variable-view': VariableView },
  data() {
    return {
      variable: function() {
        console.log('hi')
      }
    }
  },
  methods: {},
  mounted() {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.visual-prototype {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
