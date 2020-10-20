<template>
  <div class="recommend">
    <div v-for="(item,index) in recommends" class="item" :key="index">
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
    recommends: {
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
.recommend {
  display: flex;
  height: 0;

  flex-wrap: wrap;
  overflow: hidden;
  padding-bottom: 62%;
  text-align: center;
  // font-size: 14px;
  // margin-top: 10px;
  // padding-bottom: 20px;
  // border-bottom: 10px solid #eee;
  .item {
    width: 20%;
    // box-sizing: border-box;
    padding: 5px 0;
    .text{
      padding-top: 3.5px;
    }
    img {
      /* margin-bottom: 5px; */
      width: 50px;
    }
  }
}
</style>