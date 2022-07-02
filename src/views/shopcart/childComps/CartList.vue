<template>
  <div>
    <cart-list-item
      v-for="item in cartlist"
      :cartLisItem="item"
    ></cart-list-item>
  </div>
</template>

<script>
import CartListItem from "./CartListItem.vue";

export default {
  name: "CartList",
  components: {
    CartListItem,
  },
  props: {
    cartlist: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
</style>