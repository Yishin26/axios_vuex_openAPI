<template>
  <div class="list">
    <p>
      <input type="text" placeholder="Input name..." v-model.trim="input" />
      <button @click="createItem">新增</button>
    </p>
    <h2>項目數：{{ contents.length }}</h2>
    <li class="list-item" v-for="(item, index) in contents" :key="item.id">
      <h4>
        {{ index + 1 }}. Name:<span class="circle">{{ item.name }}</span>
        id:<span class="circle gray-circle">{{ item.id }}</span>
      </h4>

      <button class="delete-btn" @click="deleteItem(item)">刪除</button>
    </li>
  </div>
</template>

<script>
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
    gotoEdit(item) {
      console.log(this);
    },
    createItem() {
      //this=> vue
      this.$store.dispatch("CONTENTS_ADD", this.input).then((res) => {
        this.input = "";
      });
    },
    deleteItem(item) {
      this.$store.dispatch("CONTENTS_DELETE", item);
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
.circle {
  background: aquamarine;
  margin: 5px;
  padding: 2px 10px;
  border-radius: 50px;
}
.gray-circle {
  background-color: rgb(212, 212, 212);
  color: rgb(80, 80, 80);
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
.edit-btn {
  position: absolute;
  right: 65px;
  background: green;
  &:hover {
    background: darken(green, 10%);
  }
}
</style>