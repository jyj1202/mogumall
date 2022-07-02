import { debounce } from "./utils";
import BackTop from "components/content/backTop/BackTop.vue";
import { POP, NEW, SELL } from "./const";

export const itemImgListenerMixin = {
  data() {
    return {
      itemImgListener: null,
    };
  },
  mounted() {
    //放在mounted里面可以保证this.$refs.scroll有值
    const refresh = debounce(this.$refs.scroll.refresh, 50);
    this.itemImgListener = () => {
      // console.log("refresh");
      refresh(); //闭包, refresh都是同一个变量, 如果没有闭包保存变量，则需要在data里保存
    };
    this.$bus.$on("itemImgLoad", this.itemImgListener);
  },
};

export const backTopMixin = {
  components: {
    BackTop,
  },
  data() {
    return {
      isShowBackTop: false,
    };
  },
  methods: {
    backTopClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
  },
};

export const tabControlMixin = {
  data: function () {
    return {
      currentType: POP,
    };
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP;
          break;
        case 1:
          this.currentType = NEW;
          break;
        case 2:
          this.currentType = SELL;
          break;
      }
      // console.log(this.currentType);
    },
  },
};
