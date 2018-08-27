import * as d3 from 'd3'
class ArrayViz {
  constructor(array) {
    this.array = array
  }

  domId(id) {
    if (arguments) {
      this.domId = id
      return this
    }
    return this.domId
  }

  /**
   * @override
   */
  push(...newItem) {
    this.array.push(...newItem)
  }

  _initAttr() {
    this.padding = 20
    this.blockSize = 60
    this.xScale = d3
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
    const self = this
    if (!this.svg) {
      this._initDom()
    }
    d3.timer(function() {
      self.updateView()
    })
  }

  updateView() {
    this._initAttr()
    const blocks = this.g.selectAll('rect').data(this.array)
    blocks
      .enter()
      .append('rect')
      .attr('x', (d, i) => this.xScale(i))
      .attr('y', this.height / 2)
      .attr('width', this.blockSize)
      .attr('height', this.blockSize)
      .attr('fill', 'darkgray')
      .attr('stroke', 'white')

    const texts = this.g.selectAll('text').data(this.array)
    texts
      .enter()
      .append('text')
      .text(d => d)
      .attr('x', (d, i) => this.xScale(i) + this.blockSize / 2)
      .attr('y', this.height / 2 + this.blockSize / 2)
      .attr('fill', 'black')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
  }
}

export default ArrayViz
