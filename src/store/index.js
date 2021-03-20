import Vuex from 'vuex'
import Vue from 'vue'
import admin from './admin'
/*eslint-disable*/
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: { admin }
})

export default store
