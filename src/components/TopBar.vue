<template>
  <v-toolbar>
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title>Visual Explain</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat @click="openMyGithub()">
        <v-avatar size=42>
          <img src="https://avatars3.githubusercontent.com/u/10973821?s=460&v=4">
        </v-avatar>
        <span style="margin-left:8px;">About me: ssthouse</span>
      </v-btn>
      <v-tooltip bottom>
        <v-btn slot="activator" flat href="https://github.com/ssthouse/visual-explain">
          <v-avatar size=42>
            <img src="https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png">
          </v-avatar>
          Source Code
        </v-btn>
        <span class="top-bar-tooltip">Welcome to fork & star <br/> ; )</span>
      </v-tooltip>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    openMyGithub() {
      const a = document.createElement('a')
      a.target = '_blank'
      a.href = 'https://github.com/ssthouse'
      a.click()
    }
  }
}
</script>

<style>
.top-bar-tooltip {
  font-size: 18px;
}
</style>
