<template>
  <div id='array-viz'></div>
</template>

<script>
import ArrayViz from './array-viz.js'

export default {
  data() {
    return {
      arrayViz: null
    }
  },
  mounted() {
    this.arrayViz = new ArrayViz([1, 2, 3, 4])
    this.arrayViz.domId('array-viz').start()
  }
}
</script>

<style>
</style>
