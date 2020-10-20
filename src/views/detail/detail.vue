<template>
  <div class="con">
    <div class="detail">
      <DetailNav
        class="detailnav"
        ref="detailnavs"
        @navindex="navindex"
      ></DetailNav>
      <div class="detailBS" ref="detailBS">
        <div>
          <div class="detail-hook">
            <DetailSwiper :images="swiperimg"></DetailSwiper>
            <DetailGoods :goods="Goods"></DetailGoods>
            <DetailShop :shop="shop"></DetailShop>
            <DetailInfo
              :detailInfo="detailInfo"
              @infoimg="infoimg"
            ></DetailInfo>
          </div>
          <DetailGoodsParam
            :GoodsParam="GoodsParam"
            ref="goods"
            class="detail-hook"
          ></DetailGoodsParam>
          <DetailCommentInfo
            :commentInfo="commentInfo"
            ref="comment"
            class="detail-hook"
          ></DetailCommentInfo>
          <div class="detail-hook">
            <div class="hot">热门推荐</div>
            <GoodList :goods="recommend" ref="recommend"></GoodList>
          </div>
        </div>
      </div>
      <BackTop
        @click.native="backtopclick"
        v-show="isbacktop"
        class="backtop"
      ></BackTop>
      <DetailBottom
        @addTo="addTo"
        @collect="collect"
        :iscollect="iscollect"
      ></DetailBottom>
    </div>
    <transition name="fade" @after-enter="afterEnter" @after-leave="dataclean">
      <div id="mask" v-if="isShow">
        <transition name="top" @after-leave="afterLeave">
          <div
            class="top"
            @click="clickhide"
            v-if="isbg"
            :class="{ bg: isbg }"
          ></div>
        </transition>

        <div class="bottom">
          <div class="info">
            <div class="infoimg">
              <img :src="firstimg" alt />
            </div>
            <div class="infodetail">
              <div class="price">￥{{ payprice }}</div>
              <div class="kucun">库存{{ stock }}件</div>
              <div class="colorsize">
                <span v-if="sizee && stylee">已</span>
                <span v-else>请</span>选择：
                <span class="span" :class="{ color: sizee }">{{
                  sizee || "尺寸"
                }}</span>
                <span :class="{ color: stylee }">{{ stylee || "样式" }}</span>
              </div>
            </div>
            <div class="hide" @click="clickhide">×</div>
          </div>

          <div class="style">
            <div class="name">样式</div>
            <div class="text">
              <div
                v-for="(item, index) in style"
                :key="index"
                :class="{
                  light: stylee == item ? true : false,
                  none:
                    includeStyle + '' ? !includeStyle.includes(item) : false,
                }"
                @click="choosestyle(item)"
              >
                {{ item }}
              </div>
              <!-- :class="{light:stylee==item?true:false&&isStyle}" -->
              <!-- ,none:!includeStyle.includes(item) -->
            </div>
          </div>

          <div class="style">
            <div class="name">尺寸</div>
            <div class="text">
              <!-- ,none:!includeSize.includes(item) -->
              <div
                v-for="(item, index) in size"
                :class="{
                  light: sizee == item ? true : false,
                  none: includeSize + '' ? !includeSize.includes(item) : false,
                }"
                :key="index"
                @click="choosesize(item)"
              >
                {{ item }}
              </div>
            </div>
          </div>

          <div class="number">
            <div class="text">数量</div>
            <div class="changenum">
              <div class="sub" @click="sub" :class="{ none: count <= 1 }">
                -
              </div>
              <div class="num">{{ count }}</div>
              <div class="add" @click="add">+</div>
            </div>
          </div>

          <div class="confirm">
            <span v-if="!flag" @click="addcart">加入购物车</span>
            <span v-else @click="buynow">立即购买</span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>

import DetailNav from "./detailchild/detailnav";
import DetailSwiper from "./detailchild/detailswiper";
import DetailGoods from "./detailchild/detailGoods";
import DetailShop from "./detailchild/detailShop";
import DetailInfo from "./detailchild/detailInfo";
import DetailGoodsParam from "./detailchild/detailGoodsParam";
import DetailCommentInfo from "./detailchild/detailcommentInfo";

import GoodList from "content/goodlist/goodlist";

import DetailBottom from "content/detailbar/detailbottom";
import BackTop from "common/backtop/BackTop";

import { debounce } from "common/js/debounce.js";

