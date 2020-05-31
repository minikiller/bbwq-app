<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <el-button @click="changeLanguage">{{$t("main.language")}}</el-button>
    <el-button type="primary" @click="changeLangEvent">Primary</el-button>
    <span v-text="$t('m.music')"></span>
    <br />
    <span>{{$t('m.findMusic')}}</span>
  </div>
</template>

<script>
import { setup, LangStorage } from "../common/lang";
export default {
  name: "HelloWorld",
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
    },
    changeLangEvent() {
      this.$confirm(this.$t("main.confirm"), {
        type: "warning"
      })
        .then(() => {
          if (this.$i18n.locale === "en") {
            setup("zh");
          } else {
            setup("en");
          }
        })
        .catch(() => {
          // this.$message({
          //   type: "info"
          // });
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
