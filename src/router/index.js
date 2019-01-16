import Vue from 'vue'
import Index from '../components/Index'
import Router from 'vue-router'
const DOMRender = () => import('../components/dom-render/DomRender')
const PatentSuit = () => import('../components/mobile-patent-suit/PatentSuit')
const DftExplain = () =>
  import('../components/depth-first-traversal/DftExplain')
const VisualPrototype = () =>
  import('../components/js-prototype/VisualPrototype')

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
    },
    {
      path: '/list/js-prototype',
      name: 'js-prototype',
      component: VisualPrototype
    }
  ]
})
