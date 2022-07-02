<template>
  <div class="cart-list-item">
    <check-button
      :is-checked="cartLisItem.checked"
      @click.native="selectItemClick"
    ></check-button>
    <div class="img">
      <img :src="cartLisItem.image" alt="" />
    </div>
    <div class="item-info">
      <div class="text">
        <div class="item-title">{{ cartLisItem.title }}</div>
        <div class="item-desc">{{ cartLisItem.desc }}</div>
      </div>
      <div>
        <div class="item-price left">¥{{ cartLisItem.price }}</div>
        <div class="item-count right">x{{ cartLisItem.count }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "./CheckButton.vue";
export default {
  name: "CartListItem",
  components: {
    CheckButton,
  },
  props: {
    cartLisItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    selectItemClick() {
      this.cartLisItem.checked = !this.cartLisItem.checked;
      // console.log(this.$store.state.cart);
    },
    // cartImgLoad() {
    //   // console.log("444");
    //   this.$bus.$emit("cartImgLoad");
    // },
  },
};
</script>

<style scoped>
.cart-list-item {
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  width: 100%;
  height: 110px;
  border-bottom: 1px solid #ccc;
}
.img {
  border-radius: 5px;
  overflow: hidden;
}
img {
  width: 70px;
  height: 90px;
  vertical-align: middle;
}
.item-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 250px;
  height: 90px;
}
.text {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 50px;
}
.item-title,
.item-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 17px;
  color: #333;
}
.item-desc {
  font-size: 14px;
  color: #666;
}
</style>