<template>
  <div id="tree-container" class="tree-container">
    <svg id='svg-container'></svg>
    <template v-for="node in nodeList">
      <node-editor :key="node.id" :node="node" :node-id="node.id" :node-width="nodeWidth">
        {{node.id}}
      </node-editor>
    </template>
  </div>
</template>

<script>
import { constructTestData } from './dft'
import NodeEditor from './NodeEditor.vue'

export default {
  name: 'treeEditor',
  components: { 'node-editor': NodeEditor },
  data() {
    return {
      width: 300,
      height: 300,
      nodeWidth: 48,
      sampleTree: constructTestData(),
      rootNode: null,
      svgRootNode: null,
      nodeList: []
    }
  },
  methods: {
    initSampleTree() {
      const hierarchyData = this.$d3.hierarchy(
        this.sampleTree,
        d => d.childrenNodes
      )

      const treeGenerator = this.$d3.tree().size([this.width, this.height])
      const treeData = treeGenerator(hierarchyData)
      this.drawLinks(treeData.links())

      this.nodeList = treeData.descendants()
    },
    drawNodes(nodes) {
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
      const lines = this.svgRootNode.selectAll('.link').data(links)
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
              return d.x + self.nodeWidth / 2
            })
            .y(function(d) {
              return d.y + 2 * self.nodeWidth / 3
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
    this.svgRootNode = this.$d3.select('#svg-container')
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

#svg-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>
