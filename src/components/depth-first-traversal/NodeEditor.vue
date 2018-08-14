<template>
  <div class="tree-node" :style="{left: node.x + 'px', top: node.y + 'px',
      width: nodeWidth+'px', height: nodeWidth + 'px'}" @mouseover="onHover" @mouseout="onHoverOut">
    <span>{{node.value}}</span>
    <div :class="{'control-panel' : true, 'hidden': !showControlPanel}">
      <button class="delete-btn">delete</button>
    </div>
  </div>
</template>

<script>
import { Node } from './dft'

export default {
  props: ['node', 'nodeId', 'nodeWidth'],
  data() {
    return {
      showControlPanel: false
    }
  },
  methods: {
    onDelete() {
      this.$emit('delete', this.nodeId)
    },
    onAddChildNode() {
      const childNode = new Node(1)
      this.$emit('addChildNode', childNode)
    },
    onHover() {
      this.showControlPanel = true
    },
    onHoverOut() {
      this.showControlPanel = false
    }
  }
}
</script>

<style lang="less">
.hidden {
  visibility: hidden;
}

.tree-node {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: aquamarine;
  position: absolute;

  .control-panel {
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 0;
    top: 0;

    .delete-btn {
      margin-left: -100px;
    }
  }
}
</style>
