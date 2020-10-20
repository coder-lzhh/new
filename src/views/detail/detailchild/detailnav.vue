<template>
  <NavBar>
    <div slot="left" class="navleft" @click="leftback">〈</div>
    <div slot="center" class="navcenter">
      <span
        class="navcenteritem"
        v-for="(item,index) in title"
        :key="index"
        :class="{act:index==nowindex }"
        @click="centerclick(index)"
      >{{item}}</span>
    </div>
    <div slot="right" class="topcart" @click="truncart">
      <img src="~assets/img/tabbar/cart_active.svg" alt />
    </div>
  </NavBar>
</template>

<script>
import NavBar from "common/navbar/NavBar";

export default {
  components: { NavBar },
  data() {
    return {
      title: ["商品", "参数", "评论", "推荐"],
      nowindex: 0,
    };
  },
  computed: {},
  methods: {
    leftback() {
      this.$router.back();
    },
    centerclick(index) {
      this.nowindex = index;
      this.$emit("navindex", index);
    },
    truncart() {
      this.$router.push("/shopcart").catch(() => {});
    },
  },
  watch: {},
};
</script>

<style  scoped lang='less'>
.navcenter {
  display: flex;
}
.navcenteritem {
  flex: 1;
  font-size: 16px;
}
.navleft {
  text-align: center;
  font-size: 16px;
}
.act {
  color: #ff699c;
}
.topcart {
  text-align: center;
  img {
    width: 7vw;
  }
}
</style>