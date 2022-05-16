import Vue from 'vue'
import App from './App.vue'
import router from "./router/index"
import vuetify from "@/plugins/vuetify"
import axios from 'axios'
import moment from 'moment'
import ScrollAnimation from './directives/scrollanimation'

Vue.directive('scrollanimation', ScrollAnimation);

Vue.config.productionTip = false

Vue.prototype.$moment = moment
Vue.prototype.$http = axios //code standar untuk menggunakan axios
Vue.prototype.$api = 'http://127.0.0.1:8000/api' //link backend
Vue.prototype.$baseUrl = 'http://127.0.0.1:8000' //link backend untuk foto

Date.prototype.substractHours= function(h){
  this.setHours(this.getHours()-h);
  return this;
}

Date.prototype.addHours= function(h){
  this.setHours(this.getHours()+h);
  return this;
}

new Vue({ 
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
