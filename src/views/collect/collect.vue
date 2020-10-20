
<template>
  <div class="collectcon">
    <div>
      <CollectNav class="collectnav" @ismanage="ismanage" ref="collectnav"></CollectNav>
      <div
        class="collectBS"
        ref="collectBS"
        :class="{change:showmanage}"
        v-if="collectproduce.length"
      >
        <div>
          <div class="obj" v-for="(item,index) in collectproduce" :key="index" @click="trun(item)">
            <div class="manage" v-show="showmanage">
              <img
                src="~assets/img/cart/tick.svg"
                @click.stop.prevent="imgclick(item)"
                :class="{act:item.isCollect}"
              />
            </div>
            <div class="img">
              <img :src="item.img" alt />
            </div>
            <div class="content">
              <div class="title">{{item.title}}</div>
              <div class="collectnum">{{item.collectnum}}</div>
              <div class="price">￥{{item.nowPrice}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="noobj">
        <div>
          <img
            src="https://s10.mogucdn.com/p2/161118/upload_8djbjd0daffce09e0h7e5g564bcbi_479x238.jpg"
            alt
          />
        </div>
        <p>你还没有收藏任何商品哦～</p>
      </div>
      <div class="collectb" v-show="showmanage">
        <div class="all" @click="allclick">
          <img src="~assets/img/cart/tick.svg" :class="{allact:isCollect}" />
        </div>
        <div class="text">
          <div class="allselect" @click="allclick">全选</div>
          <div class="delete" @click="deleteobj">删除</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CollectNav from "./children/collectnav";

import BScroll from "better-scroll";

import { mapGetters } from "vuex";
export default {
  components: { CollectNav },
  props: {},
  data() {
    return {
      collectObj: [],
      showmanage: false,
    };
  },
  created() {
    this.collect();
  },
  computed: {
    isCollect() {
      if (this.$store.state.collectObj.length == 0) return false;
      return !this.$store.state.collectObj.find((item) => !item.isCollect);
    },

    ...mapGetters(["collectproduce"]),
  },
  methods: {
    trun(item) {
      this.$router.push("/detail/" + item.iid);
    },
    imgclick(item) {
      this.$store.commit("isCollect", item);
    },
    collect() {
      this.$nextTick(() => {
        this.initBS();
      });
    },
    initBS() {
      if (!this.collectBS) {
        if (this.collectproduce.length) {
          this.collectBS = new BScroll(this.$refs.collectBS, {
            click: true,
          });
        }
      } else {
        this.collectBS.refresh();
      }
    },
    ismanage(flag) {
      this.showmanage = flag;
      if (this.collectBS) {
        this.collectBS.refresh();
      }
      this.$store.state.collectObj.forEach((element) => {
        element.isCollect = false;
      });
    },
    allclick() {
      if (this.$store.state.collectObj.find((item) => !item.isCollect)) {
        this.$store.state.collectObj.forEach((element) => {
          element.isCollect = true;
        });
      } else {
        this.$store.state.collectObj.forEach((element) => {
          element.isCollect = false;
        });
      }
    },
    deleteobj() {
      if (!this.$store.state.collectObj.find((item) => item.isCollect)) {
        // this.$toast.show("赶紧选择商品吧！");
        console.log("object");
      } else {
        this.$store.commit("deletecollectobj");
        // this.$toast.show("结算成功");
        console.log("xxxx");
      }
    },
  },
  activated() {
    if (this.collectBS) {
      this.collectBS.refresh();
    }
  },
  deactivated() {
    this.$refs.collectnav.flag = false;
    this.showmanage = this.$refs.collectnav.flag;
  },
  watch: {},
};
</script>

<style  scoped lang='less'>
.collectcon {
  .noobj {
    height: 93vh;
    width: 100%;
    background: white;
    z-index: 20;
    position: relative;
    img {
      width: 100%;
    }
    p {
      padding-top: 3vh;
      text-align: center;
      font-size: 20px;
    }
  }
  .collectnav {
    position: relative;
    background: white;
    top: 0;
    z-index: 12;
  }
  .collectBS {
    height: 93vh;
    width: 100%;
    background: white;
    overflow: hidden;
    z-index: 20;
    position: relative;
    &.change {
      height: 85vh !important;
    }
    .obj {
      display: flex;
      height: 20vh;
      border: 3px solid #eee;
      &:last-child {
        // border-top: 3px solid #eee;
        // padding-bottom: 8vh;
      }
      .img {
        img {
          width: 14vh;
          height: 100%;
          border-radius: 10px;
          margin-right: 5px;
          margin-left: 5px;
          padding: 1px;
        }
      }
      .manage {
        line-height: 20vh;
        flex: 0 0 6%;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        padding: 0 1vh;
        .act {
          border: 2px solid #ff699c;
          background: #ff699c;
        }
        img {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          /* border: 2px solid #ccc; */
          border: 2px solid #ff699c;
        }
      }
      .content {
        .title {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          text-overflow: ellipsis;
          overflow: hidden;
          padding-top: 25px;
          margin-bottom: 20px;
          max-width: 66vw;
          line-height: 16px;
          color: black;
        }

        .collectnum {
          color: #aaa;
          font-size: 18px;
          padding-bottom: 1vh;
        }

        .price {
          font-size: 20px;
          color: red;
          line-height: 25px;
        }
      }
    }
  }
  .collectb {
    height: 8vh;
    width: 100%;
    background: white;
    position: fixed;
    border-top: 1px solid #eee;
    bottom: 0;
    left: 0;
    z-index: 21;
    display: flex;

    .all {
      flex: 0 0 8%;
      line-height: 8vh;
      text-align: center;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      padding: 0 1vh;
      .allact {
        border: 2px solid #ff699c;
        background: #ff699c;
      }
      img {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        /* border: 2px solid #ccc; */
        border: 2px solid #ff699c;
      }
    }
    .text {
      display: flex;
      line-height: 8vh;
      font-size: 16px;
      flex: 1;
      justify-content: space-between;

      .delete {
        padding-right: 5vw;
      }
    }
  }
}
</style>