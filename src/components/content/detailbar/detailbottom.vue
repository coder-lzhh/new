<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div @click="collect">
        <i class="icon select" :class="{iscollect:iscollect}"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addTo(false)">加入购物车</div>
      <div class="buy" @click="addTo(true)">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    iscollect: {
      type: Boolean,
    },
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    addTo(flag) {
      this.$emit("addTo", flag);
    },
    collect() {
      this.$emit("collect");
    },
  },
  watch: {},
};
</script>

<style  scoped>
.bottom-bar {
  height: 8vh;
  position: fixed;
  background-color: #fff;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  display: flex;
  text-align: center;
}

.bar-item {
  flex: 1;
  display: flex;
}

.bar-item > div {
  flex: 1;
}

.bar-left .text {
  font-size: 13px;
}

.bar-left .icon {
  display: block;
  width: 22px;
  height: 22px;
  margin: 10px auto 3px;
  background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
}

.bar-left .service {
  background-position: 0 -54px;
}
.bar-left .iscollect {
  background-position: 0 -27px;
}

.bar-left .shop {
  background-position: 0 -98px;
}

.bar-right {
  font-size: 15px;
  color: #fff;
  line-height: 58px;
}

.bar-right .cart {
  background-color: #ffe6e8;
  color: #ff498c;
}

.bar-right .buy {
  /* background-color: #ff488b; */
  background-image: linear-gradient(to right, #ff5678, #ff488b);
}
</style>