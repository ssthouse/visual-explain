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
import CodeSnippet from './CodeSnippet'

export default {
  name: 'Root',
  data() {
    return {
      yScale: null,
      codeSnippet: null,
      codeView: null,
      domTree: null,
      exampleOne: `            <html>
                <body>
                    Hello QNimate!!!
                </body>
            </html>
            <html>
                <body>
                    Hello QNimate!!!
                </body>
            </html>`
    }
  },
  mounted() {
    this.codeSnippet = new CodeSnippet(this.exampleOne, [2, 2, 2, 2, 2])
    this.domTree = this.$d3.select('#domTree')
    this.codeView = this.$d3.select('#codeView')
    // const selection = mainSvg.selectAll('text').data(['Hello   D3.js'])
    // selection
    //   .enter()
    //   .append('text')
    //   .text(d => d)
    //   .attr('xml:space', 'preserve')
    //   .attr('x', 100)
    //   .attr('y', 100)
    //   .attr('font-family', 'sans-serif')
    //   .attr('font-size', '24px')

    console.log(this.exampleOne)
    const rows = this.exampleOne.split('\n')
    rows.forEach(row => console.log(row))

    // TODO:
    // 1. use scale to calculate y index for each row
    // 2. use d3.to insert each row into the svg
    // 3. use d3 to create DOM tree
    window.code = this
  },
  methods: {
    previousStep() {
      console.log('previos step')
      this.codeSnippet.stepBackword()
      this.updateView(this.codeSnippet.getCurRows())
    },
    nextStep() {
      this.codeSnippet.stepForward()
      this.updateView(this.codeSnippet.getCurRows())
      console.log('next step')
    },
    autoPlay() {
      console.log('auto play')
    },
    updateView(rows) {
      console.log(rows)
      const textRows = this.codeView.selectAll('text').data(rows)
      textRows
        .enter()
        .append('text')
        .text(data => data)
        .attr('x', -100)
        .style('opacity', 0)
        .attr('xml:space', 'preserve')
        .transition()
        .attr('font-size', '24px')
        .attr('x', '100')
        .attr('y', (data, i) => (i + 1) * 50)
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
