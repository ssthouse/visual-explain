<template>
  <v-card>
    <v-card-title>Depth first traversal</v-card-title>
  </v-card>
</template>
<script>
import { constructTestData, Dft } from './dft'

export default {
  name: 'Dft',
  data() {
    return {}
  },
  methods: {},
  mounted() {
    const rootNode = constructTestData()
    const dft = new Dft(rootNode, curVal => console.log(curVal))
    dft.start()
  }
}
</script>
