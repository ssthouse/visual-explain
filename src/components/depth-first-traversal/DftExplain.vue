<template>
  <div>
    <tree-editor></tree-editor>
    <v-card>
      <v-card-title>Depth first traversal</v-card-title>
    </v-card>
  </div>
</template>
<script>
import { constructTestData, Dft } from './dft'
import TreeEditor from './TreeEditor.vue'

export default {
  name: 'DftExplain',
  components: { 'tree-editor': TreeEditor },
  data() {
    return {}
  },
  methods: {},
  mounted() {
    const rootNode = constructTestData()
    const dft = new Dft(rootNode, null)
    dft.start()
  }
}
</script>
