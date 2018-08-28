<template>
  <div>
    <div id='array-viz'></div>
    <button @click='push'>push</button>
    <button @click='pop'>pop</button>
  </div>
</template>

<script>
import ArrayViz from './array-viz.js'

export default {
  data() {
    return {
      arrayViz: null
    }
  },
  methods: {
    push() {
      this.arrayViz.push(parseInt((Math.random() * 10)))
    },
    pop() {
      this.arrayViz.pop()
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
