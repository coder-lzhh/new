<template>
  <div class="con">
    <Swiper v-if="banners.length > 0" id="Swiper">
      <Slide v-for="(item,index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" />
        </a>
      </Slide>
    </Swiper>
  </div>
</template>

<script>
import { Swiper, Slide } from "vue-swiper-component";
export default {
  components: { Swiper, Slide },
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
  watch: {},
};
</script>

<style  scoped>
.con {
  overflow: hidden;
  height: 0;
  padding-bottom: 34.63%;
}

#Swiper img {
  width: 100%;
}
.con >>> .wh_show_bgcolor {
  background: #ff699c;
}
</style>