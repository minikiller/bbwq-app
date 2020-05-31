<template>
  <div>
    <el-button-group>
      <el-button type="primary" @click="changeLanguage">中文</el-button>
      <el-button type="primary" @click="changeLanguage">en</el-button>
    </el-button-group>
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
