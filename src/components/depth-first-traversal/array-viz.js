import * as d3 from 'd3'
class ArrayViz {
  constructor(array) {
    this.array = array
    this.transition = d3
      .transition()
      .duration(500)
      .ease(d3.easeLinear)
  }

  domId(id) {
    if (arguments) {
      this.domId = id
      return this
    }
    return this.domId
  }

  toText(func) {
    if (func) {
      this.toTextAccess = func
      return this
    }
    return (
      this.toTextAccess ||
      function(d) {
        d.toString()
      }
    )
  }

  vertical(isVertical) {
    if (isVertical) {
      this.vertical = isVertical
      return this
    }
    return this.isVertical
  }

  push(newItem) {
    this.array.push(newItem)
    this.updateView()
    return this
  }

  pop() {
    const popedValue = this.array.pop()
    this.updateView()
    return popedValue
  }

  empty() {
    this.array = []
    this.updateView()
    return this
  }

  get length() {
    return this.array.length
  }

  _initAttr() {
    this.padding = 20
    this.blockSize = 60
    this.xScale = d3
      .scaleLinear()
      .domain([0, this.array.length])
      .range([0, this.array.length * this.blockSize])
    this.yScale = d3
      .scaleLinear()
      .domain([0, this.array.length])
      .range([0, this.array.length * this.blockSize])
  }

  _initDom() {
    const domContainer = d3.select('#' + this.domId)
    this.svg = domContainer
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
    this.g = this.svg.append('g')
  }

  get width() {
    return this.svg.node().getBoundingClientRect().width - this.padding * 2
  }

  get height() {
    return this.svg.node().getBoundingClientRect().height - this.padding * 2
  }

  start() {
    if (!this.svg) {
      this._initDom()
    }
  }

  updateView() {
    this._initAttr()
    const blocks = this.g.selectAll('rect').data(this.array, d => d.id)
    blocks
      .enter()
      .append('rect')
      .transition(this.transition)
      .attr(
        'x',
        (d, i) =>
          this.vertical ? this.width / 2 - this.blockSize / 2 : this.xScale(i)
      )
      .attr(
        'y',
        (d, i) =>
          this.vertical ? this.height - this.yScale(i) : this.height / 2
      )
      .attr('width', this.blockSize)
      .attr('height', this.blockSize)
      .attr('fill', 'green')
      .attr('stroke', 'white')
    blocks
      .transition(this.transition)
      .attr(
        'x',
        (d, i) =>
          this.vertical ? this.width / 2 - this.blockSize / 2 : this.xScale(i)
      )
      .attr(
        'y',
        (d, i) =>
          this.vertical ? this.height - this.yScale(i) : this.height / 2
      )
      .attr('width', this.blockSize)
      .attr('height', this.blockSize)
      .attr('fill', 'darkgray')
      .attr('stroke', 'white')

    blocks
      .exit()
      .attr('fill', 'red')
      .transition(this.transition)
      .style('opacity', 0)
      .remove()

    const texts = this.g.selectAll('text').data(this.array, d => d.id)
    texts
      .enter()
      .append('text')
      .text(d => this.toTextAccess(d))
      .transition(this.transition)
      .attr(
        'x',
        (d, i) =>
          this.vertical ? this.width / 2 : this.xScale(i) + this.blockSize / 2
      )
      .attr(
        'y',
        (d, i) =>
          (this.vertical ? this.height - this.yScale(i) : this.height / 2) +
          this.blockSize / 2
      )
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('fill', 'white')
    texts
      .text(d => this.toTextAccess(d))
      .transition(this.transition)
      .attr(
        'x',
        (d, i) =>
          this.vertical ? this.width / 2 : this.xScale(i) + this.blockSize / 2
      )
      .attr(
        'y',
        (d, i) =>
          (this.vertical ? this.height - this.yScale(i) : this.height / 2) +
          this.blockSize / 2
      )
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
    texts
      .exit()
      .transition(this.transition)
      .remove()
  }
}

export default ArrayViz
