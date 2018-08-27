<template>
  <div>
    <textarea ref="treeJsonCode" v-model="treeJsonCode"></textarea>
    <div id="tree-viz"></div>
    <button @click='dft'>dft start</button>
    <button @click='dftStop'>dft stop</button>
    <array-viz></array-viz>
  </div>
</template>
<script>
import { constructTestData, Dft } from './dft'
import TreeEditor from './TreeEditor.vue'
import CodeMirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript.js'
import TreeViz from './tree-viz'
// import ArrayViz from './array-visual'
import ArrayViz from './ArrayViz'

export default {
  name: 'DftExplain',
  components: { 'tree-editor': TreeEditor, 'array-viz': ArrayViz },
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
    // const arrayViz = new ArrayViz(1, 2, 2)
    // console.log(arrayViz)
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
