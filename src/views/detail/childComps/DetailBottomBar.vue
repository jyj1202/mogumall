<template>
  <div class="detail-bottom-bar">
    <div><i class="icon service"></i><span>客服</span></div>
    <div><i class="icon shop"></i><span>店铺</span></div>
    <div><i class="icon"></i><span>收藏</span></div>
    <div class="addCart" @click="addToCart">加入购物车</div>
    <div class="buy">购买</div>
  </div>
</template>

<script>
export default {
  name: "DetailBottomBar",
  methods: {
    addToCart() {
      this.$emit("addToCart");
    },
  },
};
</script>

<style scoped>
.detail-bottom-bar {
  display: flex;
  /* justify-content: space-between; */
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  height: 58px;
  text-align: center;
  background-color: #fff;
}
.detail-bottom-bar > div {
  flex: 1;
}
.detail-bottom-bar .icon {
  display: block;
  margin: 10px auto 3px;
  width: 22px;
  height: 22px;
  background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
}
.detail-bottom-bar .service {
  background-position: 0 -54px;
}

.detail-bottom-bar .shop {
  background-position: 0 -98px;
}
.detail-bottom-bar .addCart {
  flex: 2;
  width: 85px;
  line-height: 58px;
  color: #333;
  background-color: #ffe817;
}
.detail-bottom-bar .buy {
  flex: 1.5;
  width: 80px;
  line-height: 58px;
  color: #fff;
  background-color: #f69;
}
</style>