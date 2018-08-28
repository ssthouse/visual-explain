<template>
  <div id="patent-suit">
    <svg class="main-svg"></svg>
  </div>
</template>

<script>
import GraphGenerator from './graphGenerator'

export default {
  name: 'PatentSuit',
  data() {
    return {
      graphGenerator: null
    }
  },
  methods: {},
  mounted() {
    const svgNode = this.$d3.select('.main-svg')
    this.graphGenerator = new GraphGenerator(svgNode, this.$d3)
    this.graphGenerator.draw()
    this.graphGenerator.drawSampleNodes()
  }
}
</script>

<style lang="less">
#patent-suit {
  display: flex;
  width: 100%;
  height: 100%;

  .main-svg {
    width: 100%;
    background-color: #eeeeee;

    .link {
      fill: none;
      stroke: #f44336;
      stroke-width: 1.5px;
    }

    #licensing {
      fill: #009688;
    }

    #suit {
      fill: #f44336;
    }

    #resolved {
      fill: #1565c0;
    }

    .link.licensing {
      stroke: #009688;
    }

    .link.resolved {
      stroke: #1565c0;
      stroke-dasharray: 0, 2 1;
    }

    circle {
      fill: #fff;
      stroke: grey;
      stroke-width: 1.5px;
    }

    text {
      font: 14px sans-serif;
      pointer-events: none;
      text-shadow: 0 1px 0 #fff, 1px 0 0 #fff, 0 -1px 0 #fff, -1px 0 0 #fff;
    }

    .msg-title {
      font-size: 16px;
      font-weight: bold;
    }
  }
}
</style>
