module.exports = {
  root: true,
  parserOptions: {
    sourceType: "module",
  },
  // required to lint *.vue files
  plugins: ["html"],
  // add your custom rules here
  rules: {
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
  },
  // overrides: [
  //   {
  //     files: ["src/views/*.vue", "src/views/**/*.vue"], // 匹配views和二级目录中的index.vue
  //     rules: {
  //       "vue/multi-word-component-names": "off",
  //     }, //给上面匹配的文件指定规则
  //   },
  // ],
};
