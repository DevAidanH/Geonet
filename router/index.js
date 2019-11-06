import Vue from 'vue'
import Router from 'vue-router'
import firebase from "firebase"
import GMap from '@/components/home/GMap'
import Signup from '@/components/auth/Signup'
import Login from '@/components/auth/Login'
import ViewProfile from '@/components/profile/ViewProfile'
import Mission from '@/components/home/Mission'


Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'GMap',
      component: GMap,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/profile/:id',
      name: 'ViewProfile',
      component: ViewProfile,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/mission',
      name: 'Mission',
      component: Mission
    }
  ]
})

router.beforeEach((to, from, next) => {
  //check if route requires auth
  if(to.matched.some(rec => rec.meta.requiresAuth)){
    //check auth state
    let user = firebase.auth().currentUser
    if(user){
      next()
    }
    else{
      //no user signed in take to login
      next({ name: "Login" })
    }
  }
  else{
    next()
  }
})
export default router