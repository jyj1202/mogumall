<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="" />
      </div>
      <div slot="center" class="title">
        <div
          v-for="(item, index) in titles"
          @click="titleClick(index)"
          :class="{ active: index === currentItemIndex }"
        >
          {{ item }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";

export default {
  name: "DetailNavBar",
  components: {
    NavBar,
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentItemIndex: 0,
    };
  },
  methods: {
    titleClick(index) {
      this.currentItemIndex = index;
      this.$emit("titleClick", index);
    },
    backClick() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>
.title {
  display: flex;
  justify-content: space-around;
  padding: 0 20px;
  font-size: 14px;
}
.back img {
  margin-top: 10px;
}
.active {
  color: var(--color-high-text);
}
</style>