import Vue from "vue";
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {   
      path: "/login",
      name: "login",
      meta: {layout: 'auth'},
      component: () => import('../views/Login.vue')
    },  
    {   
      path: "/register",
      name: "register",
      meta: {layout: 'auth'}, 
      component: () => import('../views/Register.vue')
    },  
    {
      path: "/",
      name: "Home",
      meta: {layout: 'main'},
      component: () => import('../views/Home.vue')
    },
    {
      path: "/categories",
      name: "categories",
      meta: {layout: 'main'},
      component: () => import('../views/Categories.vue')
    },
    {
      path: "/records",
      name: "records",
      meta: {layout: 'main'},
      component: () => import('../views/DetailRecords.vue')
    },
    {
      path: "/history",
      name: "history",
      meta: {layout: 'main'},
      component: () => import('../views/History.vue')
    },
    {
      path: "/planning",
      name: "planning",
      meta: {layout: 'main'},
      component: () => import('../views/Planning.vue')
    },
    {
      path: "/profile",
      name: "profile",
      meta: {layout: 'main'},
      component: () => import('../views/Profile.vue')
    },
    {
      path: "/record",
      name: "record",
      meta: {layout: 'main'},
      component: () => import('../views/Record.vue')
    },
  ]
});