<template>
  <div id="domRender">
    <div id="control-panel">
      <v-btn @click="previousStep()">Previous Step</v-btn>
      <v-btn @click="nextStep()">Next Step</v-btn>
      <v-btn @click="autoPlay()">Auto play</v-btn>
    </div>
    <div id="svg-container">
      <svg id="codeView"></svg>
      <svg id="domTree">
        <g id="linkContainer"></g>
        <g id="circleContainer"></g>
        <g id="textContainer"></g>
      </svg>
    </div>
  </div>
</template>

<script>
import { codeSnippet } from './CodeSnippet'

export default {
  name: 'Root',
  data() {
    return {
      yScale: null,
      codeView: null,
      domTree: null,
      codeSnippet,
      nodeRadius: 30,
      nodeSize: 140
    }
  },
  mounted() {
    this.domTree = this.$d3.select('#domTree')
    this.codeView = this.$d3.select('#codeView')
    this.linkContainer = this.$d3.select('#linkContainer')
    this.circleContainer = this.$d3.select('#circleContainer')
    this.textContainer = this.$d3.select('#textContainer')
    window.code = this
  },
  methods: {
    previousStep() {
      this.codeSnippet.stepBackword()
      this.updateView(this.codeSnippet.getCurRows())
      this.updateDomTree()
    },
    nextStep() {
      this.codeSnippet.stepForward()
      this.updateView(this.codeSnippet.getCurRows())
      this.updateDomTree()
    },
    autoPlay() {
      this.clearDomTree()
      this.codeSnippet.restore()
      this.autoNextStep()
    },
    clearDomTree() {
      this.codeView.selectAll('*').remove()
      this.linkContainer.selectAll('*').remove()
      this.circleContainer.selectAll('*').remove()
      this.textContainer.selectAll('*').remove()
    },
    autoNextStep() {
      if (this.codeSnippet.isLastStep()) {
        return
      }
      setTimeout(() => {
        this.nextStep()
        this.autoNextStep()
      }, 1000)
    },
    updateView(rows) {
      const textRows = this.codeView.selectAll('text').data(rows)
      textRows.style('stroke', 'black')
      textRows
        .enter()
        .append('text')
        .text(data => data)
        .style('stroke', 'blue')
        .style('font-family', 'monospace')
        .style('stroke-width', 0.5)
        .attr('x', -100)
        .style('opacity', 0)
        .attr('xml:space', 'preserve')
        .transition()
        .attr('font-size', '20px')
        .attr('x', '30')
        .attr('y', (data, i) => (i + 1) * 30)
        .style('opacity', 1)
        .style('stroke', 'black')
        .style('stroke-width', 0.5)
      textRows
        .exit()
        .transition()
        .style('stroke', 'red')
        .attr('x', '-100px')
        .attr('y', 0)
        .style('opacity', 0)
        .remove()
    },
    updateDomTree() {
      if (!this.codeSnippet.getCurDomTreeData()) {
        this.drawDomTree([], [])
        return
      }
      const domTreeData = this.$d3.hierarchy(
        this.codeSnippet.getCurDomTreeData()
      )
      const treeBuilder = this.$d3
        .tree()
        .nodeSize([this.nodeSize, this.nodeSize])
      const tree = treeBuilder(domTreeData)
      this.drawDomTree(tree.descendants(), tree.links())
    },
    drawDomTree(descendants, links) {
      const widthStr = this.domTree.style('width')
      const xOffset = parseInt(widthStr.substring(0, widthStr.length - 2)) / 2
      const yOffset = 100

      const lines = this.linkContainer.selectAll('.link').data(links)
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
              return d.x + xOffset
            })
            .y(function(d) {
              return d.y + yOffset
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

      const nodes = this.circleContainer
        .selectAll('circle')
        .data(descendants, d => d.data.key)
      nodes
        .enter()
        .append('circle')
        .attr('class', 'node')
        .attr('fill', 'white')
        .attr('stroke', 'black')
        .attr('r', this.nodeRadius)
        .merge(nodes)
        .transition()
        .attr('cx', d => d.x + xOffset)
        .attr('cy', d => d.y + yOffset)
      nodes.exit().remove()

      const nodeLabels = this.textContainer
        .selectAll('text')
        .data(descendants, d => d.data.key)
      nodeLabels
        .enter()
        .append('text')
        .attr('text-anchor', 'middle')
        .attr('font-size', '20px')
        .attr('dy', '.4em')
        .merge(nodeLabels)
        .transition()
        .attr('x', d => d.x + xOffset)
        .attr('y', d => d.y + yOffset)
        .text(d => d.data.name)
      nodeLabels.exit().remove()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
#domRender {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;

  #svg-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: stretch;

    #codeView {
      width: 60%;
      height: 100%;
      background-color: whitesmoke;
    }

    #domTree {
      width: 40%;
      height: 100%;

      circle,
      path {
        stroke: #2196f3;
        stroke-width: 2px;
      }

      text {
        stroke: #1976d2;
        stroke-width: 0.5px;
      }
    }
  }
}
</style>
