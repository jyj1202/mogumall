import { ADD_NEW_GOOD, ADD_OLD_GOOD } from "./mutation-types";

export default {
  addToCart(context, payload) {
    // console.log("aaaaaa");
    // console.log(payload);
    // console.log(context);
    // console.log(context.state.cart);
    return new Promise((resolve, reject) => {
      let oldGood = context.state.cart.find((item) => item.iid === payload.iid);
      if (oldGood) {
        context.commit(ADD_OLD_GOOD, oldGood);
        resolve("当前商品数量+1");
      } else {
        context.commit(ADD_NEW_GOOD, payload);
        resolve("当前商品已添加到购物车");
      }
    });
    // if (item.iid === payload.iid) {
    //   // console.log("a");
    //   context.commit("addOldGood", payload);
    // } else {
    //   // console.log(b);
    //   context.commit("addNewGood", payload);
    // }
  },
};
