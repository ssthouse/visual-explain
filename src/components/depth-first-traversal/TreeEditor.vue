<template>
  <div id="tree-container" class="tree-container"></div>
</template>

<script>
import { constructTestData } from './dft'

export default {
  name: 'treeEditor',
  data() {
    return {
      sampleTree: constructTestData()
    }
  },
  methods: {
    initSampleTree() {
      console.log('sample tree data:')
      console.log(this.sampleTree)

      const hierarchyData = this.$d3.hierarchy(
        this.sampleTree,
        d => d.childrenNodes
      )
      console.log('hierarchy tree data:')
      console.log(hierarchyData)
    }
  },
  mounted() {
    this.initSampleTree()
  }
}
</script>

<style>
.tree-container {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-width: 300px;
}
</style>
