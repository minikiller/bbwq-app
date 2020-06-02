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

import VueSocketIO from "vue-socket.io";
Vue.use(
  new VueSocketIO({
    debug: true,
    connection: `${config.socketUrl}`,
    vuex: {
      store,
      actionPrefix: "SOCKET_", //为vuex设置的两个前缀
      mutationPrefix: "SOCKET_",
    },
    // options: { path: "/my-app/" } //Optional options
  })
);

require("exports-loader?WGo!./wgo/wgo.js");
require("exports-loader?WGo.KifuReader,WGo.Kifu!./wgo/kifu.js");
require("exports-loader?WGo.SGF!./wgo/sgfparser.js");
require("exports-loader?WGo.Player!./wgo/player.js");
require("exports-loader?WGo.BasicPlayer!./wgo/basicplayer.js");
require("exports-loader?WGo.BasicPlayer.component!./wgo/basicplayer.component.js");
require("exports-loader?WGo.BasicPlayer.component.InfoBox!./wgo/basicplayer.infobox.js");
require("exports-loader?WGo.BasicPlayer.component.Control!./wgo/basicplayer.control.js");
require('exports-loader?WGo.i18n["zh"]!./wgo/i18n.zh.js');
require("exports-loader?WGo.ScoreMode!./wgo/scoremode.js");


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
