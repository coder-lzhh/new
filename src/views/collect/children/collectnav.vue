<template>
  <NavBar>
    <div slot="left" class="navleft" @click="leftback">〈</div>

    <div slot="right" class="topcart" @click="ismanage">
      <span v-if="!flag">管理</span>
      <span v-else class="ok">完成</span>
    </div>
  </NavBar>
</template>

<script>
import NavBar from "common/navbar/NavBar";

export default {
  components: { NavBar },

  data() {
    return {
      nowindex: 0,
      flag: false,
    };
  },
  computed: {},
  methods: {
    leftback() {
      this.$router.back();
      this.flag = false;
      this.$emit("ismanage", this.flag);
    },
    centerclick(index) {
      this.nowindex = index;
      this.$emit("navindex", index);
    },
    truncart() {
      this.$router.push("/shopcart").catch(() => {});
    },
    ismanage() {
      this.flag = !this.flag;
      this.$emit("ismanage", this.flag);
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