import BScroll from "better-scroll";
export default {
  name: "detail",
  components: {
    DetailNav,
    DetailSwiper,
    DetailGoods,
    DetailShop,
    DetailInfo,
    DetailGoodsParam,
    DetailCommentInfo,
    DetailBottom,
    BackTop,
    GoodList,
  },
  props: {},
  data() {
    return {
      iid: "",
      swiperimg: [],
      Goods: {},
      shop: {},
      detailInfo: {},
      GoodsParam: {},
      commentInfo: {},
      recommend: [],
      itemimgload: null,
      navtop: [],
      navfunc: {},
      // navindexs: 0,
      isbacktop: false,
      listHeight: [],

      choice: [],
      sizee: "",
      stylee: "",
      isShow: false,
      nowprice: "",
      nowproduce: [],
      includeSize: [],
      includeStyle: [],
      firstimg: "",
      firstprice: 0,
      stock: 0,
      count: 1,
      filtersizee: [],
      filterstylee: [],
      flag: false,
      isbg: false,
      istrans: false,
      collectnum: "",
      sellnum: "",
      iscollect: "",
      shopname: "",
    };
  },
  filters: {
    fixPrice(price) {
      let p = [];
      p = (price + "").split("");
      p.splice(-2, 0, ".");
      p = p.join("");
      return p;
    },
  },
  created() {
    this.iid = this.$route.params.iid;

    this.iscollect = !!this.$store.state.collectObj.find(
      (item) => item.iid == this.iid
    );
    this.detail();
  },
  mounted() {
    let refresh = debounce(this.initBS, 100);
    this.$bus.$on("imgload", () => {
      refresh();
    });
  },
  computed: {
    size() {
      let sizes = [];
      sizes = this.choice.map((item, index) => item.size);
      sizes = [...new Set(sizes)];
      return sizes;
      // return ["S", "M", "L", "XL"];
    },
    style() {
      let styles = [];
      styles = this.choice.map((item, index) => item.style);
      styles = [...new Set(styles)];
      return styles;
      // return ["单牛仔裤", "单格子西装外套", "牛仔裤+西装外套两件套"];
    },
    payprice() {
      let p = [];
      p = (this.firstprice + "").split("");
      p.splice(-2, 0, ".");
      p = p.join("");
      return p;
    },
  },
  methods: {
    detail() {
      this.$api.getdetail(this.iid).then((res) => {
        this.swiperimg = res.data.result.itemInfo.topImages;
        // console.log(res);
        this.Goods = new this.$api.Goods(
          res.data.result.itemInfo,
          res.data.result.columns,
          res.data.result.shopInfo.services
        );
        this.sellnum = res.data.result.columns[0];
        this.shop = new this.$api.Shop(res.data.result.shopInfo);
        this.shopname = res.data.result.shopInfo.name;
        this.detailInfo = res.data.result.detailInfo;

        this.GoodsParam = new this.$api.GoodsParam(
          res.data.result.itemParams.info,
          res.data.result.itemParams.rule
        );

        if (res.data.result.rate.list) {
          this.commentInfo = res.data.result.rate.list[0];
        }

        this.choice = res.data.result.skuInfo.skus;
        this.firstprice = this.choice[0].nowprice;
        this.firstimg = this.choice[0].img;
        this.stock = this.choice.reduce((now, old) => (now += old.stock), 0);

        let allsize = [];
        allsize = this.choice.map((item, index) => item.style);
        allsize = [...new Set(allsize)];
        this.includeStyle = allsize;

        let allstyle = [];
        allstyle = this.choice.map((i) => i.size);
        allstyle = [...new Set(allstyle)];
        this.includeSize = allstyle;
        this.$nextTick(() => {
          this.initBS();
          this.calcHeight();
          this.watch();
        });
      });
      this.$api.getrecommend().then((res) => {
        this.recommend = res.data.data.list;
        this.$nextTick(() => {
          this.initBS();
          this.calcHeight();
        });
      });
    },
    initBS() {
      if (!this.detailBS) {
        this.detailBS = new BScroll(this.$refs.detailBS, {
          click: true,
          // pullUpLoad: true,
          probeType: 3,
        });
        this.detailBS.on("scroll", (position) => {
          this.backtop(position);
        });
      } else {
        this.detailBS.refresh();
        console.log("detailBS.refresh");
      }
    },
    addTo(flag) {
      this.flag = flag;
      this.isShow = true;
    },
    infoimg() {
      // console.log("object")
      this.detailBS.refresh();
      this.calcHeight();
    },
    backtop(p) {
      this.isbacktop = -p.y > 1000;
      // console.log(-p.y);
      for (let i = 0; i < this.listHeight.length; i++) {
        if (-p.y >= this.listHeight[i] && -p.y < this.listHeight[i + 1]) {
          this.$refs.detailnavs.nowindex = i;
        }
      }
    },
    backtopclick() {
      this.detailBS.scrollTo(0, 0, 500);
    },
    navindex(index) {
      let detailindex = this.$refs.detailBS.getElementsByClassName(
        "detail-hook"
      );
      let el = detailindex[index];
      this.detailBS.scrollToElement(el, 500);
    },
    calcHeight() {
      let detailHeight = this.$refs.detailBS.getElementsByClassName(
        "detail-hook"
      );
      this.listHeight = [];
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < detailHeight.length; i++) {
        height += detailHeight[i].clientHeight;
        this.listHeight.push(height);
      }
    },

    afterLeave() {
      this.isShow = false;
    },
    afterEnter() {
      this.isbg = true;
    },
    dataclean() {
      this.sizee = "";
      this.stylee = "";
      this.count = 1;
      this.includeSize = [];
      this.includeStyle = [];
    },
    sub() {
      this.count -= 1;
    },
    add() {
      this.count += 1;
    },

    clickhide() {
      this.isbg = false;
      // this.isShow = false;
    },

    choosestyle(i) {
      if (i != this.stylee) {
        // this.isStyle = true;
        this.stylee = i;
      } else {
        this.stylee = "";
        // this.isStyle = false;
      }

      // this.stylee = i;
      // this.isStyle = !this.isStyle;
      // console.log(i);
    },
    choosesize(i) {
      if (i != this.sizee) {
        // this.isSize = true;
        this.sizee = i;
      } else {
        this.sizee = "";
        // this.isSize = false;
      }
      // console.log(i);
    },
    addcart() {
      if (this.sizee && this.stylee) {
        let produce = {};
        produce.img = this.firstimg;
        produce.iid = this.iid;
        produce.sizee = this.sizee;
        produce.stylee = this.stylee;
        produce.count = this.count;
        produce.title = this.Goods.title;
        produce.nowPrice = this.payprice;
        produce.shopname = this.shopname;
        this.$store.dispatch("addCart", produce).then((res) => {
          // console.log(res);
          this.$toast.show(res);
        });
        this.clickhide();
      }
    },
    buynow() {},
    collect() {
      let produce = {};
      produce.img = this.firstimg;
      produce.iid = this.iid;
      produce.collectnum = this.collectnum;
      produce.title = this.Goods.title;
      produce.nowPrice = this.payprice;
      produce.isCollect = false;

      this.$store.dispatch("collect", produce).then((res) => {
        this.iscollect = !!this.$store.state.collectObj.find(
          (item) => item.iid == this.iid
        );
      });
    },
    watch() {
      let produce = {};
      produce.img = this.firstimg;
      produce.iid = this.iid;
      produce.sellnum = this.sellnum;
      produce.title = this.Goods.title;
      produce.nowPrice = this.payprice;



      this.$store.dispatch("watch", produce).then((res) => {
        console.log(res);
      });
    },
  },
  watch: {
    sizee(newv) {
      if (newv == "" && this.stylee) {
        this.stock = this.filterstylee.reduce(
          (now, old) => (now += old.stock),
          0
        );
      }
      if (newv == "" && this.stylee == "") {
        this.stock = this.choice.reduce((now, old) => (now += old.stock), 0);
      }
      if (newv == "") {
        this.includeStyle = [];
        return;
      }

      this.filtersizee = this.choice.filter((item) => item.size == this.sizee);
      this.filtersizee = this.filtersizee.filter((item) => item.stock != 0);
      this.stock = this.filtersizee.reduce((now, old) => (now += old.stock), 0);

      let allsizee = [];
      allsizee = this.filtersizee.map((item, index) => item.style);
      allsizee = [...new Set(allsizee)];
      this.includeStyle = allsizee;

      if (this.stylee) {
        this.nowproduce = this.filtersizee.filter(
          (i) => i.style == this.stylee
        );
        this.firstprice = this.nowproduce[0].nowprice;
        this.firstimg = this.nowproduce[0].img;
        this.stock = this.nowproduce[0].stock;
      }
    },
    stylee(newv) {
      if (newv == "" && this.sizee) {
        this.stock = this.filtersizee.reduce(
          (now, old) => (now += old.stock),
          0
        );
      }

      if (newv == "" && this.sizee == "") {
        this.stock = this.choice.reduce((now, old) => (now += old.stock), 0);
      }
      if (newv == "") {
        this.includeSize = [];
        return;
      }

      this.filterstylee = this.choice.filter(
        (item) => item.style == this.stylee
      );
      this.filterstylee = this.filterstylee.filter((item) => item.stock != 0);

      this.firstprice = this.filterstylee[0].nowprice;
      this.stock = this.filterstylee.reduce(
        (now, old) => (now += old.stock),
        0
      );

      let allstylee = [];
      allstylee = this.filterstylee.map((i) => i.size);
      allstylee = [...new Set(allstylee)];
      this.includeSize = allstylee;

      if (this.sizee) {
        this.nowproduce = this.filterstylee.filter((i) => i.size == this.sizee);
        this.firstprice = this.nowproduce[0].nowprice;
        this.firstimg = this.nowproduce[0].img;
        this.stock = this.nowproduce[0].stock;
      }
    },
  },
};
</script>

