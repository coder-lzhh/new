<template>
  <div>
    <NavBar class="nav">
      <div slot="center">商品分类</div>
    </NavBar>
    <div class="categorycon">
      <div class="categoryBS" ref="categoryBS">
        <div>
          <div class="title" v-for="(item, index) in categoryList" :key="index">
            <div
              class="titletext"
              :class="{ act: index === actIndex }"
              @click="titleClick(index)"
            >
              {{ item.title }}
            </div>
          </div>
        </div>
      </div>
      <div class="categoryItemBS" ref="categoryItemBS">
        <div>
          <div class="content">
            <div
              class="categoryItem"
              v-for="(item, index) in itemList[actIndex]"
              :key="index"
            >
              <a :href="item.link">
                <div class="img">
                  <img :src="item.image" alt="" />
                </div>
                <div class="itemtext">
                  {{ item.title }}
                </div>
              </a>
            </div>
          </div>
          <div class="guessyoulike">
            <img
              src="https://s10.mogucdn.com/mlcdn/c45406/190426_4hlfgkc2ceaea67422ag73077lfce_1611x166.png_1200x9999.v1c7E.81.webp"
              alt
            />
          </div>
          <GoodList :goods="detailLiat[actIndex]"></GoodList>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "common/navbar/NavBar";
import GoodList from "content/goodlist/goodlist.vue";
import BScroll from "better-scroll";

import { debounce } from "common/js/debounce.js";

export default {
  components: { NavBar, GoodList },
  data() {
    return {
      categoryList: [],
      actIndex: 0,
      itemList: {},
      detailLiat: {},
    };
  },
  created() {
    this.getCategoryData();

  },
  computed: {},
  mounted() {
    let refresh = debounce(this.initItemBS, 100);
    this.$bus.$on("imgload", () => {
      refresh();
    });
  },
  methods: {
    getCategoryData() {
      this.$api.getcategory().then((res) => {
        this.categoryList = res.data.data.category.list;

        this.getItemData(
          res.data.data.category.list[0].maitKey,
          res.data.data.category.list[0].miniWallkey,
          0
        );

        this.$nextTick(() => {
          this.initListBS();
        });
      });
    },

    getItemData(maitKey, miniWallkey, index) {
      this.$api.getsubcategory(maitKey).then((res) => {
        this.$set(this.itemList, index, res.data.data.list);

        console.log(this.itemList);
        this.$nextTick(() => {
          this.initItemBS();
        });
      });
      this.$api.getSubcategoryDetail(miniWallkey, "pop").then((res) => {
        this.$set(this.detailLiat, index, res.data);
        console.log(this.detailLiat);
        this.$nextTick(() => {
          this.initItemBS();
        });
      });
    },
    initListBS() {
      if (!this.categoryBS) {
        this.categoryBS = new BScroll(this.$refs.categoryBS, {
          click: true,
        });
      } else {
        this.categoryBS.refresh();
      }
    },
    initItemBS() {
      if (!this.categoryItemBS) {
        this.categoryItemBS = new BScroll(this.$refs.categoryItemBS, {
          click: true,
        });
      } else {
        // console.log('categoryItemBS')
        this.categoryItemBS.refresh();
      }
    },
    titleClick(index) {
      this.actIndex = index;
      if (!this.itemList[this.actIndex]) {
        this.getItemData(
          this.categoryList[this.actIndex].maitKey,
          this.categoryList[this.actIndex].miniWallkey,
          index
        );
      }

      this.categoryItemBS.scrollTo(0, 0, 500);
    },
  },
  watch: {},
};
</script>

<style  scoped lang='less'>
.nav {
  background-image: linear-gradient(to right, #ff5678, #ff488b);
  color: white;
  font-weight: bold;
  font-size: 18px;
  position: relative;
  z-index: 10;
}

.categorycon {
  width: 100%;
  height: 85vh;
  display: flex;
  overflow: hidden;
  .categoryBS {
    flex: 0 0 25vw;
    height: 100%;
    .title {
      .titletext {
        background: #eee;
        text-align: center;
        padding: 2vh 2vh;
        border-left: 3px solid transparent;
        &.act {
          background: white;
          border-left: 3px solid #ff5777;
        }
      }
    }
  }
  .categoryItemBS {
    flex: 1;
    height: 100%;
    background: #efefef;
    .content {
      display: flex;
      flex-wrap: wrap;
      padding-bottom: 2vh;
      background: white;
      .categoryItem {
        width: 33%;
        text-align: center;
        margin-top: 2vh;
        .itemtext {
          margin-top: 1vh;
          color: black;
        }
        .img {
          img {
            width: 60%;
          }
        }
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
  }
}
</style>