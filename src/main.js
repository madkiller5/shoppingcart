// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Routes from './router/routes' 
import firebase from 'firebase'

Vue.config.productionTip = false;

export const bus = new Vue();

Vue.use(VueRouter);
Vue.use(firebase);

var config = {
  apiKey: "AIzaSyCENopKIPdmtn-u-ynm_sWyO8TKpgeXudk",
  authDomain: "shoppingcart-vue.firebaseapp.com",
  databaseURL: "https://shoppingcart-vue.firebaseio.com",
  projectId: "shoppingcart-vue",
  storageBucket: "shoppingcart-vue.appspot.com",
  messagingSenderId: "72163094569"
};
firebase.initializeApp(config);


const router = new VueRouter({
  routes: Routes,
  mode: 'history'
});

Vue.filter('price-convert',function(value){
  return value/100;
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  components: { App },
  template: '<App/>'
})
