<template>
  <div class="visual-prototype">
    <div class="variable-view-container">
      <variable-view ref="variableView" :variable="variable"></variable-view>
    </div>
    <div>code editor</div>
    <button @click="update">update</button>
  </div>
</template>

<script>
import VariableView from './VariableView'

function SayHi() {}

SayHi.prototype.hi = function() {
  console.log('hi')
}

SayHi.prototype.show = function() {
  console.log('Here I am')
}

export default {
  name: 'VisualPrototype',
  components: { 'variable-view': VariableView },
  data() {
    return {
      variable: new SayHi()
    }
  },
  methods: {
    update: function() {
      this.$refs.variableView.update()
      console.log(this.$d3.tip)
    }
  },
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

  .variable-view-container {
    padding-left: 100px;
    padding-top: 400px;
    width: 100%;
  }
}
</style>
