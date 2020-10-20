<template>
  <div id="all">
    <div>
      <img
        src="~assets/img/cart/tick.svg"
        :class="{ select: isselect }"
        @click="allclick"
      />
      <span>全选</span>
    </div>
    <div>合计：￥{{ priceall }}</div>
    <div @click="cacl">去结算({{ producenum }})</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["catproduce", "catproducelength"]),
    producenum() {
      return this.$store.state.producelist.filter((item) => item.select).length;
    },
    priceall() {
      return this.$store.state.producelist
        .filter((item) => item.select)
        .reduce((total, goods) => {
          return (total += goods.nowPrice * goods.count);
        }, 0)
        .toFixed(2);
    },
    isselect() {
      if (this.$store.state.producelist.length == 0) return false;
      return !this.$store.state.producelist.find((item) => !item.select);
    },
  },
  methods: {
    aaa() {
      let all = this.$store.state.producelist
        .filter((item) => item.select)
        .reduce((total, goods) => {
          total += goods.nowPrice * goods.count;
        }, 0);
      console.log(all);
      console.log(this.$store.state.producelist.filter((item) => item.select));
      return all;
    },
    allclick() {
      if (this.$store.state.producelist.find((item) => !item.select)) {
        this.$store.state.producelist.forEach((element) => {
          element.select = true;
        });
      } else {
        this.$store.state.producelist.forEach((element) => {
          element.select = false;
        });
      }
    },
    cacl() {
      if (!this.$store.state.producelist.find((item) => item.select)) {
        this.$toast.show("赶紧选择商品吧！");
      } else {
        this.$store.dispatch("buygoods").then((res) => {
          this.$toast.show(res);
        });
      }
    },
  },
  watch: {},
};
</script>

<style  scoped>
.select {
  background: #ff699c;
}
#all {
  height: 6vh;
  background: #eee;
  display: flex;
}
#all > div:nth-child(1) {
  width: 20vh;
  line-height: 6vh;
}
#all > div:nth-child(1) img {
  margin-left: 5px;
  margin-right: 8px;
  /* background: #000; */
  border-radius: 50%;
  width: 20px;
  height: 20px;
  border: 2px solid #ff699c;
  vertical-align: middle;
  margin-bottom: 6px;
}

#all > div:nth-child(2) {
  flex: 1;
  line-height: 6vh;
}
#all > div:nth-child(3) {
  width: 100px;
  text-align: center;
  line-height: 6vh;
  background: red;
  color: white;
}
</style>