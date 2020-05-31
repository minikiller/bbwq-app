import Vue from 'vue'
import Router from 'vue-router'
import Lang from '@/components/Lang'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/views/login/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Lang',
      component: Lang
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
