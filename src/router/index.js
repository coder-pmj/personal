import Vue from 'vue'
import VueRouter from "vue-router";
import Home from '@/views/Home.vue'
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: "/",
        name: 'home',
        meta: {
          title: "首页"
        },
        component: () => import('@/views/HomeItem.vue')
      }
    ]
  },
  {
    path: '/detail',
    component: Home,
    children: [
      {
        path: "/",
        name: 'detail',
        meta: {
          title: "详情"
        },
        component: () => import('@/views/Detail.vue')
      }
    ]
  },
  /* {
    path:"/detail",
    name:"detail",
    component:()=>import('@/views/Detail')
  } */
];

const router = new VueRouter({
  mode: "history",
  // base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  let title = to.meta.title
  if (title) {
    document.title = title
  }
  next()
})
export default router;
