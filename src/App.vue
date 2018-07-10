<template>
  <v-app id="app">
    <top-bar :indexRoute="indexRoute"></top-bar>
    <router-view/>
  </v-app>
</template>

<script>
import TopBar from './components/TopBar'

export default {
  components: { 'top-bar': TopBar },
  name: 'App',
  data() {
    return {
      indexRoute: '/list'
    }
  }
}
</script>

<style>
body {
  width: 100vw;
  height: 100vh;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
}
</style>
