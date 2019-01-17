<template>
  <div class="visual-prototype">
    <div class="variable-view-container">
      <variable-view ref="variableView" :variable="variable"></variable-view>
    </div>
    <div class="operation-panel">
      <div class="code-editor">
        <textarea ref="textarea" :v-model="defaultCode"></textarea>
      </div>
      <div class="operation-buttons">
        <v-btn @click="executeCode">Execute Code</v-btn>
        <v-btn @click="update">Update</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import VariableView from './VariableView'
import CodeMirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript.js'

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
      variable: new SayHi(),
      codeEditor: null,
      defaultCode: `
function SayHi() {}

SayHi.prototype.hi = function() {
  console.log('hi')
}

function SayHello(){}
SayHello.prototype.hello = function(){}
Object.setPrototypeOf(SayHello, new SayHi())

function SayBye (){}
SayBye.prototype.bye = function(){}
Object.setPrototypeOf(SayBye, new SayHello())

new SayBye()
`
    }
  },
  methods: {
    update: function() {
      console.log(this.codeEditor.getValue())
      this.$refs.variableView.update()
    },
    executeCode() {
      // eslint-disable-next-line
      const variable = eval.call({}, this.codeEditor.getValue())
      if (variable) this.variable = variable
      console.log(variable)
    },
    initCodeEditor() {
      this.codeEditor = CodeMirror.fromTextArea(this.$refs.textarea, {
        mode: 'javascript',
        lineNumbers: true,
        value: this.defaultCode
      })
      this.codeEditor.setValue(this.defaultCode)
    }
  },
  mounted() {
    this.initCodeEditor()
  }
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
      .CodeMirror-sizer {
        text-align: left;
      }
    }
  }
}
</style>
