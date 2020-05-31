// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import i18n from "./common/lang";
import Vue from "vue";
import ElementUI from "element-ui";
import locale from 'element-ui/lib/locale/lang/en'
import "element-ui/lib/theme-chalk/index.css";
import App from "./App";
import router from "./router";

Vue.config.productionTip = false;

Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})

/* eslint-disable no-new */
new Vue({
  el: "#app",
  i18n,
  router,
  components: { App },
  template: "<App/>"
});
