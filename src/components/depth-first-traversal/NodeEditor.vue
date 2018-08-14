<template>
  <div class="tree-node" :style="{left: node.x + 'px', top: node.y + 'px',
      width: nodeWidth+'px', height: nodeWidth + 'px'}">
    <span>32</span>
  </div>
</template>

<script>
export default {
  props: ['node', 'nodeId', 'nodeWidth'],
  data() {
    return {}
  },
  methods() {}
}
</script>

<style>
.tree-node {
  background-color: aquamarine;
  position: absolute;
}
</style>
