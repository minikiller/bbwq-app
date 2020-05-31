<template>
  <div>
    <el-button @click="changeLanguage">{{$t("main.language")}}</el-button>
    <el-button type="primary" @click="changeLangEvent">Primary</el-button>
    <span v-text="$t('main.music')"></span>
    <br />
    <span>{{$t('main.findMusic')}}</span>
  </div>
</template>

<script>
import { setup } from "../common/lang";
export default {
  name: "lang",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  methods: {
    changeLanguage() {
      // console.log(this.$i18n.locale)
      if (this.$i18n.locale === "en") {
        setup("zh");
      } else {
        setup("en");
      }
      // LangStorage.setLang(this.$i18n.locale);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
