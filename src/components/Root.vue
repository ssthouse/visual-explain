<template>
  <svg id="svg"></svg>
</template>

<script>
export default {
  name: 'Root',
  data () {
    return {}
  },
  mounted () {
    const mainSvg = this.$d3.select('svg')
    const selection = mainSvg.selectAll('text')
      .data(['Hello D3.js'])
    selection.enter()
      .append('text')
      .text(d => d)
      .attr('x', 100)
      .attr('y', 100)
      .attr('font-family', 'sans-serif')
      .attr('font-size', '24px')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
