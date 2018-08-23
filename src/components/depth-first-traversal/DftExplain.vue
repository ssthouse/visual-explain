<template>
  <div>
    <textarea ref="treeJsonCode" v-model="treeJsonCode"></textarea>
    <div id="tree-viz"></div>
    <button @click='dft'>dft start</button>
    <button @click='dftStop'>dft stop</button>
  </div>
</template>
<script>
import { constructTestData, Dft } from './dft'
import TreeEditor from './TreeEditor.vue'
import CodeMirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript.js'
import TreeViz from './tree-viz'

export default {
  name: 'DftExplain',
  components: { 'tree-editor': TreeEditor },
  data() {
    return {
      treeJsonCode: '{value: 1, childNodes : []}',
      codeMirror: null
    }
  },
  methods: {
    testCodeMirror() {
      this.codeMirror = CodeMirror.fromTextArea(this.$refs.treeJsonCode, {
        mode: 'javascript'
      })
    },
    dft() {
      this.treeViz.dft()
    },
    dftStop() {
      this.treeViz.stop()
    }
  },
  mounted() {
    const rootNode = constructTestData()
    const dft = new Dft(rootNode, null)
    dft.start()
    this.testCodeMirror()

    this.treeViz = new TreeViz(rootNode, 'tree-viz')
    this.treeViz.start()
  }
}
</script>
<style lang="less">
.CodeMirror {
  text-align: left !important;
  padding: 16px;
  font-family: 'Courier New', Courier, monospace;
}

#tree-viz {
  width: 200px;
  height: 200px;
}
</style>
