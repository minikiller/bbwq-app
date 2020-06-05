import config from "config";
import { store } from "./_store";
import {router} from "./router";
import App from "./App";
import Notifications from "vue-notification";

// import { IconsPlugin } from "bootstrap-vue";

// This imports all the layout components such as <b-container>, <b-row>, <b-col>:
// import { LayoutPlugin } from "bootstrap-vue";
// Vue.use(LayoutPlugin);

// This imports <b-modal> as well as the v-b-modal directive as a plugin:
// import { ModalPlugin } from "bootstrap-vue";
// Vue.use(ModalPlugin);

// This imports <b-card> along with all the <b-card-*> sub-components as a plugin:
// import { CardPlugin } from "bootstrap-vue";
// Vue.use(CardPlugin);

// This imports directive v-b-scrollspy as a plugin:
// import { VBScrollspyPlugin } from "bootstrap-vue";
// Vue.use(VBScrollspyPlugin);

// This imports the dropdown and table plugins
// import { DropdownPlugin, TablePlugin } from "bootstrap-vue";
// Vue.use(DropdownPlugin);
// Vue.use(TablePlugin);
// Vue.use(IconsPlugin);

// import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap-vue/dist/bootstrap-vue.css"  ;
const Vue = require("vue");

Vue.use(Notifications);
import "vue-select/dist/vue-select.css";

import vSelect from "vue-select";
Vue.component("v-select", vSelect);

const VueSocketIO = require("vue-socket.io");
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

/* import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify, {
  theme: {
    secondary: "#0e71a3",
    primary: "#52c2b8",
    accent: "#e95e29",
  },
}); */

// Vue.use(VeeValidate);
// import VeeValidate from "vee-validate";
const VeeValidate = require("vee-validate");
Vue.use(VeeValidate, {
  inject: true,
  fieldsBagName: "veeFields",
});

require("exports-loader?WGo!./wgo/wgo.js");
require("exports-loader?WGo.KifuReader,WGo.Kifu!./wgo/kifu.js");
require("exports-loader?WGo.SGF!./wgo/sgfparser.js");
require("exports-loader?WGo.Player!./wgo/player.js");
require("exports-loader?WGo.BasicPlayer!./wgo/basicplayer.js");
require("exports-loader?WGo.BasicPlayer.component!./wgo/basicplayer.component.js");
require("exports-loader?WGo.BasicPlayer.component.InfoBox!./wgo/basicplayer.infobox.js");
require("exports-loader?WGo.BasicPlayer.component.Control!./wgo/basicplayer.control.js");
require("exports-loader?WGo.Player.Marker!./wgo/player.marker.js");
require('exports-loader?WGo.i18n["zh"]!./wgo/i18n.zh.js');
require("exports-loader?WGo.ScoreMode!./wgo/scoremode.js");

// setup fake backend
// import { configureFakeBackend } from './_helpers';
// configureFakeBackend();
export const EventBus = new Vue();
export const format = require("string-format");
format.extend(String.prototype, {});

new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App),
});
