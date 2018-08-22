// import { guid } from './util'
import * as d3 from 'd3'

class TreeViz {
  constructor(rootNode, domId) {
    this.rootNode = rootNode
    this.domId = domId
    this.nodeList = null
    this.links = null
    this.svgDom = null
    this._initDom()
  }

  _initDom() {
    const svgDom = document.createElement('svg')
    svgDom.setAttribute('width', '100%')
    svgDom.setAttribute('height', '100%')
    const container = document.getElementById(this.domId)
    container.appendChild(svgDom)
    this.svgDom = svgDom
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
    this._recalcLayout()
    this._drawLinks()
    this._drawNodes()
  }

  _recalcLayout() {
    const hierarchyData = d3.hierarchy(this.rootNode, d => d.childrenNodes)
    const treeGenerator = d3.tree().size([this.width, this.height])
    const treeData = treeGenerator(hierarchyData)
    this.nodeList = treeData.descendants()
    this.links = treeData.links()
  }

  _drawNodes() {
    if (!this.nodeList) {
      return
    }
    const treeNodes = this.svgDom.selectAll('.tree-node').data(this.nodeList)
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
    if (!this.links) {
      return
    }
    const lines = this.svgDom.selectAll('.link').data(this.links)
    const self = this
    lines
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('fill', 'transparent')
      .attr('stroke', 'black')
      .merge(lines)
      .attr('d', function(d, i) {
        let linkPath = d3
          .linkVertical()
          .x(function(d) {
            return d.x + self.nodeWidth / 2
          })
          .y(function(d) {
            return d.y + (2 * self.nodeWidth) / 3
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
