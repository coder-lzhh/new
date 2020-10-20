<template>
  <div class="swipercon">
    <Swiper v-if="images.length > 0" id="Swiper">
      <Slide v-for="(item,index) in images" :key="index">
        <img :src="item" alt />
      </Slide>
    </Swiper>

  </div>
  <!-- <Swiper  class="detailswiper">
    <SwiperItem v-for="(item,index) in images" :key="index">
      <img :src="item" alt="">
    </SwiperItem>
  </Swiper>-->
</template>

<script>
// import { Swiper, SwiperItem } from "common/swiper/index";
import { Swiper, Slide } from "vue-swiper-component";
export default {
  name: "detailswiper",
  components: { Swiper, Slide },
  props: {
    images: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      load: true,
    };
  },
  computed: {},
  methods: {
    truncart() {
      this.$router.push('/shopcart').catch(() => {});
    },
  },
  watch: {},
};
</script>

<style  scoped lang='less'>
#Swiper {
  height: 100vw;
}
#Swiper img {
  width: 100%;
}
.swipercon {
  overflow: hidden;
  height: 0;
  padding-bottom: 100%;
  .topcart {
    position: absolute;
    top: 2vh;
    right: 2vw;
    z-index: 9;
    font-size: 20px;
    background: rgba(0, 0, 0, 0.5);
    padding: 10px;
    border-radius: 50%;
    img {
      width: 7vw;
    }
  }
}
</style>

<style scoped>
.swipercon >>> .wh_show_bgcolor {
  background: #ff699c;
}
</style>