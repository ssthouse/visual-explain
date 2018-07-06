<template>
  <div id="domRender">
    <div id="control-panel">
      <v-btn @click="previousStep()">Previous Step</v-btn>
      <v-btn @click="nextStep()">Next Step</v-btn>
      <v-btn @click="autoPlay()">Auto play</v-btn>
    </div>
    <div id="svg-container">
      <svg id="codeView"></svg>
      <svg id="domTree"></svg>
    </div>
  </div>
</template>

<script>
import CodeSnippet, { sampleCode, codeSteps } from './CodeSnippet'

export default {
  name: 'Root',
  data() {
    return {
      yScale: null,
      codeSnippet: null,
      codeView: null,
      domTree: null,
      sampleCode,
      codeSteps
    }
  },
  mounted() {
    this.codeSnippet = new CodeSnippet(this.sampleCode, this.codeSteps)
    this.domTree = this.$d3.select('#domTree')
    this.codeView = this.$d3.select('#codeView')
    window.code = this
  },
  methods: {
    previousStep() {
      this.codeSnippet.stepBackword()
      this.updateView(this.codeSnippet.getCurRows())
    },
    nextStep() {
      this.codeSnippet.stepForward()
      this.updateView(this.codeSnippet.getCurRows())
    },
    autoPlay() {
      console.log('auto play')
      this.codeSnippet.restore()
      for (let i = 0; i < this.codeSteps.length; i++) {
        this.codeSnippet.stepForward()
        this.updateView(this.codeSnippet.getCurRows())
      }
    },
    updateView(rows) {
      const textRows = this.codeView.selectAll('text').data(rows)
      textRows
        .enter()
        .append('text')
        .text(data => data)
        .attr('x', -100)
        .style('opacity', 0)
        .attr('xml:space', 'preserve')
        .transition()
        .attr('font-size', '20px')
        .attr('x', '30')
        .attr('y', (data, i) => (i + 1) * 30)
        .style('opacity', 1)
      textRows
        .exit()
        .transition()
        .attr('x', '-100px')
        .attr('y', 0)
        .style('opacity', 0)
        .remove()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
#domRender {
  height: 100%;
  width: 100%;

  #svg-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: stretch;

    #codeView,
    #domTree {
      width: 50%;
      height: 100%;
    }

    #codeView {
      background-color: whitesmoke;
    }

    #domTree {
      background-color: grey;
    }
  }
}
</style>
