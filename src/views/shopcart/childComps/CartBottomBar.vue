<template>
  <div class="bottom-menu">
    <check-button
      class="select-all"
      :isChecked="isSelectedAll"
      @click.native="selectAllClick"
    ></check-button>
    <span>全选</span>
    <span class="total-price">合计: {{ totalPrice }}</span>
    <span class="buy-product" @click="goToBuy">去计算({{ checkLength }})</span>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CheckButton from "./CheckButton";

export default {
  name: "BottomBar",
  components: {
    CheckButton,
  },
  data() {
    return {
      // isSelectedAll: true,
    };
  },
  // updated() {
  //   this.isSelectedAll = this.cart.every((item) => item.checked === true);
  // },
  computed: {
    ...mapGetters(["cart"]),
    totalPrice() {
      return (
        "¥" +
        this.cart
          .filter((item) => item.checked === true)
          .reduce((preValue, currentValue) => {
            return preValue + currentValue.count * currentValue.price;
          }, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      return this.cart.filter((item) => item.checked === true).length;
    },
    isSelectedAll() {
      // if (this.cart.find((item) => item.checked !== true)) {
      //   return false;
      // } else {
      //   return true;
      // }
      if (this.cart.length === 0) {
        return false;
      } else {
        return this.cart.every((item) => item.checked === true);
      }
    },
  },
  methods: {
    selectAllClick() {
      if (this.isSelectedAll) {
        this.cart.forEach((item) => {
          item.checked = false;
        });
      } else {
        this.cart.forEach((item) => {
          item.checked = true;
        });
      }
    },
    goToBuy() {
      if (
        this.cart.length === 0 ||
        this.cart.every((item) => item.checked === false)
      ) {
        this.$toast.show("至少选中一件商品");
      }
    },
  },
};
</script>

<style scoped>
.bottom-menu {
  width: 100%;
  height: 44px;
  background-color: #eee;
  position: fixed;
  bottom: 49px;
  left: 0;
  box-shadow: 0 -2px 3px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  color: #888;
  line-height: 44px;
  padding-left: 35px;
  box-sizing: border-box;
}

.bottom-menu .select-all {
  position: absolute;
  line-height: 0;
  left: 12px;
  top: 13px;
}

.bottom-menu .total-price {
  margin-left: 15px;
  font-size: 16px;
  color: #666;
}

.bottom-menu .buy-product {
  background-color: orangered;
  color: #fff;
  width: 100px;
  height: 44px;
  text-align: center;
  line-height: 44px;
  float: right;
}
</style>
