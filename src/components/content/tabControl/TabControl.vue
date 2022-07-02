<template>
  <div class="tab-control">
    <div
      class="tab-control-item"
      v-for="(item, index) in titles"
      @click="itemClick(index)"
      :class="{ active: index === activeIndex }"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return ["流行", "新款", "精选"];
      },
    },
  },
  data() {
    return {
      activeIndex: 0,
    };
  },
  methods: {
    itemClick(index) {
      this.activeIndex = index;
      this.$emit("tabItemClick", index);
    },
  },
};
</script>

<style scoped>
.tab-control {
  display: flex;

  /* position: sticky;
  top: 44px;
  z-index: 9; */

  background-color: #fff;
  height: 44px;
  line-height: 44px;
  font-size: 15px;
  text-align: center;
}
.tab-control-item {
  flex: 1;
}
.tab-control span {
  padding: 5px;
}
.active span {
  color: var(--color-high-text);
  border-bottom: 3px solid var(--color-high-text);
}
</style>