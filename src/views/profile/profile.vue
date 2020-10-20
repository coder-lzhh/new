<template>
  <div class="me">
    <div>
      <div class="head">
        <div class="shang">
          <div class="left">
            <img src="~assets/img/profile/me.png" alt />
          </div>
          <div class="right">
            <div class="username">xxxx</div>
            <i class="iconfont icon-shezhi"></i>
          </div>
        </div>
        <div class="xia">
          <div class="xiaitem" @click="showcollect">
            <div class="num">{{ collectobjlength }}</div>
            <div class="file">收藏夹</div>
          </div>
          <div class="xiaitem">
            <div class="num">2</div>
            <div class="file">关注店铺</div>
          </div>

          <div class="xiaitem" @click="showwatch">
            <div class="num">{{ watchobjlength }}</div>
            <div class="file">足迹</div>
          </div>
          <div class="xiaitem">
            <div class="num">0</div>
            <div class="file">红包卡卷</div>
          </div>
        </div>
      </div>
      <div class="main">
        <div class="order">
          <div class="s">
            <div class="bold">我的订单</div>
            <div class="check">查看全部订单></div>
          </div>
          <div class="x">
            <div class="xitem">
              <div class="icon">
                <img src="~assets/img/profile/pay.png" alt />
              </div>
              <div class="file">代收款</div>
            </div>
            <div class="xitem">
              <div class="icon">
                <img src="~assets/img/profile/deliver.png" alt />
              </div>
              <div class="file">代发货</div>
            </div>

            <div class="xitem" @click="willtake">
              <div class="icon">
                <div class="num" v-if="buyGoodslength">
                  {{ buyGoodslength }}
                </div>
                <img src="~assets/img/profile/gain.png" alt />
              </div>
              <div class="file">待收货</div>
            </div>
            <div class="xitem">
              <div class="icon">
                <img src="~assets/img/profile/comment.png" alt />
              </div>
              <div class="file">评价</div>
            </div>
            <div class="xitem">
              <div class="icon">
                <img src="~assets/img/profile/money.png" alt />
              </div>
              <div class="file">退款/售后</div>
            </div>
          </div>
        </div>
        <div class="order">
          <div class="s">
            <div class="bold">必备工具</div>
            <div class="check">查看全部工具></div>
          </div>
          <div class="tool">
            <div class="xitem">
              <div class="icon">
                <img src="~assets/img/profile/fan.webp" alt />
              </div>
              <div class="toolitem">每日返现</div>
            </div>
            <div class="xitem">
              <div class="icon">
                <img src="~assets/img/profile/juan.webp" alt />
              </div>
              <div class="toolitem">领劵中心</div>
            </div>

            <div class="xitem">
              <div class="icon">
                <img src="~assets/img/profile/huan.webp" alt />
              </div>
              <div class="toolitem">闲置换钱</div>
            </div>
            <div class="xitem">
              <div class="icon">
                <img src="~assets/img/profile/mycomment.webp" alt />
              </div>
              <div class="toolitem">我的评价</div>
            </div>
            <div class="xitem">
              <div class="icon">
                <img src="~assets/img/profile/huabei.webp" alt />
              </div>
              <div class="toolitem">借钱</div>
            </div>
            <div class="xitem">
              <div class="icon">
                <img src="~assets/img/profile/yizhan.webp" alt />
              </div>
              <div class="toolitem">驿站</div>
            </div>
            <div class="xitem">
              <div class="icon">
                <img src="~assets/img/profile/kefu.webp" alt />
              </div>
              <div class="toolitem">客服</div>
            </div>
            <div class="xitem">
              <div class="icon">
                <img src="~assets/img/profile/theme.webp" alt />
              </div>
              <div class="toolitem">主题</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["collectobjlength", "watchobjlength", "buyGoodslength"]),
  },
  methods: {
    showcollect() {
      this.$router.push("/collect").catch(() => {});
    },
    showwatch() {
      this.$router.push("/watch").catch(() => {});
    },
    willtake() {
      this.$router.push("/willtake").catch(() => {});
    },
  },
  watch: {},
};
</script>

<style  scoped lang='less'>
.head {
  height: 25vh;
  background-image: linear-gradient(to right, #ff5678, #ff488b);
  .shang {
    display: flex;
    padding: 6vw;
    .left {
      flex: 1;
      img {
        width: 100%;
        border-radius: 50%;
      }
    }
    .right {
      display: flex;
      flex: 5;
      justify-content: space-between;
      // padding: 5vw;
      font-size: 20px;
      color: white;
      i {
        font-size: 20px;
      }
      .username {
        padding-left: 5vw;
      }
    }
  }
  .xia {
    display: flex;
    text-align: center;
    justify-content: space-around;
    color: white;
    font-size: 14px;
    .num {
      padding-bottom: 10px;
    }
  }
}
.main {
  padding: 2vh;
  height: 67vh;
  background: #f2f2f2;
  .order {
    background: white;
    border-radius: 10px;
    padding: 2vh;
    margin-bottom: 2vh;
    .s {
      display: flex;
      justify-content: space-between;
      padding-bottom: 2vh;
      .bold {
        font-weight: bold;
        font-size: 16px;
      }
      .check {
        color: #bbb;
      }
    }
    .x {
      display: flex;
      text-align: center;
      .xitem {
        flex: 1;
        .icon {
          position: relative;
          padding-top: 2vh;
          img {
            width: 50%;
          }
          .num {
            position: absolute;
            top: 1vw;
            right: 1vw;
            font-size: 16px;
            height: 2vw;
            line-height: 2vw;
            width: 2vw;
            color: #ff498b;
            border: 1px solid #ff498b;
            padding: 2vw;
            border-radius: 50%;
            // text-align: center;
          }
        }
        .file {
          padding-top: 1vh;
        }
      }
    }
    .tool {
      display: flex;
      text-align: center;
      flex-wrap: wrap;
      .xitem {
        flex: 0 0 25%;
        .icon {
          padding-top: 2vh;
          img {
            width: 50%;
          }
        }
      }
      .toolitem {
        padding-top: 1vh;
      }
    }
  }
}
</style>