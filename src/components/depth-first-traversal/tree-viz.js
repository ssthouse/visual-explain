import * as d3 from 'd3'

class TreeViz {
  constructor(rootNode, domId) {
    this.rootNode = rootNode
    this.domId = domId
    this.nodeList = null
    this.links = null
    this.svgDom = null
    this.g = null
    this.refreshTimer = null
  }

  domId(id) {
    if (id) {
      this.domId = id
      return this
    }
    return this.domId
  }

  nodeSize(size) {
    if (size) {
      this.nodeSize = size
      return this
    }
    return this.nodeSize
  }

  stack(stack) {
    if (stack) {
      this.stack = stack
      return this
    }
    return this.stack
  }

  _initDom() {
    if (!this.domId) {
      return
    }
    this.nodeSize = 10
    this.padding = 20
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
    const self = this
    this.refreshTimer = d3.timer(function() {
      self.updateView()
    }, 150)
  }

  stop() {
    this.refreshTimer.stop()
  }

  getWidth() {
    return this.svgDom.node().getBoundingClientRect().width - this.padding * 2
  }

  getHeight() {
    return this.svgDom.node().getBoundingClientRect().height - this.padding * 2
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
    this.stack.push(this.rootNode.value)
    this.dftLoop(stack)
  }

  dftLoop(stack) {
    if (stack.length !== 0) {
      const curNode = stack.pop()
      this.stack.pop()
      curNode.childrenNodes.forEach(element => {
        stack.push(element)
        this.stack.push(element.value)
      })
      this.hightlightNode(curNode)
      setTimeout(() => this.dftLoop(stack), 1000)
    }
  }

  hightlightNode(node) {
    node['highlight'] = true
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
        return 'black'
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
