<template>
  <div class="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabItemClick="tabItemClick"
      ref="homeTabControl2"
      v-show="showTabControl"
      class="tab-control2"
    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <home-swiper
        :banners="banners"
        @swiperImgLoad="swiperImgLoad"
      ></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view @featureImgLoad="featureImgLoad"></feature-view>
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabItemClick="tabItemClick"
        ref="homeTabControl1"
      />
      <goods-list
        :goodList="getGoodList"
        :currentType="currentType"
      ></goods-list>
    </scroll>
    <back-top @click.native="backTopClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

import Scroll from "components/common/scroll/Scroll.vue";
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";
import TabControl from "components/content/tabControl/TabControl.vue";
import GoodsList from "components/content/goods/GoodsList.vue";
import BackTop from "components/content/backTop/BackTop.vue";

import { getMultiData, getProductData } from "network/home";
import { itemImgListenerMixin, backTopMixin } from "common/mixin";

export default {
  name: "Home",
  components: {
    NavBar,
    Scroll,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: {
          page: 0,
          list: [],
        },
        new: {
          page: 0,
          list: [],
        },
        sell: {
          page: 0,
          list: [],
        },
      },
      currentType: "pop",
      isSwiperImgLoad: false,
      isFeatureImgLoad: false,
      tabControlOffsetTop: 0,
      showTabControl: false,
      saveY: 0,
    };
  },
  computed: {
    getGoodList() {
      return this.goods[this.currentType].list;
    },
  },
  mixins: [itemImgListenerMixin, backTopMixin],
  created() {
    // 请求轮播图和推荐数据
    this.getMultiData();
    // 请求商品数据
    this.getProductData("pop");
    this.getProductData("new");
    this.getProductData("sell");
  },
  mounted() {},
  activated() {
    this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
  },
  deactivated() {
    // 1.获取离开首页时的saveY
    this.saveY = this.$refs.scroll.getScrollY();
    // console.log(this.saveY);
    //取消离开首页时的itemImgListener
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  },
  methods: {
    // 请求数据
    getMultiData() {
      getMultiData().then((res) => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    // 获取产品列表数据
    getProductData(type) {
      const page = this.goods[type].page + 1;
      return getProductData(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        // 完成加载更多数据
        this.$refs.scroll.finishPullUp();
      });
    },
    // 监听事件
    // tabItemClick
    tabItemClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.homeTabControl1.activeIndex = index;
      this.$refs.homeTabControl2.activeIndex = index;
    },
    // 滚动事件
    contentScroll(position) {
      // console.log("y:" + -position.y);
      // console.log("OffsetTop:" + this.tabControlOffsetTop);
      this.isShowBackTop = -position.y > 1000;
      this.showTabControl = -position.y > this.tabControlOffsetTop - 44;
      // this.saveY = -position.y;
      // console.log(this.saveY);
      // console.log(this.tabControlOffsetTop);
      // console.log(this.showTabControl);
    },
    // 上拉加载更多
    loadMore() {
      this.getProductData(this.currentType);
      this.itemImgListener();
    },
    //首页轮播图加载事件
    swiperImgLoad() {
      this.isSwiperImgLoad = true;
      if (this.isFeatureImgLoad) {
        this.tabControlOffsetTop = this.$refs.homeTabControl1.$el.offsetTop;
      }
    },
    //首页feature图加载事件, 可以尝试用promise.all()
    featureImgLoad() {
      this.isFeatureImgLoad = true;
      if (this.isSwiperImgLoad) {
        this.tabControlOffsetTop = this.$refs.homeTabControl1.$el.offsetTop;
      }
    },
  },
};
</script>

<style scoped>
.home {
  background-color: #eee;
  /* margin-top: 44px; */
  /* position: relative; */
  height: 100vh;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}
.tab-control2 {
  position: absolute;
  top: 44px;
  z-index: 9;
  width: 100%;
}
.content {
  height: calc(100% - 92px);
}
</style>
