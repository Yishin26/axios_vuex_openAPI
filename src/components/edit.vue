<template>
  <div class="edit">
    <p>
      <input type="text" v-model.trim="input" />
      <a href="javasript:;" v-on:click="updateHandler">UPDATE</a>
    </p>
  </div>
</template>

<script>
export default {
  name: "Edit",
};
</script>

<style>
</style>