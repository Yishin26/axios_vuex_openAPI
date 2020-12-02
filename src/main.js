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
    },
    deleteContent(state, index) {
      console.log("DELETE");
      state.contents.splice(index, 1);
    }
  },
  actions: {
    CONTENTS_DELETE(context, item) {
      let index = context.state.contents.indexOf(item);
      if (index == -1) return false;
      //console.log(index);
      return axios
        .delete("https://lqrqc.sse.codesandbox.io/products/" + item.id)
        .then((res) => {
          context.commit("deleteContent", index);
        });
    },
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
          context.commit("setContents", res.data.reverse());
        });
    }
  }
});

new Vue({
  render: (h) => h(App),
  routers,
  store
}).$mount("#app");
