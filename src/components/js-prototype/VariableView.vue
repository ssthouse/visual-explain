<template>
  <div class="variable-view">
    <svg id="variable-view">
      {{variable.toString()}}
    </svg>
  </div>
</template>

<script>
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
      circieRadius: 100,
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
      console.log(head.getNext())
      return head.next
    },
    renderProtoNodes(nodeList) {
      let self = this
      let circleSelection = this.$d3
        .select('#variable-view')
        .selectAll('circle')
        .data(nodeList)
      circleSelection
        .enter()
        .append('circle')
        .attr('cx', (data, index) => {
          return self.circieRadius + index * 100
        })
        .attr('cy', 100)
        .attr('r', 30)
        .attr('fill', 'lightgrey')
        .on('mouseover', self.tipCaller.show)
        .on('mouseout', self.tipCaller.hide)

      circleSelection.exit().remove()
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
    this.tipCaller = tip()
      .attr('class', 'tip-container')
      .offset([-10, 0])
      .html(d => {
        return `<span>Hi, I am a tip!</span>`
      })
    let svgSelection = this.$d3.select('#variable-view')
    svgSelection.call(this.tipCaller)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.variable-view {
  min-height: 240px;
  width: 100%;

  #variable-view {
    width: 100%;
    height: 500px;
  }
}
</style>
