<template>
  <div id="goodlistitem" @click="listitemclick">
    <div class="imgs">
      <img v-lazy="img" @load="imgload" />
    </div>

    <p>{{ goodslist.title }}</p>
    <div id="span">
      <span class="price">￥{{ goodslist.price }}</span>
      <span class="collect">
        <i class="iconfont icon-shoucang"></i>
        {{ goodslist.cfav }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    goodslist: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  computed: {
    img() {
      return (
        this.goodslist.img || this.goodslist.image || this.goodslist.show.img
      );
    },
  },
  methods: {
    listitemclick() {
      // console.log("object")
      this.$router.push("/detail/" + this.goodslist.iid);
    },
    imgload() {
      this.$bus.$emit("imgload");
    },
  },
  watch: {},
};
</script>

<style  scoped>
#goodlistitem {
  width: 48%;
  flex-basis: 48%;
  background: white;
  margin-bottom: 2vh;
  border-radius: 5px;
}
#goodlistitem img {
  width: 100%;
  height: 72vw;
  border-radius: 5px;
}
.imgs {
  overflow: hidden;
  height: 0;
  padding-bottom: 150%;
}
#goodlistitem p {
  /* width: 150px; */
  padding-top: 1vh;
  padding-left: 1vh;
  line-height: 16px;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.price {
  color: #ff699c;
  font-weight: bold;
  font-size: 16px;
}
#span {
  padding: 1vh 0;
  display: flex;
  justify-content: space-evenly;
}
</style>