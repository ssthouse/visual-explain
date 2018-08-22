<template>
  <div class="tree-node" :style="{left: node.x + 'px', top: node.y + 'px',
      width: nodeWidth+'px', height: nodeWidth + 'px'}" @mouseover="onHover" @mouseout="onHoverOut">
    <span>{{node.value}}</span>
    <div :class="{'control-panel' : true, 'hidden': !showControlPanel}">
      <button class="delete-btn" @click="onDelete">delete</button>
      <div class="add-child-panel">
        <input placeholder="child value" v-model="childNodeValue" />
        <button @click="onAddChildNode">add child</button>
      </div>
    </div>
  </div>
</template>

<script>
import { Node } from './dft'

export default {
  props: ['node', 'nodeId', 'nodeWidth'],
  data() {
    return {
      showControlPanel: false,
      childNodeValue: 0
    }
  },
  methods: {
    onDelete() {
      this.$emit('delete', this.nodeId)
    },
    onAddChildNode() {
      const childNode = new Node(this.childNodeValue)
      this.$emit('addChildNode', this.node, childNode)
    },
    onHover() {
      // this.showControlPanel = true
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
    height: 100%;
    position: absolute;
    margin-left: -100px;
    margin-right: -100px;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 0;
    top: 0;

    .delete-btn {
      width: 100px;
      justify-self: flex-start;
    }

    .add-child-panel {
      background-color: aquamarine;
      width: 100px;
      margin-left: 48px;
      display: flex;
      align-items: center;
      flex-direction: column;
      align-self: flex-end;

      input {
        width: 100px;
      }
    }
  }
}
</style>
