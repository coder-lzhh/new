<template>
  <div class="navbar" >
<div class="left"><slot name="left"></slot></div>
<div class="center"><slot name="center"></slot></div>
<div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
  watch: {}
};
</script>

<style  scoped>
.navbar{
  display: flex;
  /* height: 44px; */

  height: 7vh;
  line-height: 7vh;
}
.left,.right{
width: 60px;  
/* background: aqua; */
}
.center{
  flex:1;
  text-align: center;
  /* background: antiquewhite; */
}
</style>