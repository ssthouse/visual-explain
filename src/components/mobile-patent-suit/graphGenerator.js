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
    console.log(this.links)
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
      .attr('refX', 15)
      .attr('refY', -1.5)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')

    this.path = this.svgNode
      .append('g')
      .attr('transform', 'translate(200, 200)')
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
      .attr('transform', 'translate(200, 200)')
      .selectAll('circle')
      .data(this.d3.values(this.nodes))
      .enter()
      .append('circle')
      .attr('r', 6)
      .call(this.enableDragFunc())

    this.text = this.svgNode
      .append('g')
      .attr('transform', 'translate(200, 200)')
      .selectAll('text')
      .data(this.d3.values(this.nodes))
      .enter()
      .append('text')
      .attr('x', 8)
      .attr('y', '.31em')
      .text(function(d) {
        return d.name
      })
  }

  draw() {
    console.log('start draw')

    this.initData()

    function linkArc(d) {
      var dx = d.target.x - d.source.x
      var dy = d.target.y - d.source.y
      var dr = Math.sqrt(dx * dx + dy * dy)
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

    function transform(d) {
      return 'translate(' + d.x + ',' + d.y + ')'
    }

    var width = 960
    var height = 500

    const forceLink = this.d3.forceLink(this.links).distance(80)

    this.force = this.d3
      .forceSimulation(this.d3.values(this.nodes))
      .force('charge', this.d3.forceManyBody().strength(-150))
      .force('link', forceLink)
      .on('tick', () => {
        if (this.path) {
          this.path.attr('d', linkArc)
          this.circle.attr('transform', transform)
          this.text.attr('transform', transform)
        }
      })

    console.log(this.force.nodes())
    this.svgNode.attr('width', width).attr('height', height)

    this.initView()
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
}
