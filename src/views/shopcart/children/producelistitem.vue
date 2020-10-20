<template>
  <div>
    <ul>
      <li v-for="(item,index) in catproduce" :key="index" class="listitem">
        <div id="left">
          <img
            id="img"
            src="~assets/img/cart/tick.svg"
            @click="imgclick(item)"
            :class="{select:item.select}"
          />
        </div>
        <div>
          <img :src="item.img" id="itemimg" />
        </div>
        <div id="rigth">
          <p id="title">{{item.title}}</p>
          <p id="desc">{{item.sizee}} {{item.stylee}}</p>
          <div id="stars">
            <span id="oldPrice">￥{{item.nowPrice }}</span>
            <div class="changenum">
              <div class="sub" @click="sub(item)" :class="{none:item.count<=1}">-</div>
              <div class="num">{{item.count}}</div>
              <div class="add" @click="add(item)">+</div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  components: {},
  data() {
    return {
      // isact: true
    };
  },
  computed: {
    ...mapGetters(["catproduce"]),
  },

  methods: {
    imgclick(item) { 
      // item.select = !item.select;
      this.$store.commit("isselect", item);
    },
    sub(item) {
      if (item.count == 1) {
        let flag = confirm("是否删除该商品？");
        if (flag) {
          this.$store.commit("deleteitem", item);
        }
      } else {
        this.$store.commit("sub", item);
      }
    },
    add(item) {
      this.$store.commit("add", item);
    },
  },
  watch: {},
};
</script>

<style  scoped lang='less'>
.listitem {
  display: flex;
  height: 20vh;
  border: 3px solid #eee;
}
.listitem #itemimg {
  width: 14vh;
  height: 100%;
  border-radius: 10px;
  margin-right: 5px;
  margin-left: 5px;
  padding: 1px;
}
#left {
  /* background: red; */
  line-height: 20vh;
}
#img {
  /* background: #ff699c; */
  width: 20px;
  height: 20px;
  /* display: block; */
  border-radius: 50%;
}
#left img {
  vertical-align: middle;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  /* border: 2px solid #ccc; */
  border: 2px solid #ff699c;
}
.select {
  border: 2px solid #ff699c;
  background: #ff699c;
}
#rigth {
  padding: 5px;
  flex: 1;
}
#stars {
  display: flex;
  justify-content: space-between;
}
#oldPrice {
  font-size: 20px;
  color: red;
  line-height: 25px;
}
#count {
  font-size: 18px;
}
#title {
  color: black;
  font-size: 18px;
  max-width: 230px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
#desc {
  padding-top: 25px;
  padding-bottom: 25px;
  max-width: 230px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.none {
  background: #ddd;
  // pointer-events: none;
}
.changenum {
  padding-top: 3px;
  display: flex;
  font-size: 20px;
  text-align: center;
  .sub {
    border: 1px solid #ddd;
    width: 25px;
    height: 25px;
    line-height: 25px;
  }
  .num {
    width: 30px;
    height: 25px;
    line-height: 25px;
  }
  .add {
    border: 1px solid #ddd;
    width: 25px;
    height: 25px;
    color: #ff4e84;
    line-height: 25px;
  }
}
</style>