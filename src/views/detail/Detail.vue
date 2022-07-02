<template>
  <div class="detail">
    <detail-nav-bar
      @titleClick="titleClick"
      ref="detailNavBar"
    ></detail-nav-bar>
    <scroll class="detail-scroll" ref="scroll" :probe-type="3" @scroll="scroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detailInfo="detailInfo"
        @imageLoad="detailImageLoad"
      ></detail-goods-info>
      <detail-param-info
        :paramInfo="paramInfo"
        ref="params"
      ></detail-param-info>
      <detail-comment-info
        :commentInfo="commentInfo"
        ref="comment"
      ></detail-comment-info>
      <goods-list :goodList="goodList" ref="recommend"></goods-list>
    </scroll>
    <back-top @click.native="backTopClick" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar
      @addToCart="addToCart"
      class="detail-bottom-bar"
    ></detail-bottom-bar>
  </div>
</template>

<script>
import {
  getDetailData,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";

import { itemImgListenerMixin, backTopMixin } from "common/mixin";
import { mapActions } from "vuex";

import Scroll from "components/common/scroll/Scroll.vue";
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import GoodsList from "components/content/goods/GoodsList.vue";
import DetailBottomBar from "./childComps/DetailBottomBar.vue";

export default {
  name: "Detail",
  components: {
    Scroll,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
  },
  data() {
    return {
      iid: "",
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      goodList: [],
      themeTopYs: [],
      titleIndex: 0,
    };
  },
  mixins: [itemImgListenerMixin, backTopMixin],
  created() {
    // 1.取出iid
    this.iid = this.$route.query.iid;
    getDetailData(this.iid)
      .then((res) => {
        // console.log(res);
        //获取当前iid的轮播图数据
        this.topImages = res.result.itemInfo.topImages;
        const infodata = res.result;
        //获取商品信息
        this.goods = new Goods(
          infodata.itemInfo,
          infodata.columns,
          infodata.shopInfo.services
        );
        //获取店铺信息
        this.shop = new Shop(res.result.shopInfo);
        //获取商品详情信息
        this.detailInfo = infodata.detailInfo;
        //获取商品参数信息
        this.paramInfo = new GoodsParam(
          infodata.itemParams.info,
          infodata.itemParams.rule
        );
        //获取评论信息
        if (infodata.rate.cRate !== 0) {
          this.commentInfo = infodata.rate.list[0];
        }
      })
      .catch((err) => {
        console.log(err);
      });
    getRecommend()
      .then((res) => {
        // console.log(res);
        this.goodList = res.data.list;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  mounted() {},
  updated() {
    // console.log(this.$refs.params);
  },
  destroyed() {
    // console.log("detailDestroyed");
    //取消离开detail时的itemImgListener
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  },
  methods: {
    ...mapActions({
      add: "addToCart",
    }),
    detailImageLoad() {
      this.$refs.scroll.refresh();

      // console.log(this.$refs.params);
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      // this.themeTopYs.push(Number.MAX_VALUE)
      // console.log(this.themeTopYs);
    },
    titleClick(index) {
      console.log(index);
      console.log(this.themeTopYs);
      console.log(this.themeTopYs[index]);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 500);
    },
    scroll(position) {
      // console.log(position);
      const positionY = -position.y;
      //法1:
      if (this.themeTopYs.length !== 0) {
        for (let index = 0; index < this.themeTopYs.length; index++) {
          // console.log(index + 1);
          if (
            this.titleIndex !== index &&
            ((index < this.themeTopYs.length - 1 &&
              positionY >= this.themeTopYs[index] &&
              positionY < this.themeTopYs[index + 1]) ||
              (index === this.themeTopYs.length - 1 &&
                positionY >= this.themeTopYs[index]))
          ) {
            // console.log(index);
            this.titleIndex = index;
            this.$refs.detailNavBar.currentItemIndex = index;
          }

          //法2：hack做法
          //在push的时候，往this.themeTopYs里再多push一个js最大值，之后遍历的时候不需要考虑index === this.themeTopYs.length - 1的情况，并且index只遍历到this.themeTopYs.length - 2
          // for (let index = 0; index < this.themeTopYs.length - 1; index++) {
          //   if (
          //     this.titleIndex !== index &&
          //     positionY >= this.themeTopYs[index] &&
          //     positionY < this.themeTopYs[index + 1]
          //   ) {
          //     // console.log(index);
          //     this.titleIndex = index;
          //     this.$refs.detailNavBar.currentItemIndex = index;
          //   }
          // }
          //返回顶部是否隐藏
          this.isShowBackTop = -position.y > 1000;
        }
      }
    },
    addToCart() {
      const good = {};
      good.image = this.topImages[0];
      good.title = this.goods.title;
      good.desc = this.goods.desc;
      good.price = this.goods.realPrice;
      good.iid = this.iid;
      good.count = 1;
      // console.log(good);
      this.add(good).then((res) => {
        // console.log(this.$toast.show);
        this.$toast.show(res, 2000);
      });
    },
  },
};
</script>

<style scoped>
.detail {
  height: 100vh;
}
.detail-scroll {
  height: calc(100% - 44px - 49px);
}
.detail-bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9;
}
</style>