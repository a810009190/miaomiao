import Vue from 'vue'
import VueRouter from 'vue-router'
import movieRouter from './movie'
import mineRouter from './mine'
import cinemaRouter from './cinema'

Vue.use(VueRouter)
// const originalReplace = VueRouter.prototype.replace;
// VueRouter.prototype.replace = function replace(location) {
//     return originalReplace.call(this, location).catch(err => err);
// };





export default new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  base: 'miaomiao',
  routes: [
    movieRouter,
    mineRouter,
    cinemaRouter,
    {
      path : '/*',
      redirect : '/movie'
    }
  ]

})