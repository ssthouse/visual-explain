import Vue from 'vue'
import Router from 'vue-router'
import DOMRender from '../components/dom-render/DomRender'
import PatentSuit from '../components/mobile-patent-suit/PatentSuit'
import DftExplain from '../components/depth-first-traversal/DftExplain'
import Index from '../components/Index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/list'
    },
    {
      path: '/list',
      name: 'index',
      component: Index
    },
    {
      path: '/list/domRender',
      name: 'domRender',
      component: DOMRender
    },
    {
      path: '/list/patent-suit',
      name: 'patent-suit',
      component: PatentSuit
    },
    {
      path: '/list/dft',
      name: 'dft',
      component: DftExplain
    }
  ]
})
