import * as d3 from 'd3'
import * as Util from './util'

class TreeViz {
  constructor(rootNode, domId) {
    this.rootNode = rootNode
    this.domId = domId
    this.nodeList = null
    this.links = null
    this.svgDom = null
    this.g = null
    this.refreshTimer = null
    this.addNodeId()
  }

  rootNode(node) {
    if (node) {
      this.rootNode = node
      this.addNodeId()
      return this
    }
    return this.rootNode
  }

  addNodeId() {
    const stack = [this.rootNode]
    while (stack.length !== 0) {
      const curNode = stack.pop()
      curNode['id'] = Util.guid()
      curNode.childrenNodes.forEach(element => {
        stack.push(element)
      })
    }
  }

  domId(id) {
    if (id) {
      this.domId = id
      return this
    }
    return this.domId
  }

  nodeSize() {
    return this.nodeSize || this.getWidth() / 8
  }

  stack(stack) {
    if (stack) {
      this.stack = stack
      return this
    }
    return this.stack
  }

  empty() {
    const stack = [this.rootNode]
    while (stack.length !== 0) {
      const curNode = stack.pop()
      curNode['highlight'] = false
      curNode.childrenNodes.forEach(element => {
        stack.push(element)
      })
    }
    this.updateView()
  }

  _initDom() {
    if (!this.domId) {
      return
    }
    this.nodeSize = 24
    this.padding = 40
    d3.select('#' + this.domId)
      .selectAll('*')
      .remove()
    this.svgDom = d3
      .select('#' + this.domId)
      .append('svg')
      .style('width', '100%')
      .style('height', '100%')

    this.g = this.svgDom
      .append('g')
      .attr('transform', `translate(${this.padding}, ${this.padding})`)
  }

  start() {
    this._initDom()
    this._recalcLayout()
    this.updateView()
  }

  getWidth() {
    return this.svgDom.node().getBoundingClientRect().width - this.padding * 2
  }

  getHeight() {
    return this.svgDom.node().getBoundingClientRect().height - this.padding * 2
  }

  dft() {
    this.stack.push(this.rootNode)
    setTimeout(() => {
      this.dftLoop()
    }, 1000)
  }

  dftLoop() {
    if (this.stack.length !== 0) {
      const curNode = this.stack.pop()
      this.hightlightNode(curNode)
      setTimeout(() => {
        this.stack.push(curNode.childrenNodes)
        setTimeout(() => this.dftLoop(), 1000)
      }, 1000)
    }
  }

  hightlightNode(node) {
    node['highlight'] = true
    this.updateView()
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
    const treeNodes = this.g.selectAll('circle').data(this.nodeList)
    treeNodes
      .enter()
      .append('circle')
      .merge(treeNodes)
      .attr('title', d => d.value)
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', this.nodeSize)
      .attr('stroke', 'transparent')
      .attr('fill', d => {
        if (d.data['highlight']) {
          return 'red'
        }
        return '#2196f3'
      })
    treeNodes.exit().remove()

    const texts = this.g.selectAll('text').data(this.nodeList)
    texts
      .enter()
      .append('text')
      .merge(texts)
      .text(d => d.data.value)
      .attr('x', d => d.x)
      .attr('y', d => d.y)
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('fill', 'white')
    texts.exit().remove()
  }

  _drawLinks() {
    if (!this.links) {
      return
    }
    const lines = this.g.selectAll('.link').data(this.links)
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
}

export default TreeViz
