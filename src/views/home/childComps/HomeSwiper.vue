<template>
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="swiperImgLoad" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "HomeSwiper",
  components: {
    Swiper,
    SwiperItem,
  },
  data() {
    return {
      isLoaded: false,
    };
  },
  props: {
    banners: {
      type: Array,
      required: true,
    },
  },
  methods: {
    swiperImgLoad() {
      if (!this.isLoaded) {
        this.$emit("swiperImgLoad");
        this.isLoaded = true;
      }
    },
  },
};
</script>

<style scoped>
</style>