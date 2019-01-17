<template>
  <div class="variable-view">
    <svg id="variable-view">
    </svg>
    <div class="tooltip-container"></div>
  </div>
</template>

<script>
/* eslint-disable */
import tip from 'd3-tip'

class PrototypeNode {
  constructor(proto) {
    this.proto = proto
    this.next = null
  }

  setNext(nextProto) {
    if (!(nextProto instanceof PrototypeNode)) return
    this.next = nextProto
  }

  getNext() {
    return this.next
  }
}

export default {
  props: ['variable'],
  data() {
    return {
      circieRadius: 80,
      tipCaller: null
    }
  },
  methods: {
    constructPrototypeNodeList() {
      // 1. construct linked list for prototype array
      let head = new PrototypeNode(null)
      let curNode = head
      let obj = this.variable
      while (obj !== null) {
        obj = Object.getPrototypeOf(obj)
        let nextProtoNode = new PrototypeNode(obj)
        curNode.setNext(nextProtoNode)
        curNode = nextProtoNode
      }
      return head.next
    },
    renderProtoNodes(nodeList) {
      console.log(nodeList)
      let self = this
      let circleSelection = this.$d3
        .select('#variable-view')
        .selectAll('circle')
        .data(nodeList)
      circleSelection
        .enter()
        .append('circle')
        .attr('cx', (data, index) => {
          return self.circieRadius + index * this.circieRadius * 2.3
        })
        .attr('cy', 100)
        .attr('r', this.circieRadius)
        .attr('fill', 'lightgrey')
        .on('mouseover', self.tipCaller.show)
        .on('mouseout', self.tipCaller.hide)

      circleSelection.exit().remove()

      this.$d3
        .select('#variable-view')
        .selectAll('text')
        .remove()
      this.$d3
        .select('#variable-view')
        .selectAll('text')
        .data(nodeList)
        .enter()
        .append('text')
        .text((d, index) => {
          return (
            index + '\ntype: ' + (d.proto !== null ? typeof d.proto : 'null')
          )
        })
        .attr('x', (data, index) => {
          return self.circieRadius + index * this.circieRadius * 2.3
        })
        .attr('y', 100)
        .attr('dy', '8')

      // draw lines
      let line = this.$d3
        .line()
        .x(d => d[0])
        .y(d => d[1])
      this.$d3
        .select('#variable-view')
        .selectAll('path')
        .data([
          [[100, 100], [200, 200]],
          [[100, 100], [200, 200]],
          [[100, 100], [200, 200]]
        ])
        .enter()
        .append('path')
        .attr('d', line)
    },
    update() {
      let headProtoNode = this.constructPrototypeNodeList()
      let nodeList = []
      let tempNode = headProtoNode
      while (tempNode) {
        nodeList.push(tempNode)
        tempNode = tempNode.getNext()
      }
      this.renderProtoNodes(nodeList)
    }
  },
  mounted() {
    function objToJson(obj) {
      const unAccessableKeys = ['caller', 'callee', 'arguments']
      if (!obj) return 'null'
      let result = {}
      Object.getOwnPropertyNames(obj).forEach(key => {
        if (unAccessableKeys.indexOf(key) !== -1) return
        result[key] = obj[key] + ''
      })
      return JSON.stringify(result, null, 4)
    }

    this.tipCaller = tip()
      .attr('class', 'tip-container')
      .offset([-20, 0])
      .html(d => {
        return `<div class="tooltip-container" style="white-space: pre; background-color: white;padding: 8px;
          border-radius: 8px; box-shadow: 0 2px 4px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12);">${objToJson(
            d.proto
          )}</div>`
      })
    let svgSelection = this.$d3.select('#variable-view')
    svgSelection.call(this.tipCaller)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.tip-container {
  background-color: red;
  border-radius: 8px;
  font-size: 100px;
}

.variable-view {
  min-height: 240px;
  width: 100%;

  #variable-view {
    width: 100%;
    height: 500px;
  }

  svg {
    circle {
      cursor: pointer;
    }

    text {
      font-weight: bold;
      font-size: 20px;
      pointer-events: none;
      text-anchor: middle;
    }

    path {
      stroke: black;
      stroke-width: 2px;
    }
  }
}
</style>
