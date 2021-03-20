import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from '../pages/LoginPage'
import ManagerPage from '../pages/ManagerPage'
import UserManager from '../components/ManagerPage/UserManager/UserManager'
import SongListManager from '../components/ManagerPage/SongListManager/SongListManager'
import SongManager from '../components/ManagerPage/SongManager/SongManager'
import store from '../store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'LoginPage',
      component: LoginPage
    }, {
      path: '/manager/:adminID',
      name: 'ManagerPage',
      component: ManagerPage,
      children: [{
        path: 'user_manager',
        name: 'UserManager',
        component: UserManager
      }, {
        path: 'songlist_manager',
        name: 'SongListManager',
        component: SongListManager
      }, {
        path: 'song_manager',
        name: 'SongManager',
        component: SongManager
      }]
    }]
})
router.beforeEach((to, from, next) => {
  let isOK = to.name === 'LoginPage' || store.state.admin.isLogin
  if (isOK) {
    next()
  } else {
    next({ name: 'LoginPage' })
  }
})

export default router
