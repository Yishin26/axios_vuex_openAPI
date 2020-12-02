<template>
  <div class="list">
    <p>
      <input type="text" placeholder="Input name..." v-model.trim="input" />
      <button @click="createItem">CREATE</button>
    </p>
    <h2>項目數：{{ contents.length }}</h2>
    <li class="list-item" v-for="(item, index) in contents" :key="item.id">
      <h4>{{ index + 1 }}. {{ item.name }}</h4>
      <p>{{ item.id }}</p>
      <button class="delete-btn">刪除</button>
    </li>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "List",
  data() {
    return {
      input: "",
    };
  },
  computed: {
    contents() {
      return this.$store.state.contents;
    },
  },
  methods: {
    createItem() {
      //this=> vue
      this.$store.dispatch("CONTENTS_ADD", this.input).then((res) => {
        this.input = "";
      });
    },
  },
  mounted() {
    this.$store.dispatch("CONTENTS_READ");
  },
};
</script>

<style lang='less'>
.list li {
  list-style: none;
  line-height: 8px;
}
.list-item {
  box-shadow: 0px 0px 5px gray;
  padding: 1px 10px;
  background-color: rgb(236, 236, 236);
  position: relative;
  margin: 12px;
}
.delete-btn {
  position: absolute;
  right: 10px;
  top: 10px;
  background: orangered;
  color: white;
  outline: none;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  padding: 2px 10px;
  &:hover {
    background: darken(orangered, 10%);
  }
}
</style>