<style  scoped lang='less'>
.detail {
  background: white;
  position: relative;
  height: 92vh;
  .detailnav {
    position: relative;
    background: white;
    z-index: 12;
  }
  .detailBS {
    width: 100%;
    position: fixed;
    overflow: hidden;
    top: 7vh;
    bottom: 8vh;
  }
  // .backtop {
  //   position: absolute;
  //   bottom: 10vh;
  //   right: 2vh;
  // }
}
.hot {
  padding: 12px;
}

.fade-enter-active {
  transition: all 0.5s;
}
.fade-leave-active {
  transition: all 1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(100%);
}

.top-enter-active {
  transition: opacity 0.5s;
}
.top-leave-active {
  transition: opacity 0.2s;
}

.top-enter,
.top-leave-to {
  opacity: 0;
}

.bg {
  background-color: rgba(0, 0, 0, 0.2);
}

.light {
  border: 1px solid #ff498b !important;
  // pointer-events: none;
  color: #ff498b;
}
.color {
  color: #ff498b;
}
.none {
  background: #ddd;
  pointer-events: none;
}
.con {
  // padding: 10px;

  position: relative;
  // overflow: hidden;
  height: 100vh;
  #mask {
    position: absolute;
    z-index: 100;
    width: 100vw;
    height: 100vh;
    // // padding: 10px;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    // background: rgba(0, 0, 0, 0.2);

    .top {
      width: 100%;
      height: 100%;
      // background: red;
      position: absolute;
      top: 0;
      left: 0;
    }
    .bottom {
      // overflow: hidden;
      // padding: 10px;
      // margin: 10px;

      padding-bottom: 10vh;
      width: 100%;
      // height: 50vh;
      background: #fff;
      position: absolute;
      bottom: 0;
      left: 0;

      .info {
        // margin-bottom: -40px;
        display: flex;
        .infoimg {
          flex: 2;
          padding-left: 10px;
          position: relative;
          top: -50px;
          img {
            width: 80%;
            vertical-align: bottom;
          }
        }
        .infodetail {
          flex: 4;
          align-self: center;
          .price {
            // font-weight: bold;
            font-size: 36px;
            padding-bottom: 5px;
          }
          .kucun {
            padding-bottom: 5px;
          }
          .colorsize {
            line-height: 18px;
            .span {
              padding-right: 5px;
            }
          }
        }

        .hide {
          flex: 1;
          font-size: 40px;
          text-align: center;
          // align-self: center;
        }
      }
      .style {
        padding-left: 1vw;
        .name {
          padding: 3px 0;
        }
        .text {
          display: flex;
          flex-wrap: wrap;
          div {
            padding: 5px 2vw;
            margin: 5px;
            border: 1px solid #bbb;
            border-radius: 5px;
          }
        }
      }
      .number {
        padding-left: 10px;
        .text {
          padding: 3px 0;
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
      }
      .confirm {
        width: 100vw;
        height: 7.5vh;
        position: fixed;
        bottom: 0;
        left: 0;
        text-align: center;
        line-height: 7.5vh;
        color: white;
        background-image: linear-gradient(to right, #ff5678, #ff488b);
        span {
          display: block;
        }
      }
    }
  }
}
</style>