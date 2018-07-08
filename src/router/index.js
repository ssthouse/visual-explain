import Vue from 'vue'
import Router from 'vue-router'
import DOMRender from '../components/dom-render/DomRender'
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
    }
  ]
})
