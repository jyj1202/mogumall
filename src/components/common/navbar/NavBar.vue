<template>
  <div id="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style scoped>
#nav-bar {
  display: flex;
  justify-content: space-between;

  /* position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9; */

  height: 44px;
  line-height: 44px;
  text-align: center;

  box-shadow: 0 1px 1px rgba(150, 150, 150, 0.08);
}
.left,
.right {
  width: 44px;
}
.center {
  flex: 1;
}
</style>