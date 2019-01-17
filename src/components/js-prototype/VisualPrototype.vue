<template>
  <div class="visual-prototype">
    <div class="variable-view-container">
      <variable-view ref="variableView" :variable="variable"></variable-view>
    </div>
    <div class="operation-panel">
      <div class="code-editor">code editor</div>
      <div class="operation-buttons">
        <v-btn @click="executeCode">Execute Code</v-btn>
        <v-btn @click="update">Update</v-btn>
      </div>
    </div>
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
    },
    executeCode() {
      console.log(`execute code ~`)
    }
  },
  mounted() {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.visual-prototype {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;

  .variable-view-container {
    flex-grow: 1;
    padding-left: 100px;
    padding-top: 400px;
    min-width: 720px;
  }

  .operation-panel {
    min-width: 720px;
    min-height: 500px;
    flex-grow: 1;

    .code-editor {
    }
  }
}
</style>
