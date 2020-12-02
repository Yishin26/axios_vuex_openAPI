import Vue from "vue";
import App from "./App.vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import routers from "./routers";

Vue.use(Vuex);
Vue.use(VueRouter);

let store = new Vuex.Store({
  state: {
    contents: []
  }
});

new Vue({
  render: (h) => h(App),
  routers,
  store
}).$mount("#app");
