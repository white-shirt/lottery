import Vue from 'vue'
import Vuex from 'vuex'
import lucky from './modules/lucky.js'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    lucky
  }
});