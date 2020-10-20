<template>
  <div id="app">
    <keep-alive exclude="detail">
     <router-view></router-view>
    </keep-alive>
    <tabbar></tabbar>
  </div>
</template>

<script>
import tabbar from "./components/content/tabbar/tabbar.vue";
export default {
  components: { tabbar },
};
</script>

<style>
@import url("./assets/reset.css");
@import url("../icon.css");
</style>
