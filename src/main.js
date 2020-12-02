import Vue from "vue";
import App from "./App.vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import List from "./components/list.vue";
import axios from "axios";

Vue.use(Vuex);
Vue.use(VueRouter);

let myRouter = [
  {
    path: "/",
    name: "list",
    component: List
  },

  {
    path: "*",
    redirect: "/"
  }
];

let routers = new VueRouter({ routes: myRouter, mode: "history" });
let store = new Vuex.Store({
  state: {
    contents: []
  },
  mutations: {
    setContents(state, data) {
      state.contents = data;
    }
  },
  actions: {
    CONTENTS_READ: (context) => {
      return axios
        .get("https://lqrqc.sse.codesandbox.io/products")
        .then((res) => {
          context.commit("setContents", res.data);
        });
    }
  }
});

new Vue({
  render: (h) => h(App),
  routers,
  store
}).$mount("#app");
