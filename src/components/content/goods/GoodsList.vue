<template>
  <div class="goods-list" :key="currentType">
    <goods-list-item
      v-for="(item, index) in goodList"
      :goodListItem="item"
      class="item"
    />
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem.vue";

export default {
  name: "GoodsList",
  components: {
    GoodsListItem,
  },
  props: {
    goodList: {
      type: Array,
      default() {
        return [];
      },
    },
    currentType: {
      type: String,
    },
  },
};
</script>

<style scoped>
.goods-list {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;

  background-color: #fff;
}
.goods-list .item {
  width: 48%;
}
</style>