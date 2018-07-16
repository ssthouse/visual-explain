<template>
  <div class="index-list">
    <div v-for="item in links" v-bind:key="item.to" class="item" @click="goto(item.to)">
      <span class="title" :to="item.to">{{item.title}}</span>
      <img :src="item.imgSrc" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Root',
  data() {
    return {
      links: [
        {
          title: 'Dom Render',
          to: '/list/domRender',
          imgSrc:
            'https://raw.githubusercontent.com/ssthouse/d3-blog/master/dom-render/img/step9.png'
        },
        {
          title: 'Mobile Patent Suit',
          to: '/list/patent-suit',
          imgSrc:
            'https://raw.githubusercontent.com/ssthouse/d3-blog/master/mobile-patent-suit/img/row_display.png'
        }
      ]
    }
  },
  methods: {
    goto(route) {
      if (!route) {
        return
      }
      this.$router.push(route)
    }
  },
  mounted() {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
* {
  padding: 0;
  margin: 0;
}

.index-list {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .item {
    cursor: pointer;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    width: 70vw;
    height: 180px;
    margin: 16px;
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);

    .title {
      width: 100%;
      text-align: left;
      padding: 8px;
      background-color: #eeeeee;
      z-index: 100;
    }

    img {
      position: absolute;
      width: 100%;
      box-shadow: none;
    }
  }

  .item:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    transition: box-shadow 500ms;
  }
}
</style>
