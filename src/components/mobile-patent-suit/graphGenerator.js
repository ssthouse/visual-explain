export default class GraphGenerator {
  constructor(svgNode, d3) {
    this.svgNode = svgNode
    this.d3 = d3
  }

  initData() {
    this.links = [
      { source: 'Microsoft', target: 'Amazon', type: 'licensing' },
      { source: 'Microsoft', target: 'HTC', type: 'licensing' },
      { source: 'Samsung', target: 'Apple', type: 'suit' },
      { source: 'Motorola', target: 'Apple', type: 'suit' },
      { source: 'Nokia', target: 'Apple', type: 'resolved' },
      { source: 'HTC', target: 'Apple', type: 'suit' },
      { source: 'Kodak', target: 'Apple', type: 'suit' },
      { source: 'Microsoft', target: 'Barnes & Noble', type: 'suit' },
      { source: 'Microsoft', target: 'Foxconn', type: 'suit' },
      { source: 'Oracle', target: 'Google', type: 'suit' },
      { source: 'Apple', target: 'HTC', type: 'suit' },
      { source: 'Microsoft', target: 'Inventec', type: 'suit' },
      { source: 'Samsung', target: 'Kodak', type: 'resolved' },
      { source: 'LG', target: 'Kodak', type: 'resolved' },
      { source: 'RIM', target: 'Kodak', type: 'suit' },
      { source: 'Sony', target: 'LG', type: 'suit' },
      { source: 'Kodak', target: 'LG', type: 'resolved' },
      { source: 'Apple', target: 'Nokia', type: 'resolved' },
      { source: 'Qualcomm', target: 'Nokia', type: 'resolved' },
      { source: 'Apple', target: 'Motorola', type: 'suit' },
      { source: 'Microsoft', target: 'Motorola', type: 'suit' },
      { source: 'Motorola', target: 'Microsoft', type: 'suit' },
      { source: 'Huawei', target: 'ZTE', type: 'suit' },
      { source: 'Ericsson', target: 'ZTE', type: 'suit' },
      { source: 'Kodak', target: 'Samsung', type: 'resolved' },
      { source: 'Apple', target: 'Samsung', type: 'suit' },
      { source: 'Kodak', target: 'RIM', type: 'suit' },
      { source: 'Nokia', target: 'Qualcomm', type: 'suit' }
    ]

    this.nodes = {}

    // Compute the distinct nodes from the links.
    this.links.forEach(link => {
      link.source =
        this.nodes[link.source] ||
        (this.nodes[link.source] = { name: link.source })
      link.target =
        this.nodes[link.target] ||
        (this.nodes[link.target] = { name: link.target })
    })
    console.log(this.nodes)
  }

  initView() {
    // Per-type markers, as they don't inherit styles.
    this.svgNode
      .append('defs')
      .selectAll('marker')
      .data(['suit', 'licensing', 'resolved'])
      .enter()
      .append('marker')
      .attr('id', function(d) {
        return d
      })
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 22)
      .attr('refY', -1.5)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')

    this.path = this.svgNode
      .append('g')
      .selectAll('path')
      .data(this.links)
      .enter()
      .append('path')
      .attr('class', function(d) {
        return 'link ' + d.type
      })
      .attr('marker-end', function(d) {
        return 'url(#' + d.type + ')'
      })

    this.circle = this.svgNode
      .append('g')
      .selectAll('circle')
      .data(this.d3.values(this.nodes))
      .enter()
      .append('circle')
      .attr('r', 10)
      .style('cursor', 'pointer')
      .call(this.enableDragFunc())

    this.text = this.svgNode
      .append('g')
      .selectAll('text')
      .data(this.d3.values(this.nodes))
      .enter()
      .append('text')
      .attr('x', 12)
      .attr('y', '.31em')
      .text(d => d.name)
  }

  linkArc(d) {
    const dx = d.target.x - d.source.x
    const dy = d.target.y - d.source.y
    const dr = Math.sqrt(dx * dx + dy * dy)
    return (
      'M' +
      d.source.x +
      ',' +
      d.source.y +
      'A' +
      dr +
      ',' +
      dr +
      ' 0 0,1 ' +
      d.target.x +
      ',' +
      d.target.y
    )
  }

  draw() {
    this.initData()
    this.initView()

    const width = parseInt(
      this.svgNode
        .style('width')
        .substring(0, this.svgNode.style('width').length - 2)
    )
    const height = parseInt(
      this.svgNode
        .style('height')
        .substring(0, this.svgNode.style('height').length - 2)
    )

    function transform(d) {
      return 'translate(' + d.x + ',' + d.y + ')'
    }

    const forceLink = this.d3
      .forceLink(this.links)
      .distance(80)
      .strength(0.2)
      .iterations(3)

    this.force = this.d3
      .forceSimulation(this.d3.values(this.nodes))
      .force('charge', this.d3.forceManyBody().strength(50))
      .force('collide', this.d3.forceCollide().radius(50))
      .force('link', forceLink)
      .force(
        'center',
        this.d3
          .forceCenter()
          .x(width / 2)
          .y(height / 2)
      )
      .on('tick', () => {
        if (this.path) {
          this.path.attr('d', this.linkArc)
          this.circle.attr('transform', transform)
          this.text.attr('transform', transform)
        }
      })

    this.svgNode.attr('width', width).attr('height', height)

    this.enableDragFunc()
  }

  enableDragFunc() {
    return this.d3
      .drag()
      .on('start', d => {
        if (!this.d3.event.active) this.force.alphaTarget(0.3).restart()
        d.fx = this.d3.event.x
        d.fy = this.d3.event.y
      })
      .on('drag', d => {
        d.fx = this.d3.event.x
        d.fy = this.d3.event.y
      })
      .on('end', d => {
        if (!this.d3.event.active) this.force.alphaTarget(0)
        d.fx = null
        d.fy = null
      })
  }

  drawSampleNodes() {
    const sampleContainer = this.svgNode
      .append('g')
      .attr('class', 'sampleContainer')
    const xIndex = 200
    const yIndex = 100

    const sampleData = [
      {
        source: { name: 'Nokia', x: xIndex, y: yIndex },
        target: { name: 'Qualcomm', x: xIndex + 100, y: yIndex },
        title: 'Still in suit:',
        type: 'suit'
      },
      {
        source: { name: 'Qualcomm', x: xIndex, y: yIndex + 100 },
        target: { name: 'Nokia', x: xIndex + 100, y: yIndex + 100 },
        title: 'Already resolved:',
        type: 'resolved'
      },
      {
        source: { name: 'Microsoft', x: xIndex, y: yIndex + 200 },
        target: { name: 'Amazon', x: xIndex + 100, y: yIndex + 200 },
        title: 'Locensing now:',
        type: 'licensing'
      }
    ]

    const nodes = {}
    sampleData.forEach((link, index) => {
      nodes[link.source.name + index] = link.source
      nodes[link.target.name + index] = link.target
    })
    sampleContainer
      .selectAll('path')
      .data(sampleData)
      .enter()
      .append('path')
      .attr('class', d => 'link ' + d.type)
      .attr('marker-end', d => 'url(#' + d.type + ')')
      .attr('d', this.linkArc)

    sampleContainer
      .selectAll('circle')
      .data(this.d3.values(nodes))
      .enter()
      .append('circle')
      .attr('r', 10)
      .style('cursor', 'pointer')
      .attr('transform', d => `translate(${d.x}, ${d.y})`)

    sampleContainer
      .selectAll('.companyTitle')
      .data(this.d3.values(nodes))
      .enter()
      .append('text')
      .style('text-anchor', 'middle')
      .attr('x', d => d.x)
      .attr('y', d => d.y + 24)
      .text(d => d.name)

    sampleContainer
      .selectAll('.title')
      .data(sampleData)
      .enter()
      .append('text')
      .attr('class', 'msg-title')
      .style('text-anchor', 'end')
      .attr('x', d => d.source.x - 30)
      .attr('y', d => d.source.y + 5)
      .text(d => d.title)
  }
}
