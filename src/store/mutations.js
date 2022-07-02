import { ADD_NEW_GOOD, ADD_OLD_GOOD } from "./mutation-types";

export default {
  //mutations唯一的目的就是修改state中的状态
  //mutations中的每一个方法尽可能完成的事件比较单一
  [ADD_NEW_GOOD](state, payload) {
    payload.checked = true;
    state.cart.push(payload);
  },
  [ADD_OLD_GOOD](state, payload) {
    // console.log(payload);
    payload.count++;
  },
};
