import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cityInfo:{}
  },
  mutations: {
    // this.$store.commit("uptCityInfo",)
    uptCityInfo(state,val){
      state.cityInfo = val
    }
  },
  actions: {
  },
  modules: {
  }
})
