import Vue from 'vue'
import VueRouter from 'vue-router'
import Feed from '../views/Feed.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Feed
  },
];

const router = new VueRouter({
  routes
});

export default router
