import Vue from "vue";
import VueRouter from "vue-router";

const Home = () => import("views/home/Home");
const Category = () => import("views/category1/Category");
const ShopCart = () => import("views/shopcart/ShopCart");
const Profile = () => import("views/profile/Profile");
const Detail = () => import("views/detail/Detail");

// 1.安装插件
Vue.use(VueRouter);

// 2.创建路由对象
const routes = [
  {
    path: "",
    redirect: "/home",
    meta: {
      tabBarShow: true,
    },
  },
  {
    path: "/home",
    component: Home,
    meta: {
      tabBarShow: true,
    },
  },
  {
    path: "/category",
    component: Category,
    meta: {
      tabBarShow: true,
    },
  },
  {
    path: "/shopcart",
    component: ShopCart,
    meta: {
      tabBarShow: true,
    },
  },
  {
    path: "/profile",
    component: Profile,
    meta: {
      tabBarShow: true,
    },
  },
  {
    path: "/detail",
    component: Detail,
    meta: {
      tabBarShow: false,
    },
  },
];
const router = new VueRouter({
  routes,
  mode: "history",
});

// 3.导出router
export default router;
