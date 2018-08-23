import * as util from './util'
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
    this.svgDom = d3
      .select('#' + this.domId)
      .append('svg')
      .style('width', '100%')
      .style('height', '100%')
  }

  start() {
    this._recalcLayout()
    this.updateView()
  }

  getWidth() {
    console.log(this.svgDom)
    return this.svgDom.node().getBoundingClientRect().width
  }

  getHeight() {
    return this.svgDom.node().getBoundingClientRect().height
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
    this.dftLoop(stack)
  }

  dftLoop(stack) {
    if (stack.length !== 0) {
      const curNode = stack.pop()
      curNode.childrenNodes.forEach(element => {
        stack.push(element)
      })
      this.hightlightNode(curNode)
      this.updateView()
      setTimeout(() => this.dftLoop(stack), 1000)
    }
  }

  updateView() {
    this._drawLinks()
    this._drawNodes()
  }

  _recalcLayout() {
    const hierarchyData = d3.hierarchy(this.rootNode, d => d.childrenNodes)
    const treeGenerator = d3.tree().size([this.getWidth(), this.getHeight()])
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
      .append('circle')
      .merge(treeNodes)
      .attr('title', d => d.value)
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', 5)
      .attr('stroke', 'transparent')
      .attr('fill', d => {
        console.log('data')
        console.log(d)
        if (d.data['highlight']) {
          return 'red'
        }
        return 'black'
      })
    treeNodes.exit().remove()
  }

  _drawLinks() {
    if (!this.links) {
      return
    }
    const lines = this.svgDom.selectAll('.link').data(this.links)
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

  hightlightNode(node) {
    console.log(node)
    node['highlight'] = true
  }
}

export default TreeViz
