<template>
  <div class="feature-view">
    <a href="https://act.mogujie.com/zzlx67">
      <img
        src="~assets/img/home/recommend_bg.jpg"
        alt=""
        @load="featureImgLoad"
      />
    </a>
  </div>
</template>

<script>
export default {
  name: "FeatureView",
  methods: {
    featureImgLoad() {
      this.$emit("featureImgLoad");
    },
  },
};
</script>

<style scoped>
.feature-view {
  margin-top: 10px;
}
.feature-view img {
  width: 100%;
  vertical-align: middle;
}
</style>