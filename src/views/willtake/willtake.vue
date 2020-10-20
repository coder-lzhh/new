
<template>
  <div class="willcon">
    <div>
      <WillNav class="willnav" ref="willnav"></WillNav>
      <div class="willBS" ref="willBS" v-if="buygoods.length">
        <div>
          <div class="con" v-for="(item, index) in buygoods" :key="index">
            <div class="top">
              <div class="shopname">
                <i class="iconfont icon-shangjia"></i>
                {{ item.shopname }}
              </div>
              <div class="sendtext">卖家已发货</div>
            </div>
            <div class="center">
              <div class="img">
                <img :src="item.img" alt />
              </div>
              <div class="content">
                <div class="title">{{ item.title }}</div>
                <div class="style">{{ item.sizee }} {{ item.stylee }}</div>
                <div class="sell">
                  <div class="count">x{{ item.count }}</div>
                  <div class="price">实付款￥{{ item.nowPrice }}</div>
                </div>
              </div>
            </div>
            <div class="bottom">
              <div class="more">更多</div>
              <div class="bill">申请开票</div>
              <div class="mail">查看物流</div>
              <div class="true">确认收货</div>
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
        <p>你还没有相关订单哦～</p>
      </div>
    </div>
  </div>
</template>

<script>
import WillNav from "./children/willnav";

import BScroll from "better-scroll";

import { mapGetters } from "vuex";
export default {
  components: { WillNav },
  props: {},
  data() {
    return {
      willObj: [],
    };
  },
  created() {
    this.will();
  },
  computed: {
    ...mapGetters(["buygoods"]),
  },
  methods: {
    trun(item) {
      this.$router.push("/detail/" + item.iid);
    },
    will() {
      this.$nextTick(() => {
        this.initBS();
      });
    },
    initBS() {
      if (!this.willBS) {
        if (this.buygoods.length) {
          this.willBS = new BScroll(this.$refs.willBS, {
            click: true,
          });
        }
      } else {
        this.willBS.refresh();
      }
    },
  },
  activated() {
    if (this.willBS) {
      this.willBS.refresh();
    }
  },
  will: {},
};
</script>

<style  scoped lang='less'>
.willcon {
  .willnav {
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
  .willBS {
    height: 93vh;
    width: 100%;
    background: #f5f5f5;
    overflow: hidden;
    z-index: 20;
    position: relative;
    &.change {
      height: 85vh !important;
    }

    .con {
      margin: 1vh;
      padding: 2vh;
      border-radius: 10px;
      background: white;
      .top {
        display: flex;
        font-size: 14px;
        justify-content: space-between;
        .shopname {
          i.iconfont.icon-shangjia {
          }
        }

        .sendtext {
          color: #ff699c;
        }
      }

      .center {
        height: 18vh;
        padding: 2vh 0;
        display: flex;
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

        .content {
          .title {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            text-overflow: ellipsis;
            overflow: hidden;
            // padding-top: 25px;
            // margin-bottom: 20px;
            max-width: 66vw;
            line-height: 16px;
            color: black;
            margin-bottom: 2vh;
          }

          .style {
            margin-bottom: 3vh;
            color: #aaa;
          }
          .sell {
            display: flex;
            justify-content: space-between;

            .price {
              text-align: right;
            }
          }
        }
      }

      .bottom {
        display: flex;
        justify-content: space-around;
        .more {
          line-height: 30px;
        }
        .bill {
          border: 1px solid #aaa;
          padding: 1vh;
          border-radius: 20px;
        }
        .mail {
          border: 1px solid #aaa;
          padding: 1vh;
          border-radius: 20px;
        }
        .true {
          border: 1px solid #ff699c;
          padding: 1vh;
          border-radius: 20px;
          color: #ff699c;
        }
      }
    }
  }
}
</style>