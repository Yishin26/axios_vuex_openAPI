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
    },
    addContent(state, data) {
      state.contents.push(data);
    }
  },
  actions: {
    CONTENTS_ADD: (context, input) => {
      if (!input) return false;
      axios
        .post("https://lqrqc.sse.codesandbox.io/products", {
          name: input
        })
        .then((res) => {
          // this.contents.push(res.data)
          context.commit("addContent", res.data);
        });
    },
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
