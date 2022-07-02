<template>
  <div id="shopCart">
    <nav-bar class="nav-bar" @click.native="abc">
      <div slot="center">购物车({{ cartLength }})</div>
    </nav-bar>
    <scroll class="content" ref="scroll">
      <cart-list ist :cartlist="cart"></cart-list>
    </scroll>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import NavBar from "components/common/navbar/NavBar.vue";
import Scroll from "components/common/scroll/Scroll.vue";
import CartList from "./childComps/CartList.vue";
import CartBottomBar from "./childComps/CartBottomBar.vue";

export default {
  name: "Shopcart",
  components: {
    NavBar,
    Scroll,
    CartList,
    CartBottomBar,
  },
  // mounted() {
  //   this.$bus.$on("cartImgLoad", () => {
  //     // console.log("55555");
  //     this.$refs.scroll.refresh();
  //   });
  // },
  updated() {
    this.$refs.scroll.refresh();
    // console.log("cartrefresh");
  },
  // watch: {
  //   cart() {
  //     this.$refs.scroll.refresh();
  //   },
  // },
  computed: {
    ...mapGetters(["cart", "cartLength"]),
  },
  methods: {
    abc() {
      console.log(mapGetters);
    },
  },
};
</script>

<style scoped>
#shopCart {
  height: 100vh;
}
.nav-bar {
  color: #fff;
  font-weight: 700;
  background-color: var(--color-tint);
}
.content {
  height: calc(100% - 44px - 44px - 49px);
}
</style>

