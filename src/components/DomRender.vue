<template>
  <div id="domRender">
    <v-textarea style="height: 100%; width: 50%;" label="" :auto-grow="true" :disabled="true" :value="exampleOne"></v-textarea>
    <svg id="svg"></svg>
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
    const mainSvg = this.$d3.select('svg')
    const selection = mainSvg.selectAll('text').data(['Hello   D3.js'])
    selection
      .enter()
      .append('text')
      .text(d => d)
      .attr('xml:space', 'preserve')
      .attr('x', 100)
      .attr('y', 100)
      .attr('font-family', 'sans-serif')
      .attr('font-size', '24px')

    console.log(this.exampleOne)
    const rows = this.exampleOne.split('\n')
    rows.forEach(row => console.log(row))

    // TODO:
    // 1. use scale to calculate y index for each row
    // 2. use d3.to insert each row into the svg
    // 3. use d3 to create DOM tree
    window.code = this
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#domRender {
  height: 100%;
  width: 100%;
}
</style>
