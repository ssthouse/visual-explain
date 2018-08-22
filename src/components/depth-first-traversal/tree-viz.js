// import { guid } from './util'
import * as d3 from 'd3'

class TreeViz {
  constructor(rootNode) {
    this.rootNode = rootNode
    this.nodeList = null
    this.links = null
  }

  rootNode(rootNode) {
    if (arguments.length) {
      this.rootNode = rootNode
      return this
    }
    return this.rootNode
  }

  dft() {
    const stack = [this.rootNode]
    while (stack.length !== 0) {
      const curNode = stack.pop()
      this.hightlightNode(curNode)
      curNode.childrenNodes.forEach(element => {
        stack.push(element)
      })
    }
  }

  updateView() {
    const hierarchyData = this.$d3.hierarchy(
      this.sampleTree,
      d => d.childrenNodes
    )

    const treeGenerator = this.$d3.tree().size([this.width, this.height])
    const treeData = treeGenerator(hierarchyData)
    this.drawLinks(treeData.links())

    this.nodeList = treeData.descendants()
  }

  _drawNodes() {
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
  }

  _drawLinks() {
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

  hightlightNode(node) {
    node['highlight'] = true
  }
}

export default TreeViz
