<template>
  <div class="sell">
    <div v-for="(item,index) in sell" class="item" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt />
      </a>
      <div class="text">{{item.title}}</div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    sell: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  created() {},
  computed: {},
  methods: {},
  watch: {},
};
</script>

<style  scoped lang='less'>
.sell {
  display: flex;
  text-align: center;
  overflow: hidden;
  height: 0;
  padding-bottom: 22.5%;

  .item {
    position: relative;
    width: 25vw;
    img {
      width: 90%;
      border-radius: 5px;
    }
  }
  .text {
    position: absolute;
    // z-index: 10;
    // text-align: center;
    bottom: -20vw;
    // top: -100%;
    // bottom: ;
    left: 15%;
    color: white;
    font-size: 16px;
    // transform: translateX(-50%);
  }
}
</style>