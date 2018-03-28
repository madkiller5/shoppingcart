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
Vue.filter('firstLetterUpperCase',function(value){
  return value[0].toUpperCase() + value.slice(1);
});
Vue.filter('math-decimal',function(value){
  value = value.toString();
  switch(value.length){
    case 1:
    case 2:
      return value+".00";
      break;
    case 3:
      return value+"0";
      break;
    default:
      return value;
      break;
  }
  
});
Math.decimal = function(n, k) 
{
    var factor = Math.pow(10, k+1);
    n = Math.round(Math.round(n*factor)/10);
    return n/(factor/10);
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  components: { App },
  template: '<App/>'
})
