<template>
  <div v-show="isShow" class="toast">
    {{ message }}
  </div>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      message: "",
      isShow: false,
    };
  },
  methods: {
    show(message = "出错辣", duration = 2000) {
      this.message = message;
      this.isShow = true;
      setTimeout(() => {
        this.message = "";
        this.isShow = false;
      }, duration);
    },
  },
};
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  border-radius: 10px;
  padding: 10px;
  white-space: nowrap;
  /* font-size: 10px; */
  color: #fff;
  background-color: rgba(0, 0, 0, 0.6);
}
</style>