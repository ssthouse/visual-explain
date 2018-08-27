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
    this.xScale = d3
      .scaleLinear()
      .domain([0, this.array.length])
      .range([0, this.width])
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
    const texts = this.g.selectAll('text').data(this.array)
    texts
      .enter()
      .append('text')
      .text(d => d)
      .attr('x', (d, i) => this.xScale(i))
      .attr('y', this.height / 2)
  }
}

export default ArrayViz
