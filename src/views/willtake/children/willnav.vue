<template>
  <NavBar>
    <div slot="left" class="navleft" @click="leftback">〈</div>

    <div slot="center" class="topcart">
      <span>待收货</span>
    </div>
  </NavBar>
</template>

<script>
import NavBar from "common/navbar/NavBar";

export default {
  components: { NavBar },

  data() {
    return {};
  },
  computed: {},
  methods: {
    leftback() {
      this.$router.back();
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
  font-size: 16px;

  .ok {
    color: #ff488b;
  }
}
</style>