// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import i18n from "./common/lang";
import Vue from "vue";
import ElementUI from "element-ui";
import locale from 'element-ui/lib/locale/lang/en'
import "element-ui/lib/theme-chalk/index.css";
import App from "./App";
import router from "./router";
import { store } from "./_store";

Vue.config.productionTip = false;

//国际化支持
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})

export const EventBus = new Vue();
export const format = require("string-format");
format.extend(String.prototype, {});//字符串格式化

/* eslint-disable no-new */
new Vue({
  el: "#app",
  i18n,
  router,
  store,
  components: { App },
  template: "<App/>"
});
