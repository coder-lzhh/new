<template>
  <div class="shopcart">
    <NavBar class="NavBar">
      <div slot="center">购物车({{catproducelength}})</div>
    </NavBar>

    <div class="cartBS" ref="cartBS">
      <div>
        <ProduceList></ProduceList>
      </div>
    </div>
    <ProduceAll></ProduceAll>
  </div>
</template>

<script>
import NavBar from "common/navbar/NavBar";
import BScroll from "better-scroll";
import ProduceList from "./children/producelist";
import ProduceAll from "./children/produceall";

import { mapGetters } from "vuex";
export default {
  components: { NavBar, ProduceList, ProduceAll },
  props: {},
  data() {
    return {};
  },
  created() {
    this.cart();
  },
  computed: { ...mapGetters(["catproducelength"]) },
  methods: {
    cart() {
      this.$nextTick(() => {
        this.initBS();
      });
    },
    initBS() {
      if (!this.cartBS) {
        this.cartBS = new BScroll(this.$refs.cartBS, {
          click: true,
        });
      } else {
        this.cartBS.refresh();
      }
    },
  },
  activated() {
    if (this.cartBS) {
      this.cartBS.refresh();
    }
  },
  watch: {},
};
</script>

<style  scoped lang='less'>
.shopcart {
  height: 100vh;
  .NavBar {
    background-image: linear-gradient(to right, #ff5678, #ff488b);

    color: white;
    font-weight: bold;
    font-size: 18px;
    position: relative;
    z-index: 10;
  }
  .cartBS {
    width: 100%;
    height: 79vh;
    overflow: hidden;
  }
}
</style>