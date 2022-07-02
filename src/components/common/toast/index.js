import Toast from "./Toast";

const obj = {
  // 1.install函数默认会传入Vue作为参数
  install(Vue) {
    console.log("install");
    // 2.创建组件构造器
    const ToastConstructor = Vue.extend(Toast);
    //new出组件实例
    const toast = new ToastConstructor();
    // 3.将组件实例手动挂载到通过操作dom创建的el元素上
    toast.$mount(document.createElement("div"));
    // 4.append, toast的$el就是div
    document.body.appendChild(toast.$el);
    // 5.将组件实例挂到Vue的原型上
    Vue.prototype.$toast = toast;
  },
};

export default obj;
