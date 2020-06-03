import Vue from "vue";
import VueRouter from "vue-router";

import Auth from "../layouts/Auth.vue"
import Home from "../views/Home.vue";

import NonAuth from "../layouts/NonAuth.vue"
import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Auth,
    children: [
      {
        path: "/",
        name: "Home",
        component: Home
      },
      {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/About.vue")
      }
    ]
  },
  {
    path: "/",
    component: NonAuth,
    children: [
      {
        path: "/login",
        name: "Login",
        component: Login
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {

  const params = {
    token: localStorage.getItem('accessToken')
  }

  Vue.axios.post("auth", params)
    .then(auth => {
      console.log("Auth")
      if ((to.path !== '/login' && to.path !== 'login') && !auth.data) {
        next({ path: '/login' })
      } else if ((to.path === '/login' || to.path === 'login') && auth.data) {
        next({ path: '/' })
      } else {
        next()
      }
    })

})

export default router;
