// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Routes from './router/routes' 
Vue.config.productionTip = false;

Vue.use(VueRouter);


const router = new VueRouter({
  routes: Routes,
  mode: 'history'
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  components: { App },
  template: '<App/>'
})
