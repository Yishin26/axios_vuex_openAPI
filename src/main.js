import Vue from "vue";
import App from "./App.vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import List from "./components/list.vue";
import Edit from "./components/edit.vue";
import axios from "axios";

Vue.use(Vuex);
Vue.use(VueRouter);

var routers = new VueRouter({
  routes: [
    {
      path: "/",
      name: "list",
      component: List
    },
    {
      path: "/update/:id",
      name: "update",
      component: Edit
    },
    {
      path: "*",
      redirect: "/"
    }
  ],
  mode: "history"
});

let store = new Vuex.Store({
  state: {
    contents: []
  },
  mutations: {
    //讀資料
    setContents(state, data) {
      state.contents = data;
    },
    //加資料
    addContent(state, data) {
      state.contents.unshift(data);
    },
    //殺資料
    deleteContent(state, index) {
      console.log("DELETE");
      state.contents.splice(index, 1);
    }
    //更新資料
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
