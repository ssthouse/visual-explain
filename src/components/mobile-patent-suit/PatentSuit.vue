<template>
  <div id="patent-suit">
    <svg class="main-svg"></svg>
    <div class="explain-panel"></div>
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
    const svgNode = this.$d3.select('#main-svg')
    this.graphGenerator = new GraphGenerator(svgNode, this.$d3)
    this.graphGenerator.draw()
  }
}
</script>

<style lang="less">
#patent-suit {
  display: flex;
  width: 100%;
  height: 100%;

  .main-svg {
    width: 60%;
    background-color: #eeeeee;

    .link {
      fill: none;
      stroke: #666;
      stroke-width: 1.5px;
    }

    #licensing {
      fill: green;
    }

    .link.licensing {
      stroke: green;
    }

    .link.resolved {
      stroke-dasharray: 0, 2 1;
    }

    circle {
      fill: #ccc;
      stroke: #333;
      stroke-width: 1.5px;
    }

    text {
      font: 10px sans-serif;
      pointer-events: none;
      text-shadow: 0 1px 0 #fff, 1px 0 0 #fff, 0 -1px 0 #fff, -1px 0 0 #fff;
    }
  }

  .explain-panel {
    width: 40%;
  }
}
</style>
