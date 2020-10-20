<template>
  
    <TabBar> 
      <TabBarItem path="/home" >
        <img slot="tabbarimg" src="~assets/img/tabbar/home.svg">
        <img slot="tabbarimgact" src="~assets/img/tabbar/home_active.svg" alt />
        <div slot="tabbartext">首页</div>
      </TabBarItem>
      <TabBarItem path="/category" >
        <img slot="tabbarimg" src="~assets/img/tabbar/category.svg" alt />
        <img slot="tabbarimgact" src="~assets/img/tabbar/category_active.svg" alt />
        <div slot="tabbartext">分类</div>
      </TabBarItem>
      <TabBarItem path="/shopcart" >
        <img slot="tabbarimg" src="~assets/img/tabbar/cart.svg" alt />
        <img slot="tabbarimgact" src="~assets/img/tabbar/cart_active.svg" alt />
        <div slot="tabbartext">购物车</div>
      </TabBarItem>
      <TabBarItem path="/profile">
        <img slot="tabbarimg" src="~assets/img/tabbar/profile.svg" alt />
        <img slot="tabbarimgact" src="~assets/img/tabbar/profile_active.svg" alt />
        <div slot="tabbartext">我的</div>
      </TabBarItem>
    </TabBar>
 
</template>

<script>
import TabBar from "common/TabBar/TabBar.vue";
import TabBarItem from "common/TabBar/TabBarItem";
export default {
  components: {
    TabBar,
    TabBarItem
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
  watch: {}
};
</script>

<style  scoped>
</style>