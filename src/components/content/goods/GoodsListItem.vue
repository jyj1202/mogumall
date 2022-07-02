<template>
  <div class="goods-item" @click="goodsItemClick">
    <img v-lazy="imgSrc" alt="" @load="imgLoad" />
    <!-- <img :src="goodListItem.image" alt="" @load="imgLoad" v-if="isBShow" /> -->
    <div class="goods-info">
      <p>{{ goodListItem.title }}</p>
      <span class="price">{{ goodListItem.price }}</span
      ><span class="collect">{{ goodListItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodListItem: {
      type: Object,
      default: {},
    },
  },
  computed: {
    imgSrc() {
      // return (
      //   (this.goodListItem.show && this.goodListItem.show.img) ||
      //   this.goodListItem.image ||
      //   this.goodsItem.img
      // );
      return (
        this.goodListItem.img ||
        this.goodListItem.image ||
        this.goodListItem.show.img
      );
    },
  },
  // computed: {
  //   isAShow() {
  //     return this.goodListItem.hasOwnProperty("show");
  //   },
  //   isBShow() {
  //     return this.goodListItem.hasOwnProperty("image");
  //   },
  // },
  methods: {
    imgLoad() {
      this.$bus.$emit("itemImgLoad");
    },
    goodsItemClick() {
      const iid = this.goodListItem.iid;
      this.$router.push({
        path: "/detail",
        query: {
          iid,
        },
      });
    },
  },
};
</script>

<style scoped>
.goods-item {
  padding-bottom: 40px;
  position: relative;
}

.goods-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>