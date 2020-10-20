<template>
  <div class="tarBarItem" @click="btn">
    <div v-if="isshow">
      <slot name="tabbarimgact"></slot>
    </div>
    <div v-else>
      <slot name="tabbarimg"></slot>
    </div>
    <div :style="isact">
      <slot name="tabbartext"></slot>
    </div>
  </div> 
</template>

<script>
export default {
  components: {},
  props: {
    path: String,
    isstyle:{
      tpye:String,
      default:'red'
    }
  },
  data() {
    return {
      // isact: true
    };
  },
  computed: {
    isshow(){
      // console.log(this.$route)
      // console.log(this.path);
      // console.log(this.$route.path.includes(this.path))
      return this.$route.path.includes(this.path)
    },
    isact(){
      return this.isshow? {color:this.isstyle}:{}
    }

  },
  methods: {
    btn() {

      this.$router.push(this.path).catch(()=>{})
    }
  },
  watch: {} 
};
</script>

<style  scoped>
.tarBarItem {
  flex: 1;
  text-align: center;
  /* height: 49px; */
  height: 8vh;
}
.tarBarItem img {
  width: 25px;
  margin-top: 3px;
  margin-bottom: 5px;
  vertical-align: middle;
}
.active {
  color: red;
}
</style>