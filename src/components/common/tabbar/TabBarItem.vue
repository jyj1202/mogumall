<template>
  <div class="tab-bar-item" @click="itemClick">
    <div class="item-icon" v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div class="item-icon-active" v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div class="item-text" :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  data() {
    return {};
  },
  props: {
    path: {
      type: String,
      required: true,
    },
    activeColor: {
      type: String,
      default: "#ff5777",
    },
  },
  computed: {
    isActive() {
      return this.$route.path === this.path;
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    },
  },
  methods: {
    itemClick() {
      // console.log(this.$route.path === this.path);
      this.$router.replace(this.path);
    },
  },
};
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  font-size: 14px;
}

.tab-bar-item .item-icon img,
.item-icon-active img {
  width: 24px;
  height: 24px;
  margin-top: 5px;
  vertical-align: middle;
}
</style>
