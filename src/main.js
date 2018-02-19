import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Axios from 'axios'
import store from './store'
import jsonp from 'vue-jsonp'
import VueLazy from 'vue-lazyload'
import VueScroll from 'vue-scroll'
import filter from './common/filter'
import './common/sass/index.scss'
import './common/sass/reset.css'
import './common/iconfont/iconfont.css'
// import VueMaterial from 'vue-material'
// import 'vue-material/dist/vue-material.css'
// Vue.use(VueMaterial)
import VueTouch from 'vue-touch'
Vue.use(VueTouch, {name: 'v-touch'})
Vue.use(VueScroll)
Vue.use(jsonp)
Vue.use(VueLazy,{
    preLoad: 1.3,
    error: '/static/2.jpg',
    loading: '/static/1.jpg',
    attempt: 1
})
Vue.prototype.$Axios = Axios;
// Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
    store,
    el: '#app',
    router,
    render: h => h(App)
})
