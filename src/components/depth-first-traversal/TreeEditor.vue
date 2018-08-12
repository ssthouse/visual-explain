<template>
  <div id="tree-container" class="tree-container"></div>
</template>

<script>
import { constructTestData } from './dft'

export default {
  name: 'treeEditor',
  data() {
    return {
      width: 300,
      height: 300,
      sampleTree: constructTestData(),
      rootNode: null
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

      const treeGenerator = this.$d3.tree().size([this.width, this.height])
      const treeData = treeGenerator(hierarchyData)
      console.log(treeData)
      this.drawNodes(treeData.descendants())
      this.drawLinks(treeData.links())
    },
    drawNodes(nodes) {
      console.log(nodes)
      const treeNodes = this.rootNode.selectAll('.tree-node').data(nodes)
      treeNodes
        .enter()
        .append('div')
        .merge(treeNodes)
        .attr('title', d => d.value)
        .attr('class', 'tree-node')
        .style('left', d => d.x + 'px')
        .style('top', d => d.y + 'px')
      treeNodes.exit().remove()
    },
    drawLinks(links) {
      const lines = this.rootNode.selectAll('.link').data(links)
      const self = this
      lines
        .enter()
        .append('path')
        .attr('class', 'link')
        .attr('fill', 'transparent')
        .attr('stroke', 'black')
        .merge(lines)
        .attr('d', function(d, i) {
          let linkPath = self.$d3
            .linkVertical()
            .x(function(d) {
              return d.x
            })
            .y(function(d) {
              return d.y
            })
            .source(function(d) {
              return { x: d.source.x, y: d.source.y }
            })
            .target(function() {
              return { x: d.target.x, y: d.target.y }
            })
          return linkPath(d)
        })
      lines.exit().remove()
    }
  },
  mounted() {
    this.rootNode = this.$d3.select('#tree-container')
    this.initSampleTree()
  }
}
</script>

<style>
.tree-container {
  position: relative;
  width: 100%;
  height: 100%;
  margin: 40px;
  min-width: 300px;
  min-height: 300px;
}

.tree-node {
  width: 40px;
  height: 40px;
  position: absolute;
  background-color: aquamarine;
}
</style>
