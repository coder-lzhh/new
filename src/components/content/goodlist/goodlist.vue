<template>
  <div id="goodlist">
    <goodlistitem  v-for="(item,index) in goods" :goodslist='item'
     :key="index"></goodlistitem>
  </div>
</template>

<script>
import goodlistitem from './GoodListItem'
export default {
  components: {
    goodlistitem
  },
  props:{
    goods:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
  watch: {}
};
</script>

<style  scoped>
#goodlist{
display: flex;
flex-wrap: wrap;
justify-content: space-around;
background: #efefef;
}

</style>