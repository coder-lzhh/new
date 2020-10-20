
<template>
  <div class="watchcon">
    <div>
      <WatchNav class="watchnav" ref="watchnav"></WatchNav>
      <div class="watchBS" ref="watchBS" v-if="watchproduce.length">
        <div>
          <div
            class="obj"
            v-for="(item, index) in watchproduce"
            :key="index"
            @click="trun(item)"
          >
            <div class="img">
              <img :src="item.img" alt />
            </div>
            <div class="content">
              <div class="title">{{ item.title }}</div>
              <div class="sellnum">{{ item.sellnum }}</div>
              <div class="price">￥{{ item.nowPrice }}</div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="noobj">
        <div>
          <img
            src="https://s10.mogucdn.com/new1/v1/bmisc/b22401c122fbedee3b1f5d708127e9f0/194500731154.png"
            alt
          />
        </div>
        <p>你还没有相关记录哦～</p>
      </div>
    </div>
  </div>
</template>

<script>
import WatchNav from "./children/watchnav";

import BScroll from "better-scroll";

import { mapGetters } from "vuex";
export default {
  components: { WatchNav },
  props: {},
  data() {
    return {
      watchObj: [],
    };
  },
  created() {
    this.watch();
  },
  computed: {
    ...mapGetters(["watchproduce"]),
  },
  methods: {
    trun(item) {
      this.$router.push("/detail/" + item.iid);
    },
    watch() {
      this.$nextTick(() => {
        this.initBS();
      });
    },
    initBS() {
      if (!this.watchBS) {
        if (this.watchproduce.length) {
          this.watchBS = new BScroll(this.$refs.watchBS, {
            click: true,
          });
        }
      } else {
        this.watchBS.refresh();
      }
    },
  },
  activated() {
    if (this.watchBS) {
      this.watchBS.refresh();
    }
  },
  watch: {},
};
</script>

<style  scoped lang='less'>
.watchcon {
  .watchnav {
    position: relative;
    background: white;
    top: 0;
    z-index: 12;
  }
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
  .watchBS {
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

        .sellnum {
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
}
</style>