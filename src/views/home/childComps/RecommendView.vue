<template>
  <div class="home-recommend">
    <div class="recommend-item" v-for="item in recommends">
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      default: [],
    },
  },
};
</script>

<style scoped>
.home-recommend {
  display: flex;

  width: 100%;
  padding: 10px 0px 20px;
  background-color: #fff;
  font-size: 12px;
  text-align: center;
}
.recommend-item {
  flex: 1;
}
.home-recommend img {
  width: 70px;
  height: 70px;
}
</style>