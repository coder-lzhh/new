<template>
  <div class="home">
    <NavBar class="nav">
      <div slot="center">购物街</div>
    </NavBar>
    <div class="homeBS" ref="homeBS">
      <div>
        <HomeSwiper :banners="banners"></HomeSwiper>
        <div class="pic">
          <img
            src="https://h2.appsimg.com/b.appsimg.com/upload/mst/2020/07/02/71/mst_7d51070f45e49a864eaecbf1eb86b168_750x70_90.jpg"
            alt
          />
        </div>
        <HomeSell :sell="sell"></HomeSell>
        <HomeRecommend :recommends="recommends"></HomeRecommend>
        <div class="guessyoulike">
          <img
            src="https://s10.mogucdn.com/mlcdn/c45406/190426_4hlfgkc2ceaea67422ag73077lfce_1611x166.png_1200x9999.v1c7E.81.webp"
            alt
          />
        </div>
        <GoodList :goods="goods.sell.list"></GoodList>
      </div>
    </div>
    <BackTop @click.native="backtopclick" v-show="isbacktop"></BackTop>
  </div>
</template>

<script>
import NavBar from "common/navbar/NavBar";
import HomeSwiper from "./children/swiper";
import HomeRecommend from "./children/recommend";
import HomeSell from "./children/sell";
import GoodList from "content/goodlist/goodlist.vue";
import BackTop from "common/backtop/BackTop";

import BScroll from "better-scroll";

import { debounce } from "common/js/debounce.js";

export default {
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend,
    HomeSell,
    GoodList,
    BackTop,
  },
  props: {},
  data() {
    return {
      banners: [],
      sell: [],
      recommends: [],
      goods: {
        sell: { page: 0, list: [] },
      },
      isbacktop: false,
    };
  },
  created() {
    this.gethome();
    this.getgoodslist("sell");
  },
  computed: {},
  mounted() {
    let refresh = debounce(this.initBS, 100);
    this.$bus.$on("imgload", () => {
      refresh();
    });
  },
  methods: {
    gethome() {
      this.$api.gethomedata().then((res) => {
        this.banners = res.data.data.data.banner.list;
        this.recommends = res.data.data.data.recommend.list;
        this.sell = res.data.data.data.sell.list;
      });
    },
    getgoodslist(type) {
      const page = this.goods[type].page + 1;
      this.$api.goodslist(type, page).then((res) => {
        // console.log(res.status);
        this.goods[type].list.push(...res.data.data.list);
        this.goods[type].page += 1;
        this.$nextTick(() => {
          this.initBS();
        });
      });
      if (this.homeBS) {
        this.homeBS.finishPullUp();
      }
    },
    initBS() {
      if (!this.homeBS) {
        this.homeBS = new BScroll(this.$refs.homeBS, {
          click: true,
          pullUpLoad: true,
          probeType: 3,
        });

        this.homeBS.on("pullingUp", () => {
          this.getgoodslist("sell");
          // this.homeBS.finishPullUp();
        });
        this.homeBS.on("scroll", (position) => {
          // this.$emit("backtops", position);
          this.backtop(position);
        });
      } else {
        console.log('homeBS.refresh')
        this.homeBS.refresh();
      }
    },
    backtop(p) {
      this.isbacktop = -p.y > 1000;
    },
    backtopclick() {
      this.homeBS.scrollTo(0, 0, 500);
    },
  },
  watch: {},
};
</script>

<style  scoped lang='less'>
.home {
  height: 92vh;
  position: relative;
}
.nav {
  background-image: linear-gradient(to right, #ff5678, #ff488b);
  color: white;
  font-weight: bold;
  font-size: 18px;
  position: relative;
  z-index: 10;
}
.pic {
  overflow: hidden;
  height: 0;
  padding-bottom: 9.33%;
  img {
    width: 100%;
  }
}
.guessyoulike {
  overflow: hidden;
  height: 0;
  padding-bottom: 10.3%;
  img {
    width: 100%;
  }
}
.homeBS {
  width: 100%;
  position: fixed;
  top: 7vh;
  bottom: 8vh;
}
</style>