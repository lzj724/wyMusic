/**
 * Created by Administrator on 2017/9/5.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getters from './getters'
import actions from './actions'
import mutations from './mutation'
Vue.use(Vuex)

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})